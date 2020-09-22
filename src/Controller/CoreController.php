<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

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

}
