const React = require("react")
const ReactDOM = require("react-dom")


class PlayForm extends React.Component{
    render(){
        return <div>
                INVALID
                <button type="button"/>
            </div>
    }
}

describe("play form", function () {
    describe("play use case reports invalid", function () {
        beforeEach(function () {
            renderApp({
                play: function(p1Throw, p2Throw, ui){
                    ui.invalid()
                }
            })
        })

        it("tells the user the input was invalid", function () {
            submitPlayForm()

            expect(page()).toContain("INVALID")
        })

    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "reactApp"
        document.querySelector("body").appendChild(domFixture)
    }

    function renderApp(useCases) {
        ReactDOM.render(
            <PlayForm useCases={useCases}/>,
            domFixture
        )
    }

    beforeEach(function () {
        setupDOM()
    })

    function submitPlayForm() {
        document.querySelector("button").click()
    }

    function page() {
        return domFixture.innerText
    }
})