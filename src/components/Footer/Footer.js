/*! claygifford-Task | MIT License | https://github.com/claygifford/claygifford-task/ */

import React from 'react';
import styles from './Footer.less';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withViewport
@withStyles(styles)
class Footer {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">© clay gifford</span>
          <span className="Footer-spacer">·</span>
          <a className="Footer-link" href="/" onClick={Link.handleClick}>Home</a>
          <span className="Footer-spacer"> | </span>
          <span className="Footer-viewport Footer-text Footer-text--muted">Task</span>
        </div>
      </div>
    );
  }

}

export default Footer;
