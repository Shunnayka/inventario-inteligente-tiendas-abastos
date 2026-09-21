import { FlatList, Text, View } from 'react-native';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

export function AlertasScreen() {
  const { productos } = useAppData();

  return (
    <View style={estilos.pantalla}>
      <FlatList
        contentContainerStyle={estilos.contenido}
        data={productos.productosCriticos}
        keyExtractor={(p) => String(p.idProducto)}
        ListHeaderComponent={<Text style={estilos.titulo}>Alertas de desabastecimiento</Text>}
        ListEmptyComponent={<Text style={estilos.etiqueta}>Sin alertas por ahora.</Text>}
        renderItem={({ item }) => (
          <View style={estilos.alertaItem}>
            <Text>
              {item.nombre} — quedan {item.stockActual} unidades (mínimo {item.stockMinimo})
            </Text>
          </View>
        )}
      />
    </View>
  );
}
