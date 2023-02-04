module.exports = {
    showvalidationErrorResponse: (message)=>{
        return ({status:400,message:message})
    },

    showSuccessResponse: (message,data)=>{
        return ({status:200,message:message ,data: data})
    },
    showInternalServerErrorResponse: (message)=>{
        return ({status:500,message:message})
    },
    showdatabaseErrorResponse: (message)=>{
        return ({status:400,message:message})
    },
    showUnauthorizedErrorResponse: (message)=>{
        return ({status:401,message:message})
    }
}