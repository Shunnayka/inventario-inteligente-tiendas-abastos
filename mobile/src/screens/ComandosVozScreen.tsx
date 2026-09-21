import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Voice from '@react-native-voice/voice';
import type { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

export function ComandosVozScreen() {
  const { comandoVoz, auth } = useAppData();
  const [texto, setTexto] = useState('');
  const [escuchando, setEscuchando] = useState(false);
  const [errorVoz, setErrorVoz] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechResults = (evento: SpeechResultsEvent) => {
      const frase = evento.value?.[0];
      if (frase) setTexto(frase);
    };
    Voice.onSpeechError = (evento: SpeechErrorEvent) => {
      setEscuchando(false);
      setErrorVoz(evento.error?.message ?? 'No se pudo reconocer el audio.');
    };
    Voice.onSpeechEnd = () => setEscuchando(false);

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const pedirPermisoMicrofono = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    const resultado = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: 'Permiso de micrófono',
      message: 'SGB Inventario necesita el micrófono para reconocer comandos de voz.',
      buttonPositive: 'Permitir',
      buttonNegative: 'Cancelar',
    });
    return resultado === PermissionsAndroid.RESULTS.GRANTED;
  };

  const activarMicrofono = async () => {
    setErrorVoz(null);
    const permitido = await pedirPermisoMicrofono();
    if (!permitido) {
      setErrorVoz('Se necesita permiso de micrófono para usar comandos de voz.');
      return;
    }
    try {
      setEscuchando(true);
      await Voice.start('es-ES');
    } catch (e: any) {
      setEscuchando(false);
      setErrorVoz(e?.message ?? 'No se pudo iniciar el reconocimiento de voz.');
    }
  };

  const detenerMicrofono = async () => {
    await Voice.stop();
    setEscuchando(false);
  };

  const ejecutar = async () => {
    if (!texto.trim()) return;
    const resultado = await comandoVoz.ejecutar(texto.trim(), auth.usuario?.idUsuario ?? 2);
    setTexto('');
    Speech.speak(resultado.mensaje, { language: 'es-ES' });
  };

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>Comandos de voz</Text>
      <View style={estilos.tarjeta}>
        <Text style={estilos.etiqueta}>
          Di algo como "vender 2 arroz" o "ingresar 5 arroz", o escríbelo directamente.
        </Text>

        <TouchableOpacity
          style={escuchando ? estilos.botonPrimario : estilos.botonSecundario}
          onPress={escuchando ? detenerMicrofono : activarMicrofono}
        >
          <Text style={escuchando ? estilos.botonPrimarioTexto : estilos.botonSecundarioTexto}>
            {escuchando ? '🎙️ Escuchando… (toca para detener)' : '🎤 Activar micrófono'}
          </Text>
        </TouchableOpacity>

        {errorVoz && <Text style={estilos.error}>{errorVoz}</Text>}

        <TextInput
          style={estilos.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Escribe el comando aquí…"
          onSubmitEditing={ejecutar}
        />

        <TouchableOpacity style={estilos.botonPrimario} disabled={comandoVoz.procesando} onPress={ejecutar}>
          <Text style={estilos.botonPrimarioTexto}>{comandoVoz.procesando ? 'Procesando…' : 'Ejecutar comando'}</Text>
        </TouchableOpacity>

        {comandoVoz.ultimoResultado && (
          <Text style={comandoVoz.ultimoResultado.exito ? estilos.ok : estilos.error}>
            {comandoVoz.ultimoResultado.mensaje}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
