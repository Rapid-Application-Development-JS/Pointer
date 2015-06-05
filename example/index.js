var $div = document.querySelector('#pointer');
var $console = document.querySelector('#console');
var pointer = new PointerTracker($div);
for (var eventName in pointer.EVENTS) {
	console.log(pointer.EVENTS[eventName]);
	$div.addEventListener(pointer.EVENTS[eventName], function (event) {
		var $eventElement = document.createElement('div');
		$eventElement.innerHTML = getTime() + '; pointerId: ' + event.pointerId+ '; type: '+ event.type+ '; x:y '+event.x+':'+event.y;
		$console.insertBefore($eventElement, $console.firstChild);
	}, false);
}
function getTime() {
	var currentdate = new Date();
	return ((currentdate.getHours() < 10) ? "0" + currentdate.getHours() : currentdate.getHours()) + ":"
		+ ((currentdate.getMinutes() < 10) ? "0" + currentdate.getMinutes() : currentdate.getMinutes()) + ":"
		+ ((currentdate.getSeconds() < 10) ? "0" + currentdate.getSeconds() : currentdate.getSeconds());
}
function onChange() {
	pointer.setMoveHoverState(document.getElementById('checkbox').checked);
}
