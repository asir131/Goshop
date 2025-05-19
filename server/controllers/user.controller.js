import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generateOtp from '../utils/generateOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken';
export async function registerUserController(req,res){
    try{
            const {name, email, password} = req.body;
                
                
            if(!name || !email || !password){
                return res.status(403).json({
                    message: "provide email, name, password",
                    error : true,
                    succes  : false,
                })
            }

            const user =await  UserModel.findOne({ email})

            if(user){
                return res.json({
                    message : "user already registered",
                    error : true,
                    success : false
                })
            }

            const salt =await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(password,salt)
            

            const payload = {
                 name,
                 email,
                 password : hashPassword
            }
            const newUser = new UserModel(payload)
            const save = await newUser.save()

            const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
            const verifyEmail = await sendEmail({
                sendTo : email,
                subject : "Verify email from blinkit",
                html : verifyEmailTemplate({
                    name,
                    url : VerifyEmailUrl
                })
            })
            return res.json({
                message : "User register successfully",
                error : false,
                success : true,
                data : save
            })
    }catch(e){
        return res.status(500).json({
            message : e.message || e,
            error : true,
            success : false,
        })
    }
}

export async function verifyEmailController(req,res){
    try{
        const {code }= req.body
        const user = await UserModel.findOne({_id : code})

        if(!user){
            return res.status(404).json({
                message : "Invalid code",
                error : true,
                success : false

            })
        }
        const updateUser = await UserModel.updateOne({_id : code},{
            verify_email: true
        

        })
        return res.json({
            message : "Verify email done",
            success : true,
            error : false
        })
    }catch(e){
        return res.status(500).json({
            message : e.message || e,
            error : true,
            success : true
        })
    }
}


//login controller

export async function loginController(req,res){
    try {
        const {email, password} = req.body

        if(!email||!password){
            return res.status(404).json({
                message : "Provide email, Password",
                error : true,
                succes : false
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "User not registered",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return res.status(400).json({
                message : "Contact to admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return res.status(400).json({
                message : "check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        const updateUser =await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            path: '/',                    
            maxAge: 15 * 60 * 1000  
        }
        res.cookie('accessToken', accesstoken, {
            ...cookiesOption,
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        
        res.cookie('refreshToken', refreshToken, {
            ...cookiesOption,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : { 
                accesstoken,
                refreshToken
            }
        })

    }catch(e){
        return res.status(500).json({
            message : e.message || e,
            error : true,
            succes : false
        })
    }
}

//logout controller

export async function logoutController(req, res) {
    try {
        const userId = req.userId
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.clearCookie("accessToken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })

        return res.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    }
    catch(e){
        return res.status(500).json({
            message : e.message || e,
            error : true,
            success : false
        })
    }
}

//upload user avatar

export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId // auth middleware
        const image = req.file // multer middleware
        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return res.json({
            message : "Upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })
        
        

    } catch (e) {
        return res.status(500).json({
            message : e.message || e,
            error : true,
            success : false
        })
    }
}

//update user details

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId // auth middleware
        const {name,email,mobile,password} = req.body

        let hashPassword = ""

        if(password){
            const salt =await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({_id:userId},{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashPassword})
        })

        return res.json({
            message : "updated successfully",
            error : false,
            success : true,
            data: updateUser
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//forgot password not login

export async function forgotPasswordController(req,res){
    try {
        const {email}=req.body
        const user = await UserModel.findOne({email})

            if(!user){
                return res.status(400).json({
                    message : "user not found",
                    error : true,
                    success : false
                })
            }

            const otp = generateOtp()
            const expireTime = new Date() + 60*60 *1000//1hr

            const update = await UserModel.findByIdAndUpdate(user._id,{
                forgot_password_otp: otp,
                
                forgot_password__expiry : new Date(expireTime).toISOString()
            })
            await sendEmail({
                sendTo: email,
                subject : "Forgot Password",
                html : forgotPasswordTemplate({
                    name : user.name,
                    otp : otp,
                }),
                
            })
            console.log({ name: user.name, otp: otp });
            return res.json({
                message : "Check your email",
                error : false,
                success : true,
                data : update
            })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
        
    }
}

//verify forgot password otp

export async function verifyForgotPasswordOtp(req,res){
    try {
        const {email,otp} = req.body;

        if(!email || !otp){
            return res.status(400).json({
                message : "Provide required field",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                    message : "user not found",
                    error : true,
                    success : false
                })
            }
        const currentTime = new Date().toISOString()

        if(user.forgot_password__expiry< currentTime){
            return res.status(400).json({
                message : "Otp is expired",
                error : true,
                success: false

            })
        }

        if(otp !==user.forgot_password_otp){
            return res.status(400).json({
                message : "invalide otp",
                error : true,
                success : false,
            })

        }

        // if otp is not expired
        //otp===user.forgot_password_otp
        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp: "",
            forgot_password__expiry : ""

        })
        return res.json({
            message : "verifie otp successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

//reset the password

export async function resetPassword(req,res){
    try {
        const {email,newPassword,confirmPassword} = req.body

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "provide required fields email,newPassword,confirmPassword",

            })
        }

        const user =await UserModel.findOne({email}) 

        if(!user){
            return res.status(400).json({
                message : "Email is not available",
                error: true,
                success : false
            })
        }

        if(newPassword!==confirmPassword){
            return res.status(400).json({
                message : "Passwords are not matching ",
                error : true,
                success : false
            })
        }
        const salt =await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(newPassword,salt)
        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })
        return res.json({
            message : "Password updated successfully",
            error:false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


//refresh token controller

export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1] // [bearer token]

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalied Token",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt. verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(401).json({
                message : "Token is expired",
                error : true,
                success : false
            })
        }
        console.log("verifyToken",verifyToken);
        
        const userId = verifyToken?._id
        const newAccessToken = await generateAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie('accessToken',newAccessToken,cookiesOption)
        
        return res.json({
            message : "new access token generated",
            error : false,
            success : true,
            data : {
                accessToken:newAccessToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

//get login user details

export async function userDetails(req,res){
    try {
        const userId = req.userId
        console.log("user",userId);
        
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return res.json({
            message : "user details ",
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : "Something is wrong",
            error : true,
            success : false

        })
    }
}