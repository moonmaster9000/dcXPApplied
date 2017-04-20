const React = require("react")
const ReactDOM = require("react-dom")


class PlayForm extends React.Component{
    constructor(){
        super()

        this.state = {}
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

    p1ThrowInputChanged(e){
        this.setState({p1Throw: e.target.value})
    }

    p2ThrowInputChanged(e){
        this.setState({p2Throw: e.target.value})
    }

    render(){
        return <div>
                {this.state.message}
                <input type="text" name="p1Throw" onChange={this.p1ThrowInputChanged.bind(this)}></input>
                <input type="text" name="p2Throw" onChange={this.p2ThrowInputChanged.bind(this)}></input>
                <button type="button" onClick={this.buttonHandler.bind(this)}/>
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
            expect(page()).not.toContain("INVALID")

            submitPlayForm()

            expect(page()).toContain("INVALID")
        })
    })

    describe("play use case reports tie", function () {
        beforeEach(function () {
            renderApp({
                play: function(p1Throw, p2Throw, ui){
                    ui.tie()
                }
            })
        })

        it("tells the user the input was invalid", function () {
            expect(page()).not.toContain("TIE")

            submitPlayForm()

            expect(page()).toContain("TIE")
        })
    })

    describe("play use case reports p1 winner", function () {
        beforeEach(function () {
            renderApp({
                play: function(p1Throw, p2Throw, ui){
                    ui.winner("p1")
                }
            })
        })

        it("tells the user the input was invalid", function () {
            expect(page()).not.toContain("p1 Wins!")

            submitPlayForm()

            expect(page()).toContain("p1 Wins!")
        })
    })

    describe("play use case reports p2 winner", function () {
        beforeEach(function () {
            renderApp({
                play: function(p1Throw, p2Throw, ui){
                    ui.winner("p2")
                }
            })
        })

        it("tells the user the input was invalid", function () {
            expect(page()).not.toContain("p2 Wins!")

            submitPlayForm()

            expect(page()).toContain("p2 Wins!")
        })
    })

    it("sends user input to the play use case", function () {
        let play = jasmine.createSpy("play")

        renderApp({
            play: play
        })

        submitPlayForm("rock", "paper")

        expect(play).toHaveBeenCalledWith("rock", "paper", jasmine.any(Object))
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

    afterEach(function () {
        domFixture.remove()
    })

    function submitPlayForm(p1Throw, p2Throw) {
        fillIn("p1Throw", p1Throw)
        fillIn("p2Throw", p2Throw)

        document.querySelector("button").click()
    }

    function fillIn(inputName, p1Throw) {
        let element = document.querySelector(`input[name='${inputName}']`)
        element.value = p1Throw
        element.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}))
    }

    function page() {
        return domFixture.innerText
    }
})