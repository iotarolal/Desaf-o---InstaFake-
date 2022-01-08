// Inicio
let token;

$('#formphotos').on('submit', async function (ev) {
  // evitemos que se recargue la pagina
    ev.preventDefault();
    // obtenemos el email y el password
    const email = $('#input-email').val()
    const password = $('#input-password').val()

    // ahora vamos a solicitar el Token
    const data = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
    })
    const jwt = await data.json()

    // guardamos el token en una variable
    token = jwt.token

    console.log(token)
    getphotos(token)
})

async function getphotos(token) {
    // Ahora vamos a buscar los Fotos


    const data2 = await fetch('/api/photos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        const respuesta = await data2.json()
        const photos = respuesta.data
    
        llenarfotos(photos)
}


function llenarfotos(photos) {
  //  llenamos las card con las fotos 
    for (let photo of photos) {

        console.log(photo.url)
        $('#fotos').append(`
            <div class=card col-4 offset-4">
                <img src="${photo.download_url}" class=”card-img-top" alt=”fotos">
                <div class="card-body">
                    <p class="card-text">Autor: ${photo.author} <p>
                </div>
            </div>
        `)
    }

    // Escondemos el formulario
    $('#div-form').removeClass('d-block').addClass('d-none')
    // Mostramos la tabla
    $('#div-tabla').removeClass('d-none').addClass('d-block')
}
