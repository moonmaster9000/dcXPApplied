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

module.exports = {
    UseCases
}