const express= require('express');
const cors = require('cors');


const app= express();
const PORT = process.env.PORT || 3001;
app.use(express.json())
app.use(cors('*'));

app.get('/api/status',(req,res)=>{
    res.json({status: "API is up and running"})
})

app.use('/api',require('./router/route.js'))


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})