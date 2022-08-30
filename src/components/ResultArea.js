import React from "react";
function ResultTile ({article}){
    let {title,author,description,url,urlToImage,source} = article;
    return (
        <a href={url}>
        <div className="news-tile">
            <div>
                <img
                    src={urlToImage}
                    alt={title}
                />
            </div>
            <div>
                <div className="title">{title}</div>
                <div className="auth">{author} at {source.name}</div>
                <div className = "line"></div>
                <div className="desc">{description}</div>

            </div>
        </div>
        </a>
    );
}
class ResultArea extends React.Component{
    constructor(){
        super();
        this.state = {
            status :"no",
            totalRes : 0,
            articles :[],
            page :2,size:10,
            isIntial : true
        }

    }
    componentDidMount = ()=>{
        this.fetchData(this.props.searchTerm);
    }
    componentDidUpdate = (prevProps)=>{
        if (this.props.searchTerm !== prevProps.searchTerm) {
            this.setState({page:1});
            this.fetchData(this.props.searchTerm);
            
        }
    }
    fetchData = (term)=>{
        console.log(".")
        fetch(`/api/?term=${term}&page=${1}`)
            .then(data=>data.json())
                .then(data=>this.updateData(data))
    }
    handleMoreClick = ()=>{
        this.setState(
            {page : this.state.page+1}
        );
        fetch(`/api/?term=${this.props.searchTerm}&page=${this.state.page}`)
            .then(data=>data.json())
                .then(data=>this.incrementData(data))
    }
    incrementData = (data)=>{
        data.articles.unshift(...this.state.articles);
        console.log(data.articles);
        this.setState({
            articles:data.articles
        })
    }
    updateData = (data) => {
        console.log(data);
        if(data.status=="ok" && data.totalResults>0){
            this.setState({
                status: data.status,
                articles: data.articles,
                totalRes : data.totalResults,
                
            })
        }
    }
    render(){
        
        let results = "";
        if(this.state.status=="ok"){
           results = this.state.articles.map(art=> <ResultTile article={art}/>)
        }
        return (
            <div className="d-flex flex-column">
                <div className="super-h-text">
                    Searched Term : "{this.props.searchTerm}"
                    <div>Total Results : {this.state.totalRes}</div>
                </div>
                <div className="container">
                    {results}
                </div>
                <button onClick={this.handleMoreClick }>More</button>
            </div>
        );
    }
}
export default ResultArea;