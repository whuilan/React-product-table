import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    constructor(props){
        super(props)
        this.handleClickChange = this.handleClickChange.bind(this)
    }
    handleClickChange(){
        this.props.onNextChange()
    }
    render(){
        const next = this.props.next
        return <input type="button" className="square-input" value={next} onClick={this.handleClickChange} />
    }
}

class Board extends React.Component{
    render(){
        const positions = [1,2,3,4,5,6,7,8,9]
        const squares = positions.map((item)=>
            <Square key={item.toString()} id={item} next={this.props.next} onNextChange={this.props.onNextChange} /> )
        return (
           <div className="board-area">
               {squares}
           </div> 
        );
    }
}

class Info extends React.Component{
    render(){
        const next = 'X'
        return (
            <div>
                <span>Next player: {next}</span>
                <br/>
                1.<button style={{background:'#d3cfcf'}}>Go to game start</button>
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            next:''
        }
        this.handleClickChange = this.handleClickChange.bind(this)
    }
    handleClickChange(){
        const next = this.state.next
        if(next==='X'){
            this.setState({next:"O"})
        }
        this.setState({next:'X'})
    }
    render(){
        return(
            <div className="game">
                <Board next={this.state.next} onNextChange={this.handleClickChange} />
                <Info next={this.state.next} />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
)