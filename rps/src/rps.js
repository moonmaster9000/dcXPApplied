const Round = require("./Round")

function UseCases(roundRepo){
    this.play = function(p1Throw, p2Throw, ui){
        new PlayUseCase(p1Throw, p2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui){
        if (roundRepo.isEmpty()){
            ui.noRounds()
        } else {
            ui.rounds(roundRepo.getAll())
        }
    }
}

function PlayUseCase(p1Throw, p2Throw, ui, roundRepo){
    this.execute = function(){
        if (tie()) {
            handleTie()
        } else if (invalidThrow()){
            handleInvalid()
        } else if (p1Wins()){
            handleP1Wins()
        } else {
            handleP2Wins()
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

    function handleTie() {
        roundRepo.save(new Round(p1Throw, p2Throw, "tie"))
        ui.tie()
    }

    function handleInvalid() {
        roundRepo.save(new Round(p1Throw, p2Throw, "invalid"))
        ui.invalid()
    }

    function handleP1Wins() {
        roundRepo.save(new Round(p1Throw, p2Throw, "p1"))
        ui.winner("p1")
    }

    function handleP2Wins() {
        roundRepo.save(new Round(p1Throw, p2Throw, "p2"))
        ui.winner("p2")
    }
}

module.exports = {
    UseCases
}