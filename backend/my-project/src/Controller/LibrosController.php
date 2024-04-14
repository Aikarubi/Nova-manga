<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Libros;
use App\Entity\Editorial;
use App\Entity\Autor;

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

            $autor = $libro->getAutor();
            $editorial = $libro->getEditorial();

            $data[] = [
                'isbn' => $libro->getIsbn(),
                'nombre' => $libro->getNombre(),
                'precio' => $libro->getPrecio(),
                'descripcion' => $libro->getDescripcion(),
                'tamanyo' => $libro->getTamanyo(),
                'paginas' => $libro->getPaginas(),
                'portada' => $libro->getPortada(),
                'fecha_venta' => $libro->getFechaVenta(),
                'autor' => $autor ? [
                    'id' => $autor->getId(),
                    'nombre' => $autor->getNombre(),
                    // Agrega otras propiedades del autor que necesites
                ] : null,
                'editorial' => $editorial ? [
                    'id' => $editorial->getId(),
                    'nombre' => $editorial->getNombre(),
                    // Agrega otras propiedades de la editorial que necesites
                ] : null,
            ];
        }

        return $this->json($data);
    }

    #[Route('/libros/{isbn}', name: 'app_unLibro', methods: ['GET'])]
    public function unLibro(ManagerRegistry $doctrine, string $isbn): JsonResponse {

        $libro = $doctrine->getRepository(Libros::class)->find($isbn);

        if (!$libro) {
            return $this->json('Libro no encontrado para el ISBN ' . $isbn, 404);
        }

        $fechaVenta = $libro->getFechaVenta();

        // Formatea la fecha de venta como "YYYY-MM-DD"
        $fechaVentaFormateada = $fechaVenta ? $fechaVenta->format('Y-m-d') : null;

        $data = [
            'isbn' => $libro->getIsbn(),
            'nombre' => $libro->getNombre(),
            'precio' => $libro->getPrecio(),
            'descripcion' => $libro->getDescripcion(),
            'tamanyo' => $libro->getTamanyo(),
            'paginas' => $libro->getPaginas(),
            'portada' => $libro->getPortada(),
            'fecha_venta' => $fechaVentaFormateada,
            'autor' => $libro->getAutor() ? [
                'id' => $libro->getAutor()->getId(),
                'nombre' => $libro->getAutor()->getNombre(),
                // Agrega otras propiedades del autor que necesites
            ] : null,
            'editorial' => $libro->getEditorial() ? [
                'id' => $libro->getEditorial()->getId(),
                'nombre' => $libro->getEditorial()->getNombre(),
                // Agrega otras propiedades de la editorial que necesites
            ] : null,
            ];

        return $this->json($data);
    }





    #[Route('/insert/libros', name: 'app_insertLibros', methods: ['POST'])]
    public function insertLibros(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        // Obtenemos las entidades Autor y Editorial a partir de las IDs
        $autor = $entityManager->getRepository(Autor::class)->find($data['autor_id']);
        $editorial = $entityManager->getRepository(Editorial::class)->find($data['editorial_id']);

        $libro = new Libros();
        $libro->setIsbn($data['isbn']);
        $libro->setNombre($data['nombre']);
        $libro->setPrecio($data['precio']);
        $libro->setDescripcion($data['descripcion']);
        $libro->setTamanyo($data['tamanyo']);
        $libro->setPaginas($data['paginas']);
        $libro->setPortada($data['portada']);
        $libro->setFechaVenta(new \DateTime($data['fecha_venta']));
        $libro->setEditorial($editorial);
        $libro->setAutor($autor);

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

    #[Route('/update/libros/{isbn}', name: 'app_updateLibros', methods: ['PUT', 'PATCH'])]
    public function updateLibros(ManagerRegistry $doctrine, Request $request, string $isbn): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $libro = $entityManager->getRepository(Libros::class)->findOneBy(['isbn' => $isbn]);

        if (!$libro) {
            return $this->json('User not found for ISBN ' . $isbn, 404);
        }

        $data = json_decode($request->getContent(), true);

        // Obtenemos las entidades Autor y Editorial a partir de las IDs si están presentes en los datos enviados
        $editorialId = $data['editorial_id'] ?? null;
        $autorId = $data['autor_id'] ?? null;

        if ($editorialId) {
            $editorial = $entityManager->getRepository(Editorial::class)->find($editorialId);
            if (!$editorial) {
                return $this->json('Editorial no encontrada para el ID ' . $editorialId, 404);
            }
            $libro->setEditorial($editorial);
        }

        if ($autorId) {
            $autor = $entityManager->getRepository(Autor::class)->find($autorId);
            if (!$autor) {
                return $this->json('Autor no encontrado para el ID ' . $autorId, 404);
            }
            $libro->setAutor($autor);
        }

        $libro->setIsbn($data['isbn'] ?? $libro->getIsbn());
        $libro->setNombre($data['nombre'] ?? $libro->getNombre());
        $libro->setPrecio($data['precio'] ?? $libro->getPrecio());
        $libro->setDescripcion($data['descripcion'] ?? $libro->getDescripcion());
        $libro->setTamanyo($data['tamanyo'] ?? $libro->getTamanyo());
        $libro->setPaginas($data['paginas'] ?? $libro->getPaginas());
        $libro->setPortada($data['portada'] ?? $libro->getPortada());
        $libro->setFechaVenta(new \DateTime($data['fecha_venta'] ?? $libro->getFechaVenta()));

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
            'editorial_id' => $libro->getEditorial() ? $libro->getEditorial()->getId() : null,
            'autor_id' => $libro->getAutor() ? $libro->getAutor()->getId() : null
        ];

        return $this->json($responseData);
    }

    #[Route('/delete/libros/{isbn}', name: 'app_deleteLibros', methods: ['DELETE'])]
    public function deleteLibros(ManagerRegistry $doctrine, string $isbn): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $libro = $entityManager->getRepository(Libros::class)->find($isbn);

        if (!$libro) {
            return $this->json('Libro no encontrado para el ISBN ' . $isbn, 404);
        }

        $entityManager->remove($libro);
        $entityManager->flush();

        return $this->json('Libro eliminado correctamente, con el ISBN ' . $isbn);
    }
}
