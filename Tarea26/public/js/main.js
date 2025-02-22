checkStatus()

let socket = io.connect()

socket.on('productos', data => {
    document.getElementById('productos').innerHTML = productTemplate(data.reverse())
})

socket.on('mensajes', data => {
    document.getElementById('mensajes').innerHTML = messageTemplate(data.reverse())
})

socket.on('carrito', data => {
    document.getElementById('shoppingCartContainer').innerHTML = cartItemTemplate(data.reverse())
})

const formProducto = document.getElementById('formCreacionProducto');
formProducto.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(e.target);
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
formMensaje.addEventListener('submit', e => {
    event.preventDefault();
    const data = new FormData(e.target);
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
            socket.emit('mensajeCreado', 'ok');
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
    {{#if hayProductos}} 
    <div class="row"> 
            {{#each productos}}
                <div class="col-sm-4 col-md-3">
                    <div class="thumbnail">
                        <form class="formProductoAgregar">
                            <img width="100%" src="{{this.thumbnail}}" alt="...">
                            <div class="caption">
                                <h4 class="text-center">{{this.title}}</h4>
                                <p class="line-clamp">{{this.description}}</p>                                    
                                <div class="price text-center">
                                $ {{this.price}}
                                </div>
                                <hr>
                                <p class="small">Selecciona una cantidad:</p>
                                <div class="text-center">                                       
                                    <input type="number" class="inputpeq" value="0" name="quantity">
                                    <div class="small">
                                        de <br> {{this.stock}} Disponibles
                                    </div>
                                    <br>
                                    <div class="idProducto hide">
                                    <input type="text" value="{{this.id}}" name="id">
                                </div>
                                <div id="alertaProductos" class="alert small"></div>                           
                                <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button> 
                                </div> 
                                <br>                              
                            </div>
                        </form>
                    </div>
                </div>
            {{/each}}
    </div>
{{else}}  
    <h3 class="alert alert-warning">No se encontraron productos</h3>
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

const formLogin = document.getElementById('formLogin');
    formLogin.addEventListener('submit', e => {
        e.preventDefault();    
        const data = new FormData(e.target);
        const datax = data.entries();
        const json = Object.fromEntries(data.entries());
        const jsonx = JSON.stringify(json);        
        const usp = new URLSearchParams();
        for (const pair of new FormData(e.target)) {
            usp.append(pair[0], pair[1]);
        }
        console.log("usp",usp)
        login(usp)
        
    });
    
    function login(data){
        const alerta = document.getElementById("alertaLogin");
        fetch(`/login`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
            }
        }).then(async respuesta => {
            const resp= await respuesta.json()            
            alerta.className = '';
            alerta.classList.add("alert");
            alerta.classList.add(`alert-${resp.alert}`);
            alerta.innerHTML = resp.mensaje             
            alerta.style.display = "block";
            setTimeout(function(){
                if(resp.status){
                    setTimeout(function(){
                        location.reload();
                    },800)
                }
                alerta.style.display = "none";
            },1500)
        }).catch(error => {
            console.log('ERROR', error);
        });
    }
    
    const formRegister = document.getElementById('formRegister');
    formRegister.addEventListener('submit', e => {
        e.preventDefault();    
        const data = new FormData(e.target);
        const datax = data.entries();
        const json = Object.fromEntries(data.entries());
        const jsonx = JSON.stringify(json);        
        const usp = new URLSearchParams();
        for (const pair of new FormData(e.target)) {
            usp.append(pair[0], pair[1]);
        }
        console.log("usp",usp)
        register(usp)
        
    });
    
    function register(data){ 
        const alerta = document.getElementById("alertaRegister");
        fetch(`/register`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
            }
        }).then(async respuesta => {
            const resp= await respuesta.json()            
            alerta.className = '';
            alerta.classList.add("alert");
            alerta.classList.add(`alert-${resp.alert}`);
            alerta.innerHTML = resp.mensaje             
            alerta.style.display = "block";
            setTimeout(function(){
                if(resp.status){
                    setTimeout(function(){
                        location.reload();
                    },1500)
                }
                alerta.style.display = "none";
            },1500)
        }).catch(error => {
            console.log('ERROR', error);
        });
    }
    
    function checkStatus(){
        console.log("checking Status")
        fetch('/status', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(respuesta => respuesta.json()).then(status => {
            console.log(status)
            if(status.status){
                console.log(`${status.user.firstName} is logged`)
                document.querySelectorAll('.logged').forEach(function(el) {
                    el.style.display = 'block';
                });
                document.querySelectorAll('.unlogged').forEach(function(el) {
                    el.style.display = 'none';
                });
                document.getElementById("nombreUsuario").innerHTML = status.user.firstName
            }else{
                console.log("nobody is loggedw")
                document.querySelectorAll('.logged').forEach(function(el) {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.unlogged').forEach(function(el) {
                    el.style.display = 'block';
                });
            }
            setTimeout(() => {
                checkStatus()
            }, 5000);
            
        }).catch(error => {
            console.log('ERROR', error);
        });
    }

    function logout(){
    fetch(`/logout`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(respuesta => respuesta.json()).then(logout => {
            location.reload();
        
    }).catch(error => {
        alert("error")
        //console.log('ERROR', error);
    });
}