const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");


const client = jwksClient({
    jwksUri:
        `${process.env.KEYCLOAK_URL}/realms/${process.env.REALM}/protocol/openid-connect/certs`
});



function getKey(header, callback){

    client.getSigningKey(
        header.kid,
        function(err,key){

            if(err){
                callback(err);
                return;
            }

            callback(
                null,
                key.getPublicKey()
            );
        }
    );
}



function auth(req,res,next){


    const header =
        req.headers.authorization;


    if(!header){

        return res.status(401).json({
            error:"Brak tokena"
        });

    }


    const token =
        header.split(" ")[1];



    jwt.verify(
        token,
        getKey,
        {
            algorithms:["RS256"]
        },

        (err,user)=>{


            if(err){

                return res.status(403).json({
                    error:"Zły token"
                });

            }


            req.user=user;

            next();

        }
    );

}




function requireRole(...allowedRoles) {

    return (req, res, next) => {

        const roles =
            req.user.realm_access.roles;

        const hasRole =
            allowedRoles.some(role =>
                roles.includes(role)
            );

        if (!hasRole) {

            return res
                .status(403)
                .json({
                    error: "Brak uprawnień"
                });

        }

        next();

    };

}

module.exports = requireRole;



module.exports={
    auth,
    requireRole
};