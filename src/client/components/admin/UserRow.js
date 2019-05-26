import React from 'react';
import { Button } from 'react-bootstrap';

class UserRow extends React.Component {
  state = { dataKey: null };

  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ControlAcceso;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.getUser.cacheCall(this.props.idReq);
    // const dataKey2 = contract.methods['getRequestResource'].cacheCall(this.props.id);

    // save the `dataKey` to local component state for later reference
    // this.setState({ dataKey, dataKey2});
    this.setState({ dataKey });
  }

  handleAccept(id, event) {
    event.preventDefault();
    console.log('ajkds');
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ControlAcceso;
    console.log(drizzleState.accounts[0]);
    // let drizzle know we want to watch the `myString` method
    // const stackId = contract.methods['addResource'].cacheSend(this.inputName.current.value, this.inputOrganization.current.value);
    console.log('--------------------------------------');
    // console.log(id[0]);
    console.log(id[1]);
    console.log(id[2]);
    const stackId = contract.methods.setUserState.cacheSend(id[1], 1, { gas: 300000 });
    // save the `dataKey` to local component state for later reference
    this.setState({ stackId });

    // const form = event.target;
    // const data = new FormData(form);
    console.log(id);
    // this.input = '';
    // event.preventDefault();
  }

  handleCancel(id, event) {
    event.preventDefault();
    console.log('ajkds');
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ControlAcceso;
    console.log(drizzleState.accounts[0]);
    // let drizzle know we want to watch the `myString` method
    // const stackId = contract.methods['addResource'].cacheSend(this.inputName.current.value, this.inputOrganization.current.value);
    console.log('--------------------------------------');
    console.log(id[0]);
    console.log(id[1]);
    console.log(id[2]);
    const stackId = contract.methods.setUserState.cacheSend(id[1], 0, { gas: 300000 });
    // save the `dataKey` to local component state for later reference
    this.setState({ stackId });

    // const form = event.target;
    // const data = new FormData(form);
    console.log(id);
    // this.input = '';
    // event.preventDefault();
  }

  render() {
    // get the contract state from drizzleState
    const { ControlAcceso } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    // console.log(`Data key: ${this.state.dataKey}`);
    const request = ControlAcceso.getUser[this.state.dataKey];
    // const request = ControlAcceso.methods.getRequest().call()
    // const request2 = ControlAcceso.getRequestResource[this.state.dataKey2];

    console.log(request && request);
    // console.log(request2 && request2)

    // if it exists, then we display its value
    return (
      <tr>
        <td><br />{(request && request.value != null) && request.value[0]}</td>
        <td><br />{(request && request.value != null) && request.value[1]}</td>
        <td>
          <Button onClick={this.handleAccept.bind(this, request && request.value)} variant="success" size="sm">Aceptar</Button>
          <br />
          <Button onClick={this.handleCancel.bind(this, request && request.value)} variant="danger" size="sm">Cancelar</Button>
        </td>
      </tr>
    );
  }
}

export default UserRow;
