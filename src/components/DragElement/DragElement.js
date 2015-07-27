/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';

var DragElement = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  componentDidMount: function() {
    this.dragElement = document.createElement('div');
    document.body.appendChild(this.dragElement);
    this.child = React.render(this.props.children, this.dragElement);
  },

  componentDidUpdate: function() {
    this.child = React.render(this.props.children, this.dragElement);
  },

  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.dragElement);
    document.body.removeChild(this.dragElement);
  },

  render: function() {
    return null;
  }
});

export default DragElement;
