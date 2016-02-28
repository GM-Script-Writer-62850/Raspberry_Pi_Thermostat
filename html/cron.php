<?php
	if(!isset($_POST['cron']))
		die();
	if(json_decode($_POST['cron'])===null)
		echo "That is not JSON:\n".$_POST['cron'];
	else{
		$f=fopen("cron.json","w");
		fwrite($f,$_POST['cron']);
		fclose($f);
		echo "OK";
	}
?>
