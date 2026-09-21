import { StyleSheet } from 'react-native';

export const colores = {
  fondo: '#f4f6f8',
  tarjeta: '#ffffff',
  primario: '#2563eb',
  texto: '#111827',
  textoSuave: '#6b7280',
  borde: '#e5e7eb',
  error: '#dc2626',
  ok: '#16a34a',
  critico: '#fee2e2',
};

export const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 16,
    gap: 16,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: colores.texto,
    marginBottom: 8,
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: 10,
  },
  etiqueta: {
    fontSize: 13,
    color: colores.textoSuave,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colores.texto,
    backgroundColor: '#fff',
  },
  botonPrimario: {
    backgroundColor: colores.primario,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  botonPrimarioTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.primario,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonSecundarioTexto: {
    color: colores.primario,
    fontWeight: '600',
    fontSize: 15,
  },
  enlace: {
    color: colores.primario,
    textAlign: 'center',
    marginTop: 8,
  },
  error: {
    color: colores.error,
  },
  ok: {
    color: colores.ok,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricaValor: {
    fontSize: 28,
    fontWeight: '700',
    color: colores.texto,
  },
  metricaEtiqueta: {
    fontSize: 13,
    color: colores.textoSuave,
  },
  alertaItem: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colores.critico,
  },
});
