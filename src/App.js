import React from 'react';
import axios from 'axios';
import './App.scss';
import Card from './components/card';
import CardHeader from './components/cardHeader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressStatus: null,
      liveCard: {},
      collection: [],
      presetQueue: [
        "Runaway Greenhouse Effect",
        "Gamma Ray Bursts",
        "Heat Death of the Universe",
        "Biotechnology",
        "Physics Experiments",
        "Artificial Intelligence",
        "Extraterrestrial Life",
        "Add one of your own!"
      ],
      index: 0
    }
    this.connectToServer = this.connectToServer.bind(this);
    this.retrieveCards = this.retrieveCards.bind(this);
    this.populateCollection = this.populateCollection.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.increment = this.increment.bind(this);
    this.createCard = this.createCard.bind(this);
    this.deleteFromCollection = this.deleteFromCollection.bind(this);
  }

  componentDidMount() {
    // testing connection to express backend
    this.connectToServer()
      .then(res => this.setState({ 
        expressStatus: res.express 
      }))
      .catch(err => console.log(err));
    
    // simulates session by new user
    axios.delete('/active_user/new_session', {});

    this.retrieveCards();
  }

  retrieveCards() {
    axios.get('/card_bank', { params: { name: this.state.presetQueue[this.state.index] } })
      .then(res => {
          this.setState({
            liveCard: res.data
          },
          function() {
            console.log(res.data);
          });
      })
      .catch(function (error){
          console.log(error);
      })

    axios.get('/active_user')
      .then(res => {
          this.setState({
            collection: res.data
          },
          function() {
            console.log(res.data);
          });
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

  increment() {
    if (this.state.index < this.state.presetQueue.length - 1) {
      this.setState({
        index: this.state.index + 1
      },
      // callback function
      function() {
        setTimeout(() => {this.retrieveCards()}, 500);
      })
    } else {
      this.retrieveCards();
    }
  }

  handleSwipe(param) {
    if (param === "accept" && this.state.index < this.state.presetQueue.length - 1) {
      this.createCard();
      this.increment();
    } else {
      this.increment();
    }
  }

  createCard() {
    // testing card creation
    const newCard = {
      name: this.state.liveCard.name,
      desc: this.state.liveCard.desc,
      fact: this.state.liveCard.fact,
      picture: this.state.liveCard.picture
    }

    axios.post('/active_user', newCard)
      .then(res =>  console.log(res.data))
      .catch(err => {
        console.error(err);
      });
  }

  deleteFromCollection(id) {
    if (id !== undefined) {
      axios.delete('/active_user', { params: { id: id } })
        .then(setTimeout(() => {this.retrieveCards()}, 500));
    }
  }

  populateCollection() {
    return this.state.collection.map((currentCard, i) => {
      return <CardHeader card={currentCard} key={i} onClick={this.deleteFromCollection}/>;
    })
  }

  render() {
    return (
      <div className="pageWrapper">
        <header className="header">
          <h1>{ this.state.expressStatus }</h1>
        </header>
        <body className="body">
          <div className="cardWindow">
            <Card card={this.state.liveCard} onClick={this.handleSwipe}/>
          </div>
          <div className="collectionPanel">
            { this.populateCollection() }
          </div>
        </body> 
      </div>
    );
  }
}

export default App;