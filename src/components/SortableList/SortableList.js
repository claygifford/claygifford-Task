/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import styles from './SortableList.less';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class SortableList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: this.props.data, columns: this.props.columns};
  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';

    var key = e.currentTarget.dataset.key;
    e.dataTransfer.setData("text", key);

    this.state.data.dragged = this.getItemById(key);
    this.state.data.columnsOrigin = this.state.columns;
  }

  getItemById(id) {
    for(var i = 0; i < this.state.columns.length; i++) {
      if (this.state.columns[i].id === id) {
        return this.state.columns[i];
      }
    }
    return null;
  }

  getIndexById(id) {
    for(var i = 0; i < this.state.columns.length; i++) {
      if (this.state.columns[i].id === id) {
        return i;
      }
    }
    return null;
  }

  dataContainsId(id) {
    for(var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) {
        return true;
      }
    }
    return false;
  }

  dragEnd(e) {
    e.preventDefault();

    if (this.state.data.isValidDrop === false){
      return;
    }

    var item = this.state.data.dragged;

    //remove item from source.
    var index = this.getIndexById(item.id);
    if (index !== null) {
      this.state.columns.splice(index, 1);
    }

    this.setState({data: this.state.data, columns: this.state.columns});
  }

  dragEnter(e) {
    e.preventDefault();
    
     var item = this.state.data.dragged;

    // if the dragOver source is the same as the origin return.
    if (this.state.data.columnsOrigin === this.state.columns) {
      return;
    }

    var index = this.getIndexById(item.id);
    if (index !== null) {
      this.state.columns.splice(index, 1);
    }


    //this.dragged = e.currentTarget;

    // var item = this.state.data.dragged;
    // var over = e.currentTarget;
    // var dragging = this.state.data.dragging;
    // var from = isFinite(dragging) ? dragging : this.dragged;
    // var to = Number(over.dataset.id);
    // if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) {
      // to++;
    // }
    // if(from < to) {
      // to--;
    // }

    // Move from 'a' to 'b'
    //var items = this.state.data;
    //items.splice(to, 0, items.splice(from,1)[0]);
    //items.splice(0, 0, this.state.data.dragged);
    //this.sort(items, to);


    this.state.columns.splice(0, 0, this.state.data.dragged);
    this.setState({data: this.state.data, columns: this.state.columns});

    this.state.data.isValidDrop = true;
  }

  dragOver(e) {
    e.preventDefault();

    // var item = this.state.data.dragged;

    // // if the dragOver source is the same as the origin return.
    // if (this.state.data.columnsOrigin === this.state.columns) {
      // return;
    // }

    // var index = this.getIndexById(item.id);
    // if (index !== null) {
      // this.state.columns.splice(index, 1);
    // }


    // //this.dragged = e.currentTarget;

    // // var item = this.state.data.dragged;
    // // var over = e.currentTarget;
    // // var dragging = this.state.data.dragging;
    // // var from = isFinite(dragging) ? dragging : this.dragged;
    // // var to = Number(over.dataset.id);
    // // if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) {
      // // to++;
    // // }
    // // if(from < to) {
      // // to--;
    // // }

    // // Move from 'a' to 'b'
    // //var items = this.state.data;
    // //items.splice(to, 0, items.splice(from,1)[0]);
    // //items.splice(0, 0, this.state.data.dragged);
    // //this.sort(items, to);


    // this.state.columns.splice(0, 0, this.state.data.dragged);
    // this.setState({data: this.state.data, columns: this.state.columns});

    // this.state.data.isValidDrop = true;
  }

  dragLeave(e){
    e.preventDefault();

    var item = this.state.data.dragged;

    // if the dragOver source is the same as the origin return.
    if (this.state.data.columnsOrigin === this.state.columns) {
      return;
    }

    var index = this.getIndexById(item.id);
    if (index !== null) {
      this.state.columns.splice(index, 1);
      this.setState({columns: this.state.columns});
    }

    this.state.data.isValidDrop = false;
  }

  render() {
    var listItems = this.state.columns.map(function(item, i) {
      var dragging = (item === this.state.data.dragging) ? 'dragging' : '';
      return (
        <li data-id={i}
            data-key={item.id}
            className={dragging}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}>
          {item.name}
        </li>
      );
    }, this);
    return (
      <div className="SortableList">
        <ul onDragOver={this.dragOver.bind(this)}
            onDragEnter={this.dragEnter.bind(this)}
            onDragLeave={this.dragLeave.bind(this)}>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default SortableList;
