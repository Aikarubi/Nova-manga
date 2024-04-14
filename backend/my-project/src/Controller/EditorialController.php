<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Editorial;

class EditorialController extends AbstractController
{
    #[Route('/editorial', name: 'app_editorial', methods: ['GET'])]
    public function listadoeditorial(ManagerRegistry $doctrine): JsonResponse
    {
        $editoriales = $doctrine
            ->getRepository(Editorial::class)
            ->findAll();

        $data = [];

        foreach ($editoriales as $editorial) {
            $data[] = [
                'id' => $editorial->getId(),
                'nombre' => $editorial->getNombre(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/editoriales/{id}', name: 'app_getEditorialById', methods: ['GET'])]
    public function getEditorialById(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $editorial = $doctrine->getRepository(Editorial::class)->find($id);

        if (!$editorial) {
            return $this->json('Editorial not found for ID ' . $id, 404);
        }

        $data = [
            'id' => $editorial->getId(),
            'nombre' => $editorial->getNombre(),
            // Agrega otras propiedades de la editorial que necesites
        ];

        return $this->json($data);
    }

    #[Route('/insert/editoriales', name: 'app_insertEditorial', methods: ['POST'])]
    public function insertEditorial(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $editorial = new Editorial();
        $editorial->setNombre($data['nombre']);

        $entityManager->persist($editorial);
        $entityManager->flush();

        $responseData = [
            'id' => $editorial->getId(),
            'nombre' => $editorial->getNombre(),
            // Agrega otras propiedades de la editorial que necesites
        ];

        return new JsonResponse($responseData);
    }

    #[Route('/update/editoriales/{id}', name: 'app_updateEditorial', methods: ['PUT', 'PATCH'])]
    public function updateEditorial(ManagerRegistry $doctrine, Request $request, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $editorial = $entityManager->getRepository(Editorial::class)->find($id);

        if (!$editorial) {
            return $this->json('Editorial not found for ID ' . $id, 404);
        }

        $data = json_decode($request->getContent(), true);

        $editorial->setNombre($data['nombre'] ?? $editorial->getNombre());

        $entityManager->flush();

        $responseData = [
            'id' => $editorial->getId(),
            'nombre' => $editorial->getNombre(),
            // Agrega otras propiedades de la editorial que necesites
        ];

        return $this->json($responseData);
    }

    #[Route('/delete/editoriales/{id}', name: 'app_deleteEditorial', methods: ['DELETE'])]
    public function deleteEditorial(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $editorial = $entityManager->getRepository(Editorial::class)->find($id);

        if (!$editorial) {
            return $this->json('Editorial not found for ID ' . $id, 404);
        }

        $entityManager->remove($editorial);
        $entityManager->flush();

        return $this->json('Editorial eliminada correctamente, con el ID ' . $id);
    }
}
