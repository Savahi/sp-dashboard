
function createScale( min, max ) {

	let powerMin = Math.floor( Math.log10( Math.abs(min) ) );
	let powerMax = Math.floor( Math.log10( Math.abs(max) ) );

	if( powerMin == powerMax ) {
		let powerCounter = powerMin;
		while(powerCounter > 0) {
			if( Math.floor( min / Math.pow(10,powerCounter) ) != Math.floor( max / Math.pow(10,powerCounter) ) ) {
				break;
			}
			powerCounter--;
		}
		powerMin = powerCounter;
		powerMax = powerCounter;
	}

	let scaleMinByPowerMax =  Math.floor( min / Math.pow(10,powerMax) );
	scaleMinByPowerMax = scaleMinByPowerMax * Math.pow(10,powerMax);

	let scaleMaxByPowerMax = Math.ceil( max / Math.pow(10,powerMax) );
	scaleMaxByPowerMax = scaleMaxByPowerMax * Math.pow( 10, powerMax );

	//document.getElementById('output').innerText = "min=" + scaleMinByPowerMax + ", max=" + scaleMaxByPowerMax;

	scaleMinByPowerMin =  Math.floor( min / Math.pow(10,powerMin) );
	scaleMinByPowerMin = scaleMinByPowerMin * Math.pow(10,powerMin);

	scaleMaxByPowerMin = Math.ceil( max / Math.pow(10,powerMin) );
	scaleMaxByPowerMin = scaleMaxByPowerMin * Math.pow( 10, powerMin );

	let powerMinScaler = Math.pow(10,powerMin);
	let powerMaxScaler = Math.pow(10,powerMax);
	let powerMinTicks = (scaleMaxByPowerMin - scaleMinByPowerMin) / powerMinScaler;
	let powerMaxTicks = (scaleMaxByPowerMax - scaleMinByPowerMax) / powerMaxScaler;

	if( powerMinTicks < powerMaxTicks ) {
		return [ scaleMinByPowerMin, scaleMaxByPowerMin, powerMinScaler, powerMinTicks ];
		document.getElementById('output').innerText = "min=" + scaleMinByPowerMin + ", max=" + scaleMaxByPowerMin + ", scaler=" + powerMinScaler;
	} else {
		return [ scaleMinByPowerMax, scaleMaxByPowerMax, powerMaxScaler, powerMaxTicks ];
		//document.getElementById('output').innerText = "min=" + scaleMinByPowerMax + ", max=" + scaleMaxByPowerMax + ", scaler=" + powerMaxScaler;
	} 
}
