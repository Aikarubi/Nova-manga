<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Acceso;
use Doctrine\Persistence\ManagerRegistry;

class AccesoController extends AbstractController
{
    #[Route('/acceso', name: 'app_acceso', methods: ['POST'])]
    public function verificarAcceso(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $claveIngresada = $data['clave']; // Suponiendo que estás enviando la clave desde el frontend

        $acceso = $doctrine->getRepository(Acceso::class)->findOneBy(['id' => 1]);

        if (!$acceso) {
            return $this->json(['error' => 'Acceso no encontrado'], 404);
        }

        $claveAlmacenada = $acceso->getClave();

        $accesoValido = ($claveIngresada === $claveAlmacenada);

        return $this->json(['accesoValido' => $accesoValido]);
    }
}
