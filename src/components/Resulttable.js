import Table from "react-bootstrap/Table";

function ResultTable(props) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>{props.infoMap}</tbody>
    </Table>
  );
}

export default ResultTable;
