-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(21) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" VARCHAR(21) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_type" (
    "id" VARCHAR(21) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "book_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" VARCHAR(21) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "publish_year" SMALLINT NOT NULL,
    "author_id" VARCHAR(21) NOT NULL,
    "type_id" VARCHAR(21) NOT NULL,
    "average_score" DOUBLE PRECISION,
    "score_count" SMALLINT,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "book_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
