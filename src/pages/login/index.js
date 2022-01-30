import { useState } from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Button, FormGroup, FormText, Input } from 'reactstrap';
import Widget from '../../components/Widget/Widget';
import Footer from '../../components/Footer/Footer';
import { loginUser } from '../../redux';

import loginImage from '../../assets/loginImage.svg';
import logo from '../../assets/logo.svg';
// import SofiaLogo from '../../components/Icons/SofiaLogo.js';
// import GoogleIcon from '../../components/Icons/AuthIcons/GoogleIcon.js';
// import TwitterIcon from '../../components/Icons/AuthIcons/TwitterIcon.js';
// import FacebookIcon from '../../components/Icons/AuthIcons/FacebookIcon.js';
// import GithubIcon from '../../components/Icons/AuthIcons/GithubIcon.js';
// import LinkedinIcon from '../../components/Icons/AuthIcons/LinkedinIcon.js';
// import { useLocation } from 'react-router-dom';
import { hasToken } from '../../services/authServices';

function LoginPage(props) {
  // const loading = useSelector((state) => state.auth.loading);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const errorMessage = useSelector((state) => state.auth.errorMessage);

  const dispatch = useDispatch();
  // const location = useLocation();

  const defaultFormData = {
    username: '',
    password: '',
  };

  const [state, setState] = useState(defaultFormData);

  // const { from } = props.location.state || { from: { pathname: '/' } };
  // console.log(props.location.state);

  if (hasToken()) {
    return <Redirect to="/" />;
    // window.location.pathname = '/';
  }

  // useEffect(() => {}, [isAuthenticated]);

  const doLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: state.username, password: state.password }));
  };

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Login</p>
                <div className="logo-block">
                  <img src={logo} alt="logo" style={{ width: '100px' }} />
                  {/* <p className="mb-0">ATMT</p> */}
                </div>
              </div>
              <form onSubmit={(event) => doLogin(event)} autoComplete="off">
                <FormGroup className="my-3">
                  <FormText>Username</FormText>
                  <Input
                    id="username"
                    className="input-transparent pl-3"
                    value={state.Username}
                    onChange={(event) => changeCreds(event)}
                    type="text"
                    required
                    name="username"
                    placeholder="Enter Username"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event) => changeCreds(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="Enter Password"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">
                    Login
                  </Button>
                </div>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div className="d-flex justify-content-center">
              <img src={loginImage} alt="Login page" width="90%" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default withRouter(LoginPage);
