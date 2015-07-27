
import React, { PropTypes } from 'react';
import styles from './App.less';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import AppActions from '../../actions/AppActions';
import Header from '../Header';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../Footer';

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    path: PropTypes.string.isRequired
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState(event) {
    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

  render() {
    let component;

    switch (this.props.path) {

      case '/':
      case '/Home':
        component = <HomePage />;
        break;
      case '/About':
        component = <AboutPage />;
        break;
    }

    if (component) {
      return (
        <div>
          <Header />
          {component}
          <Footer />
        </div>
      );
    }
    return <NotFoundPage />;
  }

}

export default App;
