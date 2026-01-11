import mongoose from "mongoose";

const complaintSchema=new mongoose.Schema(
    {
        complaintId:{
            type:String,
            unique:true,
            required:true,
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        subCategory:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        images:[{type:String}],
        status:{
            type:String,
            enum:["pending","in-progress","resolved"],
            default:"pending",
        },
        citizen:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        assignedOfficer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {
        timestamps:true
    }
)

export const Complaint=mongoose.model("Complaint",complaintSchema);