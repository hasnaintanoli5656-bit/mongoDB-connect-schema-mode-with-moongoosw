import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name : String,
email :{
    type : String,
    unique : true,
    required :  [true,"email must be required"]
},
password :{
    type :String,
    required :  [true,"password must be required"]
}
})

const userModel =  mongoose.model("user",userSchema)
 export default userModel