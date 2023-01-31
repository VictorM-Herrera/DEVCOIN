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
                  <style>
                      body{
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          text-align: center;
                          margin: 0;
                          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                          overflow: hidden;
                          max-width: 800px;
                      }
              
                      header{
                          background-color: #4F46E5;
                          width: 100%;
                          padding: 2rem;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          z-index: -2;
                          position: relative;
                          overflow: hidden;
                      }
                      header>svg{
                          z-index:-1;
                          width: fit-content;
                          position: absolute;
                          left: 25px;
                          transform: scale(1.3);
                      }
              
                      header>svg:last-of-type{
                          right: 30px;
                          left: auto;
                          top:0;
                          transform: scale(1.2) rotate(-5deg);
                      }
                      h1{
                          color: #f6f6f6;
                          font-size: 2rem;
                          margin: 0;
                      }
                      span{
                          color: #f6f6f6;
                          font-weight: bold;
                          width: 50%;
                      }
                      body{
                          height: auto;
                          background-color: #161616;
                      }
                      p{
                          color: #f6f6f6;
                          font-weight: bold;
                          width: 60%;
                          margin: 5rem auto;
                          font-size: 1.5rem;
                          line-height: 2rem;
                      }
                      p>a{
                          color: #ffb300;
                          text-decoration: none;
                      }
              
                  </style>
              </head>
              <body>
                  <header>
                      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
              viewBox="0 0 4091.27 4091.73"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
               <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"/>
                <g id="_1421344023328">
                 <path fill="#F7931A" fill-rule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"/>
                 <path fill="white" fill-rule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"/>
                </g>
               </g>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
              viewBox="0 0 784.37 1277.39"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
               <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"/>
                <g id="_1421394342400">
                 <g>
                  <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                  <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                  <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                  <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                  <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                  <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
                 </g>
                </g>
               </g>
              </svg>
                      <h1>
                          ¡Bienvenido a DEVCOIN!
                      </h1>
                      <span>
                          Comprá, enviá y guardá tus cryptos de manera segura y sin comisiones.
                      </span>
                  </header>
                  <main>
                      <p>¡Estamos muy felices de que te unas! Ahora solo queda que hagas click
                      <a href=${req.body.link}>en este enlace<a>
                          para empezar a usar DEVCOIN.
                      </p>
                  </main>
              
              </body>
              </html>`,
      recovery: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reestablecer contraseña</title>
                <style>
                    body{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        margin: 0;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        overflow: hidden;
                        max-width: 800px;
                    }
            
                    header{
                        background-color: #4F46E5;
                        width: 100%;
                        padding: 2rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        z-index: -2;
                        position: relative;
                        overflow: hidden;
                    }
                    header>svg{
                        z-index:-1;
                        width: fit-content;
                        position: absolute;
                        left: 25px;
                        transform: scale(1.3);
                    }
            
                    header>svg:last-of-type{
                        right: 30px;
                        left: auto;
                        top:0;
                        transform: scale(1.2) rotate(-5deg);
                    }
                    h1{
                        color: #f6f6f6;
                        font-size: 2rem;
                        margin: 0;
                    }
                    span{
                        color: #f6f6f6;
                        font-weight: bold;
                        width: 50%;
                    }
                    body{
                        height: auto;
                        background-color: #161616;
                    }
                    p{
                        color: #f6f6f6;
                        font-weight: bold;
                        width: 60%;
                        margin: 5rem auto;
                        font-size: 1.5rem;
                        line-height: 2rem;
                    }
                    p>a{
                        color: #ffb300;
                        text-decoration: none;
                    }
                    p:last-of-type{
                        font-size: 1rem;
                        width: 100%;
                        font-weight: normal;
                        margin-top: 0;
                    }
            
                </style>
            </head>
            <body>
                <header>
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
            viewBox="0 0 4091.27 4091.73"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
             <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"/>
              <g id="_1421344023328">
               <path fill="#F7931A" fill-rule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"/>
               <path fill="white" fill-rule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"/>
              </g>
             </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
            viewBox="0 0 784.37 1277.39"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
             <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"/>
              <g id="_1421394342400">
               <g>
                <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
               </g>
              </g>
             </g>
            </svg>
                    <h1>
                        DEVCOIN
                    </h1>
                    <span>
                        Comprá, enviá y guardá tus cryptos de manera segura y sin comisiones.
                    </span>
                </header>
                <main>
                    <p>Para reestablecer tu contraseña, entra
                        <a href=${req.body.link}>a este enlace</a>.
                    </p>
                    <p>Si no pediste un cambio de contraseña, desestimá este mensaje</p>
                </main>
            
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
