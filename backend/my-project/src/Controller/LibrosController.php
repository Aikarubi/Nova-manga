<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Libros;

class LibrosController extends AbstractController
{
    #[Route('/libros', name: 'app_libros', methods: ['GET'])]
    public function listadoLibros(ManagerRegistry $doctrine): JsonResponse
    {
        $libros = $doctrine
            ->getRepository(Libros::class)
            ->findAll();
        
        $data = [];

        foreach ($libros as $libro) {
            $data[] = [
                'isbn' => $libro->getIsbn(),
                'nombre' => $libro->getNombre(),
                'precio' => $libro->getPrecio(),
                'descripcion' => $libro->getDescripcion(),
                'tamanyo' => $libro->getTamanyo(),
                'paginas' => $libro->getPaginas(),
                'portada' => $libro->getPortada(),
                'fecha_venta' => $libro->getFechaVenta(),
            ];
        }

        return $this->json($data);
    }
}
