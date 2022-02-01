<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<!--<meta name="ROBOTS" content="NOINDEX, NOFOLLOW"/>-->
		<title>Thermostat Activity Log</title>
		<link href="/favicon.png" rel="shortcut icon">
		<style type="text/css">
			body{
				font-family:DejaVu Serif;
				background:#383838;
				color:white;
				text-align:center;
			}
			td{
				text-align:left;
				font-family:monospace;
			}
			table{
				margin-left:auto;
				margin-right:auto;
			}
			.temp > span{
				display:none;
			}
			body.C .temp > .C,
			body.F .temp > .F,
			body.K .temp > .K{
				display:inline;
			}
			.date{
				text-align:right;
			}
			.delta{
				text-align:center;
			}
		</style>
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!--<link type="text/css" href="style.css" rel="stylesheet"/>-->
		<!--<script src="script.js" type="application/javascript"></script>-->
		<script type="application/javascript">
			function loaded(){
				var c=document.getElementsByClassName('note');
				for(var i=c.length-1;i>-1;i--){
					c[i].parentNode.previousElementSibling.childNodes[4].textContent="Settings Changed";
				}
			}
		</script>
		<!--[if lt IE 9]><link type="text/css" href="old_ie.css" rel="stylesheet"/><![endif]-->
	</head>
	<body class="F" onload="loaded()">Temperature Format:
		<select onchange="this.parentNode.className=this.value">
			<option value="F">Fahrenheit</option>
			<option value="C">Celsius</option>
			<option value="K">Kelvin</option>
		</select><br/>
		<table border="1"><thead><tr><th>Time</th><th>Duration</th><th>Temperature</th><th>Action</th><th>Note</th></tr></thead><tbody><?php
		$files=array_reverse(scandir('/tmp/log/'));
		foreach($files as $file){
			if($file=='.'||$file=='..')continue;
			$logs=array_reverse(explode("\n",file_get_contents("/tmp/log/$file")));
			$set=0;
			$time=0;
			foreach($logs as $log){
				if ($log=='') continue;
				echo "<tr>";
				$cells=explode(" ",$log);
				echo '<td class="date">'.date("g:i A m-d-Y",$cells[0])."</td>";
				if($time==0)
					echo '<td class="delta">TBD</td>';
				else{
					$delta=$time-$cells[0];
					echo '<td class="delta">'.sprintf('%02d:%02d:%02d', ($delta/ 3600),($delta/ 60 % 60), $delta% 60)."</td>";
				}
				echo '<td class="temp"><span class="F">'
					.((($cells[2]/1000)*(9/5))+32).'°F</span><span class="C">'.
					($cells[2]/1000).'°C</span><span class="K">'.
					(($cells[2]+273150)/1000).' K</span></td>';
				echo '<td class="act">';
				if ($cells[1]==0)
					echo "Cooling: ".($cells[3]==1?'A':'Ina').'ctive';
				else if ($cells[1]==1)
					echo "Heating: ".($cells[3]==0?'A':'Ina').'ctive'.($cells[3]==0?'; Auxillary: '.($cells[4]==0?'Off':'On'):'');
				else if ($cells[1]==2)
					echo "Copycat: ".($cells[3]==1?'Left':'Right').'; '.($cells[4]==1?'Left':'Right');
				echo "</td>";
				if($set==0||$set==$cells[5]){
					echo '<td>&nbsp;</td>';
				}
				else{
					echo '<td class="note">&nbsp;</td>';
				}
				echo "</tr>";
				$set=$cells[5];
				$time=$cells[0];
			}
		}
	?></body>
</html>
