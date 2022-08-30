import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import CategoriesSelectionComp from './components/CategoriesSelectionComp';
import TopHeadings from './components/TopHeadings';
import ResultArea from './components/ResultArea';

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      searchTerm :"",
      searched :false,
      pref :[]
    }
  }
  handleInput = (input)=>{
    this.setState({
      searchTerm:input,
      searched:true
    });
  }
  handleCat = (input)=>{
    this.setState({
      pref : input
    })
  }
  render(){
  return (
    <div className="">

       
       <BrowserRouter>
       <NavBar/>
       <SearchBar parentHandleFunc={this.handleInput}></SearchBar>
          <Routes>
            <Route path='/' element = {<><CategoriesSelectionComp sendPref={this.handleCat}/><TopHeadings pref={this.state.pref}/></>}></Route>
            <Route 
              path='/search' 
              element = {
                <ResultArea 
                searchTerm={this.state.searchTerm} 
                searched = {this.state.searched}>
                </ResultArea>
              }></Route>
          </Routes>
       </BrowserRouter>
      
       
       
    </div>
    );
  }
}

export default App;
