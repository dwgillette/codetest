import React from 'react';
import axios from 'axios';
import './App.scss';
import Card from './components/card';
import CardHeader from './components/cardHeader';
import CollectionHeader from './components/collectionHeader';
import CardCreator from './components/cardCreator';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressStatus: null,
      liveCard: {
        name: "Loading..",
        desc: "Loading..",
        fact: "Loading..",
        picture: "https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
      },
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
      index: 0,
      liveCardIsFromCollection: false,
      endList: false,
      creatorStyle: {
        display: "none"
      },
      createName: "",
      createDesc: "",
      createFact: "",
      createPicture: ""
    }
    this.connectToServer = this.connectToServer.bind(this);
    this.retrieveCards = this.retrieveCards.bind(this);
    this.populateCollection = this.populateCollection.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.increment = this.increment.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
    this.deleteFromCollection = this.deleteFromCollection.bind(this);
    this.toggleCardCreator = this.toggleCardCreator.bind(this);
    this.onChangeCreator = this.onChangeCreator.bind(this);
    this.createCard = this.createCard.bind(this);
    this.showCard = this.showCard.bind(this);
    this.returnCardToCollection = this.returnCardToCollection.bind(this);
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
        if (this.state.index === this.state.presetQueue.length - 1) {
          this.setState({
            endList: true
          })
        }
      })
    } else {
      this.retrieveCards();
    }
  }

  handleSwipe(param) {
    if (param === "accept") {
      if (this.state.liveCardIsFromCollection === false) {
        if (this.state.endList === false) {
          this.addToCollection();
          this.increment();
        } else {
          this.increment();
        }
      } else {
        this.returnCardToCollection();
        this.retrieveCards();
      }
    }

    if (param === "reject") {
      if (this.state.liveCardIsFromCollection === false) {
        this.increment();
      } else {
        this.returnCardToCollection();
        this.retrieveCards();
      }
    }
  }
    

  addToCollection() {
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
      return <CardHeader card={currentCard} key={i} onClick={this.deleteFromCollection} showCard={this.showCard} />;
    })
  }

  toggleCardCreator(param) {
    const activeStyle = { display: "flex" };
    const passiveStyle = { display: "none" };
    if (param === "show") {
      this.setState({
        creatorStyle: activeStyle,
        createName: "",
        createDesc: "",
        createFact: "",
        createPicture: ""
      })
    } else {
      this.setState({
        creatorStyle: passiveStyle
      })
    }
  }

  onChangeCreator(param, e) {
    if (param === "name") {
      console.log(e.target.value);
      this.setState({
        createName: e.target.value
      });
    } else if (param === "desc") {
      this.setState({
        createDesc: e.target.value
      });
    } else if (param === "fact") {
      this.setState({
        createFact: e.target.value
      });
    } else if (param === "picture") {
      this.setState({
        createPicture: e.target.value
      });
    }
  }

  createCard() {
    const newCard = {
      name: this.state.createName,
      desc: this.state.createDesc,
      fact: this.state.createFact,
      picture: this.state.createPicture
    }

    axios.post('/active_user', newCard)
      .then(res =>  console.log(res.data))
      .catch(err => {
        console.error(err);
      });
    
    setTimeout(() => {this.retrieveCards()}, 500);
    this.toggleCardCreator();

    if (this.state.endList === true) {
      this.setState({
        index: this.state.presetQueue.length - 1
      })
    }
  }

  showCard(name) {
    axios.get('/active_user/find_one', { params: { name: name } })
      .then(res => {
          this.setState({
            liveCard: res.data,
            liveCardIsFromCollection: true
          },
          function() {
            console.log(res.data);
          });
      })
      .catch(function(error) {
          console.log(error);
      });
    
   /* if (this.state.liveCardIsFromCollection === false) {
      this.setState({
        index: (this.state.endList === false) ?
        this.state.index - 1 :
        this.state.presetQueue.length - 1
      }, () => {
        this.setState({
          liveCardIsFromCollection: true
        })
      });
    }*/
  }

  returnCardToCollection() {
    this.setState({
      liveCardIsFromCollection: false
    })
  }

  render() {
    return (
      <div className="page-wrapper">
        <CardCreator 
          style={this.state.creatorStyle}
          name={this.state.createName}
          desc={this.state.createDesc}
          fact={this.state.createFact}
          picture={this.state.createPicture}
          onClick={this.toggleCardCreator}
          onChange={this.onChangeCreator}
          onSubmit={this.createCard} />
        <header className="header">
          <h1>{ this.state.expressStatus }</h1>
        </header>
        <body className="body">
          <div className="card-window">
            <Card card={this.state.liveCard} onClick={this.handleSwipe}/>
          </div>
          <div className="collection-panel">
            <CollectionHeader onClick={this.toggleCardCreator} />
            <div className="collection-container">
            { this.populateCollection() }
            </div>
          </div>
        </body> 
      </div>
    );
  }
}

export default App;