// const template = document.querySelector('#template').content;
// const feedback = document.querySelector('.feedback');
const l = 'http://greenarea.me/wp-content/uploads/2016/02/Feng-Shui-Basics-Limpieza-productos-de-limpieza-C_Okea-1200x800.jpg'
// Declaracion de variables globales
let cantProductos = 0;
let costoTotal = 0;
const newProductos = [];
let listaCompras = '';
//imprimimos los productos
// function printProductos() {
//     newProductos.forEach((producto) => {
// 		// creo copia del template
// 		let clon = document.importNode(template,true);

// 		// uso del metodo forEach para iterar sobre el array de usuarios, y rellenar el html con esos datos
// 		clon.querySelector("#nombre").textContent = producto.nombre;
// 		clon.querySelector("#precio").textContent = producto.precio;
// 		clon.querySelector("#seccion").textContent = producto.seccion;

// 		feedback.appendChild(clon);
// 	});
// }
//eventos
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
document.addEventListener('DOMContentLoaded', function(){
    const productosStorage = JSON.parse(localStorage.getItem('listaP'));
    listaP = productosStorage || [];
    cargarHtml(listaP);
    // console.log('doc cargado');
})

form.addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    if (edit) {
        edit= false;
        productoEdit.nombre = inputNombre.value;
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
    li.dataset = listaP.length;
    li.innerHTML = `<p class="mb-0 col-6">${inputNombre.value} $${inputPrecio.value}</p><i class="fas fa-pen col1"></i><i class="fas fa-trash col-1"></i>`
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

function clickProductos(e){
    if(e.target.classList.contains('fa-trash')){
        const index = listaP.findIndex(producto => producto.id == e.target.parentElement.dataset.id);
        if(index){
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
            btnCancelar.classList.toggle('d-none');
            btnForm.value = 'Guardar';
        }
    }

}

    //Llamados a las funciones e informamos cuando se tenga todo comprado

