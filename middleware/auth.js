const jwt = require('jsonwebtoken');

module.exports= function(req,res,next) {

    //leer token del header

const token = req.header('x-auth-token');


    //revisar si no hay token
if(!token){
    return res.status(401).json({msg:'No hay Token, permiso rechazado'})
}

try{
const cifrado = jwt.verify(token, process.env.SECRETA);
req.user = cifrado.user;
next();
}catch(error){
  res.status(401).json({msg:'Token no valido'});
}

    //validar token


}