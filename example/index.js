
    var $div = document.querySelector('#pointer');
    var $console = document.querySelector('#console');

    var pointer = new PointerTracker($div);
console.log(pointer);
    for(var eventName in pointer.EVENTS){
        console.log(pointer.EVENTS[eventName]);
        $div.addEventListener(pointer.EVENTS[eventName], function (event) {
            $console.innerHTML = getTime()+': '+event.type+ '\n'+ $console.innerHTML;
        }, false);
    }

    function getTime() {
        var currentdate = new Date();
        return ((currentdate.getHours()<10) ? "0"+currentdate.getHours() : currentdate.getHours()) + ":"
            + ((currentdate.getMinutes()<10) ? "0" + currentdate.getMinutes() : currentdate.getMinutes())+":"
            + ((currentdate.getSeconds()<10) ? "0"+currentdate.getSeconds() : currentdate.getSeconds());
    }

    function onChange(){
        pointer.setDoubleGuardState(document.getElementById('checkbox').checked);
    }
