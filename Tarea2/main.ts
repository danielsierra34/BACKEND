async function operacion(numero1:number,numero2:number,operacion:string){
    try{
        let Operador= await import(`./${operacion}`);//este es el nombre del archivotsc
        let instancia = new Operador.default(numero1,numero2);
        let resultado = instancia.resultado();
        return resultado;
    }catch (error){
        throw error;
    }
}

async function operaciones(){
    console.log(await operacion(10,5,"suma"));
    console.log(await operacion(10,5,"resta"));
}

operaciones();
