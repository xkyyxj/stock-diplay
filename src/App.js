import React, { Component } from 'react';
import './App.css';
import DashBoard from './gridPage/Dashboard'
import MainTable from './gridPage/MainTable'
import MainPage from './mainPage/MainPage'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        head: ['a', 'b', 'c'],
        data: [['2', '3', '4'],['5', '6', '7']]
      }
    }
  }

  render() {
    return (
      <div className="App">
        <MainPage data={this.state.data}/>
      </div>
    );
  }
}

export default App;
