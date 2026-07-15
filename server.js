const express=require("express")
const app=express();
const PORT=3000;
app.use(express.json());
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

    if(!title|| title.trim()=="")
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












app.get("/",(req,res)=>
{
    res.json(
    {
        "name":"Task api",
        "version":"1.0",
        "endpoints":["/tasks"] 
        
    });

})

app.get("/health",(req,res)=>
{
    res.json(
        {
            "status":"ok"
        }
    )
})

app.listen(PORT,()=>
{
    console.log(`server running on ${PORT}`);

});