import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className="square" onClick={props.onSquareClick}>{props.value}</button>
    );
}

class Borad extends React.Component{
    render(){
        const indexes = [1,2,3,4,5,6,7,8,9];
        const squares = indexes.map((item,index)=>
            <Square key={item.toString()} value={this.props.squares[index]} onSquareClick={()=>this.props.onSquareClick(index)} />
        )
        return squares
    }
} 

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history:[
                {squares: Array(9).fill(null)}
            ],
            xIsNext:true,
            stepNumber:0
        }
    }
    handleSquareClick(i){
        const stepNumber = this.state.stepNumber
        const history = this.state.history.slice(0,stepNumber+1);
        const current = history[history.length-1]
        const squares = current.squares.slice()
        const xIsNext = this.state.xIsNext
        const winner = CalcutleWinner(squares)
        if( !winner && !squares[i]){
            squares[i] = xIsNext?'X':'O'
            this.setState({
                history:history.concat([{
                    squares:squares
                }]),
                xIsNext:!xIsNext,
                stepNumber:stepNumber+1
            })
        }
    }
    jumpTo(move){
        this.setState({
            stepNumber:move,
            xIsNext: (move % 2) === 0
        })
    }
    render(){
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const squares = current.squares
        const winner = CalcutleWinner(squares)

        const status = winner ? "Game over.The winner is "+winner : "Next player: " + (this.state.xIsNext?'X':'O')
        const moves = history.map((item,move)=>{
            const desc = move ? "Go to move"+move : "Go to game start"
            return (
                <li key={move.toString()}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        return(
            <div className="game">
                <div className="board">
                    <Borad squares={squares} onSquareClick={i=>this.handleSquareClick(i)} />
                </div>
                <div className="info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
)

function CalcutleWinner(squares){
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for(let line of lines){
        const [a,b,c] = line // 易忘！
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}