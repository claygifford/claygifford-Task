/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import styles from './Header.less';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="claygifford" />
            <span className="Header-brandTxt">claygifford</span>
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">claygifford-Task</h1>
            <p className="Header-bannerDesc">Column Setup Component</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
