const express=require("express");
const app=express();
const PORT=3000;

const swaggerUI=require("swagger-ui-express");
const swaggerDocument=require("./openapi.json");


app.use(express.json());

app.use("/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
);
const tasks=[
    {
        id : 1,
        title:"Learn Express",
        done: false
    },
    {
        id: 2,
        title:"Build Task API",
        done:true

    },
    {
        id:3,
        title:"Test with curl",
        done:false
    }
]

app.get("/tasks",(req,res)=>
{
    res.json(tasks)
})

app.get("/tasks/:id",(req,res)=>
{
    const id=Number(req.params.id);

    const foundTask =tasks.find(t=>t.id==id);
    if(!foundTask)
    {
        return res.status(404).json({
            error:`Task ${id} not found`
        });
    }

    res.json(foundTask );
})
app.post("/tasks",(req,res)=>
{
    const {title}=req.body;

    if(!title|| title.trim()==="")
    {
        return res.status(400).json({
            error:"Title is required"
        });
    }

    const newId=tasks.length+1;

    const task=
    {
        id:newId,
        title:title,
        done:false
    };
    tasks.push(task);
    res.status(201).json(task)

})
app.put("/tasks/:id",(req,res)=>
{

    const id=parseInt(req.params.id);


    const task=tasks.find(
        t=>t.id===id
    );


    if(!task)
    {
        return res.status(404).json(
        {
            error:"Task not found"
        });
    }



    const {title,done}=req.body;



    if(title===undefined && done===undefined)
    {
        return res.status(400).json(
        {
            error:"Empty body"
        });
    }



    if(title !== undefined && title.trim()==="")
    {
        return res.status(400).json(
        {
            error:"Title cannot be empty"
        });
    }



    if(title !== undefined)
    {
        task.title=title;
    }



    if(done !== undefined)
    {
        task.done=done;
    }



    res.status(200).json(task);

});
app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    // Task ka index dhoondo
    const index = tasks.findIndex(t => t.id === id);

    // Agar task nahi mili
    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    // Task delete karo
    tasks.splice(index, 1);

    // Success (empty body)
    res.status(204).send();

});
app.listen(PORT,()=>
{
    console.log(`server running on ${PORT}`);

});