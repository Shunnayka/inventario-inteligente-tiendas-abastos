import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppData } from '../context/AppDataContext';
import { DashboardScreen } from '../screens/DashboardScreen';
import { InventarioScreen } from '../screens/InventarioScreen';
import { ComandosVozScreen } from '../screens/ComandosVozScreen';
import { AlertasScreen } from '../screens/AlertasScreen';
import { colores } from '../styles';

const Tab = createBottomTabNavigator();

function BotonCerrarSesion() {
  const { auth } = useAppData();
  return (
    <TouchableOpacity onPress={auth.logout} style={{ marginRight: 16 }}>
      <Text style={{ color: colores.primario, fontWeight: '600' }}>Salir</Text>
    </TouchableOpacity>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <BotonCerrarSesion />,
        tabBarActiveTintColor: colores.primario,
      }}
    >
      <Tab.Screen name="Resumen" component={DashboardScreen} />
      <Tab.Screen name="Inventario" component={InventarioScreen} />
      <Tab.Screen name="Voz" component={ComandosVozScreen} options={{ title: 'Comandos de voz' }} />
      <Tab.Screen name="Alertas" component={AlertasScreen} />
    </Tab.Navigator>
  );
}
