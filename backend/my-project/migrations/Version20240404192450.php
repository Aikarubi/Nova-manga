<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240404192450 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE autor ADD nombre VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE libros ADD autor_id INT NOT NULL');
        $this->addSql('ALTER TABLE libros ADD CONSTRAINT FK_B7E5AFE614D45BBE FOREIGN KEY (autor_id) REFERENCES autor (id)');
        $this->addSql('CREATE INDEX IDX_B7E5AFE614D45BBE ON libros (autor_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE libros DROP FOREIGN KEY FK_B7E5AFE614D45BBE');
        $this->addSql('DROP INDEX IDX_B7E5AFE614D45BBE ON libros');
        $this->addSql('ALTER TABLE libros DROP autor_id');
        $this->addSql('ALTER TABLE autor DROP nombre');
    }
}
