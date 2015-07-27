/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import styles from './SortableList.less';
import withStyles from '../../decorators/withStyles';
import Draggable from '../Draggable';

// var DragElement = React.createClass({
  // propTypes: {
    // children: React.PropTypes.node.isRequired
  // },

  // componentDidMount: function() {
    // this.dragElement = document.createElement('div');
    // document.body.appendChild(this.dragElement);
    // this.child = React.render(this.props.children, this.dragElement);
  // },

  // componentDidUpdate: function() {
    // this.child = React.render(this.props.children, this.dragElement);
  // },

  // componentWillUnmount: function() {
    // React.unmountComponentAtNode(this.dragElement);
    // document.body.removeChild(this.dragElement);
  // },

  // render: function() {
    // return null;
  // }
// });

// var Draggable = React.createClass({
  // propTypes: {
    // children: React.PropTypes.node.isRequired
  // },

  // getInitialState: function() {
    // return {
      // mouseDown: false,
      // dragging: false
    // };
  // },

  // style: function() {
    // if (this.state.dragging) {
      // return {
        // position: 'absolute',
        // left: this.state.left,
        // top: this.state.top,
        // height: this.state.height,
        // width: this.state.width
        // };
    // } else {
      // return {};
    // }
  // },

  // onMouseDown: function(event) {
    // var pageOffset;
    // if (event.button === LEFT_BUTTON) {
      // event.stopPropagation();
      // this.addEvents();

      // var element = React.findDOMNode(this);
      // pageOffset = element.getBoundingClientRect();

      // return this.setState({
        // mouseDown: true,
        // originX: event.pageX,
        // originY: event.pageY,
        // elementX: pageOffset.left,
        // elementY: pageOffset.top,
        // offsetX: event.offsetX,
        // offsetY: event.offsetY,
        // height: pageOffset.height,
        // width: pageOffset.width
      // });
    // }
  // },

  // onMouseMove: function(event) {
    // var base, deltaX, deltaY, distance;
    // deltaX = event.pageX - this.state.originX;
    // deltaY = event.pageY - this.state.originY;
    // distance = Math.abs(deltaX) + Math.abs(deltaY);
    // if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      // this.setState({
        // dragging: true
      // });
      // if (typeof (base = this.props).onDragStart === 'function') {
        // base.onDragStart(this.props);
      // }
    // }
    // if (this.state.dragging) {
      // return this.setState({
        // left: this.state.elementX + deltaX + document.body.scrollLeft,
        // top: this.state.elementY + deltaY + document.body.scrollTop
      // }
      // );
    // }
  // },

  // onMouseUp: function() {
    // var base;
    // this.removeEvents();
    // if (this.state.dragging) {
      // if (typeof (base = this.props).onDragStop === 'function') {
        // base.onDragStop(this.props);
      // }
      // return this.setState({
        // dragging: false
      // });
    // }
  // },

  // onMouseEnter: function(event) {
    // var pageOffset, isBefore;

    // var element = React.findDOMNode(this);
    // pageOffset = element.getBoundingClientRect();

    // if ((pageOffset.top + pageOffset.height / 2) > event.pageY) {
      // isBefore = true;
    // } else {
      // isBefore = false;
    // }

    // var base;
    // if (typeof (base = this.props).onDragOver === 'function') {
      // base.onDragOver(this.props, isBefore);
    // }
  // },

  // onTargetMouseMove: function(event) {
    // var pageOffset, isBefore;

    // var element = React.findDOMNode(this);
    // pageOffset = element.getBoundingClientRect();

    // if ((pageOffset.top + pageOffset.height / 2) > event.pageY) {
      // isBefore = true;
    // } else {
      // isBefore = false;
    // }

    // var base;
    // if (typeof (base = this.props).onDragOver === 'function') {
      // base.onDragOver(this.props, isBefore);
    // }
  // },

  // onTargetMouseLeave: function() {
    // var base;
    // if (typeof (base = this.props).onDragLeave === 'function') {
      // base.onDragLeave(this.props);
    // }
  // },

  // addEvents: function() {
    // document.addEventListener('mousemove', this.onMouseMove);
    // return document.addEventListener('mouseup', this.onMouseUp);
  // },

  // removeEvents: function() {
    // document.removeEventListener('mousemove', this.onMouseMove);
    // return document.removeEventListener('mouseup', this.onMouseUp);
  // },

  // render: function() {
    // if (this.state.dragging) {
      // return (
      // <div>
        // <DragElement><div className='dragElement' style={this.style()}>{this.props.children}</div></DragElement>
        // {this.props.children}
      // </div>
      // );
    // }
    // return (
      // <div className='noselect'
           // onDragStart={this.dragStart}
           // onMouseDown={this.onMouseDown}
           // onMouseMove={this.onTargetMouseMove}
           // onMouseLeave={this.onTargetMouseLeave}>
           // {this.props.children}
      // </div>
    // );
  // }
// });

@withStyles(styles)
class SortableList extends React.Component {
  static propTypes = {
    data: React.PropTypes.any.isRequired,
    columns: React.PropTypes.any.isRequired,
    callbackParent: React.PropTypes.func.isRequired,
    canLock: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      columns: this.props.columns,
      canLock: this.props.canLock,
      isDragging: false };
  }

  dragStart(e) {
    e.item.isDragging = true;

    this.state.data.isDragging = true;
    this.setState({data: this.state.data, columns: this.state.columns});
  }

  dragStop(e) {
    var index;

    e.item.isDragging = false;
    this.state.data.isDragging = false;

    if (this.state.data.dropTarget === null) {
      return;
    }

    var target = this.state.data.dropTarget.target;
    var items = this.state.data.dropTarget.items;

    index = this.state.columns.indexOf(e.item);
    this.state.columns.splice(index, 1);

    index = items.indexOf(target);
    if (target.isInsertBefore) {
      items.splice(index, 0, e.item);
    } else {
      items.splice(++index, 0, e.item);
    }

    target.isInsertBefore = false;
    target.isInsertAfter = false;

    this.setState({data: this.state.data});
    this.props.callbackParent(this.state.data);
  }

  dragOver(e, isBefore) {
    if (this.state.data.isDragging) {
      e.item.isInsertBefore = isBefore;
      e.item.isInsertAfter = !isBefore;

      this.state.data.dropTarget = { target: e.item, items: this.state.columns };
      this.setState({data: this.state.data});
    }
  }

  dragLeave(e) {
    if (this.state.data.isDragging) {
      e.item.isInsertBefore = false;
      e.item.isInsertAfter = false;

      this.state.data.dropTarget = null;
      this.setState({data: this.state.data});
    }
  }

  doubleClick(item) {
    var column, i;

    if (this.state.canLock) {
      var index = this.state.columns.indexOf(item);
      if (item.isLocked){
        for	(i = index; i < this.state.columns.length; i++) {
          column = this.state.columns[i];
          if (column.isLocked) {
            column.isLocked = false;
          }
        }
      } else {
        for	(i = index; i > 0; i--) {
          column = this.state.columns[i];
          column.isLocked = true;
        }
      }
      this.setState({columns: this.state.columns});
    }
  }

  render() {
    var listItems = this.state.columns.map(function(item, i) {
      var classes = '';
      if (item.isDragging) {
        classes += 'dragging ';
      }
      if (item.isInsertBefore) {
        classes += 'insertBefore ';
      }
      if (item.isInsertAfter) {
        classes += 'insertAfter ';
      }

      if (item.isLocked)
      {
        return (
          <li className='locked noselect' onDoubleClick={this.doubleClick.bind(this, item)}><i className="fa fa-lock"></i> {item.name}</li>
        );
      }
      return (
      <Draggable item={item}
                 onDragStart={this.dragStart.bind(this)}
                 onDragStop={this.dragStop.bind(this)}
                 onDragOver={this.dragOver.bind(this)}
                 onDragLeave={this.dragLeave.bind(this)}>
        <li onDoubleClick={this.doubleClick.bind(this, item)} className={classes}>{item.isDragging ? <i className="fa fa-bars"></i> : null} {item.name}</li>
      </Draggable>);
    }, this);
    return (
      <div className="SortableList">
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default SortableList;
