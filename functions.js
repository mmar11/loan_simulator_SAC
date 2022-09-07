


function checkInt(num) {

    if (num <= 1000) {
        if (num % 2 != 0) {
            let prazCorrec = Math.floor(num)
            let msg = `O prazo deve ser um número inteiro, valor inserido corrigido para ${prazCorrec}.`

            return { prazCorrec, msg }
        }
        else {
            let prazCorrec = num
            let msg = ""
            return { prazCorrec, msg }
        }
    } else {
        let prazCorrec = 0
        let msg = "O prazo máximo de simulação é 1000 períodos"
        return { prazCorrec, msg }
    }

}

export { checkInt }
