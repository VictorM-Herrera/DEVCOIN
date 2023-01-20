const nodemailer = require('nodemailer');

const sendMail = async (req,res, mail) => {

    try {
        const config ={
            host:'smtp.gmail.com',
            port: 587,
            auth:{
                user: 'testst746@gmail.com',
                pass: 'gsdngjvtxrquazjl',
            }
        };
        const message = {
            from: 'testst746@gmail.com',
            to: req.body.email,
            subject: 'Verificación de correo electronico',//
            html: mail || `<p>Para verificar tu correo electronico por favor entra en el siguiente enlace: <a href=${req.body.link}>verificar correo<a><p>`
        };

        const transport = nodemailer.createTransport(config);

        const info = await transport.sendMail(message);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error al intentar enviar el mail' });
    }
}

module.exports = {
    sendMail,
}