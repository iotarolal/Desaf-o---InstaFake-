// Empezamos con el formulario
let token;

$('#formLogin').on('submit', async function (ev) {
  // primero evitamos que se recargue la pagina
  ev.preventDefault();
  // obtenemos el email y el password
  const email = $('#exampleInputEmail1').val()
  const password = $('#exampleInputPassword1').val()

  // ahora vamos a solicitar el Token
  const data = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })

    console.log(data);
  })
