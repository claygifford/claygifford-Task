/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React, { PropTypes } from 'react';
import styles from './AboutPage.less';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class AboutPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Task - About';
    this.context.onSetTitle(title);
    return (
		<div className="AboutPage">
      <div className="container">
        <div className="row">
          <h1>This project is a Test for Tradovate.</h1>
          <p>You can use this app to simulate drag and drop for a Column Setup dialog according to a few business rules. There are two sets of columns, available and visible. Hopefully you like it!</p>
          <hr></hr>
          <p><a href="https://github.com/claygifford/claygifford-task">https://github.com/claygifford/claygifford-task</a></p>
        </div>
      </div>
    </div>
    );
  }
}

export default AboutPage;
