<?php

namespace App\Controller;

use App\Repository\CallsRepository;
use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiCoreController
 * @package App\Controller
 * @Route("/api")
 */
class ApiCoreController extends AbstractController
{

    /**
     * @Route("/calls_list/{date}")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function call_list($date, CallsRepository $callsRepository, Connection $connection):JsonResponse{

        $data = $callsRepository->calls_list($date);

        return $this->json($data);
    }

    /**
     * @Route("/not_answer_agents/{date}")
     * @param $date
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function not_answer_agents($date,CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->not_answer($date);
        return $this->json($data);
    }

    /**
     * @Route("/work_state/{date}")
     * @param $date
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    function work_state($date,CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->work_state($date);
        return $this->json($data);
    }

    /**
     * @Route("/calls_summary/{date}")
     * @param $date
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function calls_summary($date,CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->calls_summary($date);
        return $this->json($data);
    }

    /**
     * @Route("/agents")
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function agents(CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->agents();
        return $this->json($data);
    }

    /**
     * @Route("/day_distribution/{date}")
     * @param $date
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function day_distribution($date,CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->day_distribution($date);
        return $this->json($data);
    }

    /**
     * @Route("/call_detail/{call}", requirements={"call"="\d+\_\d+"})
     * @param $call
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function call_detail($call,CallsRepository $callsRepository):JsonResponse{
        $d_call = str_replace('_','.',$call);
        $data = $callsRepository->call_detail($d_call);
        return $this->json($data);
    }

    /**
     * @Route("/did_log")
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function did_log(CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->did_log();
        return $this->json($data);
    }

    /**
     * @Route("/answered_calls_log")
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function answered_calls_log(CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->answered_calls_log();
        return $this->json($data);
    }

    /**
     * @Route("/abandon_calls_log")
     * @param CallsRepository $callsRepository
     * @return JsonResponse
     */
    public function abandon_calls_log(CallsRepository $callsRepository):JsonResponse{
        $data = $callsRepository->abandon_calls_log();
        return $this->json($data);
    }
}
