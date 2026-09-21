import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { setApiBaseUrl, tokenStore } from '@sgb/shared';
import { asyncStorageTokenAdapter, cargarTokenInicial } from './src/tokenStoreAdapter';
import { AppDataProvider } from './src/context/AppDataContext';
import { RootNavigator } from './src/navigation/RootNavigator';

setApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);
tokenStore.configure(asyncStorageTokenAdapter);

export default function App() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    cargarTokenInicial().finally(() => setListo(true));
  }, []);

  if (!listo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppDataProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </AppDataProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
