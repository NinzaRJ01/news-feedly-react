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
            status :"ok",
            totalRes : 0,
            articles :[],
            page :1,size:10,
            isIntial : true
        }
    }
    componentDidUpdate = (prevProps)=>{
        if (this.props.searchTerm !== prevProps.searchTerm) {
            this.setState({page:1});
            this.fetchData(this.props.searchTerm);
            
        }
    }
    fetchData = (term)=>{
        fetch(`http://localhost:8000/api/?term=${term}`,{
            credentials: 'same-origin'
          })
            .then(data=>data.json())
                .then(data=>this.updateData(data))
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
        setTimeout(3000,()=>{this.fetchData(this.props.searchTerm)});
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
            </div>
        );
    }
}
export default ResultArea;