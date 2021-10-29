//Proyecto de pagina web fitt, contara con distintas funciones, calculadoras, listas inteligentes
//y un pequeño shop de suplementos(este y la calculadora los agregare para la entrega final)
// Declaracion de variables globales
let cantProductos = 0;
let costoTotal = 0;
const newProductos = [];
let listaCompras = '';
const inputNombre = document.querySelector('#nombre');
const inputPrecio = document.querySelector('#precio');
const inputSeccion = document.querySelector('#seccion')
const listaProductos = document.querySelector('#lista-productos')
const form = document.querySelector('form');
const btnForm = document.querySelector('#btn-enviar');
const btnCancelar = document.querySelector('#btn-cancelar');
let listaP;
let edit = false;
let productoEdit = {};
//cuando cargo la pagina refrezco el storage por si quedo algo guardado
document.addEventListener('DOMContentLoaded', function(){
    const productosStorage = JSON.parse(localStorage.getItem('listaP'));
    listaP = productosStorage || [];
    cargarHtml(listaP);
})
//escucho al boton enviar
form.addEventListener('submit', submitForm);
//funcion para crear el producto a comprar
function submitForm(e){
    e.preventDefault();
    if (edit) {
        edit= false;
        productoEdit.nombre = inputNombre.value;
        productoEdit.precio = inputPrecio.value;
        productoEdit.seccion = inputSeccion.value;
        const nuevosProductos = listaP.map(producto =>{
            if(producto.id === productoEdit.id){
                return productoEdit;
            }else {
                return producto
            }
        });
        localStorage.setItem('listaP', JSON.stringify(nuevosProductos));
        cargarHtml(nuevosProductos);

        btnCancelar.classList.toggle('d-none');
        btnForm.value ='Enviar';
    } else{
    const li = document.createElement('li');
    li.classList.add('row');
    li.dataset.id = listaP.length;
    li.innerHTML = `<p class="mb-0 col-6">${inputNombre.value} $${inputPrecio.value}</p><i class="fas fa-pen col-1"></i><i class="fas fa-trash col-1"></i>`
    if(inputNombre.value){
        listaProductos.appendChild(li)
    }
    let producto = {
        id: listaP.length,
        nombre: inputNombre.value,
        precio: inputPrecio.value,
        seccion: inputSeccion.value
    };
    listaP.push(producto);
    localStorage.setItem('listaP', JSON.stringify(listaP));
}
    form.reset();
}
//funcion para imprimir en el html
function cargarHtml(listadoProductos){
    listaProductos.innerHTML = '';
    // console.log(listadoProductos);
    listadoProductos.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('row')
        li.dataset.id = producto.id;
        li.innerHTML = `<p class="mb-0 col-6">${producto.nombre} $${producto.precio}</p><i class="fas fa-pen col-1"></i><i class="fas fa-trash col-1"></i>`
        listaProductos.appendChild(li)
    });
}
listaProductos.addEventListener('click', clickProductos);
//funciones para editar y/o eliminar un producto de la lista
function clickProductos(e){
    if(e.target.classList.contains('fa-trash')){
        const index = listaP.findIndex(producto => producto.id == e.target.parentElement.dataset.id);
        if(index || index === 0){
            listaP.splice(index, 1);
            localStorage.setItem('listaP', JSON.stringify(listaP));
            e.target.parentElement.remove();
        }

    }
    if (e.target.classList.contains('fa-pen')){
        edit = true;
        productoEdit = listaP.find(producto => producto.id == e.target.parentElement.dataset.id);
        if(productoEdit){
            inputNombre.value = productoEdit.nombre;
            inputPrecio.value = productoEdit.precio;
            inputSeccion.value = productoEdit.value;
            btnCancelar.classList.toggle('d-none');
            btnForm.value = 'Guardar';
        }
    }
};