<?php 

session_start();
$code = isset($_REQUEST['code']) ? $_REQUEST['code'] : '';
$appid = "wx1138cef2bc6db0bb";
$secret = "82cde8f7cdd86ad22d1bd04c1346815b";
$url = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code";
$res = requestUrl($url);

$res = json_decode($res,true);

$openid = $res['openid'];

require('./users.php');

$user = new Users();

$res = $user->add($openid);

echo $res;

echo session_id();



function requestUrl($url='')
	{	

		if(empty($url)){
			return false;
		}

		$ch = curl_init();

		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false); 

	    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);

		$res = curl_exec($ch);

		curl_close($ch);

		return $res;
	}

 ?>