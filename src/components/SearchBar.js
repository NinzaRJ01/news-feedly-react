import React from 'react';
import "./components-styles/SearchBar.css"
import { withRouter } from './withRouter';
import SEARCH_ICON from '../assets/images/logos/searchengin.png'
class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            searchValue : "",
            fromDate :"",
            toDate:"",
            useDate :false
        }
        console.log(this.props);
        
    }
    handleInputInSearchBar = (event) => {
        let str = event.target.value;
        this.setState({
            searchValue : str,
            
        });
    }
    handleSubmit = (event)=>{
        if(this.state.useDate && this.isWrongDates(this.state.fromDate,this.state.toDate)){
            alert("Alert ! Please use correct dates ");
            return ;
        }
        this.props.navigate('/search/?term='+this.state.searchValue);
        this.props.parentHandleFunc(this.state.searchValue);
        
        event.preventDefault();
    }
    handleEnterPress = (event)=>{
        if(event.key==="Enter"){
            this.handleSubmit()   
        }
    }
    handleFromDateChange = (event)=>{
        this.setState({
            fromDate:event.target.value
            }
        );
    }
    handleToDateChange = (event)=>{
        this.setState({
            
            toDate:event.target.value,
            
            }
        );
    }
    toggleDateSettings = ()=>{
        this.setState({
            useDate : !this.state.useDate,
            fromDate:"",
            toDate:""
        });
    }
    isWrongDates = (date1, date2)=>{
        if(date1.replace('-',"") <date2.replace('-',""))return false;
        return true;
    }
    render(){
        let dateSettings = "";
        if(this.state.useDate){
            dateSettings = (
                <>
                <div className="mx-2">
                    <div>From :</div>
                    <div>
                        <input  
                            type="date" 
                            value={this.state.fromDate} 
                            onChange={this.handleFromDateChange}/>
                    </div>
                </div>
                <div className="mx-2">
                    <div>To :</div>
                    <div>
                        <input  
                            type="date" 
                            value={this.state.toDate} 
                            onChange={this.handleToDateChange}/>
                    </div>
                </div>
                </>
            );
        }
        console.log(this.props);
        return (
            <div className="d-flex justify-content-center search-bar-area my-5">
                <input
                    className="search-bar"
                    placeholder = "Search Your Favourite News"
                    
                    value = {this.state.searchValue}
                    onChange = {this.handleInputInSearchBar}
                    onKeyPress = {this.handleEnterPress}
                />

                <button
                    className = "search-submit-btn"
                    onClick= {this.handleSubmit}
                >
                    <img
                        src = {SEARCH_ICON}
                        alt = "search"
                    />
                    <span>Search</span>
                </button>
                <button onClick = {this.toggleDateSettings}>Date Settings</button>
                {dateSettings}
            </div>
        );
    }
}
export default withRouter(SearchBar);