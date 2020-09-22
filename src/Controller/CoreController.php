<?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Flex\Configurator\EnvConfigurator;

class CoreController extends AbstractController
{

    //     * @Route("/{reactRouting}", name="core", requirements={"reactRouting"="^(?!api).+"}, defaults={"reactRouting": null})
    //
    /**
     * @Route("/")
     */
    public function index()
    {
        return $this->render('core/index.html.twig', [
            'controller_name' => 'CoreController',
        ]);
    }

    /**
     * @Route("/install")
     * @return string
     */
    public function install(){
        return $this->render('core/install.html.twig',[]);
    }

    /**
     * @Route("/config/set_config")
     * @param Request $request
     * @return JsonResponse
     */
    public function set_config(Request $request,Connection $connection):JsonResponse{


//        $params = array_merge($request->query->all(),$request->request->all() );
        $data = json_decode($request->getContent(), true);

        $db_type=$data['db_type'];
        $db=$data['db'];
        $address=$data['address'];
        $port=$data['port'];
        $username=$data['username'];
        $password=$data['password'];

        $dotenv = new Dotenv();


        $db_path="$db_type://$username:$password@$address:$port/$db";
        $_ENV['DATABASE_URL'] = $db_path;
        $dotenv->overload(__DIR__.'/../../.env');

        $connection->close();
        $connection->connect();
        $ping=$connection->ping();

        return $this->json([
                'ping' => $ping,
                'attr' => $data,
                '$db_type' => $db_type,
//                '$db_path' =>$db_path,
                'env' => $_ENV
            ]);
    }
}
