"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resta = /** @class */ (function () {
    function Resta(numero1, numero2) {
        this.operador1 = numero1;
        this.operador2 = numero2;
    }
    Resta.prototype.resultado = function () {
        return this.operador1 - this.operador2;
    };
    return Resta;
}());
exports.default = Resta;
