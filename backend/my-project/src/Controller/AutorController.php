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
}
