// Inicio
let token;
let nropaginas = 1;
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

    localStorage.setItem ("token",token);

    getphotos(token)
})



//(function() {
//    If (localStorage.getItem("token")) {
//        const token = localStorage.SetItem("token", token)
//        getPhotos(token)
//    }
//})

async function getphotos(token) {
// Ahora vamos a buscar los Fotos
    const data2 = await fetch('/api/photos?limit=10', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const respuesta = await data2.json()
    const photos = respuesta.data

    $("#formphotos").addClass("d-none").removeClass("d-block");
    $("#photos").addClass("d-block").removeClass("d-none");
            
    $("#salir").removeClass("d-none").addClass("d-block");
    $("#mas").removeClass("d-none").addClass("d-block");

console.log(photos)
    llenarfotos(photos)
}


function llenarfotos(photos) {
  //  llenamos las card con las fotos 

    for (let photo of photos) {

        $('#photos').append(`
            <div class="card" style="width: 08rem;">
                <img src="${photo.download_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Autor: ${photo.author}</h5>
                </div>
            </div>
        `)

    }

    // Escondemos el formulario
    $('#div-form').removeClass('d-block').addClass('d-none')
    // Mostramos photos
    $("#photos").removeClass("d-none").removeClass("d-block");

}

// logout del usuario
$('#salir').on('click', async function (ev) {
    // evitemos que se recargue la pagina
        ev.preventDefault();
        // obtenemos el email y el password
        $("#formphotos").addClass("d-block").removeClass("d-none");
        $("#photos").removeClass("d-block").addClass("d-none");
        $("#salir").removeClass("d-block").addClass("d-none");
        $("#salir").removeClass("d-block").addClass("d-none");
    
})

// Mostrar mas fotografias
$('#mas').on('click', async function (ev) {
    // evitemos que se recargue la pagina
        ev.preventDefault();
        // obtenemos el email y el password
    
        const data2 = await fetch('/api/photos?page=2', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const respuesta = await data2.json();
        const photos = respuesta.data;

        console.log("mas maspaginas");
        nropaginas ++;
        llenarfotos(photos);

})

// Ahora vamos a buscar los Fotos