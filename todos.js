const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    console.log('in todos app', Date.now())
    next()
  });

let todos_list = [{
    id:1,
    desc: "read a book"
},
{
    id:2,
    desc: "gym"
}]
router.get('/',(req,res)=>{
    res.send(todos_list);
});

router.post('/todo',(req,res)=>{
    console.log("@@@@@req",req.body);
    let task = req.body;
    todos_list.push(task);
    res.send(todos_list)
});

// function findId(id){
//     return 
// }
router.put('/:id',(req,res)=>{
    console.log("@@@@@req",req.body);
    let task = req.body;
    let id = req.params.id;
    console.log("id",id);
    console.log(todos_list);
    // console.log("typeof",typeof(id));
    // console.log("typeof",typeof(todos_list[0].id));
    // let obj_todo = todos_list.filter(todo => todo.id == id);
    // todos_list.push(task);
    let obj_todo_ind = todos_list.findIndex(todo => todo.id == id);
    // console.log("obj_todo",obj_todo);
    todos_list[obj_todo_ind].desc = "modified todo";
    res.send({todos_list}).status(200);
});

router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    let obj_todo_ind = todos_list.findIndex(todo => todo.id == id);
    todos_list.splice(obj_todo_ind,1);
    res.send({todos_list}).status(200);
})

module.exports = router;