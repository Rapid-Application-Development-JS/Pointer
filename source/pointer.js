(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.PointerTracker = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.PointerTracker = factory());
  } else {
    root.PointerTracker = factory();
  }
}(this, function () {
  var STRINGS = {
    pointerDown: 'pointerdown',
    pointerMove: 'pointermove',
    pointerUp: 'pointerup',
    pointerCancel: 'pointercancel',
    pointerOut: 'pointerout',
    pointerLeave: 'pointerleave',
    pointerEnter: 'pointerenter',
    pointerOver: 'pointerover',
    //
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchend: 'touchend',
    touchcancel: 'touchcancel',
    //
    mousedown: 'mousedown',
    mousemove: 'mousemove',
    mouseup: 'mouseup',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
    mouseleave: 'mouseleave',
    mouseenter: 'mouseenter'
  };
  if (window.MSPointerEvent && !window.PointerEvent) {
    STRINGS.pointerDown = 'MSPointerDown';
    STRINGS.pointerMove = 'MSPointerMove';
    STRINGS.pointerUp = 'MSPointerUp';
    STRINGS.pointerCancel = 'MSPointerCancel';
    STRINGS.pointerOut = 'MSPointerOut';
    STRINGS.pointerLeave = 'MSPointerLeave';
    STRINGS.pointerEnter = 'MSPointerEnter';
    STRINGS.pointerOver = 'MSPointerOver';
  }
  function PointerTracker(element) {
    var _moveHoverState = false;
    this.version = "1.0.2";
    this._el = element;
    this.isDown = false;
    this.chancelId = false;
    this.enableMultiTouch = true;
    this.setMoveHoverState = function (moveHoverState) {
      _moveHoverState = moveHoverState;
    };
    this.getMoveHoverState = function () {
      return _moveHoverState;
    };
    if (!window.navigator.msPointerEnabled) {
      if (!this.isTouched) {
        this._el.addEventListener(STRINGS.mousedown, this, false);
        this._el.addEventListener(STRINGS.mouseup, this, false);
        this._el.addEventListener(STRINGS.mousemove, this, false);
        this._el.addEventListener(STRINGS.mouseout, this, false);
        this._el.addEventListener(STRINGS.mouseover, this, false);
        this._el.addEventListener(STRINGS.mouseleave, this, false);
        this._el.addEventListener(STRINGS.mouseenter, this, false);
      } else {
        this._el.addEventListener(STRINGS.touchstart, this, false);
        this._el.addEventListener(STRINGS.touchend, this, false);
        this._el.addEventListener(STRINGS.touchmove, this, false);
        this._el.addEventListener(STRINGS.touchcancel, this, false);
      }
    } else {
      var that = this,
        eventHandlerIE = function (event) {
          that.handleEventIE(event);
        },
        eventHandler = function (event) {
          that.handleEvent(event);
        };
      if (window.navigator.pointerEnabled) {
        this._el.addEventListener(STRINGS.pointerDown, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerMove, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerUp, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerOut, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerLeave, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerEnter, eventHandlerIE, true);
        this._el.addEventListener(STRINGS.pointerOver, eventHandlerIE, true);
      } else {
        this._el.addEventListener(STRINGS.pointerDown, eventHandler, true);
        this._el.addEventListener(STRINGS.pointerMove, eventHandler, true);
        this._el.addEventListener(STRINGS.pointerUp, eventHandler, true);
        this._el.addEventListener(STRINGS.pointerOut, eventHandler, false);
        this._el.addEventListener(STRINGS.pointerLeave, eventHandler, false);
        this._el.addEventListener(STRINGS.pointerEnter, eventHandler, false);
        this._el.addEventListener(STRINGS.pointerOver, eventHandler, true);
      }
      this._el.addEventListener(STRINGS.pointerCancel, eventHandler, false);
    }
    this.destroy = function () {
      if (!this.isTouched) {
        this._el.removeEventListener(STRINGS.mousedown, this);
        this._el.removeEventListener(STRINGS.mouseup, this);
        this._el.removeEventListener(STRINGS.mousemove, this);
        this._el.removeEventListener(STRINGS.mouseout, this);
        this._el.removeEventListener(STRINGS.mouseover, this);
        this._el.removeEventListener(STRINGS.mouseleave, this);
        this._el.removeEventListener(STRINGS.mouseenter, this);
      } else {
        this._el.removeEventListener(STRINGS.touchstart, this);
        this._el.removeEventListener(STRINGS.touchend, this);
        this._el.removeEventListener(STRINGS.touchmove, this);
        this._el.removeEventListener(STRINGS.touchcancel, this);
      }
      delete this._el;
    };
  }

  PointerTracker.prototype = {
    EVENTS: {
      up: 'pointerup',
      down: 'pointerdown',
      move: 'pointermove',
      over: 'pointerover',
      cancel: 'pointercancel',
      out: 'pointerout',
      leave: 'pointerleave',
      enter: 'pointerenter'
    },
    isPointerHoverEventReceived: false,
    isTouched: 'ontouchstart' in window || window.navigator.msPointerEnabled,
    handleEventIE: function (event) {
      if (!event.isPrimary) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
      } else {
        switch (event.type) {
          case STRINGS.pointerDown:
            this.isDown = true;
            break;
          case STRINGS.pointerMove:
            if (!this.getMoveHoverState()) {
              if (!this.isDown) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
              }
            }
            break;
          case STRINGS.pointerUp:
          case STRINGS.pointerCancel:
          case STRINGS.pointerOut:
            this.isDown = false;
        }
      }
    },
    handleEvent: function (event) {
      if (this.chancelId !== null) {
        clearTimeout(this.chancelId);
      }
      switch (event.type) {
        case STRINGS.touchmove:
        case STRINGS.mousemove:
        case STRINGS.pointerMove:
          if (this.getMoveHoverState() || this.isDown) {
            this._fireEvent(this.EVENTS.move, event);
          }
          break;
        case STRINGS.touchstart:
        case STRINGS.mousedown:
        case STRINGS.pointerDown:
          this.isDown = true;
          this.chancelId = false;
          if (!this.isPointerHoverEventReceived) {
            this._fireEvent(this.EVENTS.over, event);
            this._fireEvent(this.EVENTS.enter, event);
          }
          this._fireEvent(this.EVENTS.down, event);
          break;
        case STRINGS.touchend:
        case STRINGS.pointerUp:
        case STRINGS.touchcancel:
        case STRINGS.mouseup:
          if (this.isDown) {
            this.isDown = false;
            this._fireEvent(this.EVENTS.up, event);
            if (!this.isPointerHoverEventReceived) {
              this._fireEvent(this.EVENTS.out, event);
              this._fireEvent(this.EVENTS.leave, event, false, false);
            }
          }
          break;
        case STRINGS.mouseover:
          this.isPointerHoverEventReceived = true;
          this._fireEvent(this.EVENTS.over, event);
          break;
        case STRINGS.pointerEnter:
        case STRINGS.mouseenter:
          this.isPointerHoverEventReceived = true;
          this._fireEvent(this.EVENTS.enter, event, false, false);
          break;
        case STRINGS.pointerLeave:
        case STRINGS.mouseleave:
          this.isPointerHoverEventReceived = true;
          this._fireEvent(this.EVENTS.leave, event, false, false);
          break;
        case STRINGS.pointerOut:
        case STRINGS.mouseout:
          this.isPointerHoverEventReceived = true;
          var pointerTracker = this;
          this._fireEvent(this.EVENTS.out, event);
          if (this.isDown) {
            this.chancelId = setTimeout(function () {
              pointerTracker.isDown = false;
              pointerTracker._fireEvent(pointerTracker.EVENTS.cancel, event, true, false);
              pointerTracker.chancelId = null;
            }, 10);
          }
          break;
        case STRINGS.pointerCancel:
          pointerTracker.isDown = false;
          pointerTracker._fireEvent(pointerTracker.EVENTS.cancel, event, true, false);
          this._fireEvent(this.EVENTS.out, event);
          this._fireEvent(this.EVENTS.leave, event, false, false);
          break;
      }
    },
    _fireEvent: function (type, event, canBubble, cancellable) {
      canBubble = arguments.length < 3 ? true : !!canBubble;
      cancellable = arguments.length < 4 ? true : !!cancellable;
      if (this.enableMultiTouch) {
        this._fireMultiTouchEvent(type, event, canBubble, cancellable);
      } else {
        this._fireSimpleEvent(type, event, canBubble, cancellable);
      }
    },
    _fireMultiTouchEvent: function (type, event, canBubble, cancellable) {
      var touchEvent = event, index, length;
      if (this.isTouched) {
        if (window.navigator.msPointerEnabled) {
          if (!event.isPrimary) {
            return false;
          }
          //touchEvent = event;
          this.touchID = event.pointerId;
        } else {
          for (index = 0, length = event.changedTouches.length; index < length; index++) {
            touchEvent = event.changedTouches[index];
            this.touchID = touchEvent.identifier;
            this._sendEvent(type, event, canBubble, cancellable, touchEvent);
          }
        }
      } else {
        this.touchID = 1;
        this._sendEvent(type, event, canBubble, cancellable, touchEvent);
      }
      return true;
    },
    _sendEvent: function (type, event, canBubble, cancellable, touchEvent) {
      var customEvent = document.createEvent('MouseEvents');
      customEvent.initMouseEvent(type, canBubble, cancellable, window, 1,
        touchEvent.screenX, touchEvent.screenY, touchEvent.clientX, touchEvent.clientY,
        event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, event.relatedTarget);
      customEvent.preventDefault = function () {
        if (event.preventDefault !== undefined) {
          event.preventDefault();
        }
      };
      if (customEvent.stopPropagation !== undefined) {
        var current = customEvent.stopPropagation;
        customEvent.stopPropagation = function () {
          if (event.stopPropagation !== undefined) {
            event.stopPropagation();
          }
          current.call(this);
        };
      }
      customEvent.pointerId = this.touchID;
      customEvent.pointerType = this.isTouched ? 'touch' : 'mouse';
      customEvent.isPrimary = true;
      // firefox dirty hack
      if (customEvent.__defineGetter__) {
        customEvent.__defineGetter__('timeStamp', function () {
          return event.timeStamp;
        });
      }
      event.target.dispatchEvent(customEvent);
      return true;
    },
    _fireSimpleEvent: function (type, event, canBubble, cancellable) {
      var touchEvent = event, index, length, customEvent;
      if (this.isTouched) {
        if (window.navigator.msPointerEnabled) {
          if (!event.isPrimary) {
            return false;
          }
          touchEvent = event;
          this.touchID = event.pointerId;
        } else if (event.type === STRINGS.touchstart) {
          if (event.touches.length > 1) {
            return false;
          }
          touchEvent = event.touches[0];
          this.touchID = event.touches[0].identifier;
        } else {
          for (index = 0, length = event.changedTouches.length; index < length; index++) {
            touchEvent = event.changedTouches[index];
            if (touchEvent.identifier === this.touchID) {
              break;
            }
          }
          if (touchEvent.identifier !== this.touchID) {
            return false;
          }
        }
      } else {
        this.touchID = 1; // mouse
      }
      customEvent = document.createEvent('MouseEvents');
      customEvent.initMouseEvent(type, canBubble, cancellable, window, 1,
        touchEvent.screenX, touchEvent.screenY, touchEvent.clientX, touchEvent.clientY,
        event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, event.relatedTarget);
      customEvent.preventDefault = function () {
        if (event.preventDefault !== undefined) {
          event.preventDefault();
        }
      };
      if (customEvent.stopPropagation !== undefined) {
        var current = customEvent.stopPropagation;
        customEvent.stopPropagation = function () {
          if (event.stopPropagation !== undefined) {
            event.stopPropagation();
          }
          current.call(this);
        };
      }
      customEvent.pointerId = this.touchID;
      customEvent.pointerType = this.isTouched ? 'touch' : 'mouse';
      customEvent.isPrimary = true;
      // firefox dirty hack
      if (customEvent.__defineGetter__) {
        customEvent.__defineGetter__('timeStamp', function () {
          return event.timeStamp;
        });
      }
      event.target.dispatchEvent(customEvent);
      return true;
    }
  };
  return PointerTracker;
}));
