import React from "react";
function CatBtn({isActive,pqId,children,onPress}){
    let btnStyle = isActive?"active-cat-btn":"cat-btn"
    return(
        <div className={btnStyle} onClick={onPress}>
            {children}
        </div>
    );
}
class CategoriesSelectionComp extends React.Component{
    constructor(){
        super();
        let categories = ['business','entertainment', 'general',
                            'health', 'science','sport','technology'];
        let preference = categories;
        let isActive = {};
        categories.flatMap(cat=>isActive[cat]=0);
        this.state  = {
            categories:categories,
            isActive:isActive,
            preference:preference
        }
    }
    handleCatClick = (event)=>{
            let id = (event.target.id).replace("cat-","");
            console.log(id);
            if(this.state.isActive[id]==1){
                let newCats = [...this.state.preference];
                newCats = newCats.filter(cat => cat!=id);
                newCats.push(id);
                let newActives = {...this.state.isActive};
                newActives[id] = 0;
                this.setState({
                    preference:newCats,
                    isActive :newActives
                })
            }else {
                let newCats = [...this.state.preference];
                newCats = newCats.filter(cat => cat!=id);
                newCats.unshift(id);
                let newActives = {...this.state.isActive};
                newActives[id] = 1;
                this.setState({
                    preference:newCats,
                    isActive :newActives
                })
            }

    }
    render(){
        let catBtns = this.state.categories.map(cat =>{ 
            return (<CatBtn 
            
            isActive={this.state.isActive[cat]}
            
            
             >
                <button id={`cat-${cat}`} className="spl-btn" onClick={this.handleCatClick}>
                    {cat}
                </button>
             </CatBtn>)}
             );
            
        return (
            <div>
                <div className = "super-h-text">
                    Feel Free To Select Few Categories 
                    (By preference Top To Bottom)
                </div>
                <div>
                    <div className="d-flex justify-content-around">
                        {catBtns.slice(0,2)}
                    </div>
                    <div className="d-flex justify-content-around">
                        {catBtns.slice(2,5)}
                    </div>
                    <div className="d-flex justify-content-around">
                        {catBtns.slice(5,7)}
                    </div>

                </div>
            </div>
        );
    }
}
export default CategoriesSelectionComp;