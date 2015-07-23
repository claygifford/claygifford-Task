/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React, { PropTypes } from 'react';
import styles from './HomePage.less';
import withStyles from '../../decorators/withStyles';
import SetupColumn from '../SetupColumn';

@withStyles(styles)
class HomePage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Task - Home';
    this.context.onSetTitle(title);
    return (
		<div className="HomePage">
			<div className="HomePage-container container-fluid">
				<div className="HomePage-spacer">
					<div className="HomePage-box">
						<h1 className="HomePage-box-heading text-center">Column Setup</h1>
						<div className="text-center">
							<span className="fa-stack fa-5x">
								<i className="fa fa-circle fa-stack-2x"></i>
								<i className="fa fa-columns fa-stack-1x fa-inverse"></i>
							</span>
						</div>
						<div className="HomePage-spacer"></div>
						<SetupColumn />
						<div className="HomePage-box-footer"></div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default HomePage;
