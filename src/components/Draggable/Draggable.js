/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import DragElement from '../DragElement';

var LEFT_BUTTON = 0;
var DRAG_THRESHOLD = 3;

var Draggable = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  getInitialState: function() {
    return {
      mouseDown: false,
      dragging: false
    };
  },

  style: function() {
    if (this.state.dragging) {
      return {
        position: 'absolute',
        left: this.state.left,
        top: this.state.top,
        height: this.state.height,
        width: this.state.width
        };
    } else {
      return {};
    }
  },

  onMouseDown: function(event) {
    var pageOffset;
    if (event.button === LEFT_BUTTON) {
      event.stopPropagation();
      this.addEvents();

      var element = React.findDOMNode(this);
      pageOffset = element.getBoundingClientRect();

      return this.setState({
        mouseDown: true,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        height: pageOffset.height,
        width: pageOffset.width
      });
    }
  },

  onMouseMove: function(event) {
    var base, deltaX, deltaY, distance;
    deltaX = event.pageX - this.state.originX;
    deltaY = event.pageY - this.state.originY;
    distance = Math.abs(deltaX) + Math.abs(deltaY);
    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      this.setState({
        dragging: true
      });
      if (typeof (base = this.props).onDragStart === 'function') {
        base.onDragStart(this.props);
      }
    }
    if (this.state.dragging) {
      return this.setState({
        left: this.state.elementX + deltaX + document.body.scrollLeft,
        top: this.state.elementY + deltaY + document.body.scrollTop
      }
      );
    }
  },

  onMouseUp: function() {
    var base;
    this.removeEvents();
    if (this.state.dragging) {
      if (typeof (base = this.props).onDragStop === 'function') {
        base.onDragStop(this.props);
      }
      return this.setState({
        dragging: false
      });
    }
  },

  onMouseEnter: function(event) {
    var pageOffset, isBefore;

    var element = React.findDOMNode(this);
    pageOffset = element.getBoundingClientRect();

    if ((pageOffset.top + pageOffset.height / 2) > event.pageY) {
      isBefore = true;
    } else {
      isBefore = false;
    }

    var base;
    if (typeof (base = this.props).onDragOver === 'function') {
      base.onDragOver(this.props, isBefore);
    }
  },

  onTargetMouseMove: function(event) {
    var pageOffset, isBefore;

    var element = React.findDOMNode(this);
    pageOffset = element.getBoundingClientRect();

    if ((pageOffset.top + pageOffset.height / 2) > event.pageY) {
      isBefore = true;
    } else {
      isBefore = false;
    }

    var base;
    if (typeof (base = this.props).onDragOver === 'function') {
      base.onDragOver(this.props, isBefore);
    }
  },

  onTargetMouseLeave: function() {
    var base;
    if (typeof (base = this.props).onDragLeave === 'function') {
      base.onDragLeave(this.props);
    }
  },

  addEvents: function() {
    document.addEventListener('mousemove', this.onMouseMove);
    return document.addEventListener('mouseup', this.onMouseUp);
  },

  removeEvents: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    return document.removeEventListener('mouseup', this.onMouseUp);
  },

  render: function() {
    if (this.state.dragging) {
      return (
      <div>
        <DragElement><div className='dragElement' style={this.style()}>{this.props.children}</div></DragElement>
        {this.props.children}
      </div>
      );
    }
    return (
      <div className='noselect'
           onDragStart={this.dragStart}
           onMouseDown={this.onMouseDown}
           onMouseMove={this.onTargetMouseMove}
           onMouseLeave={this.onTargetMouseLeave}>
           {this.props.children}
      </div>
    );
  }
});

export default Draggable;
