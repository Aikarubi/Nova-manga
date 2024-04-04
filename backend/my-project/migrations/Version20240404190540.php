<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240404190540 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE libros ADD nombre VARCHAR(255) NOT NULL, ADD precio DOUBLE PRECISION NOT NULL, ADD descripcion LONGTEXT NOT NULL, ADD tamanyo VARCHAR(255) NOT NULL, ADD paginas INT NOT NULL, ADD fecha_venta DATE NOT NULL, CHANGE id isbn INT NOT NULL, ADD PRIMARY KEY (isbn)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX `primary` ON libros');
        $this->addSql('ALTER TABLE libros ADD id INT NOT NULL, DROP isbn, DROP nombre, DROP precio, DROP descripcion, DROP tamanyo, DROP paginas, DROP fecha_venta');
    }
}
