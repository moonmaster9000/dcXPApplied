function RPS(){
    this.play = function(p1, p2, ui){
        new PlayUseCase(p1, p2, ui).execute()
    }
}

function PlayUseCase(p1, p2, ui){
    this.execute = function(){
        if (tie()) {
            ui.tie()
        } else if (inputInvalid()){
            ui.invalid()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            ui.winner("p2")
        }
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function tie() {
        return p1 === p2
    }

    function inputInvalid() {
        return !VALID_THROWS.includes(p1) || !VALID_THROWS.includes(p2)
    }

    function p1Wins() {
        return p1 === "paper" && p2 === "rock" ||
            p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper"
    }
}

describe("play", function () {
    let ui, rps

    beforeEach(function () {
        rps = new RPS()
    })

    describe("win scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })

        it("rock versus paper", function () {
            rps.play("rock", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper versus rock", function () {
            rps.play("paper", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("rock versus scissors", function () {
            rps.play("rock", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors versus rock", function () {
            rps.play("scissors", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors versus paper", function () {
            rps.play("scissors", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper versus scissors", function () {
            rps.play("paper", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })
    })


    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock versus rock", function () {
            rps.play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper versus paper", function () {
            rps.play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors versus scissors", function () {
            rps.play("scissors", "scissors", ui)

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
            rps.play("rock", invalidThrow, ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("[^(rock|paper|scissors)] v. rock", function () {
            rps.play(invalidThrow, "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })


})