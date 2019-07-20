import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressStatus: null
    }
    this.connectToServer = this.connectToServer.bind(this);
  }

  componentDidMount() {
    // testing connection to express backend
    this.connectToServer()
      .then(res => this.setState({ 
        expressStatus: res.express 
      }))
      .catch(err => console.log(err));
  }

  connectToServer = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div>
        <header className="header">
          <h1>React is working</h1>
          <h1>{ this.state.expressStatus }</h1>
        </header> 
      </div>
    );
  }
}

export default App;