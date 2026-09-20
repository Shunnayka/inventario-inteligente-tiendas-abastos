-- CreateTable
CREATE TABLE "sgb_rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(200),

    CONSTRAINT "sgb_rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "sgb_usuario" (
    "id_usuario" SERIAL NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "correo" VARCHAR(150) NOT NULL,
    "contrasena_hash" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sgb_usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "sgb_configuracion_accesibilidad" (
    "id_configuracion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "alto_contraste" BOOLEAN NOT NULL DEFAULT false,
    "tamanio_fuente" INTEGER NOT NULL DEFAULT 16,
    "lectura_pantalla" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sgb_configuracion_accesibilidad_pkey" PRIMARY KEY ("id_configuracion")
);

-- CreateTable
CREATE TABLE "sgb_categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,

    CONSTRAINT "sgb_categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "sgb_producto" (
    "id_producto" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "codigo_barras" VARCHAR(30) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "precio_venta" DECIMAL(10,2) NOT NULL,
    "stock_actual" INTEGER NOT NULL DEFAULT 0,
    "stock_minimo" INTEGER NOT NULL DEFAULT 0,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sgb_producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "sgb_movimiento_inventario" (
    "id_movimiento" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origen" VARCHAR(20) NOT NULL,

    CONSTRAINT "sgb_movimiento_inventario_pkey" PRIMARY KEY ("id_movimiento")
);

-- CreateTable
CREATE TABLE "sgb_comando_voz" (
    "id_comando" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_producto" INTEGER,
    "transcripcion" VARCHAR(300) NOT NULL,
    "accion" VARCHAR(50) NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resultado" VARCHAR(20) NOT NULL,

    CONSTRAINT "sgb_comando_voz_pkey" PRIMARY KEY ("id_comando")
);

-- CreateTable
CREATE TABLE "sgb_alerta_prediccion" (
    "id_alerta" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "consumo_promedio_diario" DECIMAL(10,2) NOT NULL,
    "dias_restantes" INTEGER NOT NULL,
    "nivel_criticidad" VARCHAR(10) NOT NULL,
    "fecha_generacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atendida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sgb_alerta_prediccion_pkey" PRIMARY KEY ("id_alerta")
);

-- CreateIndex
CREATE UNIQUE INDEX "sgb_rol_nombre_key" ON "sgb_rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "sgb_usuario_correo_key" ON "sgb_usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "sgb_configuracion_accesibilidad_id_usuario_key" ON "sgb_configuracion_accesibilidad"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "sgb_categoria_nombre_key" ON "sgb_categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "sgb_producto_codigo_barras_key" ON "sgb_producto"("codigo_barras");

-- AddForeignKey
ALTER TABLE "sgb_usuario" ADD CONSTRAINT "sgb_usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "sgb_rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_configuracion_accesibilidad" ADD CONSTRAINT "sgb_configuracion_accesibilidad_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "sgb_usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_producto" ADD CONSTRAINT "sgb_producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "sgb_categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_movimiento_inventario" ADD CONSTRAINT "sgb_movimiento_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "sgb_producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_movimiento_inventario" ADD CONSTRAINT "sgb_movimiento_inventario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "sgb_usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_comando_voz" ADD CONSTRAINT "sgb_comando_voz_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "sgb_usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_comando_voz" ADD CONSTRAINT "sgb_comando_voz_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "sgb_producto"("id_producto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sgb_alerta_prediccion" ADD CONSTRAINT "sgb_alerta_prediccion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "sgb_producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
