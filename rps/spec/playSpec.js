function UseCases(){
    this.play = function(p1Throw, p2Throw, ui){
        new PlayUseCase(p1Throw, p2Throw, ui).execute()
    }
}

function PlayUseCase(p1Throw, p2Throw, ui){
    this.execute = function(){
        if (tie()) {
            ui.tie()
        } else if (invalidThrow()){
            ui.invalid()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            ui.winner("p2")
        }
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function tie() {
        return p1Throw === p2Throw
    }

    function invalidThrow() {
        return !VALID_THROWS.includes(p1Throw) || !VALID_THROWS.includes(p2Throw)
    }

    function p1Wins() {
        return p1Throw === "paper" && p2Throw === "rock" ||
            p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper"
    }
}

describe("play", function () {
    let ui, useCases

    beforeEach(function () {
        useCases = new UseCases()
    })

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })

        it("rock versus paper", function () {
            useCases.play("rock", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            useCases.play("paper", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("rock versus scissors", function () {
            useCases.play("rock", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            useCases.play("scissors", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors versus paper", function () {
            useCases.play("scissors", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            useCases.play("paper", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })
    })


    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock versus rock", function () {
            useCases.play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper versus paper", function () {
            useCases.play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors versus scissors", function () {
            useCases.play("scissors", "scissors", ui)

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
            useCases.play("rock", invalidThrow, ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("[^(rock|paper|scissors)] v. rock", function () {
            useCases.play(invalidThrow, "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })


})