const React = require('react')
const ReactDOM = require('react-dom')
const PlayForm = require('./PlayForm')
const { UseCases, FakeRoundRepo } = require("rps")



ReactDOM.render(
    <PlayForm useCases={new UseCases(new FakeRoundRepo())}/>,
    document.querySelector("#react-app")
)