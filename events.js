
var _mouseDownEl=null;
var _mouseDownElInitialLeft=null, _mouseDownElInitialTop=null, 
	_mouseDownElInitialWidth=null, _mouseDownElInitialHeight=null;
var _mouseDownX=null, _mouseDownY=null;
var _mouseDownResize=null;

function onWindowMouseMove(e) {
	if( _mouseDownEl === null ) {
		return;
	}
	if( _mouseDownResize ) {
		_mouseDownEl.style.width = (_mouseDownElInitialWidth + (e.pageX - _mouseDownX)).toString() + 'px';
		_mouseDownEl.style.height = (_mouseDownElInitialHeight + (e.pageY - _mouseDownY)).toString() + 'px';
		let itemIndex = _mouseDownEl.getAttribute('data-i');
		let svg = _dashboardItems[itemIndex].svg;
		svg.setAttributeNS(null,'width',_mouseDownEl.style.width);
		svg.setAttributeNS(null,'height',_mouseDownEl.style.height);
	} else {
		let newLeft = _mouseDownElInitialLeft + (e.pageX - _mouseDownX);
		let newTop = _mouseDownElInitialTop + (e.pageY - _mouseDownY);
		_mouseDownEl.style.left = newLeft+'px';
		_mouseDownEl.style.top = newTop+'px';
	}
}


function onWindowMouseUp(e, el) {
	_mouseDownEl = null;
}


function onDashboardMouseDown(e, el) {
	_mouseDownX = e.pageX;
	_mouseDownY = e.pageY;
	_mouseDownEl = el;
	
	_mouseDownElInitialLeft = parseInt(el.style.left);	
	_mouseDownElInitialTop = parseInt(el.style.top);	
	_mouseDownElInitialWidth = parseInt(el.style.width);	
	_mouseDownElInitialHeight = parseInt(el.style.height);	
	/*
	let rect = el.getBoundingClientRect();
	_mouseDownElInitialLeft = rect.left;	
	_mouseDownElInitialTop = rect.top;
	_mouseDownElInitialWidth = rect.width;	
	_mouseDownElInitialHeight = rect.height;
	*/
	let elIndex = _mouseDownEl.getAttribute('data-i');
	let elZ = parseInt(_dashboardItems[elIndex].div.style.zIndex);
	let maxIndex = elIndex;
	let maxZ = elZ;
	for( let i = 0 ; i < _dashboardItems.length ; i++ ) {
		let z = parseInt(_dashboardItems[i].div.style.zIndex);
		if( z > maxZ ) {
			maxZ = z;
			maxIndex = i;
		}
	}
	if( elIndex != maxIndex ) {
		_dashboardItems[maxIndex].div.style.zIndex = elZ;
		_dashboardItems[elIndex].div.style.zIndex = maxZ;
	}		
}

function onDashboardItemMouseDown(e, el) {
	//console.log("onDashboardItemMouseDown");
	onDashboardMouseDown(e, el);
	_mouseDownResize = false;
}

function onDashboardResizeMouseDown(e, el) {
	e.stopPropagation();
	onDashboardMouseDown(e, el);
	_mouseDownResize = true;
}
	