import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import LoginUser from "./LoginUser";
// import ResourcesView from "./components/_resources/ResourcesView"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import AddResource from "./components/_resources/AddResource"
// import RequestView from "./components/_request/RequestView"
import { Container, Row, Col } from 'react-bootstrap';
import MainNavbar from './components/MainNavbar';
import Register from './components/Register';
import Login from './components/Login';
import AdminView from './components/admin/AdminView';
// import Example from './components/Collapse';
// import AdminView from './components/_admin/AdminView';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return 'Loading Drizzle...';
    return (
      <>
        <Router>
          <MainNavbar />
          <br />
          <Container fluid="true">
            <Row className="justify-content-md-center">
              <Col sm={4}>
                <Route
                  path="/register"
                  exact
                  render={
                    props => (
                      <Register
                        {...props}
                        drizzle={this.props.drizzle}
                        drizzleState={this.state.drizzleState}
                      />
                    )}
                />
                <Route
                  path="/"
                  exact
                  render={
                    props => (
                      <Login
                        {...props}
                        drizzle={this.props.drizzle}
                        drizzleState={this.state.drizzleState}
                      />
                    )}
                />
                <Route
                  path="/login"
                  exact
                  render={
                    props => (
                      <Login
                        {...props}
                        drizzle={this.props.drizzle}
                        drizzleState={this.state.drizzleState}
                      />
                    )}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <Route
                  path="/admin"
                  exact
                  render={
                      props => (
                        <AdminView
                          {...props}
                          drizzle={this.props.drizzle}
                          drizzleState={this.state.drizzleState}
                        />
                      )}
                />
              </Col>
            </Row>
          </Container>
        </Router>
      </>

    /* <button type="button" className="btn btn-primary">Login</button>
      <div className="App">
        <LoginUser
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    </div> */
    );
  }
}

export default App;
