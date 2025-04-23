import mongoose from "mongoose";

const Userschema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    confirm_password:{
        type:String,
        requie:true,
    }


},

{
    Timestamp:true // created at, updated at
}
);

const User=mongoose.model("User",Userschema);
export default User;