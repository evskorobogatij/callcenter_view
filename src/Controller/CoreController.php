<?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DBALException;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Yaml\Yaml;

class CoreController extends AbstractController
{

    //     * @Route("/{reactRouting}", name="core", requirements={"reactRouting"="^(?!api).+"}, defaults={"reactRouting": null})
    //
    /**
     * @Route("/", name="home")
     */
    public function index(LoggerInterface $logger)
    {
        $logger->info(__DIR__.'/../../config.yaml');
        $logger->info(stream_resolve_include_path(__DIR__.'/../../config.yaml'));
        if (stream_resolve_include_path(__DIR__.'/../../config.yaml')){
            return $this->render('core/index.html.twig', [
                'controller_name' => 'CoreController',
            ]);
        } else {
            return $this->redirectToRoute("install");
        }

    }

    /**
     * @Route("/install", name="install")
     * @return string
     */
    public function install(){
        if (!stream_resolve_include_path(__DIR__.'/../../config.yaml')){
            return $this->render('core/install.html.twig',[]);
        } else {
            return $this->redirectToRoute("home");
        }

    }

    /**
     * @Route("/config/set_config")
     * @param Request $request
     * @return JsonResponse
     */
    public function set_config(Request $request,Connection $connection):JsonResponse{
        $data = json_decode($request->getContent(), true);
        $db_type=$data['db_type'];
//        $db=$data['db'];
//        $address=$data['address'];
//        $port=$data['port'];
//        $username=$data['username'];
//        $password=$data['password'];

        $config = [
            'connections' => $data
        ];

        $yaml_config = Yaml::dump($config);

        file_put_contents(__DIR__.'/../../config.yaml', $yaml_config);

        $err = '';
        try {
            $err = $connection->changeDatabase();
        } catch (\Throwable  $t){
            $err = $t->getMessage();
        }

        try {
            $connection->ping();
        } catch (DBALException $exception){
            $err = $exception->getMessage();
        }
        $connected = $connection->isConnected();

        return $this->json([
                'connected' => $connected,
                'error' => mb_convert_encoding($err, 'UTF-8', 'UTF-8')
            ]);
    }
}
