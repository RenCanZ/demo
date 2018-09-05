<?php
	include_once "./wxBizDataCrypt.php";
	$user = 'root';
	$password = '123456';
	$dsn = 'mysql:host=localhost;dbname=wx;charset=utf8';
	$appid = 'wx1737f8d55ae0d897';
	$openid = $_REQUEST['openid'];
	$model = new Model();
	$pdo = $model -> getConnect($dsn,$user,$password);
	switch($_REQUEST['update']) {
		case 'insert':	
			$res = $model -> login($openid,$pdo);
			var_dump($res);
			break;
		case 'update':
			$avatarUrl = $_REQUEST['avatarUrl'];
			$city = $_REQUEST['city'];
			$nickName = $_REQUEST['nickName'];
			$province = $_REQUEST['province'];
			$res = $model -> update($openid,$nickName,$city,$avatarUrl,$province,$pdo);
			var_dump($res);
			break;
		case 'phone':			
			$sessionKey = $_REQUEST['session_key'];
			$encryptedData= $_REQUEST['encryptedData'];
			$iv = $_REQUEST['iv'];
			$pc = new WXBizDataCrypt($appid, $sessionKey);
			$errCode = $pc->decryptData($encryptedData, $iv, $data );
			if ($errCode == 0) {
				//print($data . "\n");
				$data = json_decode($data,true);
				$phone = $data['phoneNumber'];
				$res = $model -> phone($openid,$phone,$pdo);
				echo $phone;
			} else {
				print($errCode . "\n");
			}
			break;
		case 'select':
			$res = $model -> select($openid,$pdo);
			$phone = $res[0]['phone'];
			echo $phone;
			break;
	}
	
	class Model
	{
		public function add ($openid,$pdo)
		{
			$sql = "INSERT INTO users(openid) VALUES('$openid')";
			$row = $pdo -> exec($sql);
			$id = $pdo -> lastinsertid();
			if(!$id) {
				die('11');
				
			}
			return $id;
		}
		public function getConnect ($dsn,$user,$password)
		{
	 	 	try{
				$pdo = new PDO($dsn,$user,$password);
				return $pdo;
			}catch(PDOException $e) {
				die ("Error!: " . $e->getMessage() . "<br/>");
			}
			$pdo -> setAttribute(3,1);
	 	}
		public function select ($openid,$pdo) 
		{
			$sql = "SELECT * FROM users WHERE openid='$openid'";
			//echo $sql;
			$row = $pdo -> query($sql);
			$res = $row -> fetchAll(PDO::FETCH_ASSOC);
			return $res;
		}
		public function update ($openid,$nickName,$city,$avatarUrl,$province,$pdo)
		{
			$select = $this -> select($openid,$pdo);
			if($select) {
				$sql = "UPDATE users SET nickName='$nickName',city='$city',avatarUrl='$avatarUrl',province='$province' WHERE openid='$openid'";
				$row = $pdo -> exec($sql);
				return $row;				
			}
		}
		public function phone ($openid,$phone,$pdo)
		{
			$select = $this -> select($openid,$pdo);
			if($select) {
				$sql = "UPDATE users SET phone='$phone' WHERE openid='$openid'";
				$row = $pdo -> exec($sql);
				return $row;
			}
		}
		public function login ($openid,$pdo)
		{
			$select = $this -> select($openid,$pdo);
			if(!$select) {
				$res = $this -> add($openid,$pdo);
				if($res) {
					return $res;
				}
			}
			return $select;
		}
	}