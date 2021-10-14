//Mi Poyecto se basa en una pagina web de salud y fitness Gral.
//le damos la bienvenida al Usuario con mensaje personalizado.
console.log('Bienvenido a Fitness-Style');
alert('Bienvenid@s a Fitness-Style');
saludar();
function saludar(){
    let nombre = prompt('¿Cual es tu nombre?');
    let apellido = prompt('¿Y tu apellido?');
    alert(`Un gusto ${nombre} ${apellido}`)
    return nombre,apellido;
}
//Brindamos opciones de acciones dentro de la página, y condicionamos su entrada===> estas opciones son una calculadora de IMC y la otra es una lista de compras inteligente.
let opGeneral;
opGeneral = Number (prompt(`En esta seccion tenes acceso a:
1-Calculadora de IMC y PGC(índice de masa corporal/Porcentaje de grasa corporal)
2-Acceder a Lista de Compras FITT Automática

0-No deseo hacer ninguna de las dos.`));
//generamos un ciclo que repita las opciones si el usuario no ingresa lo especificado.
while(opGeneral != 0){
    switch (opGeneral) {
        case 1:
            //declaracion de funciones de mi calculadora 
            const template = document.querySelector('#template').content;
            const feedback = document.querySelector('.feedback');
            const valores = [];


            function imc(peso, altura) {
                const IMC = peso / (altura ** 2);
                alert (`Tu IMC es: ${IMC.toFixed(1)} `)
                return IMC;
            };
            function pgcMujeres(IMC, edad) { 
               const pgc = 1.2 * IMC + 0.23 * edad - 5.4;
               return pgc;
            }
            function pgcHomnbres(IMC, edad) {
                const pgc = 1.2 * IMC + 0.23 * edad -10.8 - 5.4;
                return pgc;
            }
            //pedimos el ingreso de los datos necesarios al usuario segun su sexo.
            alert('Vamos a calcular tu porcentaje de grasa corporal');
            alert('Para eso primero necesitamos calcular tu IMC(índice de masa corporal)');
            let menu = Number (prompt(`Ingresa el Nº de una de las siguientes opciones:
            1- Mujer
            2- Hombre`));
            while (menu >= 3 || menu < 1 || isNaN(menu)) {
                alert('Esa opcion no existe');
                menu = Number (prompt(`Ingresa el Nº de una de las siguientes opciones:
                1- Mujer
                2- Hombre`));
            }
            //declaramos las variables al scope correspondiente.
            let peso, altura, edad, IMC, pgcH, pgcM;
            //declaración de casos.
            switch (menu) {
                case 1:
                    peso = Number(prompt('Ingresa tu peso en Kg(Kilogramos)'));
                    altura = Number(prompt('Ingresa tu altura en m(Metros)'));
                    edad = Number (prompt('Ingresa tu edad'));
                    IMC = imc(peso,altura);
                    pgcM = pgcMujeres(IMC,edad);
                    alert('Ahora con tu imc calcularemos tu pgc(porcentaje de grasa corporal)');
                    pgcMujeres(IMC,edad);
                    alert(`Tu porcentaje de grasa corporal es: ${pgcM.toFixed(1)}`);
                    break;
                case 2:
                    peso = Number(prompt('Ingresa tu peso en Kg(Kilogramos)'));
                    altura = Number(prompt('Ingresa tu altura en m(Metros)'));
                    edad = Number (prompt('Ingresa tu edad'));
                    IMC = imc(peso,altura);
                    alert('Ahora con tu imc calcularemos tu pgc(porcentaje de grasa corporal)');
                    pgcHomnbres(IMC, edad);
                    pgcH = pgcHomnbres(IMC, edad);
                    alert(`Tu porcentaje de grasa corporal es: ${pgcH.toFixed(1)}`);
                    break;   
            
                default:
                    
                    break;
            }
            alert('Programa Finalizado :D');
            opGeneral = 0;
            break;
        case 2:
            //Lista de compra de productos inteligentes 
const cantidadProductos = Number (prompt('Ingresa la cantidad de productos a comprar:'));
// Declaracion de variables globales
let cantProductos = 0;
let contadorProductos = 0;
let precio = 0;
let costoTotal = 0;
let productos = {};
let newProductos = [];
let listaCompras = '';
//creacion de los constructores
class Producto {
    constructor (nombreProducto, precioProducto, seccionProducto){
        this.nombre = nombreProducto;
        this.precio = precioProducto;
        this.seccion = seccionProducto;
        if (this.nombre){
            contadorProductos++;}
     }
}
//creacion de la lista de productos a comprar/con condiciones
//le pedimos al usuario que especifique a que seccion pertenece el producto a comprar
// limpieza/comestible/bebidas y lo condicionamos a solo esas secciones.
for (let j = 1; j <= cantidadProductos; j++) {
    const producto = prompt(`Ingresa el producto nº ${j}`);
    const precio = Number (prompt(`Ingresa el precio del producto ${j}`));
    let seccion;
    do {
        seccion = prompt(`Ingrese la inicial la seccion correspondiente ya sea:
         L/C/B/O (Limpieza/Comestible/Bebidas/Otros) =`).toLowerCase();
    } while(!(seccion === 'l' || seccion === 'c' || seccion === 'b' || seccion === 'o'))
//pusheo c/nuevo objeto dentro de mi array newProducto
newProductos.push(new Producto(producto, precio, seccion));
//ordeno la salida de mi array de menor a mayor precio / COMPLEMENTARIO
newProductos.sort((a,b) => {
    if (a.precio < b.precio){
        return -1;
    }
    if (a.precio > b.precio){
        return 1;
    }  
    return 0;
});  
  
    console.log(`producto nº ${j}: ${producto}`);
    if (j == cantidadProductos){
        listaCompras +=`nº${j}: ${producto}`;
        break;
    }
        listaCompras += `nº${j}: ${producto}`+'\n';

}
//muestro en consola lo que tiene mi array
console.log(newProductos);
//Declaracion de funciones Contador-de-productos/Contador-de-secciones/Precios
function contProductos(contadorProductos){
    document.write(`Están alistandose ${contadorProductos} productos`)
}
function contarSeccion (){
    let contadorL = 0;
    let contadorC = 0;
    let contadorO = 0;
    for (const item of newProductos) {
        if (item.seccion === 'l'){
            contadorL++;
        }else if (item.seccion === 'c'){
            contadorC++;
        }else if (item.seccion === 'o'){
            contadorO++;
        }

    }

    let contadorB = contadorProductos - contadorL - contadorC - contadorO;
    document.write(`Compraste ${contadorL} producto/s de limpieza, ${contadorC} producto/s comestible/s, ${contadorB} bebida/s y ${contadorO} producto/s Vario/s`)
}
function precios(){
    for (const item of newProductos) {
         precio += item.precio;
         costoTotal = precio;
    }
  document.write(`El TOTAL de tu compra es: ${costoTotal}`);
}

//Imformamos al usuario cual es su lista definitiva de productos y le damos
// la opcion de ir ingresando cuantos productos se va adquiriendo.
alert(`Tu lista de compras es:
${listaCompras}` );
let productosAcomprar = cantidadProductos;
let opcion;


//Condicionamos que el ingreso del usuario sea una de las dos opciones mostradas y solo esas sin exepcion 
 while (productosAcomprar > 0) {
     if (!opcion){
     opcion = Number(prompt(`Elegí una opción:
     1- Ingresar la cantidad de productos comprados
     2- Ingresa el nº de orden de producto comprado`));
     }
     switch (opcion) {
         case 1:
             const cantProductosComprados = Number(prompt('Ingresa la cantidad de productos que compraste:'));
             if (cantProductosComprados > cantidadProductos) {
                 alert('Te estas saliendo de los productos especificados');
                 continue;
             } else if (isNaN(cantProductosComprados)){
                 alert('Debes ingresar un nº capo');
                 continue;
             }

             productosAcomprar = productosAcomprar - cantProductosComprados;
             if (productosAcomprar > 0) {
                 alert(`Te quedan por comprar ${productosAcomprar} productos` ); 
                }
             break;  
             


         case 2:
            const  ordenProducto = Number(prompt('Ingresa el nº de orden del producto que vas comprando:'));
            if (ordenProducto > cantidadProductos){
                alert('ese nº de orden no existe');
                continue;
            } 
            productosAcomprar--;
            if (productosAcomprar > 0){
                 alert(`Te quedan por comprar ${productosAcomprar} productos` );
                 }      
             break;
     
         default:
             alert('El nº ingresado no corresponde a una opción');
             opcion = undefined;
             break;
     }
     
     
    }
    //Llamados a las funciones e informamos cuando se tenga todo comprado
 
    alert('Buenísimo, ya tenes todo comprado!!!')
    contProductos(contadorProductos);
    contarSeccion();
    precios();    
    opGeneral = 0;     
                break;
    
        default:
            opGeneral = Number (prompt(`La opcion ingresada no es correcta:
1-Calculadora de IMC y PGC(índice de masa corporal/Porcentaje de grasa corporal)
2-Acceder a Lista de Compras FITT Automática

0-No deseo hacer ninguna de las dos.`));
        
            break;
    }}
alert(`Que tengas un muy buen día`)