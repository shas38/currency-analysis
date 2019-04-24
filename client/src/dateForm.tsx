import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
const DateForm = (props: any) => {

  return (
    <form>
    <Form.Row>
    <Col>
     <Form.Label>From Date</Form.Label>
        <input
          type="date"
          value={props.fromDate}
          onChange={props.newFromDate} />
    </Col>
    <Col>
      <Form.Label>To Date</Form.Label>
        <input
          type="date"
          value={props.toDate}
          onChange={props.newToDate} />
    </Col>
    <Col>
      <Form.Group>
        <Form.Label>Currencies</Form.Label>
          <Form.Control  as="select" multiple onChange={props.newCurrencySelected}>
          {props.currencyList.map((a: string, i: number) =>
          <option key={i} >{a}</option>
          )}
          </Form.Control>
      </Form.Group>
    </Col>
    </Form.Row>
    </form>
  )

}

export default DateForm;
