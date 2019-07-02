import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    constructor(props){
        super(props);
        this.handleClickChange = this.handleClickChange.bind(this)
    }
    handleClickChange(){
        const index = this.props.index
        this.props.onValueChange(index)
    }

    render(){
        const value = this.props.value
        return <button className="square-button" onClick={this.handleClickChange}>{value}</button>
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.handleClickChange = this.handleClickChange.bind(this)
    }
    handleClickChange(index){
        this.props.onValueChange(index)
    }

    render(){
        const positions = [1,2,3,4,5,6,7,8,9]
        const squares = positions.map((item,index)=>
            <Square key={item.toString()} index={index} value={this.props.values[index]} onValueChange={this.props.onValueChange} /> )
        return (
           <div className="board-area">
               {squares}
           </div> 
        );
    }
}

class Step extends React.Component{
    constructor(props){
        super(props);
        this.handleGoBackClick = this.handleGoBackClick.bind(this)
    }
    handleGoBackClick(){
        const seqIndex = this.props.step
        this.props.onGoBackChange(seqIndex)
    }

    render(){
        const step = this.props.step
        return (
                <li><button style={{background:'rgb(242,239,239)'}} onClick={this.handleGoBackClick}>Go to move #{step}</button></li>
        );
    }
}

class Info extends React.Component{
    constructor(props){
        super(props);
        this.handleResetClick = this.handleResetClick.bind(this)
    }
    handleResetClick(){
        this.props.onResetClick()
    }

    render(){
        const isXNext = this.props.isXNext
        const isOver = this.props.isOver
        const title = isOver ? <span>The game is over. {isXNext?'O':'X'} wins!</span> : <span>Next player: {isXNext?'X':'O'}</span>
        const seqs = this.props.seqs
        console.log(seqs)
        const lists = []
        const stepNum = seqs.length
        if(stepNum>0){
            for(let i=1;i<=stepNum;i++){
                lists.push(<Step key={i.toString()} step={i} onGoBackChange={this.props.onGoBackChange} />)
            }
        }       
        return (
            <div>
                {title}
                <ol>
                    <li><button style={{background:'rgb(242,239,239)'}} onClick={this.handleResetClick} >Go to game start</button></li>
                    {lists}
               </ol>
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isXNext:true,
            isOver:false,
            values:new Array(9),
            seqs:[],
            isBack:false
        }
        this.handleClickChange = this.handleClickChange.bind(this)
        this.handleResetClick = this.handleResetClick.bind(this)
        this.handleGoBackClick = this.handleGoBackClick.bind(this)
    }

    handleClickChange(index){
        const copyValues = this.state.values.slice(0);
        let copySeqs = this.state.seqs.slice()
        const isXNext = this.state.isXNext
        const isOver = this.state.isOver
        const isBack = this.state.isBack
        if(!isOver && !copyValues[index]){            
            if(!isBack){
                copySeqs.push(index)
            }else{
                copySeqs = copySeqs.filter((item)=>{
                  return copyValues[item] === 'X' || copyValues[item] === 'O'
                })
                copySeqs.push(index)
                console.log("Filter has been executed")
            }
            copyValues[index] = isXNext ? 'X':'O'
            this.setState({
                isXNext:!isXNext,
                values:copyValues,
                seqs:copySeqs
            })
        }
        // console.log(this.state.values) 在控制台发现，在这里打印出的this.state.values是setState之前的values,而不是最新的copyValues
        /*每次下完之后都判断一下游戏是否结束，即是不是有排在一条线上的三个值相等 */
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        for(const line of lines){
            if( (copyValues[line[0]]==='X' || copyValues[line[0]]==='O') && copyValues[line[0]]===copyValues[line[1]] && copyValues[line[0]]===copyValues[line[2]]){
                this.setState({isOver:true})
                console.log(line)
                break;
            }
        }
    }

    handleResetClick(){
        const emptyArray = new Array(9);
        this.setState({
            isXNext:true,
            isOver:false,
            values:emptyArray,
            isBack:true
        })
    }

    handleGoBackClick(seqIndex){
        console.log(seqIndex)
        const seqs = this.state.seqs
        const newValues = this.state.values.slice()
        let isOver = false
        console.log(newValues)
            for(let i=0;i<seqIndex;i++){
                if(i%2===0){
                    newValues[seqs[i]] = 'X'
                }else{
                    newValues[seqs[i]] = 'O'
                }              
            }
            for(let j=seqIndex;j<seqs.length;j++){
                newValues[seqs[j]] = ''
            }
            console.log(newValues)
            const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
            for(const line of lines){
                if( (newValues[line[0]]==='X' || newValues[line[0]]==='O') && newValues[line[0]]===newValues[line[1]] && newValues[line[0]]===newValues[line[2]]){
                    isOver = true
                    console.log(line)
                    break;
                }
            }
            this.setState({
            isXNext:seqIndex%2===0?true:false,
            isOver:isOver,
            values:newValues,
            isBack:true
            })
    }

    render(){
        return(
            <div className="game">
                <Board values={this.state.values} onValueChange={this.handleClickChange} />
                <Info isXNext={this.state.isXNext} isOver={this.state.isOver} 
                      seqs={this.state.seqs} onResetClick={this.handleResetClick} onGoBackChange={this.handleGoBackClick} />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
)