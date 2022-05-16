const express =require('express')
const app=express()
const mysql = require('mysql2')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'FoodSystem',
    port: 3306
})


db.connect((err)=>{
    if(err){
        console.log("error occured", err)
    }
    else{
        console.log("connection succesful")
    }
})


app.get('/', (req, res)=>{
    db.query('INSERT INTO TEST VALUES(100)',(err, result)=>{
        res.send('test')
    })

})


app.listen(3000, ()=>{
    console.log('working')
})