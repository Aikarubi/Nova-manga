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
    // Definición de la ruta y método del controlador
    #[Route('/acceso', name: 'app_acceso', methods: ['POST'])]
    public function verificarAcceso(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        // Decodificar el contenido JSON de la solicitud
        $data = json_decode($request->getContent(), true);
        $claveIngresada = $data['clave'];

        // Obtener el objeto Acceso por su id desde la base de datos
        $acceso = $doctrine->getRepository(Acceso::class)->findOneBy(['id' => 1]);

        // Verificar si se encontró el objeto Acceso
        if (!$acceso) {
            return $this->json(['error' => 'Acceso no encontrado'], 404);
        }

        $claveAlmacenada = $acceso->getClave();

        // Comparar la clave ingresada con la clave almacenada
        $accesoValido = ($claveIngresada === $claveAlmacenada);

        return $this->json(['accesoValido' => $accesoValido]);
    }
}
