let socket = io.connect()

/*socket.on('productos', data => {
    console.log("se listan los productos en el cliente")
    document.getElementById('productos').innerHTML = productTemplate(data.reverse())
})*/

socket.on('mensajes', data => {
    console.log("se listan los mensajes en el cliente")
    document.getElementById('mensajes').innerHTML = messageTemplate(data.reverse())
})

socket.on('carrito', data => {
    console.log("se muestra el carrito de compras al usuario")
    document.getElementById('shoppingCartContainer').innerHTML = cartItemTemplate(data.reverse())
})

socket.on('productos', data => {
    console.log("se muestra el carrito de compras al usuario")
    location.reload();
})

const formProducto = document.getElementById('formCreacionProducto');
formProducto.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = Object.fromEntries(data.entries());
    const jsonx=JSON.parse(JSON.stringify(json))
    const alerta = document.getElementById("alertaProductos");
    if(jsonx.title && jsonx.price && jsonx.thumbnail){
        fetch('/api/productos/agregar', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(json)
        }).then(respuesta => respuesta.text()).then(productos => {
            formProducto.reset();
            let rnd=Math.floor(Math.random() * 300) + 200
            document.getElementById("thumbnail").value="https://picsum.photos/" + rnd
            socket.emit('productoCreado', 'ok');
            alerta.style.display = "block";
            alerta.innerHTML = "Felicidades se ha creado tu producto"
            alerta.className = '';
            alerta.classList.add("alert");
            alerta.classList.add("alert-success");
            setTimeout(function(){
                alerta.style.display = "none";
            },1500)
        }).catch(error => {
            console.log('ERROR', error);
        });
    }else{
        alerta.style.display = "block";
        alerta.innerHTML = "Debes ingresar todos los campos"
        alerta.className = '';
        alerta.classList.add("alert");
        alerta.classList.add("alert-danger");
        setTimeout(function(){
            alerta.style.display = "none";
        },1500)
    }
});

function removeFromCart(id){
    if ( window.confirm("Está seguro de eliminar este item de su carrito?")) {
        fetch(`/api/carrito/eliminar/${id}`, {
            method: 'DELETE',
        }).then(            
            respuesta => console.log(respuesta.text())
        ).then(productos => {
            socket.emit('eliminado', 'ok');
            alert("producto eliminado")
        }).catch(error => {
            console.log('ERROR', error);
        });
    }
}

/*function changeQuantity(id,quantity){
    console.log(id , quantity)
    fetch(`/api/carrito/modificar/${id}`, {
        method: 'PUT',
    }).then(        
        respuesta => console.log(respuesta.text())
    ).then(productos => {
        socket.emit('agregado', 'ok');
        alert("producto actualizado")
    }).catch(error => {
        console.log('ERROR', error);
    });
}*/

const formMensaje = document.getElementById('formCreacionMensaje');
formMensaje.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = Object.fromEntries(data.entries());
    const jsonx=JSON.parse(JSON.stringify(json))
    const alerta = document.getElementById("alertaMensajes");
    console.log(jsonx)
    if(jsonx.email && jsonx.mensaje){
        fetch('/api/mensajes/agregar', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(json)
        }).then(respuesta => respuesta.text()).then(mensajes => {
            formMensaje.reset();
            socket.emit('mensajes', 'ok');
            alerta.style.display = "block";
            alerta.innerHTML = "Felicidades se ha enviado tu mensaje"
            alerta.className = '';
            alerta.classList.add("alert");
            alerta.classList.add("alert-success");
            setTimeout(function(){
                alerta.style.display = "none";
            },1500)
        }).catch(error => {
            console.log('ERROR', error);
        });
    }else{
        alerta.style.display = "block";
        alerta.innerHTML = "Debes ingresar todos los campos"
        alerta.className = '';
        alerta.classList.add("alert");
        alerta.classList.add("alert-danger");
        setTimeout(function(){
            alerta.style.display = "none";
        },1500)
    }
});

const classname = document.getElementsByClassName("formProductoAgregar");
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const json = Object.fromEntries(data.entries());
        const jsonx=JSON.parse(JSON.stringify(json))
        const alerta = this.querySelector('.alert');
        if(jsonx.quantity >0){
            fetch('/api/carrito/agregar', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(json)
            }).then(respuesta => respuesta.text()).then(mensajes => {
                socket.emit('agregado', 'ok');
                alerta.style.display = "block";
                alerta.innerHTML = "Felicidades se ha agregado el elemento al carrito"
                alerta.className = '';
                alerta.classList.add("alert");
                alerta.classList.add("alert-success");
                setTimeout(function(){
                    alerta.style.display = "none";
                },1500)
            }).catch(error => {
                console.log('ERROR', error);
            });
        }else{
            alerta.style.display = "block";
            alerta.innerHTML = "Debes ingresar una cantidad"
            alerta.className = '';
            alerta.classList.add("alert");
            alerta.classList.add("alert-danger");
            setTimeout(function(){
                alerta.style.display = "none";
            },1500)
        }
    }, false);
}


function productTemplate(productos) {
    const plantilla = `
        {{#if productos.length}} 
        <ul class="listaProductos">
            {{#each productos}}
                <li>
                    <b>{{this.title}}</b>
                    <hr>
                    <div>
                        <img width="100%" src={{this.thumbnail}} alt="not found">
                    </div>
                    <p>
                        $ {{this.price}}
                    </p>                
                </li>
            {{/each}}
        </ul>

        {{/if}}
    `

    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}

function cartItemTemplate(productos) {
    const plantilla = `
        {{#if productos.length}} 
        <ul id="shoppingCart">
            {{#each productos}}
                <li class="thumbnail container-fluid">
                    <div class="row-fluid">
                        <div class="col-xs-12 text-right noPaddingX">
                            
                        </div>
                        <div class="col-xs-12 noPaddingX">
                            <div class="delete pull-right" onclick="removeFromCart({{this.id}})">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </div>
                            <b>{{this.title}}</b>
                        </div>
                        <div class="col-xs-6 noPaddingX">
                            <img width="60px" src={{this.thumbnail}} alt="not found">
                        </div>
                        <div class="col-xs-6 noPaddingX">
                            $ {{this.total}}
                        <!--<div>$ {{this.price}}</div>
                            <div>x</div>
                            <input type="number" onchange="changeQuantity({{this.id}},this.value)" class="inputpeq" value="0" name="quantity">-->                           
                        </div>
                        <!--<div class="col-md-12">
                            <hr>                            
                        </div>-->
                    </div>        
                </li>
            {{/each}}
        </ul>

        {{/if}}
    `

    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}

function messageTemplate(mensajes) {
    const plantilla = `
        {{#if mensajes.length}} 
        <ul class="listaMensajes">
            {{#each mensajes}}
                <li>
                    <span class="mensajeEmail">
                        {{this.email}}
                    </span>                    
                    <span class="mensajeDateTime">
                        [{{this.dateTime}}]: 
                    </span> 
                    <span class="mensajeMensaje">
                        {{this.mensaje}}
                    </span>          
                </li>
            {{/each}}
        </ul>

        {{/if}}
    ` 

    var template = Handlebars.compile(plantilla);
    let html = template({ mensajes: mensajes, hayMensajes: mensajes.length });
    return html;
}
