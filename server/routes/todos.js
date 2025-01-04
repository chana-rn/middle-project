
const express=require("express")
const router=express.Router()
const todoController=require("../controllers/todoController")

router.get("/",todoController.getAllTodo)
router.get("/getby/:id",todoController.getTodoById)
router.get("/uncomplete",todoController.getTodoByuncompleted)
router.get("/byTitle/:title",todoController.getTodoBytitle)
router.post("/",todoController.createNewTodo)
router.put("/",todoController.updateTodo)
router.put("/:id",todoController.updatecomplete)
router.delete("/:id",todoController.deleteTodo)

module.exports=router