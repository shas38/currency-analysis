import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DateForm from './dateForm';
import ProfitTable from './profitTable';
import './App.css';


const profit: Object = {
  BTC:
    { buy: { date: '20180507', time: '0915', price: 35.5 },
      sell: { date: '20180507', time: '1045', price: 38 },
      profit: 2.5 },
  ETC:
    { buy: { date: '20180508', time: '0900', price: 1.45 },
      sell: { date: '20180508', time: '1245', price: 2.5 },
      profit: 1.05 }
}
class App extends Component {
  state: any

  constructor(props: any){
    super(props)
    this.state= {
      fromDate: '2018-05-07',
      toDate: '2018-05-08',
      profit: []
    };
  }

  async componentDidMount () {
    fetch('/profits')
			.then(data => data.json())
			.then(data => this.setState({profit: data}))
  }


  newFromDate = (e: any)=>{
    this.setState({ fromDate: e.target.value })
  }
  newToDate = (e: any)=>{
    this.setState({ toDate: e.target.value })
  }

	submit = (e: any) => {
		console.log(`New State ${this.state.fromDate} ${this.state.toDate}`)
		e.preventDefault()
	}

  render() {

    return (
      <div className="App">
        <header className="App-header">
        <Container>
          <Row>
            <DateForm
              submit={this.submit}
              newFromDate={this.newFromDate}
              newToDate={this.newToDate}
              fromDate={this.state.fromDate}
              toDate={this.state.toDate}
            />
          </Row>
        </Container>&nbsp;&nbsp;
        <Container>
          <Row className="justify-content-md-center">
          {Object.keys(this.state.profit).map(
            (currency: any, i: any)=>{
              console.log(currency)
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
