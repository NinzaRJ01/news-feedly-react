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
      useDate:false,
      fromDate:"",
      toDate:"",
      pref :['business'],
      link:""
    }
  }
  handleInput = ({searchVal,useDate,fromDate,toDate,link})=>{
    
    this.setState({
      searchTerm:searchVal,
      searched:true,
      useDate : useDate,
      fromDate:fromDate,
      toDate:toDate,
      link:link
    });
  }
  handleCat = (input)=>{
    console.log("change pref: ");
    console.log(input)
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
                searched = {this.state.searched}
                useDate = {this.state.useDate}
                fromDate = {this.state.fromDate}
                toDate = {this.state.toDate}
                link= {this.state.link}
                >
                </ResultArea>
              }></Route>
          </Routes>
       </BrowserRouter>
      
       
       
    </div>
    );
  }
}

export default App;
