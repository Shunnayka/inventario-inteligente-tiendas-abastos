-- ============================================================
-- SISTEMA DE INVENTARIO INTELIGENTE PARA TIENDAS DE ABASTOS
-- Autora: Shunayka G. Baquero
-- Prefijo: sgb_
-- Motor: PostgreSQL 14+
-- Fecha: 19/09/2026
-- ============================================================

-- ============================================================
-- TABLA: sgb_rol
-- Almacena los roles del sistema (Administrador, Tendero)
-- ============================================================
CREATE TABLE sgb_rol (
    id_rol       SERIAL PRIMARY KEY,
    nombre       VARCHAR(50) NOT NULL UNIQUE,
    descripcion  VARCHAR(200)
);

COMMENT ON TABLE sgb_rol IS 'Roles del sistema';
COMMENT ON COLUMN sgb_rol.nombre IS 'Nombre único del rol (ADMINISTRADOR, TENDERO)';

-- ============================================================
-- TABLA: sgb_usuario
-- Usuarios del sistema con credenciales cifradas
-- ============================================================
CREATE TABLE sgb_usuario (
    id_usuario        SERIAL PRIMARY KEY,
    id_rol            INTEGER NOT NULL,
    nombre            VARCHAR(120) NOT NULL,
    correo            VARCHAR(150) NOT NULL UNIQUE,
    contrasena_hash   VARCHAR(255) NOT NULL,
    estado            BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol)
        REFERENCES sgb_rol(id_rol) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_usuario_correo ON sgb_usuario(correo);
CREATE INDEX idx_usuario_rol ON sgb_usuario(id_rol);

COMMENT ON TABLE sgb_usuario IS 'Usuarios registrados en el sistema';

-- ============================================================
-- TABLA: sgb_configuracion_accesibilidad
-- Preferencias de accesibilidad por usuario (WCAG 2.1)
-- ============================================================
CREATE TABLE sgb_configuracion_accesibilidad (
    id_configuracion   SERIAL PRIMARY KEY,
    id_usuario         INTEGER NOT NULL UNIQUE,
    alto_contraste     BOOLEAN NOT NULL DEFAULT FALSE,
    tamanio_fuente     INTEGER NOT NULL DEFAULT 16,
    lectura_pantalla   BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_config_usuario FOREIGN KEY (id_usuario)
        REFERENCES sgb_usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMENT ON TABLE sgb_configuracion_accesibilidad IS 'Preferencias WCAG por usuario';

-- ============================================================
-- TABLA: sgb_categoria
-- Categorías de productos (abarrotes, bebidas, etc.)
-- ============================================================
CREATE TABLE sgb_categoria (
    id_categoria  SERIAL PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE
);

COMMENT ON TABLE sgb_categoria IS 'Categorías de productos';

-- ============================================================
-- TABLA: sgb_producto
-- Productos del inventario con código de barras
-- ============================================================
CREATE TABLE sgb_producto (
    id_producto     SERIAL PRIMARY KEY,
    id_categoria    INTEGER NOT NULL,
    codigo_barras   VARCHAR(30) NOT NULL UNIQUE,
    nombre          VARCHAR(150) NOT NULL,
    precio_venta    DECIMAL(10,2) NOT NULL CHECK (precio_venta >= 0),
    stock_actual    INTEGER NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo    INTEGER NOT NULL DEFAULT 0 CHECK (stock_minimo >= 0),
    fecha_registro  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria)
        REFERENCES sgb_categoria(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_producto_codigo ON sgb_producto(codigo_barras);
CREATE INDEX idx_producto_categoria ON sgb_producto(id_categoria);

COMMENT ON TABLE sgb_producto IS 'Productos del inventario';

-- ============================================================
-- TABLA: sgb_movimiento_inventario
-- Historial de entradas y salidas de stock
-- ============================================================
CREATE TABLE sgb_movimiento_inventario (
    id_movimiento  SERIAL PRIMARY KEY,
    id_producto    INTEGER NOT NULL,
    id_usuario     INTEGER NOT NULL,
    tipo           VARCHAR(20) NOT NULL CHECK (tipo IN ('ENTRADA', 'SALIDA', 'AJUSTE')),
    cantidad       INTEGER NOT NULL CHECK (cantidad > 0),
    fecha_hora     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    origen         VARCHAR(20) NOT NULL CHECK (origen IN ('MANUAL', 'ESCANER', 'VOZ')),
    CONSTRAINT fk_mov_producto FOREIGN KEY (id_producto)
        REFERENCES sgb_producto(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_mov_usuario FOREIGN KEY (id_usuario)
        REFERENCES sgb_usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_mov_producto ON sgb_movimiento_inventario(id_producto);
CREATE INDEX idx_mov_fecha ON sgb_movimiento_inventario(fecha_hora);

COMMENT ON TABLE sgb_movimiento_inventario IS 'Historial de movimientos de stock';

-- ============================================================
-- TABLA: sgb_comando_voz
-- Registro de comandos de voz ejecutados
-- ============================================================
CREATE TABLE sgb_comando_voz (
    id_comando     SERIAL PRIMARY KEY,
    id_usuario     INTEGER NOT NULL,
    id_producto    INTEGER,
    transcripcion  VARCHAR(300) NOT NULL,
    accion         VARCHAR(50) NOT NULL,
    fecha_hora     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resultado      VARCHAR(20) NOT NULL CHECK (resultado IN ('EXITOSO', 'FALLIDO')),
    CONSTRAINT fk_comando_usuario FOREIGN KEY (id_usuario)
        REFERENCES sgb_usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_comando_producto FOREIGN KEY (id_producto)
        REFERENCES sgb_producto(id_producto) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_comando_usuario ON sgb_comando_voz(id_usuario);
CREATE INDEX idx_comando_fecha ON sgb_comando_voz(fecha_hora);

COMMENT ON TABLE sgb_comando_voz IS 'Historial de comandos de voz';

-- ============================================================
-- TABLA: sgb_alerta_prediccion
-- Alertas predictivas de desabastecimiento
-- ============================================================
CREATE TABLE sgb_alerta_prediccion (
    id_alerta                  SERIAL PRIMARY KEY,
    id_producto                INTEGER NOT NULL,
    consumo_promedio_diario    DECIMAL(10,2) NOT NULL CHECK (consumo_promedio_diario >= 0),
    dias_restantes             INTEGER NOT NULL CHECK (dias_restantes >= 0),
    nivel_criticidad           VARCHAR(10) NOT NULL CHECK (nivel_criticidad IN ('BAJO', 'MEDIO', 'ALTO')),
    fecha_generacion           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atendida                   BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_alerta_producto FOREIGN KEY (id_producto)
        REFERENCES sgb_producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_alerta_producto ON sgb_alerta_prediccion(id_producto);
CREATE INDEX idx_alerta_atendida ON sgb_alerta_prediccion(atendida);

COMMENT ON TABLE sgb_alerta_prediccion IS 'Alertas predictivas de desabasto';

-- ============================================================
-- DATOS INICIALES (SEED)
-- ============================================================

-- Roles del sistema
INSERT INTO sgb_rol (id_rol, nombre, descripcion) VALUES
    (1, 'ADMINISTRADOR', 'Administrador del sistema con acceso completo'),
    (2, 'TENDERO', 'Usuario tendero de tienda con acceso operativo');

-- Categorías base de ejemplo
INSERT INTO sgb_categoria (nombre) VALUES
    ('Abarrotes'),
    ('Bebidas'),
    ('Lácteos'),
    ('Panadería'),
    ('Limpieza');

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================