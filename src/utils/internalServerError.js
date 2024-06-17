const AppError = require('./appError')

class internalServerError extends AppError {
    constructor (){
       


       super (`It's not you its our serve where something went wrong`,404)
    }
}

module.exports =internalServerError;