const { UseCases } = require("../src/rps.js")
const FakeRoundRepo = require("./../src/FakeRoundRepo")

describe("play", function () {
    let ui, useCases

    beforeEach(function () {
        useCases = new UseCases(new FakeRoundRepo())
    })

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })

        it("rock versus paper", function () {
            play("rock", "paper")

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            play("paper", "rock")

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("rock versus scissors", function () {
            play("rock", "scissors")

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            play("scissors", "rock")

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors versus paper", function () {
            play("scissors", "paper")

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            play("paper", "scissors")

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })
    })


    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock versus rock", function () {
            play("rock", "rock")

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper versus paper", function () {
            play("paper", "paper")

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors versus scissors", function () {
            play("scissors", "scissors")

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        let invalidThrow

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
            invalidThrow = Math.random().toString()
        })

        it("rock v. [^(rock|paper|scissors)]", function () {
            play("rock", invalidThrow)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("[^(rock|paper|scissors)] v. rock", function () {
            play(invalidThrow, "rock")

            expect(ui.invalid).toHaveBeenCalled()
        })
    })

    function play(p1Throw, p2Throw){
        useCases.play(p1Throw, p2Throw, ui)
    }
})