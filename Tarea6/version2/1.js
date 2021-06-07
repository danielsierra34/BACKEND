import Archivo from './modules/funcionArchivo.js';

const archivo = new Archivo('productos.txt');
// se lee el archivo.
//el metodo read() internamente tiene la impresion en consola.
archivo.read()

// se genera un objeto cualquiera
const objeto={
    title:'producto 1',
    price:500, 
    thumbnail:'https://imgfaker.com'
}
// se pasa como parametro al metodo write 
//internamente este meto se encarga de:
//1.Leer er archivo
//2.Parsearlo como una coleccion
//3.agregar el objeto a la coleccion
//4.convertir la coleccion en un string 
//5.guardar el string en un archivo
//6.leer nuevamente el archivo e imprimirlo en la consola
archivo.write(objeto) 





