import React from 'react';
import {
  Form, Button, Col, Row, Card, Alert
} from 'react-bootstrap';

class Register extends React.Component {
  state = { stackId: null };

  constructor(props) {
    super(props);
    this.newUserAddress = React.createRef();
    this.newUserName = React.createRef();
    this.inputAdmin = React.createRef();

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { drizzle, drizzleState } = this.props;
    // const contract = drizzle.contracts.ControlAcceso;
    // console.log(drizzleState.accounts[0])
    // let drizzle know we want to watch the `myString` method
    // const stackId = contract.methods['addResource'].cacheSend(this.inputName.current.value, this.inputOrganization.current.value);
    let admin = false;
    if (this.inputAdmin.current.value === 'on') {
      admin = true;
    }
    // const stackId = contract.methods.addUser.cacheSend(this.newUserAddress.current.value, this.newUserName.current.value, admin, { gas: 6721975 });
    // this.setState({ stackId });
    // console.log(this.inputAdmin.current.value);
    const data = new FormData(event.target);
    console.log(data);
    
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hostAddress: this.newUserAddress.current.value,
        hostname: this.newUserName.current.value
      })
    });
    this.input = '';
    this.props.history.push('/login');
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
        <Alert variant="info">
          <Alert.Heading>Crear cuenta en Metamask</Alert.Heading>
          <p>
            Para poder continuar, has de crear una cuenta en Metamask si no la tienes y añadir la
            clave pública obtenida en el formulario de registro.
          </p>
        </Alert>
        <Card bg="light">
          <Card.Header>Crear cuenta</Card.Header>
          <Card.Body>
            { /* <Card.Title className="d-flex justify-content-center">Registrarse</Card.Title> */ }
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formPlaintextNewUserName">
                <Col sm="12">
                  <Form.Control name="newUserName" plaintext placeholder="username" ref={this.newUserName} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextNewUserName">
                <Col sm="12">
                  <Form.Control name="newUserAddress" plaintext placeholder="address" ref={this.newUserAddress} />
                </Col>
              </Form.Group>

              <div key="default-checkbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="Admin"
                  ref={this.inputAdmin}
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" onClick={this.handleSubmit}>Registrarse</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Register;
