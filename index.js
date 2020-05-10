var NS = "http://www.w3.org/2000/svg";

var _touchDevice=false;
var _files = { dashboard:"dashboard.php", logout:"logout.php" };

var _dashboardItems = [ 
	{ leftPct:1, topPct:1, widthPct:44, heightPct:44, properties:{ title:"Diagram #1", fill:'#ffddbb' }, 
		type:'line-chart', data:[ {x:10,y:10}, {x:20,y:20}, {x:30,y:10} ], attributes: { stroke:'#ff7733', pointFill:'red' } }, 
	{ leftPct:51, topPct:1, widthPct:44, heightPct:44, properties:{ title:"Diagram #2", fill:'#ffffaf' }, 
		type:'filled-line-chart', data:[ {x:10,y:10}, {x:20,y:20}, {x:30,y:15}, {x:40,y:22}, {x:50,y:12} ], attributes: { stroke:'#afafff', fill:'#4f4faa', pointFill:'red' } },
	{ leftPct:1, topPct:51, widthPct:44, heightPct:44, properties:{ title:"Diagram #3", fill:'#7fffff' }, 
		type:'table', data:{ columnTitles:['column1','column2'], rowTitles:['row1 ТЕКСТ В ЯЧЕЙКУ ТАБЛИЦЫ','row2'], rows: [ [10,20], [30,40] ] } }, 
	{ leftPct:51, topPct:51, widthPct:44, heightPct:44, properties:{ title:"Diagram #4", fill:'#ffafff' }, 
		type:'bar-chart', data:[ {x:10,y:10}, {x:20,y:20}, {x:30,y:15}, {x:40,y:22}, {x:50,y:12} ], attributes: {fill:'#ff00ff', stroke:'#550055' } }
];

var _dashboardContainer=null;
var _dashboardContainerWidth=0;
var _dashboardContainerHeight=0;

window.addEventListener( "load", loadDashboard );
window.onmousemove = function(e) { onWindowMouseMove(e); };
window.onmouseup = function(e) { onWindowMouseUp(e); };

if( 'ontouchstart' in document.documentElement ) { // To confirm it is a touch device or not...
	_touchDevice = true;
	document.getElementById('menuPrint').setAttribute('style','display:none');
}

function loadDashboard() {
	if( document.location.host ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if( this.status == 200) {
			    	let errorParsingData = false;
					//_projects = csvIntoJSON(this.responseText);
					_dashboardItems = JSON.parse(this.responseText);
			    	if( _dashboardItems.length == 0 ) { // To ensure data are parsed ok... // alert(this.responseText);
						displayMessageBox( _texts[_lang].errorLoadingDashboard ); 
						return;
			    	}
					hideMessageBox();
					initLayout();
					displayHeaderAndFooterInfo();
					initDashboard();
					displayDashboard();
				}
		    }
		};
		xmlhttp.open("GET", _files.dashboard, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.send();
		displayMessageBox( _texts[_lang].waitLoadingDashboard ); 
	} 
}


function initLayout() {
	if( _touchDevice ) {	
		document.documentElement.style.setProperty('--toolbox-table-height', '40px');
	}
	document.getElementById('helpTitle').innerText = _texts[_lang].helpTitle; // Initializing help text	
	document.getElementById('helpText').innerHTML = _texts[_lang].helpText; // Initializing help text

	let htmlStyles = window.getComputedStyle(document.querySelector("html"));
	let headerHeight = parseInt( htmlStyles.getPropertyValue('--header-height') );
	_dashboardContainerHeight = window.innerHeight - headerHeight;
	_dashboardContainerWidth = window.innerWidth;
	
	_dashboardContainer = document.getElementById('dashboardContainer');
	_dashboardContainer.style.top = headerHeight+'px';
	_dashboardContainer.style.width = _dashboardContainerWidth+'px';
	_dashboardContainer.style.height = _dashboardContainerHeight+'px';
	
	_dashboardContainer.addEventListener('selectstart', function(e) { e.preventDefault(); return false; } );
	_dashboardContainer.addEventListener('selectend', function(e) { e.preventDefault(); return false; } );
	
}


function displayHeaderAndFooterInfo() {
	let pageName = document.getElementById('pageName');
	pageName.innerText = _texts[_lang].pageName;
	if( _userName !== null ) {
		let el = document.getElementById('pageUser');
		if( !_touchDevice ) {
			el.innerHTML = _userName + "<br/><span style='cursor:pointer;' onclick='logout();'>[&rarr;]</span>";
		} else {
			el.setAttribute('style','font-size:16px; text-decoration:underline;');
			el.innerHTML = "<span style='cursor:pointer;' onclick='logout();'>" + _userName +  "</span>";
		}
	}
}
	

function resetCookies() {
	return;
	//deleteCookie('ganttVisibleLeft'); 		// 
}

function logout() {
	if( document.location.host ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if( this.status == 401 ) {
		    		window.location.replace('http://www.spiderproject.com/');
				}
		    }
		};
		xmlhttp.open("GET", _files.logout, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.send();
	} 
}


function csvIntoJSON(s) {
	
	let lines = s.split('\n');
	if( lines.length < 2 ) {
		return [];
	}
	let titles = lines[0].split('\t');
	if( titles.length < 3 ) {
		return [];
	}		
	titles[titles.length-1] = trimString( titles[titles.length-1] );

	let json = [];
	for( let i = 1 ; i < lines.length ; i++ ) {
		jsonLine = {};
		let line = lines[i].replace( String.fromCharCode(1), '\n' );
		let values = line.split('\t');
		if( values.length != titles.length ) {
			break;
		}
		for( let t = 0 ; t < titles.length ; t++ ) {
			jsonLine[ titles[t] ] = values[t]; 
		}
		json.push(jsonLine);
	}
	return json;
}
