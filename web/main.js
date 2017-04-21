const React = require('react')
const ReactDOM = require('react-dom')
const PlayForm = require('./src/components/PlayForm')
const { Round, UseCases, FakeRoundRepo } = require("rps")


let repo = new FakeRoundRepo()

repo.save(new Round("foo", "bar", "invalid"))
repo.save(new Round("foo", "bar", "invalid"))
repo.save(new Round("foo", "bar", "invalid"))

ReactDOM.render(
    <PlayForm useCases={new UseCases(repo)}/>,
    document.querySelector("#react-app")
)