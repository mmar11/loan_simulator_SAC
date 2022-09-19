import { Financiamento } from "./index.js";

export class Parcela {

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
