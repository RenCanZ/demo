<?php
	define('TOKEN','rencanzhang');
	function checksignature ()
	{
		$signature=$_GET['signature'];//微信加密签名
		$timestamp=$_GET['timestamp'];//时间戳
		$nonce=$_GET['nonce'];//随机数
		//将TOKEN  timestamp  nonce 放置在数组里 做排序
		$dataArray=array($nonce,$timestamp,TOKEN);
		//排序 SORT_STRING 加快排序
		sort($dataArray,SORT_STRING);
		//把数组转换为字符串
		$str=implode($dataArray);
		//sha1加密
		$str=sha1($str);
		//对比参数
		if($str==$signature){
			return true;//请求的确来自于微信服务器
		}else{
			return false;//请求不是来自于微信服务器
		}
	}

	//网址接入
	if(checksignature()){
		//获取echostr 随机字符串
		$echostr=$_GET['echostr'];
		if($echostr){
			echo $echostr;//网址接入成功 成为开发者 
			exit;
		}
	}

	//获取微信后台服务器发送的消息 xml数据包  $HTTP_RAW_POST_DATA 获取用户发送的xml数据包
	$data = $HTTP_RAW_POST_DATA;
	if(!$data) {
		echo 'error';
		exit;
	}

	//业务逻辑处理
	//解析用户发送的xml数据包 获取ToUserName-》当做回复的发送方 FromUserName=》当做回复消息的接收方  Content=》当做回复的消息 
	$object = simplexml_load_string($data,'SimpleXMLElement',LIBXML_NOCDATA);
	$ToUserName = $object -> ToUserName;//当做回复消息的发送方
	$FromUserName = $object -> FromUserName;//当做回复消息的接收方
	$MsgType = $object -> MsgType;//用户发送的消息类型
	switch($MsgType) {
		case 'image':
			$Content = $object -> MediaId;
			$replyMsg = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[image]]></MsgType>
							<Image>
							<MediaId><![CDATA[%s]]></MediaId>
							</Image>
						</xml>";
			break;
			//语音消息交互
			case 'voice':
			//获取用户发送的语音消息
			$Content = $object -> MediaId;
			//封装回复的xml数据包
			$replyMsg = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[voice]]></MsgType>
							<Voice>
							<MediaId><![CDATA[%s]]></MediaId>
							</Voice>
						</xml>";
			break;
			//图文消息的交互
			case 'text':
			//接收用户发送的消息
			$Content = $object -> Content;
			//业务逻辑处理
			if($Content == 1) {				
				$dataarr = array(
							array(
								"Title" => "xxx",//标题
								"Description" => 'this is test',//描述
								"PicUrl" => 'https://img30.360buyimg.com/mobilecms/s140x140_jfs/t13804/159/2066981344/272858/5b9f4558/5a31f5e4N284ce5e1.jpg!q90.webp',//图片链接地址
								"Url" => 'https://www.jd.com'
								),
							array(
								"Title" => "xxx1",//标题
								"Description" => 'this is test1',//描述
								"PicUrl" => 'https://img12.360buyimg.com/mobilecms/s110x110_jfs/t16702/106/2097893283/457361/637a5f28/5ae52afbN551e7b54.jpg!q90!cc_110x110.webp',//图片链接地址
								"Url" => 'https://www.jd.com'
								)
						  );
				$str = "";
				//遍历数组 给item标签赋值
				foreach($dataarr as $key => $value){
					$str .= "<item>
						 		<Title><![CDATA[".$value['Title']."]]></Title> 
						 		<Description><![CDATA[".$value['Description']."]]></Description>
						 		<PicUrl><![CDATA[".$value['PicUrl']."]]></PicUrl>
						 		<Url><![CDATA[".$value['Url']."]]></Url>
				 			</item>";
				}
				//回复的图文的xml数据包
				$replyMsg = "<xml>
								<ToUserName><![CDATA[%s]]></ToUserName>
								<FromUserName><![CDATA[%s]]></FromUserName>
								<CreateTime>%s</CreateTime>
								<MsgType><![CDATA[news]]></MsgType>
								<ArticleCount>".count($dataarr)."</ArticleCount>
								<Articles>".$str."</Articles>
							</xml>";
			}elseif($Content==2){
				//回复2对应得图文消息
				//把 Title Description PicUrl Url 放置在数组里
				$dataarr=array(
							array(
								"Title"=>"xxx3",//标题
								"Description"=>'this is test',//描述
								"PicUrl"=>'https://img12.360buyimg.com/mobilecms/s350x250_jfs/t24256/65/1898765607/97180/a9ab709/5b6c298eN9df0b50e.jpg!q90!cc_350x250.webp',//图片链接地址
								"Url"=>'https://www.jd.com'
								),
							array(
								"Title"=>"xxx4",//标题
								"Description"=>'this is test1',//描述
								"PicUrl"=>'https://img12.360buyimg.com/mobilecms/s110x110_jfs/t16702/106/2097893283/457361/637a5f28/5ae52afbN551e7b54.jpg!q90!cc_110x110.webp',//图片链接地址
								"Url"=>'https://www.jd.com'
								)
						  );
				$str="";
				//遍历数组 给item标签赋值
				foreach($dataarr as $key=>$value) {
					$str.="<item>
						 		<Title><![CDATA[".$value['Title']."]]></Title> 
						 		<Description><![CDATA[".$value['Description']."]]></Description>
						 		<PicUrl><![CDATA[".$value['PicUrl']."]]></PicUrl>
						 		<Url><![CDATA[".$value['Url']."]]></Url>
				 			</item>";
				}
				//回复的图文的xml数据包
				$replyMsg="<xml>
					<ToUserName><![CDATA[%s]]></ToUserName>
					<FromUserName><![CDATA[%s]]></FromUserName>
					<CreateTime>%s</CreateTime>
					<MsgType><![CDATA[news]]></MsgType>
					<ArticleCount>".count($dataarr)."</ArticleCount>
					<Articles>".$str."</Articles>
				</xml>";	
		}elseif($Content == "笑话") {
			//1.初始化curl
			$cn = curl_init();
			$url = "http://www.kuitao8.com/api/joke";
			//2.设置传输选项
			curl_setopt($cn,CURLOPT_URL,$url);
			// CURLOPT_RETURNTRANSFER 数据以文件流的方式返回 不是以页面格式
			curl_setopt($cn,CURLOPT_RETURNTRANSFER,1);
			//3.执行curl
			$res = curl_exec($cn);
			curl_close($cn);
			// echo $res;
			$arr = json_decode($res,true);
			$Content = $arr['content'];
			$replyMsg="<xml> 
						<ToUserName><![CDATA[%s]]></ToUserName>
						<FromUserName><![CDATA[%s]]></FromUserName>
						<CreateTime>%s</CreateTime>
						<MsgType><![CDATA[text]]></MsgType>
						<Content><![CDATA[%s]]></Content>	
				     </xml>";
		}else{
			$Content="感谢您的关注,后期我们将会继续更新信息";
			//回复xml数据包
			$replyMsg="<xml> 
						<ToUserName><![CDATA[%s]]></ToUserName>
						<FromUserName><![CDATA[%s]]></FromUserName>
						<CreateTime>%s</CreateTime>
						<MsgType><![CDATA[text]]></MsgType>
						<Content><![CDATA[%s]]></Content>	
				  </xml>";
	}
	}
	$res = sprintf($replyMsg,$FromUserName,$ToUserName,time(),$Content);
	echo $res;