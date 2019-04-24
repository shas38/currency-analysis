// Import necessary libraries
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DateForm from './dateForm';
import ProfitTable from './profitTable';
import './App.css';

// Class component for holding the application state
class App extends Component {
  state: any
  // Initialise state
  constructor(props: any){
    super(props)
    this.state= {
      fromDate: '2018-05-07',
      toDate: '2018-05-08',
      profit: [],
      currencyList: [],
      currencySelected: []
    };
  }
  // Fetch the currency name list and the profits for that list once the component is mounted
  async componentDidMount () {
    await this.getCurrencies();
    this.getProfits();
  }
  // Async function for fetching the currency name list
  getCurrencies = async () =>{
    let data: any = await fetch('/api/currencies');
    data = await data.json();
    this.setState({currencyList: data, currencySelected: data})
  }
  // Async function for fetching profits for a given currency list and day interval
  getProfits = async () =>{
    const postData = {
      fromDate: this.state.fromDate.split('-').join(''),
      toDate: this.state.toDate.split('-').join(''),
      currencySelected: this.state.currencySelected
    }
    let data: any = await fetch('/api/profits', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postData), // body data type must match "Content-Type" header
    });
    data = await data.json();
    this.setState({profit: data})
  }
  // Function for handleing onChange of the fromDate input field
  newFromDate = async (e: any)=>{
    await this.setState({ fromDate: e.target.value })
    this.getProfits();
  }
  // Function for handleing onChange of the toDate input field
  newToDate = async (e: any)=>{
    await this.setState({ toDate: e.target.value })
    this.getProfits();
  }
  // Function for handleing onChange of the currency select input field
  newCurrencySelected = async (e: any)=>{
    const options = e.target.options;
    const values: Array<string> = [];
    Array.from(options).forEach((a: any) => {
      if(a.selected)
      values.push(a.value);
    })
    await this.setState({ currencySelected: values });
    this.getProfits();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <h1 style={{margin: '50px'}}>Currency Analyser</h1>
          </Container>
          <Container>
            <Row>
              <DateForm
                newFromDate={this.newFromDate}
                newToDate={this.newToDate}
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                currencyList={this.state.currencyList}
                newCurrencySelected={this.newCurrencySelected}
              />
            </Row>
          </Container>&nbsp;&nbsp;
          <Container>
            <Row className="justify-content-md-center">
            {Object.keys(this.state.profit).map(
              (currency: any, i: any)=>{
                return(
                  <Col key={i} sm="4">
                    <ProfitTable

                      data={this.state.profit[currency]}
                      currency={currency}
                    />
                  </Col>
                )
              }
            )}
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
