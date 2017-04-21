const React = require("react")
const ReactDOM = require("react-dom")
const {Round} = require('rps')
const PlayForm = require("../src/components/PlayForm")

describe("Play Form Page", function () {
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

    describe("history use case reports no rounds", function () {
        beforeEach(function () {
            renderApp({
                history: function(ui){
                    ui.noRounds()
                }
            })
        })

        it("displays NO ROUNDS", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("history use case reports rounds", function () {
        let round1, round2

        beforeEach(function () {
            round1 = new Round("round1 p1 throw", "round1 p2 throw", "round1 result")
            round2 = new Round("round2 p1 throw", "round2 p2 throw", "round2 result")

            renderApp({
                history: function(ui){
                    ui.rounds([round1, round2])
                }
            })
        })

        it("displays the rounds", function () {
            expect(page()).not.toContain("NO ROUNDS")

            assertPageContainsRound(round1)
            assertPageContainsRound(round2)
        })
    })

    let domFixture


    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "reactApp"
        document.querySelector("body").appendChild(domFixture)
    }

    function renderApp(useCases) {
        useCases.history = useCases.history || function(){}

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

    function assertPageContainsRound(r) {
        let pageContents = page()

        expect(pageContents).toContain(r.p1Throw)
        expect(pageContents).toContain(r.p2Throw)
        expect(pageContents).toContain(r.result)
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