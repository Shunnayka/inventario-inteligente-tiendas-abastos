import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

interface Props {
  onIrARegistro: () => void;
}

export function LoginScreen({ onIrARegistro }: Props) {
  const { auth } = useAppData();
  const [correo, setCorreo] = useState('tendero@abastos.ec');
  const [contrasena, setContrasena] = useState('');

  return (
    <KeyboardAvoidingView style={estilos.pantalla} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={estilos.centrado}>
        <View style={[estilos.tarjeta, { width: '100%', maxWidth: 360 }]}>
          <Text style={estilos.titulo}>Iniciar sesión</Text>

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
            <TextInput
              style={estilos.input}
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
            />
          </View>

          {auth.error && <Text style={estilos.error}>{auth.error}</Text>}

          <TouchableOpacity
            style={estilos.botonPrimario}
            disabled={auth.cargando}
            onPress={() => auth.login(correo, contrasena)}
          >
            <Text style={estilos.botonPrimarioTexto}>{auth.cargando ? 'Entrando…' : 'Entrar'}</Text>
          </TouchableOpacity>

          <Text style={estilos.enlace} onPress={onIrARegistro}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
