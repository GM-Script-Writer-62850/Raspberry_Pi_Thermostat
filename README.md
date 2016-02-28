I have uploaded this here in th hopes that it will be usefull for someone<br>
Thermostat Behavior:<br>
	My thermostat has 2 mercury tubes, I used 2 relays to replace them, if the unit is set to tool setting the top relay control pin high turns the AC on, the bottom relay has no effect when the unit is set to cool.<br>
	When the unit is set to heat, the when the top relay control pin is set low the heat turn on, when the bottom relay control pin is set high the secondary heating coils turn on.<br>
	I have conected the old murcury tubes as logic inputs on the pi<br>
These files/folders should be owned by www-data<br>
	html/cronfig.json<br>
	html/cron.json<br>
	html/tmp<br>
Parts used:<br>
	1 Raspberry Pi Zero<br>
	1 G.skill 16GB micro SD card (i trust this brand with all my PIs)<br>
	1 USB shim adapter<br>
	1 EDIMAX EW-7811Un N150 USB 2.0 Wireless nano Adapter<br>
	2 Common Anode 2-digit 7 segment panel (Cheapest 2 digit 7 segment LCD panels I could find on ebay)<br>
	4 2N3906 PNP transistors<br>
	1 40pin 10cm female to female Dupont jumper cable (did not feel like crimping more wires)<br>
	1 Modified Ethernet patch cable (modified to have 9 wires)<br>
	2 Double sided 3x7cm prototyping boards<br>
	1 Double sided 5x7cm prototyping board<br>
	2 TIP120 transistors (overkill)<br>
	1 Momentary SPDT mini toggle switch<br>
	1 5.25V 1 amp power adapter<br>
	1 DIY micro USB power cable<br>
	19 1/4 Watt resistors (varying resistances)<br>
	2 SRD-5VDC-SL-C relays<br>
	1 D18B20 thermal sensor<br>
	1 Annoyingly bright blue led (salvaged)<br>
	2 3mm green LEDs (won 100 on ebay for $0.10)<br>
	0.X heat shrink<br>
	0.X Electricl Tape (used with heat strink on power adapter plug)<br>
	1 zip tie (salvaged)<br>
	1 PASS & SEYMOUR S1-22-W Single gang electrical old work box<br>
	1 Ballast disconnect discs (salvaged)<br>
	2 SRP100K-E3/54 Diodes (flywheel usage)<br>
	29 2.54mm Pitch 1P Dupont Jumper Wire Cable Housing Female Pin Connectors<br>
	29 pin for above housing<br>
	1.X 40 Pin Male 2.54 breakable pin header<br>
	X Solid core Ethernet wire (scrap)<br>
	X Solder<br>
	~6ft 14/2 wire (get power to the adapter from junction box in the atic)<br>
	~6inch scrap piece of 12awg green instation<br>
	1 single gang blank cover plate<br>
	Existing Honeywell thermostat that is older than me<br>
Folder placement:<br>
	bin		=> /usr/local/bin<br>
	sbin		=> /usr/local/sbin<br>
	html		=> /var/www/html<br>
	crontabs	=> /var/spool/cron/crontabs<br>
	etc		=> /etc
