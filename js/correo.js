// Configura la API de Gmail
function initGmailAPI() {
    gapi.load('client:auth2', initClient);
  }
  
  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyAB29ud0g08e0t3h9PUao7gp61HEVFUXpg',
      clientId: '371070147647-t9q6seob4t2qdt5g97e4pq3p5r279tks.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: 'https://www.googleapis.com/auth/gmail.send'
    }).then(function() {
      gapi.auth2.getAuthInstance().signIn();
      $('#gmailForm').on('submit', sendEmail);
    });
  }
  
  // Enviar correo electrónico
  function sendEmail(e) {
    e.preventDefault();
  
    // Obtiene los valores de los campos del formulario
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();
  
    // Construye el cuerpo del correo electrónico
    var emailBody = "Nombre: " + name + "\n" +
                    "Email: " + email + "\n" +
                    "Mensaje: " + message;
  
    var base64EncodedEmail = btoa(
      "Content-Type: text/plain; charset=\"UTF-8\"\n" +
      "MIME-Version: 1.0\n" +
      "Content-Transfer-Encoding: 7bit\n" +
      "to: 19eduardo.cruz98@gmail.com\n" +  // Reemplaza con tu dirección de correo electrónico
      "subject: Nuevo mensaje del formulario\n\n" +
      emailBody
    ).replace(/\+/g, '-').replace(/\//g, '_');
  
    // Envía la solicitud para enviar el correo electrónico
    gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': base64EncodedEmail
      }
    }).then(function(response) {
      console.log(response);
      alert('Correo electrónico enviado correctamente');
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    }, function(error) {
      console.error(error);
      alert('Ha ocurrido un error al enviar el correo electrónico');
    });
  }
  
  // Inicializa la API de Gmail al cargar la página
  gapi.load('client:auth2', initGmailAPI);
  