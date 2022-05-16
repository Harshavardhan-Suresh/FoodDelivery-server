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
    res.send('homepage');

})

// app.get('/:num/:num2', (req, res)=>{
//     db.query('INSERT INTO TEST VALUES(?)',[req.params.num], (err, result)=>{
//         console.log('one insert')
//     })
//     db.query('INSERT INTO TEST VALUES(?)',[req.params.num2], (err, result)=>{
//         console.log('two insert')
//         res.send('second insert successful')
//     })
// })

app.get('/customer/:id', (req, res)=>{
    db.query('SELECT * FROM CUSTOMER WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send(result)
    })
})


app.get('/employee/:id', (req, res)=>{
    db.query('SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID=?', [req.params.id], (err, result)=>{
        res.send(result)
    })
})

app.get('/customer/order/:id', (req, res)=>{
    db.query('SELECT * FROM ORDERS WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})


app.get('/employee/order/:id', (req, res)=>{
    db.query('SELECT * FROM ORDERS WHERE EMPLOYEE_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})




app.listen(3001, ()=>{
    console.log('working')
})