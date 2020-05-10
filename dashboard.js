
function initDashboard() {

	//_dashboardContainer = document.getElementById('dashboardContainer');
	
	initDashboardCoords();
	
	for( let i=0 ; i < _dashboardItems.length ; i++ ) {
		let it = _dashboardItems[i];

		let div;
		if( !('div' in it) ) {
			div = document.createElement('div');
			_dashboardContainer.appendChild(div);
			div.className = 'dashboardContainerItem';
			div.setAttribute('data-i',i);
			div.style.zIndex = 100+i;
			div.style.backgroundColor=it.properties.fill;
			div.addEventListener('mousedown', function(e) { onDashboardItemMouseDown(e,div) } );
			let resizeDiv = document.createElement('div');
			div.appendChild(resizeDiv);
			resizeDiv.className = 'dashboardContainerItemResize';
			resizeDiv.innerHTML = '&#8690;';
			resizeDiv.addEventListener('mousedown', function(e) { onDashboardResizeMouseDown(e,div) } );			
			let titleDiv = document.createElement('div');
			div.appendChild(titleDiv);
			titleDiv.className = 'dashboardContainerItemTitle';
			titleDiv.innerHTML = it.properties.title;
		} else {
			div = it.div;
		}
		div.style.position='absolute';
		div.style.left=it.left.toString()+'px';
		div.style.top=it.top.toString() +'px';
		div.style.width=it.width.toString()+'px';
		div.style.height=it.height.toString()+'px';
		
		let svg;
		if( !('svg' in it) ) {
			svg = createSVG( 0, 0, it.width, it.height, {} );
			div.appendChild(svg);
		} else {
			svg = it.svg;
			svg.setAttributeNS(null,'width',it.width);
			svg.setAttributeNS(null,'height',it.height);
		}		
			
		if( !('div' in it) ) {
			it.div = div;
		}
		if( !('svg' in it) ) {
			it.svg = svg;
		}		
	}
}


function initDashboardCoords() {
	//let rect = _dashboardContainer.getBoundingClientRect();
	//_dashboardContainerWidth = rect.width;
	//_dashboardContainerHeight = rect.height;
	
	let upperMargin=14;
	for( let i=0 ; i < _dashboardItems.length ; i++ ) {
		let it = _dashboardItems[i];
		it.left = Math.round( _dashboardContainerWidth * (it.leftPct+2) / 104.0 );
		it.width = Math.round( _dashboardContainerWidth * (it.widthPct+2) / 104.0 );
		it.top = upperMargin + Math.round( (_dashboardContainerHeight - upperMargin) * (it.topPct+2) / 104.0 );
		it.height = Math.round( (_dashboardContainerHeight - upperMargin) * (it.heightPct+2) / 104.0 );
	}
}


function displayDashboard() {
	for( let i = 0 ; i < _dashboardItems.length ; i++ ) {
		displayDashboardItem(_dashboardItems[i]);
	}
}


function displayDashboardItem(it) {
	if( it.type === 'line-chart' || it.type === 'filled-line-chart' || it.type === 'bar-chart' ) {
		displayDashboardChart(it);
	} else if( it.type === 'table' ) {
		displayDashboardTable(it);
	} else if( it.type === 'pie-chart' ) {
		displayDashboardPieChart(it);
	} else if( it.type === 'tornado' ) {
		displayDashboardTornado(it);
	} else if( it.type === 'text' ) {
		displayDashboardText(it);
	}
}


function displayDashboardTornado(it) {
console.log(it.data);	
	let numValues = it.data.length; 
	let minValue = it.data[0].value;
	let maxValue = it.data[0].value;
	for (let i = 1; i < numValues; i++) { 	
		if( minValue > it.data[i].value )
			minValue = it.data[i].value;
		if( maxValue < it.data[i].value )
			maxValue = it.data[i].value;
	}
	let middleValue = 0; // (maxValue - minValue)/2;
	let valueRange = maxValue - minValue;

	let yRange = valueRange;
	let vmargin = 0.05 * yRange;
	let hmargin = valueRange/2;
	setDashboardItemViewbox( it, minValue - hmargin, -vmargin, valueRange + 2*hmargin, yRange + 2*vmargin );

	let minFontSize = it.height/40;
	let fontSize = parseInt(0.2*it.height/numValues);
	if( fontSize > minFontSize ) {
		fontSize = minFontSize;
	}

	for (let i = 0; i < numValues; i++) {
		let left, width, labelX, labelAlign;
		if( it.data[i].value < 0 ) {
			left = it.data[i].value;
			width = -it.data[i].value;
			labelX = 0.025 * it.width;;
			labelAlign = "left";
		} else {
			left = 0;
			width = it.data[i].value;
			labelX = -0.475 * it.width;
			labelAlign = "right";
		} 				                                              	
		let barHalfHeight = 0.5 * yRange / (numValues);
		let top = (i+0.5)*yRange / (numValues) - barHalfHeight;
		let r = createRect( left, top, width, 2*barHalfHeight, { stroke:it.data[i].color, strokeWidth:1, fill:it.data[i].color } );
		it.svg.appendChild(r);

		let foreignObject = document.createElementNS(NS, 'foreignObject');
		foreignObject.setAttribute('x', labelX);
		foreignObject.setAttribute('y', top);
		foreignObject.setAttribute('height', (2*barHalfHeight / yRange ) * it.height);
		foreignObject.setAttribute('width', 0.45 * it.width);
		let barlabel = document.createElement('div');
		barlabel.style.textAlign = labelAlign;
		barlabel.style.fontSize =  fontSize + 'px';
		barlabel.setAttribute( 'width', '100%' );
		let text = it.data[i].value + " " + it.data[i].unit;
		if( 'labels' in it.data ) {
			let br = ( it.data[i].label.length > 15 ) ? '<br>' : ': '; 
			text = it.data[i].label + br + text;
		}
		barlabel.innerHTML = text;
		//barlabel.appendChild( document.createTextNode( text ) ); 
		foreignObject.appendChild( barlabel ); 
		it.svg.appendChild(foreignObject); 
	}
}


function displayDashboardPieChart(it) {
	setDashboardItemViewbox( it, -55, -5, 160, 110 );

    let list = document.createElement('div');
	list.style.textAlign = 'left';
	list.style.fontSize = '8px';
    let totalValue = 0;
    let radius = 20;
    let circleLength = Math.PI * (radius * 2); // Circumference = PI * Diameter
    let spaceLeft = circleLength;

	for (let i = 0; i < it.data.length; i++) {
  		totalValue += it.data[i].value;
	}

	for (let  c = 0; c < it.data.length; c++) {
		let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
 		circle.setAttribute("class", "pie-chart-value");
 		circle.setAttribute("fill", "none");
 		circle.setAttribute("stroke-width", 40);
		circle.setAttribute("cx", 50);
		circle.setAttribute("cy", 50);
		circle.setAttribute("r", radius);

		// Set dash on circle
		circle.style.strokeDasharray = (spaceLeft) + " " + circleLength;
        // Set Stroke color
		circle.style.stroke = it.data[c].color;
  
		// Append circle to svg.
		it.svg.appendChild(circle);
  
		// Subtract current value from spaceLeft
  		spaceLeft -= (it.data[c].value / totalValue) * circleLength;
  
		// Add value to list.
		let listItem = document.createElement('div');
		listItem.style.textAlign = 'left';
		listItem.style.fontSize = '7px';
		valuePct = parseFloat((it.data[c].value / totalValue) * 100).toFixed(1);
  
		// Add text to list item
		listItem.innerHTML = it.data[c].label + ' (' + valuePct + '%)';

		// Set color of value to create relation to pie.
		listItem.style.color = it.data[c].color;	
		// Append to list.
		list.appendChild(listItem);
	}

	let foreignObject = document.createElementNS(NS, 'foreignObject');
	foreignObject.setAttribute('x', -50);
	foreignObject.setAttribute('height', 100);
	foreignObject.setAttribute('width', 100);
	foreignObject.appendChild( list ); 
	it.svg.appendChild(foreignObject); 
}


function displayDashboardChart(it) {
	let rect = calculateDashboardItemDataRect(it.data);
	if( rect === null ) {
		return;
	}
	
	let scale = createScale(rect.left, rect.right);	 
	rect.scaleLeft = scale[0];
	rect.scaleRight = scale[1];
	rect.hScaler = scale[2];
	rect.scaleWidth = scale[1] - scale[0];
	
	scale = createScale(rect.bottom, rect.top);
	rect.scaleBottom = scale[0];
	if( it.type === 'bar-chart' ) {
		if( rect.scaleBottom > 0.0 && rect.scaleTop > 0.0 ) {
			rect.scaleBottom = 0.0;
		} else if( rect.scaleBottom < 0.0 && rect.scaleTop < 0.0 ) {
			rect.scaleTop = 0.0;
		} 
	}
	rect.scaleTop = scale[1];
	rect.vScaler = scale[2];
	rect.scaleHeight = scale[1] - scale[0];
	
	let hMargin = rect.width / 5;
	let vMargin = rect.height / 5;
	rect.windowLeft = rect.scaleLeft - hMargin;
	rect.windowRight = rect.scaleRight + hMargin;
	rect.windowWidth = rect.windowRight - rect.windowLeft;
	rect.windowBottom = rect.scaleBottom - vMargin;
	rect.windowTop = rect.scaleTop + vMargin;
	rect.windowHeight = rect.windowTop - rect.windowBottom;
	//console.log(rect);
	setDashboardItemViewbox( it, rect.windowLeft, rect.windowBottom, rect.windowWidth, rect.windowHeight );

	displayDashboardVerticalAxis( it, rect );
	displayDashboardHorizontalAxis( it, rect );
	
	let circleRadius = rect.width / 100;
	let lineWidth = rect.width / 200;
	
	if( 'pointFill' in it.attributes ) { 		// If 'pointFill' is specified then drawing points (dots)
		for( let i = 0 ; i < it.data.length ; i++ ) {
			let circle = createCircle(it.data[i].x, flipY(rect,it.data[i].y), circleRadius, { fill:it.attributes.pointFill } );
			it.svg.appendChild(circle);
		}
	}
	
	if( it.type === 'line-chart' ) {
		for( let i = 1 ; i < it.data.length ; i++ ) {
			let line = createLine( it.data[i-1].x, flipY(rect,it.data[i-1].y), it.data[i].x, flipY(rect,it.data[i].y), 
				{ stroke:it.attributes.stroke, strokeWidth:lineWidth } );
			it.svg.appendChild(line);
		}
	} else if( it.type === 'bar-chart' ) {
		let barHalfWidth; 
		if( it.data.length >= 2 ) {
			barHalfWidth = (it.data[1].x - it.data[0].x)/4.0;
		} else {
			barHalfWidth = it.scaleWidth/4;
		}
		for( let i = 0 ; i < it.data.length ; i++ ) {
			let y = flipY( rect, rect.scaleBottom );
			let h = it.data[i].y;
			let r = createRect( it.data[i].x - barHalfWidth, y, barHalfWidth*2.0, -h, 
				{ stroke:it.attributes.stroke, strokeWidth:lineWidth, fill:it.attributes.fill } );
			it.svg.appendChild(r);
		}		
	} else if( it.type === 'filled-line-chart' ) {			
		let points = new Array();
		points.push( rect.left );
		points.push( flipY(rect,rect.bottom) );
		for( let i = 0 ; i < it.data.length ; i++ ) {
			points.push( it.data[i].x );
			points.push( flipY(rect,it.data[i].y) );
		}
		points.push( rect.right );
		points.push( flipY(rect,rect.bottom) );
		let polygon = createPolygon( points.join(" "), { stroke:it.attributes.stroke, strokeWidth:lineWidth, fill:it.attributes.fill } );
		it.svg.appendChild(polygon);
	}
}

function calculateDashboardItemDataRect(data) {
	if( data.length == 0 ) {
		return null;
	}
	let minX = data[0].x;
	let maxX = minX;
	let minY = data[0].y;
	let maxY = minY;
	for( let i = 1 ; i < data.length ; i++ ) {
		if( data[i].x < minX ) {
			minX = data[i].x;
		}
		if( data[i].x > maxX ) {
			maxX = data[i].x;
		}
		if( data[i].y < minY ) {
			minY = data[i].y;
		}
		if( data[i].y > maxY ) {
			maxY = data[i].y;
		}
	}
	let width = (maxX - minX);
	let height = (maxY - minY);	
	return { left:minX, right:maxX, top:maxY, bottom:minY, width:width, height:height };
}


function displayDashboardVerticalAxis( it, rect ) {
	let pointSize = rect.width/50;
	let axisLineThick = rect.width/200;

	let h = Math.abs(rect.scaleBottom - rect.scaleTop);
	let fontSize = rect.vScaler/4;
	if( fontSize > h/10 ) { 
		fontSize = h/10; 
	} else if( fontSize < h/40 ) {
		fontSize = h/40;
	}
	
	let axisLine = createLine( rect.scaleLeft, rect.scaleBottom, rect.scaleLeft, rect.scaleTop, 
		{ stroke:'#4f4f4f', strokeWidth:axisLineThick } );
	it.svg.appendChild(axisLine);
	for( let y = rect.scaleBottom ; !(y > rect.scaleTop) ; y += rect.vScaler ) {
		let pointLine = createLine( rect.scaleLeft-pointSize, flipY(rect,y), rect.scaleLeft+pointSize, flipY(rect,y), 
			{ stroke:'#4f4f4f', strokeWidth:axisLineThick } );
		it.svg.appendChild(pointLine);
		// Labels
		let text = createText( y.toString(), rect.scaleLeft-pointSize*1.25, flipY(rect,y), 
			{ fontSize:fontSize, textAnchor:'end', alignmentBaseline:'baseline' } );
		it.svg.appendChild(text);
	}
}


function displayDashboardHorizontalAxis( it, rect ) {
	let pointSize = rect.width/50;
	let axisLineThick = rect.width/200;
	
	let axisLine = createLine( rect.left, flipY(rect,rect.scaleBottom), rect.right, flipY(rect,rect.scaleBottom), 
		{ stroke:'#4f4f4f', strokeWidth:axisLineThick } );
	it.svg.appendChild(axisLine);
	let labels = [];
	let textOverallLength = 0;
	for( let x = rect.scaleLeft ; !(x > rect.scaleRight) ; x += rect.hScaler ) {
		let pointLine = createLine( x, flipY(rect,rect.scaleBottom)-pointSize, x, flipY(rect,rect.scaleBottom)+pointSize, 
			{ stroke:'#4f4f4f', strokeWidth:axisLineThick } );
		it.svg.appendChild(pointLine);
		// Labels
		let xLabel = null;
		if( 'xDataType' in it.attributes ) {
			if( it.attributes.xDataType === 'timeInSeconds' ) {
				let date = new Date(null);
				date.setTime(x);
				xLabel = date.toLocaleString([], { year:'2-digit', month:'2-digit', day:'2-digit', hour: '2-digit', minute:'2-digit'});
			}
		}
		if( xLabel === null ) {
			xLabel = x.toString();
		}
		labels.push( {x:x, y:flipY(rect,rect.scaleBottom)+pointSize*2.5, t:xLabel} );
		textOverallLength += xLabel.length;
	}

	let w = rect.right - rect.left;
	let fontSize = ( w / textOverallLength ) * 1.25;
	if( fontSize > w/20 ) { 
		fontSize = w/20; 
	} else if( fontSize < w/40 ) {
		fontSize = w/40;
	}
	let c = 0;
	for( let x = rect.scaleLeft ; !(x > rect.scaleRight) ; x += rect.hScaler, c++ ) {
		let text = createText( labels[c].t, labels[c].x, labels[c].y, 
			{ fontSize:fontSize, textAnchor:'middle', alignmentBaseline:'top' } );
		it.svg.appendChild(text);
	}
}


function displayDashboardTable(it) {	
	let width = it.width;
	let height = it.height;

	setDashboardItemViewbox( it, 0, 0, width, height );

	let columnsNumber = it.data.columnTitles.length;
	let rowsNumber = it.data.rowTitles.length;
	let cellWidth = Math.floor( width / (rowsNumber+1) );
	let cellHeight = Math.floor( height / (columnsNumber+1) );
	for( let i = 0 ; i < columnsNumber ; i++ ) {
		//let el = createText( it.data.columnTitles[i], (i+1.5)*cellWidth, cellHeight/2, { textAnchor:'middle', alignmentBaseline:'top', fontSize:80} );
		let el = createForeignObjectWithText( it.data.columnTitles[i], (i+1)*cellWidth, 0, cellWidth, cellHeight, 
			{ fontSize:height*0.2/rowsNumber, textAlign:'center', padding:4 } );
		it.svg.appendChild(el);

		let elLine = createLine( (i+1) * cellWidth, 0, (i+1) * cellWidth, height, { stroke:'#4f4f4f'} );
		it.svg.appendChild(elLine);
	}

	for( let i = 0 ; i < rowsNumber ; i++ ) {
		// let el = createText( it.data.rowTitles[i], cellWidth, (i+1.5)*cellHeight, { textAnchor:'end', alignmentBaseline:'top', fontSize:80 } );
		let el = createForeignObjectWithText( it.data.rowTitles[i], 0, (i+1)*cellHeight, cellWidth, cellHeight, 
			{ fontSize:height*0.2/rowsNumber, textAlign:'right', padding:4 } );
		it.svg.appendChild(el);

		let elLine = createLine( 0, (i+1) * cellHeight, width, (i+1)*cellHeight, { stroke:'#4f4f4f'} );
		it.svg.appendChild(elLine);
	}

	for( let ic = 0 ; ic < columnsNumber ; ic++ ) {
		for( let ir = 0 ; ir < rowsNumber ; ir++ ) {
			//let el = createText( it.data.rows[ir][ic], (ic+1.5)*cellWidth, (ir+1.5)*cellHeight, { textAnchor:'middle', alignmentBaseline:'top', fontSize:80} );
			let el = createForeignObjectWithText( it.data.rows[ir][ic], (ic+1)*cellWidth, (ir+1)*cellHeight, cellWidth, cellHeight, 
				{ fontSize:height*0.2/rowsNumber, textAlign:'center', padding:4 } );
			it.svg.appendChild(el);		
		}
	}
	it.svg.setAttributeNS( null, "preserveAspectRatio", "none");
	//data:[ columnTitles:['column1','column2'], rowTitles:['row1','row2'], rows: [ [10,20], [30,40] ] ]	
}


function displayDashboardText(it) {	
	let width = it.width;
	let height = it.height;

	setDashboardItemViewbox( it, 0, 0, width, height );
	let textNode = createText( it.data, 0, 0, { textAnchor:'left', alignmentBaseline:'top', fontSize:80 } );
	//let el = createForeignObjectWithText( it.data, 0, 0, width, height, { fontSize: (width / it.data.length) *0.5, textAlign:'center', padding:4 } );
	it.svg.appendChild(textNode);

    let bb = textNode.getBBox();
    let widthTransform = width / bb.width;
    let heightTransform = height / bb.height;
    let value = widthTransform < heightTransform ? widthTransform : heightTransform;
    textNode.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");

	//it.svg.setAttributeNS( null, "preserveAspectRatio", "none");
	//data:[ columnTitles:['column1','column2'], rowTitles:['row1','row2'], rows: [ [10,20], [30,40] ] ]	
}


function setDashboardItemViewbox( it, x, y, width, height ) {
	let svg = it.svg;
	svg.setAttribute('viewBox', [ x, y, width, height ].join(" ") );
}	


function flipY( rect, y ) {
	return rect.windowBottom + rect.windowTop - y;
}
