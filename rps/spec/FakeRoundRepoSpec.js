const FakeRoundRepo = require("./FakeRoundRepo")
const Round =require("../src/Round")

describe("round repo", function () {
    let roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
    })

    it("is empty when no rounds have been saved", function () {
        expect(roundRepo.isEmpty()).toBe(true)
    })

    it("is not empty when rounds have been saved", function () {
        roundRepo.save(new Round())

        expect(roundRepo.isEmpty()).toBe(false)
    })

    it("returns saved rounds", function () {
        let round = new Round()

        roundRepo.save(round)

        expect(roundRepo.getAll()).toEqual([round])
    })

})