/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import styles from './SetupColumn.less';
import withStyles from '../../decorators/withStyles';
import SortableList from '../SortableList';

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var data = {
  availableColumns: [
		{ id: 'startTime', name: 'Start Time'},
		{ id: 'stopTime', name: 'Stop Time'},
		{ id: 'perPoint', name: 'Per Point'},
		{ id: 'initialMargin', name: 'Initial Margin'}
  ],
	visibleColumns: [
		{ id: 'symbolAndDescription', name: 'Symbol & Description', isLocked: true},
		{ id: 'changePercent', name: 'Change %'},
		{ id: 'change', name: 'Change'},
		{ id: 'last', name: 'Last'},
		{ id: 'lastVolume', name: 'Last Volume'},
		{ id: 'bid', name: 'Bid'},
		{ id: 'bidSize', name: 'Bid Size'},
		{ id: 'ask', name: 'Ask'},
		{ id: 'askSize', name: 'Ask Size'},
		{ id: 'totalVolume', name: 'Total Volume'},
		{ id: 'high', name: 'High'}
	]
};

@withStyles(styles)
class SetupColumn extends React.Component {

  constructor() {
    super();
    this.state = {
      bodySize: {height: 'calc(100% - 166px)'},
      showModal: false,
      clone: { availableColumns: [], visibleColumns: [] } };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ bodySize: {height: 'calc(100% - 166px)'} });
  }

  cancel() {
    this.setState({ showModal: false });
  }

  open() {
    var clone = JSON.parse(JSON.stringify(data));
    this.setState({ showModal: true, clone: clone });
  }

  save() {
    data = this.state.clone;
    this.setState({ showModal: false });
  }

  onColumnsChanged() {
    this.setState({ clone: this.state.clone });
  }

  render() {
    return (
		<div className="SetupColumn">
			<div className="text-center">
				<Button className="btn-primary btn-lg btn-block"
                onClick={this.open.bind(this)}>
					Open Column Setup
				</Button>
			</div>
			<Modal show={this.state.showModal} onHide={this.cancel.bind(this)}>
				<Modal.Header closeButton>
					<Modal.Title>Configure Data Fields</Modal.Title>
					<span className="SetupColumn-titleDescription">Drag & drop between columns to configure visible data.</span>
				</Modal.Header>
				<Modal.Body style={this.state.bodySize}>
          <div className="SetupColumn-container">
            <div className="SetupColumn-row">
              <div className="SetupColumn-col">
                <span className="SetupColumn-titleDescription">Available</span>
              </div>
              <div className="SetupColumn-col-middle"/>
              <div className="SetupColumn-col">
                <span className="SetupColumn-titleDescription">Visible</span>
              </div>
            </div>
            <div className="SetupColumn-row">
              <div className="SetupColumn-col-fill  no-float">
                <SortableList data={this.state.clone} columns={this.state.clone.availableColumns} canLock='false' callbackParent={this.onColumnsChanged.bind(this)}/>
              </div>
              <div className="SetupColumn-col-middle SetupColumn-col-border  no-float"/>
              <div className="SetupColumn-col-fill  no-float">
                <SortableList data={this.state.clone} columns={this.state.clone.visibleColumns} canLock='true' callbackParent={this.onColumnsChanged.bind(this)}/>
              </div>
            </div>
          </div>
				</Modal.Body>
				<Modal.Footer>
					<div className="SetupColumn-footer text-left">
						<Button className="btn-primary SetupColumn-btn"
								onClick={this.save.bind(this)}>Save</Button>
						<Button className="btn-default SetupColumn-btn"
								onClick={this.cancel.bind(this)}>Cancel</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
		);
  }
}

export default SetupColumn;
