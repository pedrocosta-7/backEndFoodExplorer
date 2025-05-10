require('dotenv').config();

module.exports = {
    jwt : {
        secret:process.env.AUTH_SECRET || "default",
        expiresIn:"1d"
    }
}

/* basicamente aqui é o arquivo que vai ser utilizado depois como a regra para criar o token aleatorio e a data de expiração, vai servir para
ser exportado e utilizado posteriormente em outros arquivos */ 