import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import CategoriesSelectionComp from './components/CategoriesSelectionComp';
import ResultArea from './components/ResultArea';
import React from 'react';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchTerm :"",
      searched :false
    }
  }
  handleInput = (input)=>{
    this.setState({
      searchTerm:input,
      searched:true
    });
  }
  render(){
  return (
    <div className="">

       <NavBar/>
       <SearchBar parentHandleFunc={this.handleInput}></SearchBar>
       <CategoriesSelectionComp ></CategoriesSelectionComp>
       <ResultArea searchTerm={this.state.searchTerm} searched = {this.state.searched}></ResultArea>
       
    </div>
    );
  }
}

export default App;
