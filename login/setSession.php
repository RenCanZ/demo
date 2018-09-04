<?php
	$sid = $_REQUEST['sid'];
	session_id($sid);
	session_start();	
	if(isset($_SESSION['str'])) {
		array_push($_SESSION['str'],$_REQUEST['str']);		
	}else{
		$_SESSION['str'][] = $_REQUEST['str'];	
	}	