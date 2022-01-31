/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
// -- React and related libs
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

// -- Redux
import { connect } from 'react-redux';

// -- Third Party Libs
import { ToastContainer } from 'react-toastify';

// -- Custom Components
import LayoutComponent from './components/Layout';
import ErrorPage from './pages/error';
import LoginPage from './pages/login';

// -- Redux Actions
import { logoutUser } from './redux';

// -- Services
import { hasToken } from './services/authServices';

// -- Component Styles
import './styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ dispatch, component, ...rest }) {
  if (!hasToken()) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  }
  return <Route {...rest} render={(props) => React.createElement(component, props)} />;
}

function App(props) {
  return (
    <Router>
      <div>
        <ToastContainer autoClose={2000} />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error" component={ErrorPage} />
          <PrivateRoute path="/" dispatch={props.dispatch} component={LayoutComponent} />
          {/* <Route component={ErrorPage} />
          <Route path="*" exact render={() => <Redirect to="/error" />} /> */}
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
