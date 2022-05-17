const express =require('express')
const app=express()
const mysql = require('mysql2')
const cors=require('cors')
const bodyParser=require('body-parser')

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

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.get('/', (req, res)=>{
    res.send('homepage')
})

app.get('/restaurants', (req, res)=>{
    db.query('SELECT * FROM RESTAURANT', (err, result)=>{
        res.send(result)
    })
})

app.get('/orders', (req, res)=>{
    db.query('SELECT * FROM ORDERS', (err, result)=>{
        res.send(result)
    })
})

app.put('/customer/cart/:id/:food_name', (req, res)=>{
    db.query('UPDATE CART SET QUANTITY=? WHERE CUSTOMER_ID=? AND FOOD_NAME=?', [req.body.quantity, req.params.id, req.params.food_name],(err, result)=>{
        res.send('quantity updated')
    })
})

app.delete('/customer/cart/:id/:food_name', (req, res)=>{
    console.log('delete request received')
    db.query('DELETE FROM CART WHERE CUSTOMER_ID=? AND FOOD_NAME=?', [req.params.id, req.params.food_name], (err, result)=>{
        res.send('removed item from cart')
    })
})

app.get('/customer/cart/:id', (req, res)=>{
    db.query('SELECT * FROM CART WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})

app.post('/customer/cart/:id', (req, res)=>{
    db.query('INSERT INTO CART (CUSTOMER_ID, FOOD_NAME, QUANTITY) VALUES (?,?,?)', [req.params.id, req.body.food_name, req.body.quantity],(err, result)=>{
        res.send('added to cart')
    })
})

app.delete('/customer/cart/:id', (req, res)=>{
    // console.log('new delete request')
    // res.send('deleted successfully')
    db.query('DELETE FROM CART WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send('deleted successfully')
    })
})

app.get('/customer/orders/:id', (req, res)=>{
    db.query('SELECT * FROM ORDERS WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})

app.post('/customer/orders/:id', (req, res)=>{
    const {order_ID, customer_ID, employee_ID, restaurant_ID, status,details}=req.body
    // const st=req.body.status

    db.query('INSERT INTO ORDERS (ORDER_ID, STATUS, CUSTOMER_ID, EMPLOYEE_ID, RESTAURANT_ID) values (?, ?, ?, ?, ?)', [order_ID, status, customer_ID, employee_ID, restaurant_ID], (err, result)=>{
        details.forEach((detail)=>{
            const {food_name, quantity}=detail
            db.query('INSERT INTO ORDER_DETAILS (ORDER_ID, FOOD_NAME, QUANTITY) values (?,?,?)', [order_ID, food_name, quantity])
        })
        res.send('post succesful')
    })
})

app.get('/employee/orders/:id', (req, res)=>{
    db.query('SELECT * FROM ORDERS WHERE EMPLOYEE_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})

app.get('/customer/:id', (req, res)=>{
    db.query('SELECT * FROM CUSTOMER WHERE CUSTOMER_ID=?', [req.params.id], (err, result)=>{
        res.send(result)
    })
})

app.put('/customer/:id', (req, res)=>{
    db.query('UPDATE CUSTOMER SET RESTAURANT_ID=? WHERE CUSTOMER_ID=?', [req.body.restaurant_ID, req.params.id], (err, result)=>{
        res.send('updated successfully')
    })
})

app.get('/employee/:id', (req, res)=>{
    db.query('SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID=?', [req.params.id], (err, result)=>{
        res.send(result)
    })
})

app.get('/foods/:id', (req, res)=>{
    db.query('SELECT * FROM RESTAURANT_FOOD WHERE RESTAURANT_ID=?', [req.params.id], (err, result)=>{
        res.send(result);
    })
})

app.put('/orders/:id', (req, res)=>{
    db.query('UPDATE ORDERS SET STATUS=? WHERE ORDER_ID=?', [req.body.status, req.params.id], (err, result)=>{
        res.send('Order completed')
    })
})

app.listen(3001, ()=>{
    console.log('working')
})
