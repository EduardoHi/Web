
$('#signup_button').on('click', function() {

  const email = $('#email').val()
  const password = $('#password').val()
  const name = $('#name').val()
  const age = $('#age').val()

  // cargar los valores de password, email, name, age
  json_to_send = {
    password,
    email,
    name,
    age
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    // url: 'http://localhost:3000/users',
    url: 'https://damp-retreat-34379.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
