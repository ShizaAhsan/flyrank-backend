const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

const PORT = 3000;


// Middleware
app.use(express.json());


// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// In-memory database
let tasks = [
    {
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build API",
        done: true
    }
];

let nextId = 3;



/**
 * @swagger
 * /:
 *   get:
 *     summary: API information
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get("/", (req, res) => {

    res.status(200).json({
        message: "Task API running",
        version: "1.0.0"
    });

});



/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res)=>{

    res.status(200).json({
        status:"OK"
    });

});





/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
app.get("/tasks",(req,res)=>{

    res.status(200).json(tasks);

});





/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
app.get("/tasks/:id",(req,res)=>{


    const id = Number(req.params.id);


    const task = tasks.find(
        task => task.id === id
    );


    if(!task){

        return res.status(404).json({
            message:"Task not found"
        });

    }


    res.status(200).json(task);


});







/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create new task
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Invalid input
 */
app.post("/tasks",(req,res)=>{


    const {title,done}=req.body;



    // Validation

    if(!title){

        return res.status(400).json({
            message:"Title is required"
        });

    }



    if(done !== undefined && typeof done !== "boolean"){

        return res.status(400).json({
            message:"done must be boolean"
        });

    }



    const newTask={

        id:nextId++,

        title:title,

        done:done ?? false

    };



    tasks.push(newTask);



    res.status(201).json(newTask);


});








/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
app.put("/tasks/:id",(req,res)=>{


    const id=Number(req.params.id);


    const task=tasks.find(
        task=>task.id===id
    );


    if(!task){

        return res.status(404).json({
            message:"Task not found"
        });

    }



    const {title,done}=req.body;



    if(title !== undefined){

        task.title=title;

    }


    if(done !== undefined){

        if(typeof done !== "boolean"){

            return res.status(400).json({
                message:"done must be boolean"
            });

        }


        task.done=done;

    }



    res.status(200).json(task);


});








/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
app.delete("/tasks/:id",(req,res)=>{


    const id=Number(req.params.id);


    const index=tasks.findIndex(
        task=>task.id===id
    );


    if(index===-1){

        return res.status(404).json({
            message:"Task not found"
        });

    }



    const deletedTask=tasks.splice(index,1);



    res.status(200).json({

        message:"Task deleted",

        task:deletedTask[0]

    });


});






app.listen(PORT,()=>{

    console.log(
        `Server running on http://localhost:${PORT}`
    );

    console.log(
        `Swagger docs http://localhost:${PORT}/api-docs`
    );

});