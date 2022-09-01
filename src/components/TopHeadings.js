import React from "react";
import "./components-styles/TopHeading.css"
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
class HeadingTile extends React.Component{
    constructor(){
        super();
        this.state = {
            articles:[]
        }
    }
    componentDidMount = ()=>{
        let link = `/api/?type=top-headlines&category=${this.props.title}&pageSize=7`;
        this.fetchData(link);
    }
 

    fetchData = (link)=>{
        fetch(link)
            .then(data=>data.json())
                .then(data=>this.incrementArt(data))
                    .catch(error=>console.log("Tp"+error));
    }
    isEqual = (a1,a2) =>{
        if(a1.length<a2.length)return false;
        return true;
    }
    incrementArt = (data)=>{
        console.log(data);
        if(data.status=="ok"){
           
            this.setState({
                articles : data.articles
            })
        }
    }
    render(){
        let out = "Loading...";
        if(this.props.title){
            let articleTiles =  "Network Issue Or Api Issue...";
            if(this.state.articles.length!=0){
                articleTiles = this.state.articles.map(art=><ResultTile article={art}/>)
            }
            out = (
                <div className="heading-tile">
                    <div className="title">Top Headings : <span className="keyword">{this.props.title}</span></div>
                    <div className="container">
                        {articleTiles}
                    </div>
                </div>   
                
                
            );
        }
        return (
            <div>
               {out}
            </div>
            

        );
    }
}
class TopHeadings extends React.Component{
    constructor(){
        super();
        let obj = {};
        
        this.state={
            resultantObj :obj
        }
    }
    componentDidMount = ()=>{
        let obj = {};
        this.props.pref.forEach(p=> obj[p] = <HeadingTile title= {p}></HeadingTile>);
        this.setState(
            {
                resultantObj:obj
            }
        );

    }
    render(){
        
        let out = this.props.pref.map(p=>this.state.resultantObj[p]);
        return (
            <div>
                {out}
            </div>
        );
        
    }
}
export default TopHeadings;