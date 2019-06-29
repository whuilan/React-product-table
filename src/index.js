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
    render(){
        const step = this.props.step
        return (
                <li><button style={{background:'rgb(242,239,239)'}}>Go to move #{step}</button></li>
        );
    }
}

class Info extends React.Component{
    render(){
        const isXNext = this.props.isXNext
        const isOver = this.props.isOver
        const title = isOver ? <span>The game is over. {isXNext?'O':'X'} wins!</span> : <span>Next player: {isXNext?'X':'O'}</span>
        const values = this.props.values
        console.log(values)
        let notEmpty = 0
        const notEmptyItems = values.filter((item)=>item!==undefined)
        const lists = notEmptyItems.map((item,index)=>{
                notEmpty = notEmpty+1
                console.log(notEmpty)
                return <Step key={index.toString()} step={notEmpty} />
        })
        return (
            <div>
                {title}
                <ol>
                    <li><button style={{background:'rgb(242,239,239)'}}>Go to game start</button></li>
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
            values:new Array(9)
        }
        this.handleClickChange = this.handleClickChange.bind(this)
    }

    handleClickChange(index){
        const copyValues = this.state.values.slice(0);
        const isXNext = this.state.isXNext
        const isOver = this.state.isOver
        if(!isOver && !copyValues[index]){
            copyValues[index] = isXNext ? 'X':'O'
            this.setState({
                isXNext:!isXNext,
                values:copyValues
            })
        }
        // console.log(copyValues)
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

    render(){
        return(
            <div className="game">
                <Board values={this.state.values} onValueChange={this.handleClickChange} />
                <Info isXNext={this.state.isXNext} isOver={this.state.isOver} values={this.state.values} />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
)