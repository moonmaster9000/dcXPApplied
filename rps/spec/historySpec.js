const {UseCases} = require("../src/rps")
const Round = require("../src/Round")
const FakeRoundRepo = require("./../src/FakeRoundRepo")

describe("history", function () {
    let useCases

    beforeEach(function () {
        useCases = new UseCases(new FakeRoundRepo())
    })

    describe("no rounds have been played", function () {
        it("tells the ui there are no rounds", function () {
            const ui = jasmine.createSpyObj("ui", ["noRounds"])

            useCases.history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            const playUI = jasmine.createSpyObj("playUI", ["invalid", "tie", "winner"])
            const historyUI = jasmine.createSpyObj("historyUI", ["rounds"])

            useCases.play("rock", "sailboat", playUI)
            useCases.play("rock", "rock", playUI)
            useCases.play("paper", "rock", playUI)
            useCases.play("rock", "paper", playUI)

            useCases.history(historyUI)

            expect(historyUI.rounds).toHaveBeenCalledWith(
                [
                    new Round("rock", "sailboat", "invalid"),
                    new Round("rock", "rock", "tie"),
                    new Round("paper", "rock", "p1"),
                    new Round("rock", "paper", "p2"),
                ]
            )
        })
    })
})
