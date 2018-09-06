<?php
$url = 'http://192.168.1.185/wechat/save_customers.php';
$data = 1;
	$ch = curl_init($url);
			
			curl_setopt($ch,CURLOPT_POST,1);
			curl_setopt($ch,CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch,CURLOPT_HEADER, 0);
			if(substr($url,5) == 'https') {
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
			}
			curl_setopt($ch, CURLOPT_TIMEOUT, 10);
			$output = curl_exec($ch);
			curl_close($ch);
			return $output;