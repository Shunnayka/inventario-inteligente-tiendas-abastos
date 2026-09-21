import { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { useAppData } from '../context/AppDataContext';
import { estilos } from '../styles';

export function InventarioScreen() {
  const { productos } = useAppData();
  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [escaneando, setEscaneando] = useState(false);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [nombre, setNombre] = useState('');
  const [precioVenta, setPrecioVenta] = useState('1');
  const [stockActual, setStockActual] = useState('10');
  const [stockMinimo, setStockMinimo] = useState('5');
  const [mensaje, setMensaje] = useState<string | null>(null);

  const abrirEscaner = async () => {
    if (!permiso?.granted) {
      const resultado = await solicitarPermiso();
      if (!resultado.granted) {
        setMensaje('Se necesita permiso de cámara para escanear.');
        return;
      }
    }
    setEscaneando(true);
  };

  const alEscanear = (resultado: BarcodeScanningResult) => {
    setEscaneando(false);
    setCodigoBarras(resultado.data);
    setNombre((prev) => prev || 'Producto escaneado');
    setMensaje(`Código leído: ${resultado.data}`);
  };

  const registrarProducto = async () => {
    if (!codigoBarras || !nombre) {
      setMensaje('Completa código y nombre.');
      return;
    }
    try {
      await productos.crearProducto({
        idCategoria: 1,
        codigoBarras,
        nombre,
        precioVenta: Number(precioVenta) || 0,
        stockActual: Number(stockActual) || 0,
        stockMinimo: Number(stockMinimo) || 0,
      });
      setMensaje(`Producto "${nombre}" registrado.`);
      setCodigoBarras('');
      setNombre('');
    } catch (e: any) {
      setMensaje(e.message);
    }
  };

  return (
    <View style={estilos.pantalla}>
      <FlatList
        contentContainerStyle={estilos.contenido}
        data={productos.productos}
        keyExtractor={(p) => String(p.idProducto)}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            <Text style={estilos.titulo}>Inventario</Text>
            <View style={estilos.tarjeta}>
              <Text style={estilos.etiqueta}>Código de barras</Text>
              <TextInput style={estilos.input} value={codigoBarras} onChangeText={setCodigoBarras} />

              <Text style={estilos.etiqueta}>Nombre</Text>
              <TextInput style={estilos.input} value={nombre} onChangeText={setNombre} />

              <Text style={estilos.etiqueta}>Precio</Text>
              <TextInput style={estilos.input} value={precioVenta} onChangeText={setPrecioVenta} keyboardType="decimal-pad" />

              <View style={estilos.fila}>
                <View style={{ flex: 1 }}>
                  <Text style={estilos.etiqueta}>Stock inicial</Text>
                  <TextInput style={estilos.input} value={stockActual} onChangeText={setStockActual} keyboardType="number-pad" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={estilos.etiqueta}>Stock mínimo</Text>
                  <TextInput style={estilos.input} value={stockMinimo} onChangeText={setStockMinimo} keyboardType="number-pad" />
                </View>
              </View>

              <TouchableOpacity style={estilos.botonSecundario} onPress={abrirEscaner}>
                <Text style={estilos.botonSecundarioTexto}>📷 Escanear código de barras</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.botonPrimario} onPress={registrarProducto}>
                <Text style={estilos.botonPrimarioTexto}>Registrar producto</Text>
              </TouchableOpacity>

              {mensaje && <Text>{mensaje}</Text>}
            </View>

            <Text style={estilos.etiqueta}>Productos ({productos.cargando ? 'cargando…' : productos.productos.length})</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[estilos.tarjeta, { marginTop: 8 }]}>
            <Text style={{ fontWeight: '600' }}>{item.nombre}</Text>
            <Text style={estilos.etiqueta}>Código: {item.codigoBarras}</Text>
            <Text style={item.stockActual <= item.stockMinimo ? estilos.error : undefined}>
              Stock: {item.stockActual}
              {item.stockActual <= item.stockMinimo ? ' ⚠' : ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={!productos.cargando ? <Text style={estilos.etiqueta}>Sin productos todavía.</Text> : null}
      />

      <Modal visible={escaneando} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
            }}
            onBarcodeScanned={alEscanear}
          />
          <TouchableOpacity
            style={[estilos.botonPrimario, { margin: 16 }]}
            onPress={() => setEscaneando(false)}
          >
            <Text style={estilos.botonPrimarioTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
