import React, { useEffect, useState } from "react";
import { Card, Container, Form, InputGroup } from "react-bootstrap";
import Calendar from "../components/Calendar";
import moment from "moment";

function Home() {
  const [date, setDate] = useState(
    moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")
  );

  const handleFileChange = (e) => {
    setDate(moment(e.target.value, "YYYY-MM-DD"));
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card>
          <Card.Header>Custom Calendar component</Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Control type="date" onChange={handleFileChange} />
            </InputGroup>
            <Calendar date={date} />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Home;
