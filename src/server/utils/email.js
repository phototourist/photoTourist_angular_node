var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


exports.sendEmail = function (req, res, token) {

  //template contact recieve
  var emailTo = '';
  var emailFrom = '';
  var subject = ' ';
  var text = ' ';

  var body ='';

  console.log(req.body.type);
  switch (req.body.type) {

      case 'user':
          emailTo = req.body.from;
          emailFrom = 'phototourist.contact@gmail.com';
          subject = req.body.subject;

           body = '<body>' +
                  '<div id="contact-email">' +
                  '<div> <h1>Contacto con PhotoTourist</h1> <h4>Sugerencia: ' + subject +
                  '</h4></div>' +
                  '<p>Su petición ha sido recibida por'+
                  ' el equipo de PhotoTourist, le atenderemos lo antes posible.</p>' +
                  '<p>Para volver a PhotoTourist pulse en el siguiente enlace'+
                  '<a href="http://localhost:3000/"> aqu&iacute;</a></p>' +
                  '</div>' +
                  ' </body>';

           break;

      case 'camtourist':
          emailTo = req.body.to;
          emailFrom = 'phototourist.contact@gmail.com';

          body = '<body>' +
              '<div id="contact-email">' +
              '<div> <h1>Tus fotos estan listas con PhotoTourist</h1>'  +
              '</div>' +
              '<p>Su fotos estan listas para ver' +
              '</p>' +
              '<p>Para verlas en PhotoTourist pulse en el siguiente enlace' +
              '<a href="http://localhost:3000/myPhotos/' + token +'"> aqu&iacute;</a></p>' +
              '</div>' +
              ' </body>';

          console.log('<a href="http://localhost:3000/Photos/' + token + '"> aqu&iacute;</a></p>');

          break;


      case 'admin':
          emailTo = 'phototourist.contact@gmail.com';
          emailFrom = req.body.from;
          text = req.body.text;

          body = '<body>' +
                  '<div id="contact-email">' +
                  '<div> <h1>Contacto con PhotoTourist</h1> <h4>Sugerencia: ' + req.body.subject +
                  '</h4></div>' +
                  '<section>' +
                  'Nombre:<p>' + req.body.name + '</p>' +
                  'Email: <p>' + req.body.from + '</p>' +
                  'Mensaje:<p>' + text + '</p></section>' +
                  '</div>' +
                  ' </body>';

          break;

      case 'modify':
          emailTo = req.body.to;
          emailFrom = 'phototourist.contact@gmail.com';
          subject = 'Recuperar Contraseña PhotoTourist';

          body = '<body>' +
              '<div id="contact-email">' +
              '<div> <h1>Contacto con PhotoTourist</h1> <h4>Sugerencia: ' + subject +
              '</h4></div>' +
              '<p>Su contraseña puede ser modificada a través del siguiente enlace' +
              '<a href="http://localhost:3000/recovery/' + token +'"> aqu&iacute;</a></p>' +
              //'<a href="http://josando.tk/recovery/' + token +'"> aqu&iacute;</a></p>' +
              '</div>' +
              ' </body>';

          break;
      case 'signup':

          break;

  }

    var template = '<style>' +
   '* {' +
   'box-sizing: border-box;' +
   '-webkit-box-sizing: border-box;' +
   '-moz-box-sizing: border-box;' +
   '-webkit-font-smoothing: antialiased;' +
   '-moz-font-smoothing: antialiased;' +
   '-o-font-smoothing: antialiased;' +
   'font-smoothing: antialiased;' +
   'text-rendering: optimizeLegibility;}' +
   ' body { color: #C0C0C0; font-family: Arial, san-serif;}' +
   ' h1 { margin: 10px 0 0 0;}' +
   ' h4 { margin: 0 0 20px 0;}' +
   ' #contact-email {' +
   'background-color: rgba(72, 72, 72, 0.7);' +
   'padding: 10px 20px 30px 20px;' +
   ' max-width: 100%;' +
   ' float: left;' +
   'left: 50%;' +
   'position: absolute;' +
   'margin-top: 30px;' +
   ' margin-left: -260px;' +
   ' border-radius: 7px;' +
   '-webkit-border-radius: 7px;' +
   '-moz-border-radius: 7px;}' +
   ' #contact-email p { font-size: 15px; margin-bottom: 10px;' +
   'font-family: Arial, san-serif; }' +
   ' #contact-email p {' +
   'width: 100%;' +
   'background: #fff;' +
   'border: 0;' +
   '-moz-border-radius: 4px;' +
   '-webkit-border-radius: 4px;' +
   ' border-radius: 4px;' +
   ' margin-bottom: 25px;' +
   ' padding: 10px; }' +
   '@media only screen and (max-width: 580px) {' +
   '#contact-form {' +
   ' left: 3%;' +
   ' margin-right: 3%;' +
   ' width: 88%;' +
   ' margin-left: 0;' +
   ' padding-left: 3%;' +
   ' padding-right: 3%; } }' +
   '</style>' + body;


 var email = {
   from: emailFrom,
   to:  emailTo,
   subject: subject,
   text: text,
   html: template
 };

 var options = {
     auth: {
         //api_key: 'YOUR_SENDGRID_API_KEY'
         api_key: process.env.SENDMAIL_SECRET_KEY
     }//process.env.SENDMAIL_SECRET_KEY
 };
 var mailer = nodemailer.createTransport(sgTransport(options));
 mailer.sendMail(email, function (error, info) {
     console.log(error);
     if(error){
         res.status('401').json({err: info});
     }else{
         res.status('200').json({success: true});
     }
 });
};
