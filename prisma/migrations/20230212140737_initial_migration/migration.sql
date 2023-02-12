-- CreateTable
CREATE TABLE "order_details" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "produtos" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "nome_cliente" VARCHAR(255) NOT NULL,
    "cidade_cliente" VARCHAR(255) NOT NULL,
    "endereco_cliente" VARCHAR(255) NOT NULL,
    "telefone_cliente" VARCHAR(255) NOT NULL,
    "restaurante_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "categoria" VARCHAR(255) NOT NULL,
    "id_restaurante" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "categoria" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(255) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
