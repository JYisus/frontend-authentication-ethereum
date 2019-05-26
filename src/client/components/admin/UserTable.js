import React from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';


class RequestTable extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ControlAcceso;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.userCount.cacheCall();
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    const { ControlAcceso } = this.props.drizzleState.contracts;

    const userCount = ControlAcceso.userCount[this.state.dataKey];

    const rows = [];

    if (userCount) {
      //console.log(countRequest.value);
      for (let i = 0; i < userCount.value; i++) {
        rows.push(
          <UserRow
            {...this.props}
            idReq={i}
            key={i}
          />
        );
      }
    }

    return (
      <>
        <h1 className="d-flex justify-content-center">Solicitudes</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Compañía</th>
              <th>Clave pública</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </>
    );
  }
}

export default RequestTable;
