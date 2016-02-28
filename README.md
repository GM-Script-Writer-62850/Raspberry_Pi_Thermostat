```
I have uploaded this here in th hopes that it will be useful for someone
Thermostat Behavior:
	My thermostat has 2 mercury tubes, I used 2 relays to replace them, if the unit is set to tool setting the top relay control pin high turns the AC on, the bottom relay has no effect when the unit is set to cool.
	When the unit is set to heat, the when the top relay control pin is set low the heat turn on, when the bottom relay control pin is set high the secondary heating coils turn on.
	I have connected the old mercury tubes as logic inputs on the pi
These files/folders should be owned by www-data
	html/cronfig.json
	html/cron.json
	html/tmp
Parts used:
	1 Raspberry Pi Zero
	1 G.skill 16GB micro SD card (i trust this brand with all my PIs)
	1 USB shim adapter
	1 EDIMAX EW-7811Un N150 USB 2.0 Wireless nano Adapter
	2 Common Anode 2-digit 7 segment panel (Cheapest 2 digit 7 segment LCD panels I could find on ebay)
	4 2N3906 PNP transistors
	1 40pin 10cm female to female Dupont jumper cable (did not feel like crimping more wires)
	1 Modified Ethernet patch cable (modified to have 9 wires)
	2 Double sided 3x7cm prototyping boards
	1 Double sided 5x7cm prototyping board
	2 TIP120 transistors (overkill)
	1 Momentary SPDT mini toggle switch
	1 5.25V 1 amp power adapter
	1 DIY micro USB power cable
	19 1/4 Watt resistors (varying resistances)
	2 SRD-5VDC-SL-C relays
	1 D18B20 thermal sensor
	1 Annoyingly bright blue led (salvaged)
	2 3mm green LEDs (won 100 on ebay for $0.10)
	0.X heat shrink
	0.X Electrical Tape (used with heat shrink on power adapter plug)
	1 zip tie (salvaged)
	1 PASS & SEYMOUR S1-22-W Single gang electrical old work box
	1 Ballast disconnect discs (salvaged)
	2 SRP100K-E3/54 Diodes (flywheel usage)
	29 2.54mm Pitch 1P Dupont Jumper Wire Cable Housing Female Pin Connectors
	29 pin for above housing
	1.X 40 Pin Male 2.54 breakable pin header
	X Solid core Ethernet wire (scrap)
	X Solder
	~6ft 14/2 wire (get power to the adapter from junction box in the atic)
	~6inch scrap piece of 12awg green insulation
	1 single gang blank cover plate
	Existing Honeywell thermostat that is older than me
Folder placement:
	bin		=> /usr/local/bin
	sbin		=> /usr/local/sbin
	html		=> /var/www/html
	crontabs	=> /var/spool/cron/crontabs
	etc		=> /etc
```
