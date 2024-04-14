<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Autor;

class AutorController extends AbstractController
{
    #[Route('/autor', name: 'app_autor', methods: ['GET'])]
    public function listadoAutor(ManagerRegistry $doctrine): JsonResponse
    {
        $autores = $doctrine
            ->getRepository(Autor::class)
            ->findAll();

        $data = [];

        foreach ($autores as $autor) {
            $data[] = [
                'id' => $autor->getId(),
                'nombre' => $autor->getNombre(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/autores/{id}', name: 'app_unAutor', methods: ['GET'])]
    public function unAutor(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $autor = $doctrine->getRepository(Autor::class)->find($id);

        if (!$autor) {
            return $this->json('Autor no encontrado para el ID ' . $id, 404);
        }

        $data = [
            'id' => $autor->getId(),
            'nombre' => $autor->getNombre(),
            // Puedes agregar otras propiedades del autor aquí si las necesitas
        ];

        return $this->json($data);
    }

    #[Route('/insert/autores', name: 'app_insertAutor', methods: ['POST'])]
    public function insertAutor(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $autor = new Autor();
        $autor->setNombre($data['nombre']);

        $entityManager->persist($autor);
        $entityManager->flush();

        $responseData = [
            'id' => $autor->getId(),
            'nombre' => $autor->getNombre(),
            // Puedes agregar otras propiedades del autor aquí si las necesitas
        ];

        return new JsonResponse($responseData);
    }

    #[Route('/update/autores/{id}', name: 'app_updateAutor', methods: ['PUT', 'PATCH'])]
    public function updateAutor(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $autor = $entityManager->getRepository(Autor::class)->find($id);

        if (!$autor) {
            return $this->json('Autor not found for ID ' . $id, 404);
        }

        $data = json_decode($request->getContent(), true);

        $autor->setNombre($data['nombre'] ?? $autor->getNombre());
        // Puedes agregar otras propiedades que desees actualizar aquí

        $entityManager->flush();

        $responseData = [
            'id' => $autor->getId(),
            'nombre' => $autor->getNombre(),
            // Agrega otras propiedades actualizadas si es necesario
        ];

        return $this->json($responseData);
    }

    #[Route('/delete/autores/{id}', name: 'app_deleteAutor', methods: ['DELETE'])]
    public function deleteAutor(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $autor = $entityManager->getRepository(Autor::class)->find($id);

        if (!$autor) {
            return $this->json('Autor not found for ID ' . $id, 404);
        }

        $entityManager->remove($autor);
        $entityManager->flush();

        return $this->json('Autor eliminado correctamente, con el ID ' . $id);
    }
}
