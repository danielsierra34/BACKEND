let arreglo= [];
process.on('message', msg => {
    console.log(`se solicito la creacion de ${msg} numeros aleatorios`)
    for(i=0;i<=msg;i++){
        const aleatorio = Math.floor(Math.random() * 1000)
        arreglo[aleatorio] = isNaN(arreglo[aleatorio]) ? 1 : arreglo[aleatorio]+1
    }
    process.send(arreglo);
});