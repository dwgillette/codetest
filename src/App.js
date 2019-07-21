import React from 'react';
import axios from 'axios';
import './App.scss';
import Card from './components/card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressStatus: null,
      cards: [],
      presetQueue: [
        "Runaway Greenhouse Effect",
        "Gamma Ray Bursts",
        "Heat Death of the Universe",
        "Biotechnology",
        "Physics Experiments",
        "Artificial Intelligence",
        "Extraterrestrial Life"
      ],
      index: 0
    }
    this.connectToServer = this.connectToServer.bind(this);
    this.cardList = this.cardList.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentDidMount() {
    // testing connection to express backend
    this.connectToServer()
      .then(res => this.setState({ 
        expressStatus: res.express 
      }))
      .catch(err => console.log(err));

    axios.get('/card_bank', { params: { name: this.state.presetQueue[this.state.index] } })
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

  createPresetQueue() {
    let queue = [];
    this.state.cards.map((currentCard, i) => {
      return queue.push({card: currentCard, key: i});
    })
    console.log(queue);
    this.setState({
      presetQueue: [...queue]
    })
  }

  cardList() {
    console.log(this.state.cards);
    return this.state.cards.map((currentCard, i) => {
      return <Card card={currentCard} key={i} onClick={this.handleSwipe}/>;
    })
  }

  handleSwipe(param) {
    /*if (param === "accept") {
      this.createCard();
    }*/

    this.setState({
      index: this.state.index + 1
    },
    // callback function
    function() {
      axios.get('/card_bank', { params: { name: this.state.presetQueue[this.state.index] } })
      .then(res => {
          this.setState({
            cards: res.data
          });
          console.log(res.data);
      })
      .catch(function (error){
          console.log(error);
      })
    })
  }

  createCard() {
    // testing card creation
    const newCard = {
      name: "test",
      desc: "description",
      fact: "fun fact",
      picture: "url"
    }

    axios.post('/active_user', newCard)
      .then(res => console.log(res.data))
      .catch(err => {
        console.error(err);
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