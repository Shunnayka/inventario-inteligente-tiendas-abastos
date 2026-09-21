import { ScrollView, Text, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

export function DashboardScreen() {
  const { auth, productos, alertas } = useAppData();
  const stockTotal = productos.productos.reduce((acc, p) => acc + p.stockActual, 0);
  const alertasActivas = alertas.alertas.length > 0 ? alertas.alertas.length : productos.productosCriticos.length;

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>Resumen del día</Text>
      <Text style={estilos.etiqueta}>Sesión: {auth.usuario?.nombre ?? 'Tendero'}</Text>

      <View style={estilos.tarjeta}>
        <Text style={estilos.metricaValor}>{productos.cargando ? '…' : productos.productos.length}</Text>
        <Text style={estilos.metricaEtiqueta}>Productos registrados</Text>
      </View>
      <View style={estilos.tarjeta}>
        <Text style={estilos.metricaValor}>{productos.cargando ? '…' : stockTotal}</Text>
        <Text style={estilos.metricaEtiqueta}>Unidades en stock</Text>
      </View>
      <View style={estilos.tarjeta}>
        <Text style={[estilos.metricaValor, estilos.error]}>{productos.cargando ? '…' : alertasActivas}</Text>
        <Text style={estilos.metricaEtiqueta}>Alertas activas</Text>
      </View>
    </ScrollView>
  );
}
