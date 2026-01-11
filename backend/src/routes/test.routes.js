import express from "express"
import { protect,allowRole } from "../middlewares/auth.middleware.js"
const router =express.Router();

// only logged in user
router.get("/profile",protect,(req,res)=>{
    res.json({
        message:"Profile data",
        user:req.user,
    })
});


// only admin
router.get("/admin",protect,allowRole("admin"),(req,res)=>{
    res.json({message:"Admin dashboard"});
})

// officer+admin
router.get(
    "/officer",protect,allowRole("officer","admin"),(req,res)=>{
        res.json({message:"officer dashboard"});
    }
)

export default router;