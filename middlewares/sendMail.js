const nodemailer = require("nodemailer");

const sendMail = async (req, res, mail) => {
  try {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "testst746@gmail.com",
        pass: "gsdngjvtxrquazjl",
      },
    };

    const mailList = {
      verify: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verificación de correo</title>
          <!--[if mso]> 
      <noscript> 
      <xml> 
      <o:OfficeDocumentSettings> 
      <o:PixelsPerInch>96</o:PixelsPerInch> 
      </o:OfficeDocumentSettings> 
      </xml> 
      </noscript> 
      <![endif]-->
      
      </head>
      <body>
          <table style="text-align: center; background-color:#212121; font-family:ystem-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; max-width:705px">
              <thead>
                  <img src="https://imageup.me/images/ef45e786-dc1e-492c-97a5-f1367c244ad6.png" alt="">
              </thead>
              <tbody >
                  <tr >
                      <td style="padding: 200px; font-weight:bolder; font-size:25px; color: #ddd; width: 100%">
                          ¡Estamos muy felices de que te unas! Ahora solo queda que hagas click
                              <a href=${req.body.link} style="color:#ff8c00; text-decoration: none;">en este enlace</a>
                              para empezar a usar DEVCOIN.
                                         </td>
                  </tr>
                  <tr >
                      <td style="height: 80px; background-color: #ff8c00; font-weight:bold; padding:50px">
                          Un proyecto conjunto de 
                          <a href="https://www.linkedin.com/in/juan-cruz-robuschi/" style="text-decoration: none; color:#212121">
                              Juan Robuschi
                          </a>, 
                          <a href="https://www.linkedin.com/in/victor-maximiliano-herrera/" style="text-decoration: none; color:#212121">
                              Maxi Herrera
                          </a>, 
                          <a href="https://www.linkedin.com/in/leonardo-sebastian-gauto-30a185216/" style="text-decoration: none; color:#212121">
                              Leo Gautto, 
                          </a>
                          <a href="https://www.linkedin.com/in/lucaspereyradev/" style="text-decoration: none; color:#212121">
                              Lucas Pereyra, 
                          </a>
                          <a href="https://www.linkedin.com/in/gonzalo-ordo%C3%B1ez-8aa9b2177/" style="text-decoration: none; color:#212121">
                              Gonzalo Ordoñez
                          </a> y 
                          <a href="https://www.linkedin.com/in/lautaro-rocha/" style="text-decoration: none; color:#212121">
                              Lautaro Rocha
                          </a>
                      </td>
                  </tr>
              </tbody>
          </table>
      
      </body>
      </html>`,
      recovery: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reestablecer contraseña</title>
          <!--[if mso]> 
      <noscript> 
      <xml> 
      <o:OfficeDocumentSettings> 
      <o:PixelsPerInch>96</o:PixelsPerInch> 
      </o:OfficeDocumentSettings> 
      </xml> 
      </noscript> 
      <![endif]-->
      </head>
      <body>
          <table style="text-align: center; background-color:#212121; font-family:ystem-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; max-width:705px">
              <thead>
                  <img src="https://imageup.me/images/ef45e786-dc1e-492c-97a5-f1367c244ad6.png" alt="">
              </thead>
              <tbody >
                  <tr >
                      <td style="padding: 200px; font-weight:bolder; font-size:25px; color: #ddd; width: 100%">
                          Para reestablecer tu contraseña entra
                              <a href=${req.body.link} style="color:#ff8c00; text-decoration: none;">en este enlace</a>
                      </td>
                  </tr>
                  <tr >
                      <td style="height: 80px; background-color: #ff8c00; font-weight:bold; padding:50px">
                          Un proyecto conjunto de 
                          <a href="https://www.linkedin.com/in/juan-cruz-robuschi/" style="text-decoration: none; color:#212121">
                              Juan Robuschi
                          </a>, 
                          <a href="https://www.linkedin.com/in/victor-maximiliano-herrera/" style="text-decoration: none; color:#212121">
                              Maxi Herrera
                          </a>, 
                          <a href="https://www.linkedin.com/in/leonardo-sebastian-gauto-30a185216/" style="text-decoration: none; color:#212121">
                              Leo Gautto, 
                          </a>
                          <a href="https://www.linkedin.com/in/lucaspereyradev/" style="text-decoration: none; color:#212121">
                              Lucas Pereyra, 
                          </a>
                          <a href="https://www.linkedin.com/in/gonzalo-ordo%C3%B1ez-8aa9b2177/" style="text-decoration: none; color:#212121">
                              Gonzalo Ordoñez
                          </a> y 
                          <a href="https://www.linkedin.com/in/lautaro-rocha/" style="text-decoration: none; color:#212121">
                              Lautaro Rocha
                          </a>
                      </td>
                  </tr>
              </tbody>
          </table>
      
      </body>
      </html>`,
    };

    const message = {
      from: "testst746@gmail.com",
      to: req.body.email,
      subject: "Verificación de correo electronico", //
      // html: mail || `<p>Para verificar tu correo electronico por favor entra en el siguiente enlace: <a href=${req.body.link}>verificar correo<a><p>`
      html: mail ? mailList.recovery : mailList.verify,
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(message);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error al intentar enviar el mail" });
  }
};

module.exports = {
  sendMail,
};
