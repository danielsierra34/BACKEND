
let socket = io.connect()



socket.on('productos', data => {
    console.log("se listan los productos en el cliente")
    document.getElementById('listadoProductos').innerHTML = data2TableHBS2(data.reverse())
})




const form = document.getElementById('formCreacionProducto');
form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = Object.fromEntries(data.entries());
    console.log(JSON.stringify(json))
    fetch('/api/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(json)
    }).then(respuesta => respuesta.text()).then(productos => {
        form.reset();
        let rnd=Math.floor(Math.random() * 300) + 200
        document.getElementById("thumbnail").value="https://picsum.photos/" + rnd
        socket.emit('update', 'ok');
    }).catch(error => {
        console.log('ERROR', error);
    });
});


function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
function data2TableHBS2(productos) {
    const plantilla = `
        <style>
        #listadoProductos{
            max-width: 100%;
            overflow: auto;
        }
        hr{
            margin:0
        }
        .list{
            white-space: nowrap;
        }
            .list li{
                display:inline-block;
                background-color:white;
                width:120px;
                margin:8px;
                border-radius:8px;
                text-align:center;
                padding:6px;
            }
        </style>

        {{#if productos.length}} 
        <ul class="list">
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
