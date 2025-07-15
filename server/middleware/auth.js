import jwt from 'jsonwebtoken';
const auth = async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1] //["bearer","token"]
        console.log("token",token);
        
        if (!token) {
            return res.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if (!decode) {
            return res.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            });
        }
        req.userId = decode.id
        
        next()
        
    } catch (e) {
        return res.status(500).json ({
            message : e.message || e,
            error : true,
            success : false
        })
    }
}

export default auth

// import jwt from 'jsonwebtoken';

// const auth = async (req, res, next) => {
//   try {
//     const authHeader = req?.headers?.authorization;
//     const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
//     const token = req.cookies.accessToken || tokenFromHeader;

//     if (!token) {
//       return res.status(401).json({
//         message: "Token not provided",
//         error: true,
//         success: false
//       });
//     }

//     const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//     if (!decode) {
//       return res.status(401).json({
//         message: "Unauthorized access: Invalid token",
//         error: true,
//         success: false
//       });
//     }

//     req.userId = decode.id;
//     next();

//   } catch (e) {
//     return res.status(401).json({
//       message: "Unauthorized: " + (e.message || e),
//       error: true,
//       success: false
//     });
//   }
// };

// export default auth;
