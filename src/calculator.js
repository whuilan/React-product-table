import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*基础组件：占一个格子的按钮 */
function SingleButton(props){
        return <button className="button" onClick={props.onClick}>{props.item}</button>
}

/*基础组件：占一个格子的按钮 */
function MergedButton(props){
        return <button className="merge-button" onClick={props.onClick}>{props.item}</button>
}

/*点击区，包括数字、操作符及清零、返回等指令*/
class  OperationArea extends React.Component{
    render(){
        const firstArea = []
        firstArea.push(<SingleButton key="R" item="←" onClick={()=>this.props.onGoBackClick()} />)
        firstArea.push(<SingleButton key="C" item="C" onClick={()=>this.props.onResetClick()}/>)
        firstArea.push(<MergedButton key="=" item="=" onClick={()=>this.props.onClick('=')}/>)

        const numbers = [1,2,3,4,5,6,7,8,9];
        const numberArea = numbers.map(item=>{
            return <SingleButton key={item.toString()} item={item} onClick={()=>this.props.onClick(item)} />
        })
        numberArea.push(<MergedButton key="0" item={0} onClick={()=>this.props.onClick(0)}/>)
        numberArea.push(<SingleButton key="." item={'.'}  onClick={()=>this.props.onClick('.')} />)

        const operators = ['/','*','-','+'];
        const operatorArea = operators.map((item)=>{
            return <SingleButton key={item} item={item} onClick={()=>this.props.onClick(item)}/>
        })

        return (
            <div className="operation-area">
                <div>
                    {firstArea}
                </div>
                <div>
                    <div className="number-area">
                        {numberArea}
                    </div>
                    <div className="operator-area">
                        {operatorArea}
                    </div>
                </div>
            </div>
        );
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allClicks:'',
            result:null 
        }
    }
    
    /*点击操作区的按钮时的回调函数，没有点击“=”就全部显示在显示区，
    点击 “=”就分别提取操作符和操作数进入队列(先进先出)，按顺序计算结果*/
    handleNumClick(item){
       let allClicks = this.state.allClicks.slice()
       if(item==='='){
        const ops = new Queue();
        for(let i=0;i<allClicks.length;i++){
            const cha = allClicks.charAt(i);
            if(cha === '+' || cha === '-' || cha === '*' || cha === '/'){
                ops.enqueue(cha)
            }
        }
        console.log(ops)
        const nums = allClicks.split(/[*/+-]/)
        console.log(nums)
        const vals = new Queue();
        for(let num of nums){
            vals.enqueue(parseFloat(num))
        }
        console.log(vals)
        let result = vals.dequeue()
        const size = ops.size();
        console.log(size)
        for(let i=0;i<size;i++){
            const op = ops.dequeue()
            if(op==='+')
                result=result+vals.dequeue()
            else if(op==='-')
                result=result-vals.dequeue()
            else if(op==='*')
                result=result*vals.dequeue()
            else if(op==='/')
                result=result/vals.dequeue()
            else 
                throw Error;
        }
        this.setState({
            result:result
        })
       }
       else{
        allClicks+=item
        this.setState({
            allClicks:allClicks
        })
        console.log(allClicks)
       }
    }

    /*点击清零键将输入置零 */
    handleResetClick(){
        this.setState({
            allClicks:'',
            result:null
        })
    }

    /*点击退回键，删除最后一个字符 */
    handleGoBackClick(){
        let allClicks = this.state.allClicks.slice()
        if(!allClicks){
           return;
        }
        allClicks = allClicks.substring(0,allClicks.length-1)
        console.log(allClicks)
        this.setState({
            allClicks:allClicks
        })
    }

    render(){
        const str = this.state.allClicks
        const result = this.state.result
        return (
            <div className="calculator">
                <div className="show-area">
                    <span>{str}</span>
                    <p style={{fontSize:18}}><b>{result}</b></p>
                </div>
                <OperationArea onClick={item=>this.handleNumClick(item)} onResetClick={()=>this.handleResetClick()}
                               onGoBackClick={()=>this.handleGoBackClick()} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
)

/*运算时需要用到的数据结构：队列 */
class Queue{
    constructor(){
        this.items = []
    }
    enqueue(item){
        this.items.push(item)
    }
    dequeue(){
        return this.items.shift()
    }
    isEmpty(){
        return this.items.length === 0
    }
    size(){
        return this.items.length
    }
}
