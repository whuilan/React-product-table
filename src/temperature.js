import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BoilingVerdict(props){
    const celsius = props.celsius
    if(celsius>=100){
        return <p>The water would boil !</p>
    }
        return <p>The water would not boil</p>
   
}

class TemperatureInput  extends React.Component{
    constructor(props){
        super(props);
        this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
    }

    handleTemperatureChange(e){
        this.props.onTemperatureChange(e.target.value)
    }

    render(){
        const temperature = this.props.temperature
        const scale = this.props.scale
        return (
            <fieldset>
                    <legend>Enter temperature in {scale}:</legend>
                    <input value={temperature} onChange={this.handleTemperatureChange} />
            </fieldset> 
        );
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature:'',
            scale:'Celsius'
        };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(value){
        this.setState({
            temperature:value,
            scale:'Celsius'
        })
    }

    handleFahrenheitChange(value){
        this.setState({
            temperature:value,
            scale:'Fahrenheit'
        })
    }

    render(){
        const temperature = this.state.temperature
        const scale = this.state.scale
        const celsius = scale==='Celsius'? temperature : tryConvert(temperature,toCelsius)
        const fahrenheit = scale==='Fahrenheit'? temperature : tryConvert(temperature,toFahrenheit)
        return (
            <div>
                <TemperatureInput scale={"Celsius"} temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput scale={"Fahrenheit"} temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature,convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return ' ';
    }
    const output = convert(input)
    const rounded = Math.round(output*1000)/1000;
    return rounded.toString();
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
)