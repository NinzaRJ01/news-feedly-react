import React from 'react';
import "./components-styles/SearchBar.css"
import SEARCH_ICON from '../assets/images/logos/searchengin.png'
class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            searchValue : ""
        }
    }
    handleInputInSearchBar = (event) => {
        let str = event.target.value;
        this.setState({
            searchValue : str
        });
    }
    handleSubmit = (event)=>{
        this.props.parentHandleFunc(this.state.searchValue);
        event.preventDefault();
    }
    handleEnterPress = (event)=>{
        if(event.key==="Enter"){
            this.handleSubmit();
            
        }
    }
    
    render(){
        
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
            </div>
        );
    }
}
export default SearchBar;