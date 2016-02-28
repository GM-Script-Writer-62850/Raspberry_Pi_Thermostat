<?php
	$json=(object)array();
	if(isset($_POST['update']))
		unset($_POST['update']);
	foreach($_POST as $key => $val)
		$json->{$key}=is_numeric($val)?(float)$val:$val;
	$f=fopen("config.json","w");
	$json=json_encode($json);
	fwrite($f,$json);
	fclose($f);
	echo $json;
?>
