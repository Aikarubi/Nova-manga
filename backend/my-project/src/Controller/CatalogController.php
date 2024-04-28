<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Libros; // Asegúrate de importar la entidad Libro
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;


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
}
