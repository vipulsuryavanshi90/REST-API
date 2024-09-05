import bodyParser from 'body-parser';
import express, { response } from 'express';

const app  = express();
const PORT =  3000;

app.use(bodyParser.json());

app.all('/', (req, res) => {
    res.send('REST API');
});


let toDo = [
    {
        id:1,
        title: 'todo1',
        status: false,
    },
    {
        id:2,
        title: 'todo2',
        status: false,
    },
];

//CRUD
app.get('/todos', (req, res) => {
    res.json(toDo);
});

app.post('/todos', (req, res) => {
    if(req.body){
        toDo.push(req.body);
        res.json({
            message: 'Todo Successfully Created!'
        })
    }else{
        res.json({
            message: "Please provide valid data"
        })
    }
});

app.put('/todos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const input = req.body;
    const index = toDo.findIndex((item)=> item.id === id)
    if(index !== -1){
        toDo[index] = {
            id: id,
            ...input
        }
        res.json({
            message: 'Todo Successfully Updated!'
        })
    }else{
        res.json({
            message: "Please provide valid data"
        })
    }
});

app.delete('/todos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const index = toDo.findIndex((item)=> item.id === id)
    console.log(index)
    if(index !== -1){
        toDo.splice(index,1)
        res.json({
            message: 'Todo Successfully deleted!'
        })
    }else{
        res.json({
            message: "Please provide valid data"
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
})
