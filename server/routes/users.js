
const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")

router.get("/",userController.getAllUser)
router.get("/:id",userController.getUserById)
router.put("/",userController.updateUser)
router.post("/",userController.createNewUser)
router.delete("/:id",userController.deleteUser)
router.get("/byUname/:username",userController.getUserByUname)

module.exports=router