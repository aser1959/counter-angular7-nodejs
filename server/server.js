"use strict";
const express =    require('express');
const bodyParser = require('body-parser');
const cors =       require('cors')
const jwt  =       require('jsonwebtoken');
const bcrypt  =    require('bcryptjs');

const app  =       express();
const router  =    express.Router();

const SECRET_KEY =  '1_SecretKey_1';
const ERROR_LOGIN = 'Неверный Пароль или Login!';
const ERROR_401 =   'В доступе отказано! Пройдите авторизацию!!!';

let counter = 0;  

app.use(cors())
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());

const  findUser  = ( username, password ) => {
    return username == '123' && password =='123';       
}

const  getCounter  = () => {
    return { "counter":counter };       
}

const  setNewCounter  = () => {
    counter = 0;
    return getCounter();       
}

const  incrementCounter  = () => {
        counter = counter<2 ? ++counter : counter*2;      
    return getCounter();       
}

const  decrementCounter  = () => {
    if ( counter) {
        counter = counter < 2 ? --counter : counter/2;      
    }    
    return getCounter();       
}

const verifyToken = (token, name, res ) => {
    if (!token) {
        res.status(401).send(ERROR_401);
        return false;
    }    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.access_user == name) {
           return true;
        } 
    } 
    catch(e)  {
        res.status(401).send(ERROR_401);
        return false;
    }  
    res.status(401).send(ERROR_401);
    return false;
}

router.get('/', (req, res) => {
    res.status(200).send('Server готов к работе!');
});

router.get('/begin', (req, res) => {
    if ( verifyToken(req.headers.access_token, req.query.access_user, res)) {
        const counter = getCounter();
        res.status(200).send(counter);
    }    
});

router.put('/increment', (req, res) => {
    if ( verifyToken(req.headers.access_token, req.body.access_user, res)) {
        const counter = incrementCounter();
        res.status(200).send(counter);
    }    
});

router.put('/decrement', (req, res) => {
    if ( verifyToken(req.headers.access_token, req.body.access_user, res)) {
        const counter = decrementCounter();
        res.status(200).send(counter);
    }    
});

router.post('/logout', (req, res) => {
    if ( verifyToken(req.headers.access_token, req.body.access_user, res)) {
        const counter = setNewCounter();
        res.status(200).send(counter);
    }    
});

router.post('/login', (req, res) => {
    const  username  =  req.body.username;
    const  password  =  req.body.password;
    const  result = findUser(username, password);
    if(!result) {
        return  res.status(401).send(ERROR_LOGIN);
    }    
    const  expiresIn  =  10  *  60;
    const  accessToken  =  jwt.sign({ access_user:  username }, SECRET_KEY, { expiresIn:  expiresIn });
    res.status(200).send({ "access_user":  username, "access_token":  accessToken, "expires_in":  expiresIn});
});

app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 
