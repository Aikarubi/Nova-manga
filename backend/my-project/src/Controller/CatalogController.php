<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Libros; 
use DateTime;

class CatalogController extends AbstractController
{
    #[Route('/catalog', name: 'app_catalog', methods: ['GET'])]
    public function search(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener el término de búsqueda del parámetro 'query'
        $searchTerm = $request->query->get('query');

        // Si no se proporciona ningún término de búsqueda, devolver un error
        if (!$searchTerm) {
            return new JsonResponse(['error' => 'Debe proporcionar un término de búsqueda'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Realizar la búsqueda de libros en base al término de búsqueda
        $query = $entityManager->createQueryBuilder()
            ->select('l')
            ->from(Libros::class, 'l')
            ->where('l.nombre LIKE :searchTerm')
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->getQuery();

        // Obtener los resultados de la consulta
        $libros = $query->getResult();

        // Construir la respuesta JSON con los libros encontrados
        $resultados = [];
        foreach ($libros as $libro) {
            $resultados[] = [
                'isbn' => $libro->getIsbn(),
                'nombre' => $libro->getNombre(),
                'precio' => $libro->getPrecio(),
                'portada' => $libro->getPortada(),
                // Agregar más propiedades según sea necesario
            ];
        }

        // Devolver la respuesta JSON con los resultados de la búsqueda
        return new JsonResponse($resultados);
    }

    #[Route('/novedades', name: 'novedades', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener la fecha actual
        $fechaActual = new DateTime();

        // Obtener las novedades más recientes hasta la fecha de hoy
        $repository = $entityManager->getRepository(Libros::class);
        $novedades = $repository->createQueryBuilder('l')
            ->where('l.fechaVenta <= :fechaActual')
            ->setParameter('fechaActual', $fechaActual)
            ->orderBy('l.fechaVenta', 'DESC')
            ->setMaxResults(3) // Obtener solo los 3 libros más recientes
            ->getQuery()
            ->getResult();

        // Transformar los resultados en un array asociativo
        $novedadesArray = [];
        foreach ($novedades as $libro) {
            $novedadesArray[] = [
                'nombre' => $libro->getNombre(),
                'precio' => $libro->getPrecio(),
                'portada' => $libro->getPortada(),
                'isbn' => $libro->getIsbn(),
                // Agrega más campos según sea necesario
            ];
        }

        // Devolver los datos como respuesta JSON
        return new JsonResponse([
            'fechaActual' => $fechaActual->format('Y-m-d'), // Formatear la fecha actual
            'novedades' => $novedadesArray,
        ]);
    }

}
