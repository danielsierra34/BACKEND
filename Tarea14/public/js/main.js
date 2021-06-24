let socket = io.connect()

socket.on('productos', data => {
    console.log("se listan los productos en el cliente")
    document.getElementById('productos').innerHTML = productTemplate(data.reverse())
})

socket.on('mensajes', data => {
    console.log("se listan los mensajes en el cliente")
    document.getElementById('mensajes').innerHTML = messageTemplate(data.reverse())
})

const formProducto = document.getElementById('formCreacionProducto');
formProducto.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = Object.fromEntries(data.entries());
    const jsonx=JSON.parse(JSON.stringify(json))
    const alerta = document.getElementById("alertaProductos");
    console.log(jsonx)
    if(jsonx.title && jsonx.price && jsonx.thumbnail){
        fetch('/api/productos/guardar', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(json)
        }).then(respuesta => respuesta.text()).then(productos => {
            formProducto.reset();
            let rnd=Math.floor(Math.random() * 300) + 200
            document.getElementById("thumbnail").value="https://picsum.photos/" + rnd
            socket.emit('update', 'ok');
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

const formMensaje = document.getElementById('formCreacionMensaje');
formMensaje.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = Object.fromEntries(data.entries());
    const jsonx=JSON.parse(JSON.stringify(json))
    const alerta = document.getElementById("alertaMensajes");
    console.log(jsonx)
    if(jsonx.email && jsonx.mensaje){
        fetch('/api/mensajes/guardar', {
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
