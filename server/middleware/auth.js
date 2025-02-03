import jwt from 'jsonwebtoken';
const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1] //["bearer","token"]
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