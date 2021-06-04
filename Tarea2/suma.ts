export default class Suma {
    private operador1:number;
    private operador2:number;

    constructor(numero1:number, numero2:number){
        this.operador1=numero1;
        this.operador2=numero2;
    }

    resultado():number{
        return this.operador1 + this.operador2
    }
}