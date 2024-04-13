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

    #[Route('/insert/libros', name: 'app_insertLibros', methods: ['POST'])]
    public function insertLibros(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $libro = new Libros();
        $libro->setIsbn($data['isbn']);
        $libro->setNombre($data['nombre']);
        $libro->setPrecio($data['precio']);
        $libro->setDescripcion($data['descripcion']);
        $libro->setTamanyo($data['tamanyo']);
        $libro->setPaginas($data['paginas']);
        $libro->setPortada($data['portada']);
        $libro->setFechaVenta(new \DateTime($data['fecha_venta']));
        $libro->setEditorial($data['editorial_id']);
        $libro->setAutor($data['autor_id']);

        $entityManager->persist($libro);
        $entityManager->flush();

        $responseData = [
            'isbn' => $libro->getIsbn(),
            'nombre' => $libro->getNombre(),
            'precio' => $libro->getPrecio(),
            'descripcion' => $libro->getDescripcion(),
            'tamanyo' => $libro->getTamanyo(),
            'paginas' => $libro->getPaginas(),
            'portada' => $libro->getPortada(),
            'fecha_venta' => $libro->getFechaVenta(),
            'editorial_id' => $libro->getEditorial()->getId(),
            'autor_id' => $libro->getAutor()->getId()

        ];

        return new JsonResponse($responseData);

    }
}
