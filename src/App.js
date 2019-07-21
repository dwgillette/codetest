import React from 'react';
import axios from 'axios';
import './App.css';
import Card from './components/card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressStatus: null,
      cards: []
    }
    this.connectToServer = this.connectToServer.bind(this);
    this.cardList = this.cardList.bind(this);
  }

  componentDidMount() {
    // testing connection to express backend
    this.connectToServer()
      .then(res => this.setState({ 
        expressStatus: res.express 
      }))
      .catch(err => console.log(err));

    axios.get('/card_bank')
      .then(res => {
          this.setState({
            cards: res.data
          });
          console.log(res.data);
      })
      .catch(function (error){
          console.log(error);
      })
  }

  connectToServer = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  cardList() {
    return this.state.cards.map((currentCard, i) => {
      return <Card card={currentCard} key={i} />;
    })
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>React is working</h1>
          <h1>{ this.state.expressStatus }</h1>
          <div>
            { this.cardList() }
          </div>
        </header> 
      </div>
    );
  }
}

export default App;