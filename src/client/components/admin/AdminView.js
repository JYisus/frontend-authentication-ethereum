import React from "react";
import {Row, Col} from "react-bootstrap"
import UserTable from "./UserTable"


class AdminView extends React.Component {
  
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ControlAcceso;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods['userCount'].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <UserTable {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default AdminView;
