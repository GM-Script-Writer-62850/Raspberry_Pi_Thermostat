"use strict";
var temp,TEMP,FORMAT,NEW,OLD,TUBES,RELAYS,SUN,O_CFG,
	convert={
		'C2C':function(C){
			return C;
		},
		'C2F':function(C){
			return C*1.8+32;
		},
		'C2K':function(C){
			return C+273.15;
		},
		'F2C':function(F){
			return (F-32)*5/9;
		},
		'K2C':function(C){
			return C-273.15;
		},
		'2D':function(X,Y){
			return Number(Math.round(X+"e+"+Y)+"e-"+Y);
		}
	},
	CRASH=false;
function findEle(target,i,e){
	target=document.evaluate(target, e?e:document, null, i, null);
	return i==9?target.singleNodeValue:target;
}
function make(e){
	return document.createElement(e);
}
function makeTxt(t){
	return document.createTextNode(t);
}
function insert(h,c){
	h.appendChild(c);
}
function stamp2Time(stamp){
	var h,m,n,
		date=new Date(stamp*1000);
	if(date.getHours()>12){
		h=date.getHours()-12;
		n="PM";
	}
	else{
		h=date.getHours();
		n="AM";
	}
	m=date.getMinutes();
	return h+':'+(m<10?'0'+m:m)+' '+n;
}
function fixFloat(x){
	return Number(x.toFixed(4));
}
function setBackground(e){
	var off,aOff,
		f=e.format.value=='K'?'':'°',
		t=Number(e.target.value),// target
		t2=Number(e.trigger.value),// trigger
		d=Number(e.day.value),
		n=Number(e.night.value),
		a=Number(e.auxon.value)*-1,
		a2=Number(e.auxoff.value),
		r=Number(e.sunrise.value),
		s=Number(e.sunset.value);
//	if(t+t2+a+a2 > t)
//		a2=e.auxoff.value=0;
	f+=e.format.value;
	document.body.className=t2==0?'copy':(t2<0?'heat':'cool');
	NEW["dayOn"].textContent=fixFloat(t+t2+d)+f;
	off=fixFloat(t+d);
	NEW["dayOff"].textContent=off+f;
	NEW["dayAuxOn"].textContent=fixFloat(t+t2+a+d)+f;
	aOff=fixFloat(t+t2+a+a2+d);
	NEW["dayAuxOff"].textContent=(aOff>off?off:aOff)+f;
	
	NEW["nightOn"].textContent=fixFloat(t+t2+n)+f;
	off=fixFloat(t+n);
	NEW["nightOff"].textContent=off+f;
	NEW["nightAuxOn"].textContent=fixFloat(t+t2+a+n)+f;
	aOff=fixFloat(t+t2+a+a2+n);
	NEW["nightAuxOff"].textContent=(aOff>off?off:aOff)+f;
	if(SUN){
		NEW["day"].textContent=stamp2Time(SUN['rise']['stamp']+r*60);
		NEW["night"].textContent=stamp2Time(SUN['set']['stamp']+s*60);
	}
}
function validateKey(ele,e,bool){
	if(e.which==0||e.which==13){ // 13=Enter
		setBackground(thermostat);
		return true;
	}
	if(e.which==43){// +
		ele.value++;
		setBackground(thermostat);
		return false;
	}
	if((e.which==95||e.shiftKey&&e.which==45)&&bool){// _ or Shift -
		ele.value=ele.value*-1;
		setBackground(thermostat);
		return false;
	}
	if(e.which==45){// -
		if(bool||ele.value-1>=0){
			ele.value=fixFloat(ele.value-1);
			setBackground(thermostat);
		}
		return false;
	}
	if(!isNaN(String.fromCharCode(e.which))||e.which==8||e.which==46)
		return true;
	// anything else (mostly letters)
	return false;
}
function getSun(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState==4){
			if(httpRequest.status==200){
				SUN=JSON.parse(httpRequest.responseText);
				setBackground(thermostat);
			//	findEle('//sup[@id="sunrise"]',9).textContent=SUN["rise"]["time"];
			//	findEle('//sup[@id="sunset"]',9).textContent=SUN["set"]["time"];
			}
			if(O_CFG){
				OLD["day"].textContent=stamp2Time(SUN["rise"]["stamp"]+O_CFG["sunrise"]*60);
				OLD["night"].textContent=stamp2Time(SUN["set"]["stamp"]+O_CFG["sunset"]*60);
			}
			setTimeout(getSun,3600000);
			
		}
	};
	httpRequest.open('GET', 'tmp/sun.json?noCache='+new Date().getTime());
	httpRequest.send(null);
}
function getErrorLog(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState==4){
			if(httpRequest.status==200){
				alert("A error has occurred:\n"+httpRequest.responseText);
			}
			else if(httpRequest.status==404){
				alert("A unknown error has occurred, there is no crash log\n"+
					"Sensor data is obsolete.\n"+
					"Either the script has been abruptly terminated or the sensor stopped responded.\n"+
					"If the script is still running the mercury tubes are being used as a fall back.");
			}
			setTimeout("CRASH=false",60000);
		}
	};
	httpRequest.open('GET', 'tmp/crash?noCache='+new Date().getTime());
	httpRequest.send(null);
	return true;
}
function updateTemp(){
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState==4){
			if(httpRequest.status==200){
				var json=JSON.parse(httpRequest.responseText),
					f=thermostat.format.value,s;
				TEMP=json["temp"]/1000;
				temp.textContent=convert['2D'](convert['C2'+f](TEMP),2)+(f=='K'?' ':'°')+f;
				s=json["tube1"]==0?'Left':'Right';
				TUBES["a"].textContent=s;
				TUBES["a"].className=s;
				s=json["tube2"]==0?'Left':'Right';
				TUBES["b"].textContent=s;
				TUBES["b"].className=s;
				s=json["relay1"]==0?'Right':'Left';
				RELAYS["a"].textContent=s;
				RELAYS["a"].className=s;
				s=json["relay2"]==0?'Left':'Right';
				RELAYS["b"].textContent=s;
				RELAYS["b"].className=s;
				f=new Date().getTime()-new Date(httpRequest.getResponseHeader("Last-Modified")).getTime();
				if(f>15000&&!CRASH)// 15 seconds
					CRASH=getErrorLog();
			}
			setTimeout(updateTemp,3000);
		}
	};
	httpRequest.open('GET', '/tmp/temp.json?noCache='+new Date().getTime());
	httpRequest.send(null);
}
function apply(e){
	var msg=' setting is within the margin of error, this can cause poor efficiency\nClick OK to ignore';
	if(Math.abs(e.trigger.value)<=(thermostat.format.value=="F"?0.9:0.5)&&e.trigger.value!=0){
		if(!confirm('Your "'+(e.trigger.value>0?'Cool':'Heat')+'"'+msg))
			return false;
	}
	if(e.auxoff.value<=(thermostat.format.value=="F"?0.9:0.5)){
		if(!confirm('Your "Auxiliary Off"'+msg))
			return false;
	}
	var inpts=findEle('.//input[@type="text"]',6,thermostat),
		inpt,httpRequest,i,
		data='';
	for(i=inpts.snapshotLength-1;i>-1;i--){
		inpt=inpts.snapshotItem(i);
		data+=inpt.name+'='+inpt.value+'&';
	}
	data+='format='+thermostat.format.value;
	httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState==4){
			if(httpRequest.status==200){
					try{
						O_CFG=JSON.parse(httpRequest.responseText);
						alert("Settings Applied!");
						for (i in NEW)
							OLD[i].textContent=NEW[i].textContent;
						findEle('//div[@id="oldSettings"]',9).className=O_CFG["trigger"]==0?'copy':(O_CFG["trigger"]>0?'cool':'heat');
					}
					catch(e){
						alert("Something went wrong:\n"+httpRequest.responseText);
					}
			}
			else
				alert('Error: '+httpRequest.status)
		}
	};
	httpRequest.open('POST', 'apply.php');
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.send(data);
	return false;
}
function load(){
	thermostat.style.minHeight=document.getElementById('tips').offsetHeight+'px';
	thermostat.format.addEventListener('change',function(){
		if(thermostat.className=='F'||this.value=='F'){
			var x=[thermostat.auxoff,thermostat.auxon],i;
			for(i in x){
				if(x[i].disabled)
					x[i].value=(this.value=='F'?x[i].value*9/5:x[i].value*5/9);
			}
		}
		FORMAT=this.value;
		thermostat.className=FORMAT;
		setBackground(thermostat);
	},false);
	var eles,httpRequest;
	temp=document.getElementById("temp");
	eles=findEle('//table[@id="newSettings"]//td',6);
	NEW={
		"day":eles.snapshotItem(0),
		"dayOn":eles.snapshotItem(1),
		"dayOff":eles.snapshotItem(2),
		"dayAuxOn":eles.snapshotItem(3),
		"dayAuxOff":eles.snapshotItem(4),
		"night":eles.snapshotItem(5),
		"nightOn":eles.snapshotItem(6),
		"nightOff":eles.snapshotItem(7),
		"nightAuxOn":eles.snapshotItem(8),
		"nightAuxOff":eles.snapshotItem(9)
	}
	eles=findEle('//div[@id="oldSettings"]/table//td',6);
	OLD={
		"day":eles.snapshotItem(0),
		"dayOn":eles.snapshotItem(1),
		"dayOff":eles.snapshotItem(2),
		"dayAuxOn":eles.snapshotItem(3),
		"dayAuxOff":eles.snapshotItem(4),
		"night":eles.snapshotItem(5),
		"nightOn":eles.snapshotItem(6),
		"nightOff":eles.snapshotItem(7),
		"nightAuxOn":eles.snapshotItem(8),
		"nightAuxOff":eles.snapshotItem(9)
	}
	eles=findEle('//div[@id="tubes"]/table//td/span',6);
	TUBES={
		"a":eles.snapshotItem(0),
		"b":eles.snapshotItem(1)
	}
	eles=findEle('//div[@id="relays"]/table//td/span',6)
	RELAYS={
		"a":eles.snapshotItem(0),
		"b":eles.snapshotItem(1)
	}
	updateTemp();
	getSun(true);
	setBackground(thermostat);
	httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if(httpRequest.readyState==4){
			if(httpRequest.status==200){
				var i;
				O_CFG=JSON.parse(httpRequest.responseText);
				for(i in O_CFG)
					thermostat[i].value=O_CFG[i];
				thermostat.className=O_CFG.format;
				setBackground(thermostat);
				for (i in NEW)
					OLD[i].textContent=NEW[i].textContent;
				findEle('//div[@id="oldSettings"]',9).className=O_CFG["trigger"]==0?'copy':(O_CFG["trigger"]>0?'cool':'heat');
			}
			else
				alert('A '+httpRequest.status+' error occured while trying to load the current settings.\nPlease press F5 on the keyboard.');
		}
	};
	httpRequest.open('GET', '/config.json?noCache='+new Date().getTime());
	httpRequest.send(null);
}
