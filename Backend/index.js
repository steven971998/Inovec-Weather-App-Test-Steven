const express = require('express');
const app = express();
const con = require('./config')
const cors = require('cors');

app.use(cors())

app.get('/weatherdata/:id',(req,res)=>{
    con.query(`select Min(temperature) as MinTemp, Max(temperature) as MaxTemp,  Avg(temperature) as AvgTemp, Summary as Summary from weatherdata where date(Formatted_Dates)='${req.params.id}' group by Summary order by count(Summary) desc limit 1;`,(err,result)=>{
       if(err){
           res.send("error.")
       } 
       else{res.send(result)
       }
   })
})

app.listen(5000)