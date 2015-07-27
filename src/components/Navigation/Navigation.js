/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Navigation.less';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withStyles(styles)
class Navigation {

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/" onClick={Link.handleClick}>Home</a>
        <a className="Navigation-link" href="/About" onClick={Link.handleClick}>About</a>
      </div>
    );
  }

}

export default Navigation;
