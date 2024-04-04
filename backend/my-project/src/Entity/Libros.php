<?php

namespace App\Entity;

use App\Repository\LibrosRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LibrosRepository::class)]
class Libros
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $isbn = null;

    #[ORM\Column(name: "nombre", type: "string", length: 255, nullable: false)]
    private string $nombre;

    #[ORM\Column(name: "precio", type: "float", nullable: false)]
    private float $precio;

    #[ORM\Column(name: "descripcion", type: "text", nullable: false)]
    private string $descripcion;

    #[ORM\Column(name: "tamanyo", type: "string", length: 255, nullable: false)]
    private string $tamanyo;

    #[ORM\Column(name: "paginas", type: "integer", nullable: false)]
    private int $paginas;

    #[ORM\Column(name: "fecha_venta", type: "date", nullable: false)]
    private \DateTimeInterface $fechaVenta;

    #[ORM\ManyToOne(targetEntity: Editorial::class, inversedBy: 'libros')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Editorial $editorial = null;

    #[ORM\ManyToOne(targetEntity: Autor::class, inversedBy: 'libros')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Autor $autor = null;

    public function getIsbn(): ?int
    {
        return $this->isbn;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setPrecio(float $precio): self
    {
        $this->precio = $precio;

        return $this;
    }

    public function getPrecio(): ?float
    {
        return $this->precio;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setTamanyo(string $tamanyo): self
    {
        $this->tamanyo = $tamanyo;

        return $this;
    }

    public function getTamanyo(): ?string
    {
        return $this->tamanyo;
    }

    public function setPaginas(int $paginas): self
    {
        $this->paginas = $paginas;

        return $this;
    }

    public function getPaginas(): ?int
    {
        return $this->paginas;
    }

    public function setFechaVenta(\DateTimeInterface $fechaVenta): self
    {
        $this->fechaVenta = $fechaVenta;

        return $this;
    }

    public function getFechaVenta(): ?\DateTimeInterface
    {
        return $this->fechaVenta;
    }

    public function getEditorial(): ?Editorial
    {
        return $this->editorial;
    }

    public function setEditorial(?Editorial $editorial): self
    {
        $this->editorial = $editorial;

        return $this;
    }

    public function getAutor(): ?Autor
    {
        return $this->autor;
    }

    public function setAutor(?Autor $autor): self
    {
        $this->autor = $autor;

        return $this;
    }
}
