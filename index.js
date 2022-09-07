//next improvments
//send simulation by email 
// generate a pdf of the simulation


import { checkInt } from "./functions.js"

//JS responsivo do HTML


let carencia = document.querySelector("#carencia");
let prazcarencia = document.querySelector("#prazcarencia");
let tbody = document.querySelector("#tbody")
let msg = document.querySelector("#message")

carencia.addEventListener("change", function () {
    if (this.checked) {
        prazcarencia.removeAttribute("hidden");
    } else {
        prazcarencia.setAttribute("hidden", "hidden");
    }
});

let valor = document.getElementById("valor");
let entrada = document.getElementById("entrada");
let taxa = document.getElementById("taxa");
let prazo = document.querySelector("#prazo");

let parcelasLength


let clear = () => {
    valor.value = ""
    entrada.value = ""
    taxa.value = ""
    prazo.value = ""

    for (let i = parcelasLength; i > 0; i--) {

        tbody.deleteRow(-1)
    }
}

let clearFin = () => {

    for (let i = parcelasLength; i > 0; i--) {

        tbody.deleteRow(-1)
    }

}
let btnclear = document.querySelector("#clear")
btnclear.addEventListener("click", clear)

let calc = document.querySelector("#calcular");
function onClick() {
    clearFin()

    let valorA = valor.value.replace(",", ".");
    let taxaA = taxa.value.replace(",", ".");
    let prazocheck = prazo.value.replace(",", ".");
    let prazoA = checkInt(prazocheck);
    let entradaA = entrada.value.replace(",", ".");
    let prazcarenciaA = Number(prazcarencia.value)
    let fina = new Financiamento(valorA, prazoA.prazCorrec, taxaA, entradaA, prazcarenciaA);
    msg.textContent = prazoA.msg
}
calc.addEventListener("click", onClick);

// POO para calculo do financiamento

class Financiamento {
    #valor;
    #prazo;
    #taxa;
    #entrada;
    #saldoInic;
    #amort;
    #juros;
    #carencia

    constructor(valor, prazo, taxa, entrada, carencia) {
        this.#valor = valor;
        this.#carencia = carencia

        if (this.#carencia == 0) {
            this.#prazo = prazo;
        } else {
            this.#prazo = prazo - carencia
        }
        this.#taxa = taxa;
        this.#entrada = entrada;
        this.#saldoInic = this.#valor - this.#entrada;
        this.#amort = this.#saldoInic / this.#prazo;
        this.#juros = this.#saldoInic * (this.#taxa / 100);
        let parc = new Parcela(this.#saldoInic, this.#amort, this.#juros, this.#taxa, this.#prazo, this.#carencia);
        parcelasLength = parc.getParcelas().length


    };
}

class Parcela {

    #prazo;
    #carencia;
    #taxa;
    #saldoInic;
    #amort;
    #amortcar;
    #jurosInic;
    #parcelas = [];

    constructor(saldoInic, amort, valorJurosInic, taxa, prazo, carencia) {

        this.#saldoInic = saldoInic;
        this.#prazo = prazo;
        this.#carencia = carencia
        this.#taxa = taxa;
        this.#amort = amort;
        this.#amortcar = this.#saldoInic / this.#prazo
        this.#jurosInic = valorJurosInic;



        if (this.#carencia == 0) {

            let parcela01 = {
                "Numero": 1,
                "SaldoDevedor": (this.#saldoInic).toFixed(2),
                "Amortizacao": (this.#amort).toFixed(2),
                "JurosMes": (this.#jurosInic).toFixed(2),
                "PrazoRem": (this.#prazo - 1).toFixed(2),
                "ValorParcela": (this.#amort + this.#jurosInic).toFixed(2),
                "SaldoFinal": (this.#saldoInic - this.#amort).toFixed(2)
            };
            this.#parcelas.push(parcela01);
            this.#prazo--;
        }
        else {
            let parcela01 = {
                "Numero": 1,
                "SaldoDevedor": (this.#saldoInic).toFixed(2),
                "Amortizacao": (0).toFixed(2),
                "JurosMes": (this.#jurosInic).toFixed(2),
                "PrazoRem": (this.#prazo + this.#carencia - 1).toFixed(2),
                "ValorParcela": (0 + this.#jurosInic).toFixed(2),
                "SaldoFinal": (this.#saldoInic).toFixed(2)
            };
            this.#parcelas.push(parcela01);
            this.#carencia--;


            while (this.#carencia > 0) {
                let parcAnt = this.#parcelas[this.#parcelas.length - 1]
                let demParc = {
                    "Numero": parcAnt.Numero + 1,
                    "SaldoDevedor": parcAnt.SaldoFinal,
                    "Amortizacao": (0).toFixed(2),
                    "JurosMes": (parcAnt.SaldoFinal * (this.#taxa / 100)).toFixed(2),
                    "PrazoRem": (this.#prazo + this.#carencia - 1).toFixed(2),
                    "ValorParcela": (0 + parcAnt.SaldoFinal * (this.#taxa / 100)).toFixed(2),
                    "SaldoFinal": parcAnt.SaldoFinal
                };
                this.#parcelas.push(demParc);
                this.#carencia--;

            }




        }



        while (this.#prazo > 0) {
            let parcAnt = this.#parcelas[this.#parcelas.length - 1]
            let demParc = {
                "Numero": parcAnt.Numero + 1,
                "SaldoDevedor": parcAnt.SaldoFinal,
                "Amortizacao": (this.#amort).toFixed(2),
                "JurosMes": (parcAnt.SaldoFinal * (this.#taxa / 100)).toFixed(2),
                "PrazoRem": (parcAnt.PrazoRem - 1).toFixed(2),
                "ValorParcela": (this.#amort + parcAnt.SaldoFinal * (this.#taxa / 100)).toFixed(2),
                "SaldoFinal": (parcAnt.SaldoFinal - this.#amort).toFixed(2)
            };
            this.#parcelas.push(demParc);
            this.#prazo--;
        }
        for (let parc of this.#parcelas) {
            let linha = tbody.insertRow(-1);

            for (let data in parc) {
                linha.insertCell(-1)
                    .innerText = parc[data];
            }
        }
    }

    getParcelas() {
        return this.#parcelas
    }
};



