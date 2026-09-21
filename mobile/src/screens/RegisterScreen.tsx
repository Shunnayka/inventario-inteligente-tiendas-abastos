import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

interface Props {
  onIrALogin: () => void;
}

export function RegisterScreen({ onIrALogin }: Props) {
  const { auth } = useAppData();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const handleRegistrar = async () => {
    if (contrasena !== confirmarContrasena) {
      setErrorLocal('Las contraseñas no coinciden.');
      return;
    }
    setErrorLocal(null);
    const ok = await auth.registrar(nombre, correo, contrasena);
    if (ok) onIrALogin();
  };

  return (
    <KeyboardAvoidingView style={estilos.pantalla} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={estilos.centrado}>
        <View style={[estilos.tarjeta, { width: '100%', maxWidth: 360 }]}>
          <Text style={estilos.titulo}>Crear cuenta</Text>

          <View>
            <Text style={estilos.etiqueta}>Nombre</Text>
            <TextInput style={estilos.input} value={nombre} onChangeText={setNombre} />
          </View>
          <View>
            <Text style={estilos.etiqueta}>Correo</Text>
            <TextInput
              style={estilos.input}
              value={correo}
              onChangeText={setCorreo}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text style={estilos.etiqueta}>Contraseña</Text>
            <TextInput style={estilos.input} value={contrasena} onChangeText={setContrasena} secureTextEntry />
          </View>
          <View>
            <Text style={estilos.etiqueta}>Confirmar contraseña</Text>
            <TextInput
              style={estilos.input}
              value={confirmarContrasena}
              onChangeText={setConfirmarContrasena}
              secureTextEntry
            />
          </View>

          {(errorLocal ?? auth.errorRegistro) && (
            <Text style={estilos.error}>{errorLocal ?? auth.errorRegistro}</Text>
          )}

          <TouchableOpacity style={estilos.botonPrimario} disabled={auth.cargandoRegistro} onPress={handleRegistrar}>
            <Text style={estilos.botonPrimarioTexto}>
              {auth.cargandoRegistro ? 'Creando cuenta…' : 'Registrarse'}
            </Text>
          </TouchableOpacity>

          <Text style={estilos.enlace} onPress={onIrALogin}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
