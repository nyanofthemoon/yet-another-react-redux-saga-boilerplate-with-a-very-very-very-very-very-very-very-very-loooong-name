import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl-redux';
import { Spin, LocaleProvider } from 'antd';

import 'antd/dist/antd.less';

import Navigation from '../../components/Navigation';
import Home from '../../components/screens/Home';
import NoMatch from '../../components/screens/NoMatch';

import './style.scss';

import { loadApp } from '../../actions/app';

export class App extends React.Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.loadApp();
  }

  render() {
    const { app, history } = this.props;
    return (
      <IntlProvider id="locale-intl">
        <LocaleProvider id="locale-antd" locale={app.locale.antd}>
          <ConnectedRouter id="router" history={history}>
            <Spin id="loading-animation" size="large" spinning={app.showLoadingAnimation}>
              <div id="container">
                <Navigation id="navigator" />
                <Switch id="switch">
                  <Route id="route-home" exact path="/" component={Home} />
                  <Route id="route-nomatch" component={NoMatch} />
                </Switch>
              </div>
            </Spin>
          </ConnectedRouter>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.func.isRequired,
  app: PropTypes.isRequired,
  history: PropTypes.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadApp,
    }, dispatch),
  };
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default hot(module)(ConnectedApp);