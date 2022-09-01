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
        this.fetchData(this.props.searchTerm,this.updateData);
    }
    componentDidUpdate = (prevProps)=>{
        
        if (this.props.link != prevProps.link) {           
            this.setState({page:1});
            this.fetchData(this.props.searchTerm,this.updateData);
            
        }
    }
    fetchData = (term,func,page = 1)=>{
        
       
        let link = `/api/?term=${term}&page=${page}`;
        if(this.props.useDate==true){
            link = link + `&fromDate=${this.props.fromDate}&toDate=${this.props.toDate}&useDate=true`;
        }else link = link +"&useDate=false";
        console.log(link);
        fetch(link)
            .then(data=>data.json())
                .then(data=>func(data))
    }
    handleMoreClick = ()=>{
        
        this.fetchData(this.props.searchTerm,this.incrementData,this.state.page+1);
        this.setState(
            {page : this.state.page+1}
        );
    }
    incrementData = (data)=>{
        console.log("increment");
        data.articles.unshift(...this.state.articles);
        this.setState({
            articles:data.articles
        })
    }
    updateData = (data) => {
        
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
        let datesOut ="";
        if(this.props.useDate==true){
            datesOut = <div className="d-flex ">
                        <div className="p-2">From: {this.props.fromDate}</div>
                        <div className="p-2">To : {this.props.toDate}</div>
                    </div>
        }
        return (
            <div className="d-flex flex-column">
                <div className="super-h-text">
                    Searched Term : "{this.props.searchTerm}" {datesOut}
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