<?php
	$sid = $_REQUEST['sid'];
	session_id($sid);
	session_start();	
	if(isset($_SESSION['str'])) {
		echo json_encode($_SESSION['str']);
	}else{
		echo '';
	}