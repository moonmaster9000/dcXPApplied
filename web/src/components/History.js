const React = require("react")

class History extends React.Component {
    constructor() {
        super()

        this.state = {}

    }

    componentDidMount(){
        this.props.useCases.history(this)
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
            {this.state.roundDisplay}
        </div>
    }
}

module.exports = History