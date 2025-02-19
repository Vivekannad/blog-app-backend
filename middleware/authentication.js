const { validateToken } = require("../service/auth");

function checkForAuthenticationCookie(cookie){
    return (req,res,next) => {
        const cookieToken = req.cookies[cookie];
        if(!cookieToken) return next();
        
        try{
            const userPayload = validateToken(cookieToken);
            req.user = userPayload;
        }catch(err){}
        next();
    }
}

module.exports = {
    checkForAuthenticationCookie
}