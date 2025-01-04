
const User = require("../models/User")
const Todo=require("../models/User")

const createNewUser=async (req,res)=>{
    const {name,username,email,address,phone}=req.body
    if(!username || !email)
        return res.status(400).json({message:"username and email  are required"})
    
    const user=await User.create({name,username,email,address,phone})
    if(user){
        return res.json(await User.find().lean())
    }else{
        return res.status(400).json({message:"invalid user"})
    }
}

const getAllUser=async (req,res)=>{
    
    const users=await User.find().lean()
    if(!users){
        return res.status(400).json({message:"no users found"})
    }
    res.json(users)

}

const getUserById=async (req,res)=>{
    
    const {id}=req.params
    const user=await User.findById(id).lean()
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    res.json(user)
}

const getUserByUname=async (req,res)=>{
    
    const {username}=req.params
     const user=await User.find({username:{$regex:username}}).lean()
     console.log(user);
     if(!user){
         res.json([])
 
     }
     res.json(user)
 }


const updateUser=async (req,res)=>{
    const {_id,name,username,email,address,phone}=req.body
    if(!_id || !username || !email)
        return res.status(400).json({message:"fildes are required"})
    const user=await User.findById(_id).exec()
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    user.name=name
    user.username=username
    user.email=email
    user.address=address
    user.phone=phone

    const updateteuser=await user.save()
    res.json(await User.find().lean())
}

const deleteUser=async (req,res)=>{
    const {id}=req.params
    if(!id )
        return res.status(400).json({message:"id is required"})
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    const del=await user.deleteOne()
    res.json(await User.find().lean())
}


module.exports={createNewUser,getAllUser,getUserById,updateUser,deleteUser,getUserByUname}