"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suma = /** @class */ (function () {
    function Suma(numero1, numero2) {
        this.operador1 = numero1;
        this.operador2 = numero2;
    }
    Suma.prototype.resultado = function () {
        return this.operador1 + this.operador2;
    };
    return Suma;
}());
exports.default = Suma;
