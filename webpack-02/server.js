const express = require('express');

const app = express();
app.get('/api/user',(req,res)=>{
res.json({'text':'123'})
})
app.listen(3000);