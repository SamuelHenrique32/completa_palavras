import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../src/App.css';
import HomeView from "./HomeView"

class App extends Component {

  render(){
    return (
      <div className="App">
        <HomeView/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  const { palavra } = state
  
  return {
    palavra
  }
}

export default connect(mapStateToProps)(App)