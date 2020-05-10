
function createForeignObjectWithText( text, x, y, width, height, properties ) {
	let foreignObject = createForeignObject( x, y, width, height, properties );
	
	let div = document.createElement('div');
	div.style.width = width+'px';
	div.style.height = height+'px';	
	if( 'fontSize' in properties ) {
		div.style.fontSize = properties.fontSize;
	}
	if( 'textAlign' in properties ) {
		div.style.textAlign = properties.textAlign;
	}
	if( 'color' in properties ) {
		div.style.color = properties.color;
	}	
	if( 'padding' in properties ) {
		div.style.padding = properties.padding;
	}	
	div.style.overflow='hidden';
	div.style.boxSizing='border-box';
	div.appendChild( document.createTextNode(text) );
	foreignObject.appendChild( div );
	return foreignObject;
}


function createForeignObject( x, y, width, height, properties ) {
	let foreignObject = document.createElementNS(NS, 'foreignObject'); 
	foreignObject.setAttribute("x",x); 
	foreignObject.setAttribute("y",y); 
	foreignObject.setAttribute("width",width); 
	foreignObject.setAttribute("height",height); 
	if( 'id' in properties ) {
		foreignObject.setAttributeNS(null, 'id', properties.id );		
	} 
	if( 'fontSize' in properties ) {
		foreignObject.setAttributeNS(null,'font-size', properties.fontSize );
	}
	if( 'textAlign' in properties ) {
		foreignObject.setAttributeNS(null,'text-align', properties.textAlign );
	}
	if( 'color' in properties ) {
		foreignObject.setAttributeNS(null,'color', properties.color );
	}	
	return foreignObject;
}


function createRhomb( x, top, height, properties ) {
	return createPolygon( calcRhombCoords(x, top, height), properties );
}

function calcRhombCoords( x, top, height ) {
	let inc = 2;
	top -= inc;
	height += inc*2;
	let halfWidth = Math.floor(height / 2.0);
	let halfHeight = halfWidth;
	let points = (x - halfWidth) + " " + (top + halfHeight) + " " + x + " " + top;
	points += " " + (x + halfWidth) + " " + (top + halfHeight) + " " + x + " " + (top + height);
	return points;
}


function createRect( x, y, width, height, properties ) {
	let rect = document.createElementNS(NS, 'rect');
	if( 'id' in properties ) {
		rect.setAttributeNS(null, 'id', properties.id );		
	} 
	if( height < 0.0 ) { // x=10 h=-4
		y = y + height;
		height = -height;
	}
	rect.setAttributeNS(null, 'x', x ); 
	rect.setAttributeNS(null, 'width', width ); 
	rect.setAttributeNS(null, 'y', y ); 
	rect.setAttributeNS(null, 'height', height );
	if( 'fill' in properties ) {
		rect.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		rect.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		rect.setAttributeNS(null, 'stroke-width', properties.strokeWidth );		 
	}
	if( 'opacity' in properties ) {
		rect.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return rect;
}

function setRectCoords( rect, x, y, width, height ) {
	rect.setAttributeNS(null,'x',x);
	rect.setAttributeNS(null,'y',y);
	rect.setAttributeNS(null,'width',width);
	rect.setAttributeNS(null,'height',height);  
}

function createPolygon( points, properties ) {
	let polygon = document.createElementNS(NS, 'polygon');
	polygon.setAttributeNS(null, 'points', points );			
	if( 'id' in properties ) {
		polygon.setAttributeNS(null, 'id', properties.id );		 
	} 
	if( 'fill' in properties ) {
		polygon.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		polygon.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		polygon.setAttributeNS(null, 'stroke-width', properties.strokeWidth );		  
	}
	if( 'opacity' in properties ) {
		polygon.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return polygon;
}


function createText( textString, x, y, properties ) {
	let text = document.createElementNS(NS, 'text');
	text.setAttributeNS(null,'x', x );
	text.setAttributeNS(null,'y', y );
	if( 'id' in properties ) {
		let temp = document.getElementById(properties.id);
		text.setAttributeNS(null, 'id', properties.id );		

	} 
	if( 'fontSize' in properties ) {
		//text.setAttributeNS(null,'font-size', properties.fontSize );
		text.style.fontSize = properties.fontSize;
	}
	if( 'fontWeight' in properties ) {
		//text.setAttributeNS(null,'font-weight', properties.fontWeight );
		text.style.fontWeight = properties.fontWeight;
	}
	if( 'fontStyle' in properties ) {
		//text.setAttributeNS(null,'font-style', properties.fontStyle );		
		text.style.fontStyle = properties.fontStyle;
	}
	if( 'textAnchor' in properties ) {
		text.setAttributeNS(null,'text-anchor', properties.textAnchor );
	}
	if( 'textLength' in properties ) {
		if( properties.textLength ) {
			text.setAttributeNS(null,'textLength', properties.textLength );		 
		}
	}
	if( 'lengthAdjust' in properties ) {
		text.setAttributeNS(null,'lengthAdjust', properties.lengthAdjust );
	}
	if( 'alignmentBaseline' in properties ) {
		text.setAttributeNS(null,'alignment-baseline', properties.alignmentBaseline );
	}
	if( 'preserveAspectRatio' in properties ){
		text.setAttributeNS(null,'preserveAspectRatio', properties.preserveAspectRatio );
	}
	if( 'stroke' in properties) {
		text.setAttributeNS(null,'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		text.setAttributeNS(null,'stroke-width', properties.strokeWidth );
	} else {
		text.setAttributeNS(null,'stroke-width', 0 );
	}
	if( 'fill' in properties ) {
		text.setAttributeNS(null,'fill', properties.fill );
	}
	if( 'clipPath' in properties ) {
		text.setAttributeNS(null,'clip-path', properties.clipPath );
	}
	text.appendChild( document.createTextNode( textString ) );
	return text;
}

function createLine( x1, y1, x2, y2, properties ) {
	let line = document.createElementNS(NS, 'line');
	if( 'id' in properties ) {
		line.setAttributeNS(null, 'id', properties.id );		
	} 
	if( 'endingArrow' in properties ) {
		if( properties.endingArrow ) {
			line.setAttributeNS(null,'marker-end', 'url(#arrow)');
		}
	}
	line.setAttributeNS(null, 'x1', x1 ); 
	line.setAttributeNS(null, 'y1', y1 ); 
	line.setAttributeNS(null, 'x2', x2 ); 
	line.setAttributeNS(null, 'y2', y2 );
	if( 'fill' in properties ) {
		line.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		line.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		line.setAttributeNS(null, 'stroke-width', properties.strokeWidth );		 
	}
	if( 'strokeDasharray' in properties ) {
		line.setAttributeNS(null, 'stroke-dasharray', properties.strokeDasharray );				 
	}
	if( 'opacity' in properties ) {
		line.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return line;
}


function createCircle( x, y, radius, properties ) {
	let circle = document.createElementNS(NS, 'circle');
	if( 'id' in properties ) {
		circle.setAttributeNS(null, 'id', properties.id );		
	} 
	circle.setAttributeNS(null, 'cx', x ); 
	circle.setAttributeNS(null, 'cy', y ); 
	circle.setAttributeNS(null, 'r', radius ); 
	if( 'fill' in properties ) {
		circle.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		circle.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		circle.setAttributeNS(null, 'stroke-width', properties.strokeWidth );		 
	}
	if( 'opacity' in properties ) {
		circle.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return circle;
}


function createSVG( x, y, width, height, properties ) {
	let svg = document.createElementNS(NS,'svg');
	svg.setAttributeNS(null,'x',x);
	svg.setAttributeNS(null,'y',y);
	svg.setAttributeNS(null,'width', width );
	svg.setAttributeNS(null,'height', height );
	if( 'fill' in properties ) {
		svg.setAttributeNS(null, 'fill', properties.fill);	  
	}
	if( 'id' in properties ) {
		svg.setAttributeNS(null, 'id', properties.id);	  
	}
	return svg; 
}


function createDefs( appendToSVG ) {
	let defs = document.createElementNS(NS, 'defs');

	let marker = document.createElementNS(NS, 'marker');
	marker.setAttribute('id', 'arrow');
	marker.setAttribute('viewBox', '0 0 10 10');
	marker.setAttribute('refX', '5');
	marker.setAttribute('refY', '5');
	marker.setAttribute('markerUnits', 'strokeWidth');
	marker.setAttribute('markerWidth', _settings.ganttLinkArrowWidth ); //ganttSVGWidth*2 / ganttVisibleWidth );
	marker.setAttribute('markerHeight', _settings.ganttLinkArrowHeight ); //ganttSVGWidth*2 / ganttVisibleWidth );
	marker.setAttribute('orient', 'auto');
	let path = document.createElementNS(NS, 'path');
	path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
	path.setAttribute('fill', '#2f2f2f'/*'url(#blackToGrayGradient)'*/);
	marker.appendChild(path);
	defs.appendChild(marker);   

	let gradient1 = initLinearGradient( [{"color":"#cfcfdf","offset":"0%"},{"color":"#ffffff","offset":"100%"}], 'timeScaleGradient' );
	defs.appendChild(gradient1);

	let gradient2 = initLinearGradient( [{"color":"#f7f7f7","offset":"0%"},{"color":"#ffffff","offset":"100%"}], 'ganttGradient' );
	defs.appendChild(gradient2);

	let gradient3 = initLinearGradient( [{"color":"#2f2f2f","offset":"0%"},{"color":"#afafaf","offset":"100%"}], 'blackToGrayGradient' );
	defs.appendChild(gradient3);

	appendToSVG.appendChild(defs);
}


function initLinearGradient( stops, name ) {
	let gradient = document.createElementNS(NS, 'linearGradient');
	for( let i = 0 ; i < stops.length; i++ ) {
		let stop = document.createElementNS(NS, 'stop');
		stop.setAttribute('offset', stops[i].offset);
		stop.setAttribute('stop-color', stops[i].color);
		gradient.appendChild(stop);
	}
	gradient.id = name;
	gradient.setAttribute('x1', '0');
	gradient.setAttribute('x2', '1');
	gradient.setAttribute('y1', '0');
	gradient.setAttribute('y2', '0');
	return gradient;
}
