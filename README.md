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
- pointerout
- pointerleave
- pointercancel

**Warning:** Module does not support `gotpointercapture` and `lostpointercapture` events

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

1. Event broadcasted if pointer was pressed and  pointer changes coordinates (Sat as defaylt).
2. Event broadcasted when pointer changes coordinates regardless of pointer down state. **It mode works correctly only for devices which support hover**

First mode enabled as default. Call function `setMoveHoverState` with parameter `true` for switch to second mode
```javascript
pointer.setMoveHoverState(true);
```
Call function `setMoveHoverState` with parameter `false` for return to first mode.
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
Dispatched when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a `pointerdown` event from a device that does not support hover. This event type is similar to `pointerover`, but differs in that it does not bubble and cancelable.
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
* A pointing device is moved out of the hit test boundaries of an element
* After firing the `pointerup` event for a device that does not support hover
* After firing the `pointercancel` event
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
Dispatched when a pointing device is moved outside of the hit test boundaries of an element or one of its descendants, including as a result of a `pointerdown` event from a device that does not support hover. This event type is similar to `pointerout`, but differs in that it does not bubble and cancelable.
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
Dispatched when either (1) the system has determined that a pointer is unlikely to continue to produce events (for example, due to a hardware event), or (2) after having fired the pointerdown event, the pointer is subsequently used to manipulate the page viewport (for example, panning or zooming).
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
