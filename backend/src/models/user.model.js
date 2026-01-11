import mongoose from "mongoose"

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['admin','citizen','officer'],
            default:'citizen',
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

export const User=mongoose.model('User',userSchema);