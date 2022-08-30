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
class TopHeadings extends React.Component{
    constructor(){
        super();
        this.state = {
            articles :[]
        }
        
    }
    componentDidMount = ()=>{
        this.props.pref.forEach(p=>{
            let link = `/api/?category=${p}&pageSize=5`;
            this.fetchData(link);
        })
    }
    fetchDate = (link)=>{
        fetch(link)
            .then(data=>data.json())
                .then(data=>this.incrementArt(data.articles))
                    .catch(error=>console.log(error));
    }
    incrementArt = (art) =>{
        let prev = [...this.state.articles];
        prev.push(...art);
        this.setState({
            articles:prev
        })
    }
    render(){
        let headings = "";
        if(this.state.articles.length>20){
            let headingsArticles = this.state.articles.map(
                art=><ResultTile article= {art}/>);
            let low = 0;
            let high = 5;
            headings  = this.props.pref.map(p => {
                let slice = headingsArticles.slice(low,high);
                low = high;
                high+=5;
                return (<div>
                    <div>{p}</div>
                    {slice}
                </div>);
            });
        }
        return(
            <>
                {headings}
            </>
        )
    }
}
export default TopHeadings;