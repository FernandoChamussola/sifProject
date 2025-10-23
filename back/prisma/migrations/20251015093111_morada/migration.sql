/*
  Warnings:

  - Added the required column `morada` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `morada` VARCHAR(255) NOT NULL;
