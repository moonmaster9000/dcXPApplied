const React = require("react")
const History = require("./History")

class PlayForm extends React.Component{
    constructor(){
        super()

        this.state = {}

        this.buttonHandler = this.buttonHandler.bind(this)
        this.inputChanged = this.inputChanged.bind(this)
    }

    buttonHandler(){
        this.props.useCases.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    tie(){
        this.setState({message: "TIE"})
    }

    winner(player){
        this.setState({message: `${player} Wins!`})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            <h1>{this.state.message}</h1>
            <div>
                <label htmlFor="p1Throw">Player 1 Throw</label>
                <input type="text" name="p1Throw" onChange={this.inputChanged}></input>
            </div>
            <div>
                <label htmlFor="p2Throw">Player 2 Throw</label>
                <input type="text" name="p2Throw" onChange={this.inputChanged}></input>
            </div>
            <div>
                <button type="button" onClick={this.buttonHandler}>Play</button>
            </div>

            <History useCases={this.props.useCases}/>
        </div>
    }
}

module.exports = PlayForm