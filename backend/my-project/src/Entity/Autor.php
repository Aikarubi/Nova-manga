<?php
namespace App\Entity;

use App\Repository\AutorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AutorRepository::class)]
class Autor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $nombre;

    #[ORM\OneToMany(mappedBy: "autor", targetEntity: Libros::class)]
    private Collection $libros;

    public function __construct()
    {
        $this->libros = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    // Getter para libros
    public function getLibros(): Collection
    {
        return $this->libros;
    }
}
