const React = require("react")

class PlayForm extends React.Component{
    constructor(){
        super()

        this.state = {}

        this.buttonHandler = this.buttonHandler.bind(this)
        this.inputChanged = this.inputChanged.bind(this)
    }

    componentDidMount(){
        this.props.useCases.history(this)
    }

    buttonHandler(){
        this.props.useCases.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({message: "INVALID"})
        this.props.useCases.history(this)
    }

    tie(){
        this.setState({message: "TIE"})
        this.props.useCases.history(this)
    }

    winner(player){
        this.setState({message: `${player} Wins!`})
        this.props.useCases.history(this)
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    noRounds(){
        this.setState({roundDisplay: "NO ROUNDS"})
    }

    rounds(rs) {
        this.setState({
            roundDisplay: <table>
                <thead>
                    <tr>
                        <th>p1</th>
                        <th>p2</th>
                        <th>result</th>
                    </tr>
                </thead>
                <tbody>
                    {rs.map((r, i) => <tr key={i}>
                        <td>{r.p1Throw}</td>
                        <td>{r.p2Throw}</td>
                        <td>{r.result}</td>
                    </tr>)}
                </tbody>
            </table>
        })
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
            {this.state.roundDisplay}
        </div>
    }
}

module.exports = PlayForm