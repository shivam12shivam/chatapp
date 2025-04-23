import jwt from "jsonwebtoken"
const createtokenandsavecookie=(userid,res)=>{
    const token=jwt.sign({_id:userid}, process.env.jwt_token,{
        expiresIn:"5d",
    });

    res.cookie("jwt",token,{
        httpOnly:true,  // xss security
        // secure:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict", //csrf security
    });
    return token;
}
export default createtokenandsavecookie;