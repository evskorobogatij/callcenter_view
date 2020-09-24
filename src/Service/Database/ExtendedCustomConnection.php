<?php


namespace App\Service\Database;


use Doctrine\Common\EventManager;
use Doctrine\DBAL\Configuration;
use Doctrine\DBAL\Connection as Connection;
use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\Driver;
use Symfony\Component\Yaml\Yaml;

class ExtendedCustomConnection extends Connection
{

    public function __construct(array $params, Driver $driver, ?Configuration $config = null, ?EventManager $eventManager = null)
    {

        try{
            $config_f = Yaml::parseFile(__DIR__.'/../../../config.yaml');
            $params['dbname'] = $config_f['connections']['db'];
            $params['host'] = $config_f['connections']['address'];
            $params['port'] = $config_f['connections']['port'];
            $params['user'] = $config_f['connections']['username'];
            $params['password'] = $config_f['connections']['password'];
        } catch (\Throwable $throwable){

        }

        parent::__construct($params, $driver, $config, $eventManager);
    }

    public function changeDatabase(){


        try{
            if ($this->isConnected())
                $this->close();

            $config_f = Yaml::parseFile(__DIR__.'/../../../config.yaml');
            $params['dbname'] = $config_f['connections']['db'];
            $params['host'] = $config_f['connections']['address'];
            $params['port'] = $config_f['connections']['port'];
            $params['user'] = $config_f['connections']['username'];
            $params['password'] = $config_f['connections']['password'];
        } catch (\Throwable $throwable){

        }


        try {
            parent::__construct(
                $params,
                $this->_driver,
                $this->_config,
                $this->_eventManager
            );
        } catch (\Throwable $e) {
            return $e->getMessage();
        }
    }
}