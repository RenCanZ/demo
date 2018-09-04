<?php
	$openid = $_REQUEST['openid'];
	$user = 'root';
	$password = '123456';
	$dsn = 'mysql:host=localhost;dbname=wx;charset=utf8';
	$model = new Model($dsn,$user,$password);
	class Model
	{
		public function __construct ($dsn,$user,$password)
		{
			try{
				$pdo = new PDO($dsn,$user,$password);
				return $pdo;
			}catch(PDOException $e) {
				die ("Error!: " . $e->getMessage() . "<br/>");
			}
		}
		public function add($openid)
		{
			$sql = "INSERT INTO users (openid) VALUE($openid)";
			$res = $pdo ->  query($sql);
			if($res -> rowCount()) {
				echo 1;
			}
		}
	}