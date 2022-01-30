/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

import errorImage from '../../assets/errorImage.svg';
import Footer from '../../components/Footer/Footer';

function ErrorPage() {
  return (
    <div className="error-page">
      <Container className="col-12">
        <Row className="d-flex flex-row-reverse align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <div className={styles.errorContainer}>
              <h1 className={styles.errorCode}>404</h1>
              <p className={styles.errorInfo}>Oops. Looks like the page you're looking for no longer exists</p>
              <p className={styles.errorHelp}>But we're here to bring you back to safety</p>
              <Link to="/">
                <Button className={`${styles.errorBtn} rounded-pill`} type="submit" color="secondary-red">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div className="d-flex justify-content-center">
              <img src={errorImage} alt="Error page" width="90%" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ErrorPage;
