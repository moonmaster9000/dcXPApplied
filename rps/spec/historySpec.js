const {UseCases} = require("../src/rps")
const Round = require("../src/Round")
const FakeRoundRepo = require("./FakeRoundRepo")

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
            const playUI = jasmine.createSpyObj("playUI", ["invalid"])
            const historyUI = jasmine.createSpyObj("historyUI", ["rounds"])

            useCases.play("rock", "sailboat", playUI)
            useCases.history(historyUI)

            expect(historyUI.rounds).toHaveBeenCalledWith(
                [
                    new Round("rock", "sailboat", "invalid")
                ]
            )
        })
    })
})
