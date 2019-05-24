import React from 'react';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

import {
  Form, Button, Col, Row, Card
} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends React.Component {
  state = { stackId: null };

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
    // const contract = drizzle.contracts.ControlAcceso;
    console.log(drizzleState.accounts[0]);
    const address = drizzleState.accounts[0];
    // let drizzle know we want to watch the `myString` method
    const message = 'Fire, walk with me.';
    // let hash = web3.utils.sha3(message);
    web3.eth.personal.sign(web3.utils.utf8ToHex(message), address, 'testpassword')
      .then((signedMessage) => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            m: message,
            sm: signedMessage,
            a: address
          })
        })
          .then((res) => {
            res.json()
              .then((result) => {
                console.log(result.data);
              });
          });
      });
    //web3.personal.sign('hola', drizzleState.accounts[0], '1234')
    //.then(console.log);
    //console.log('adfs');


    
    /* fetch('/api/singin', {drizzle 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostAddress: this.newUserAddress.current.value,
        hostname: this.newUserName.current.value
      })
    }); */
    this.input = '';
    // this.props.history.push('/')
    // event.preventDefault();
  }

  /*   state = { dataKey: null };
*/

  render() {
    // get the contract state from drizzleState
    // const { ControlAcceso } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    //  const user = ControlAcceso.idToUser[this.state.dataKey];

    // if it exists, then we display its value
    return (
      <>
        <Card bg="light">
          <Card.Header>Iniciar sesión</Card.Header>
          <Card.Body>
            { /* <Card.Title className="d-flex justify-content-center">Registrarse</Card.Title> */ }
            <div className="d-flex justify-content-center">
              <Button type="submit" onClick={this.handleSubmit}>Sing in</Button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Login;
