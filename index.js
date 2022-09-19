//next improvments
//send simulation by email 
// generate a pdf of the simulation


import { checkInt } from "./functions.js";

import { Parcela } from './parcelas.js';

//JS responsivo do HTML


let carencia = document.querySelector("#carencia");
let prazcarencia = document.querySelector("#prazcarencia");
let tbody = document.querySelector("#tbody")
let msg = document.querySelector("#message")

carencia.addEventListener("change", function () {
    if (this.checked) {
        prazcarencia.removeAttribute("hidden");
    } else {
        +
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

export class Financiamento {
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