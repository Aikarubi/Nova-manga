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
}
