<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240404191759 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE editorial ADD nombre VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE libros ADD editorial_id INT NOT NULL');
        $this->addSql('ALTER TABLE libros ADD CONSTRAINT FK_B7E5AFE6BAF1A24D FOREIGN KEY (editorial_id) REFERENCES editorial (id)');
        $this->addSql('CREATE INDEX IDX_B7E5AFE6BAF1A24D ON libros (editorial_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE editorial DROP nombre');
        $this->addSql('ALTER TABLE libros DROP FOREIGN KEY FK_B7E5AFE6BAF1A24D');
        $this->addSql('DROP INDEX IDX_B7E5AFE6BAF1A24D ON libros');
        $this->addSql('ALTER TABLE libros DROP editorial_id');
    }
}
