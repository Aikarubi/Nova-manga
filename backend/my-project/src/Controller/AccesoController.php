<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Acceso;
use Doctrine\Persistence\ManagerRegistry;

class AccesoController extends AbstractController
{
    #[Route('/acceso/{id}', name: 'app_acceso', methods: ['POST'])]
    public function verificarAcceso(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $acceso = $doctrine->getRepository(Acceso::class)->findOneBy(['id' => 1]);

        if (!$acceso) {
            return $this->json('Acceso no encontrado para el ID ' . $id, 404);
        }

        $clave = $acceso->getClave();

        return $this->json(['clave' => $clave]);
    }
}
