# Pointer
Module provides W3C Pointer Events for handling user input. Pointer events are modeled after traditional mouse events, except they use the abstract concept of a pointer to apply across all user input modalities, including mouse, touch, and pen. Use pointer events to create a seamless user experience across user input methods by writing to a single set of events that work across hardware capabilities.
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
- pointerleave
- pointerout
- pointercancel

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
For mouse, this is when the device transitions from at least one button depressed to no buttons depressed. For touch, this is when physical contact is removed from the digitizer. For pen, this is when the pen is removed from physical contact with the digitizer.

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
For mouse, this is when the device has at least one button depressed. For touch, this is when there is physical contact with the digitizer. For pen, this is when the pen has physical contact with the digitizer. For input devices that do not support hover, thepointerover event is fired immediately before the pointerdown event.

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

1. Event broadcasted if pointer was pressed and  pointer changes coordinates.
2. Event broadcasted when pointer changes coordinates regardless of pointer down state. **It mode works correctly only for devices which support hover**

First mode enabled as default. Call function `setMoveHoverState` with parameter `true` for switch to second mode
```javascript
pointer.setMoveHoverState(true);
```
Call function `setMoveHoverState` with parameter `false` for return to first mode.
```javascript
pointer.setMoveHoverState(false);
```
