# Pointer
The module provides W3C Pointer Events for handling user input. Pointer events are modeled after traditional mouse events, except for their use of the abstract concept of a pointer to apply across all user input modalities, including mouse, touch, and stylus pen. Use pointer events to create seamless user experience across user input methods by writing to a single set of events that work across hardware capabilities.
>
**Note:** Pointer supports multitouch mode. When a user will produce action two or more fingers for each finger module will send an event with a unique `pointerId`. 
>
You can disable multitouch mode. You should set parametr `enableMultiTouch` as false. In this case Pointer works only with one touch. If a user makes a multitouch gesture - the first point will be processed, while the others will be skipped.

[Example](http://rapid-application-development-js.github.io/Pointer/example)

---

##Initialization

```javascript
var $div = document.querySelector('#pointer');
var pointer = new PointerTracker($div);
```

##Supported Events
- pointerup
- pointerdown
- pointermove
- pointerover
- pointerenter
- pointerout
- pointerleave
- pointercancel

**Warning:** The module does not support `gotpointercapture` and `lostpointercapture` events.

-- 
###pointerup

Dispatched when a pointer leaves the state of having a non-zero value for the buttons property.
#####Syntax

```javascript
$div.addEventListener("pointerup", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.up, callback, useCapture);
```

#####Event information

Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  Yes 

#####Remarks
For mouse, this is when the device transitions from at least one button pressed to no buttons pressed. For touch, this is when physical contact is removed from the digitizer. For pen, this is when the pen is removed from physical contact with the digitizer.

For input devices that do not support hover, a pointerout event is also fired immediately after the pointerup event is fired.

--
###pointerdown
Dispatched when a pointer enters the state of having a non-zero value for the buttons property.
#####Syntax
```javascript
$div.addEventListener("pointerdown", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.down, callback, useCapture);
```
#####Event information

Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  Yes 
#####Remarks
For mouse, this is when the device has at least one button pressed. For touch, this is when there is physical contact with the digitizer. For pen, this is when the pen has physical contact with the digitizer. For input devices that do not support hover, thepointerover event is fired immediately before the pointerdown event.

--
###pointermove
Dispatched when a pointer changes coordinates, button state, pressure, tilt, or contact geometry (for example, width and height).
#####Syntax
```javascript
$div.addEventListener("pointermove", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.move, callback, useCapture);
```

#####Event information
Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  Yes 

#####Remarks
`pointermove` has two modes:

1. The event is broadcast if the pointer was pressed, and it changes the coordinates (Set by default).
2. The event is broadcast when the pointer changes coordinates regardless of the pointerdown state. **This mode works correctly only for devices which support hover**

You should call the `setMoveHoverState` function with a `true` parameter to switch to the second mode.

```javascript
pointer.setMoveHoverState(true);
```

Call the `setMoveHoverState` function with a `false` parameter to return to the first mode.

```javascript
pointer.setMoveHoverState(false);
```

--
###pointerover
Dispatched when a pointing device is moved into the hit test boundaries of an element. Also dispatched prior to a pointerdown event for devices that do not support hover.

#####Syntax

```javascript
$div.addEventListener("pointerover", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.over, callback, useCapture);
```

#####Event information
Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  Yes 

--

###pointerenter
Dispatched when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a `pointerdown` event from a device that does not support hover. This event type is similar to `pointerover`, but differs in that it does not bubble and is cancelable.

```javascript
$div.addEventListener("pointerenter", callback, useCapture);
```

or

```javascript
$div.addEventListener(pointer.EVENTS.enter, callback, useCapture);
```

#####Event information
Synchronous: Yes

Bubbles:	   No 

Cancelable:  No 

--

###pointerout
Dispatched when any of the following occurs:

* A pointing device is moved out of the hit test boundaries of an element.
* After firing the `pointerup` event for a device that does not support hover.
* After firing the `pointercancel` event.


```javascript
$div.addEventListener("pointerout", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.out, callback, useCapture);
```
#####Event information
Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  Yes

--
###pointerleave
Dispatched when a pointing device is moved outside of the hit test boundaries of an element or one of its descendants, including as a result of a `pointerdown` event from a device that does not support hover. This event type is similar to `pointerout`, but differs in that it does not bubble and is cancelable.

```javascript
$div.addEventListener("pointerleave", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.leave, callback, useCapture);
```
#####Event information
Synchronous: Yes

Bubbles:	   No 

Cancelable:  No 

--
###pointercancel 
Dispatched when either (1) the system has determined that a pointer is unlikely to continue to produce events (for example, due to a hardware event), or (2) after firing the pointerdown event, the pointer is subsequently used to manipulate the page viewport (for example, panning or zooming).

```javascript
$div.addEventListener("pointercancel", callback, useCapture);
```
or

```javascript
$div.addEventListener(pointer.EVENTS.cancel, callback, useCapture);
```

#####Event information
Synchronous: Yes

Bubbles:	   Yes 

Cancelable:  No
