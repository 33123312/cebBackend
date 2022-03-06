const mailer = require("../mail/mailSender")
const dbCon = require("../database/dbConnection")
const bcrypt = require('bcryptjs');

const express = require("express");
const { use } = require("bcrypt/promises");
const route = express.Router()

let passTable
let sinPassTable
let clave_col
let passView

route.get("/genPass/:user",(req,res) => {
    getTableOfUser(req.params.user)
    setAllusers(res)
})

route.get("/genPass/:user/:id",(req,res) => {
    getTableOfUser(req.params.user)
    setuser(res,req.params.id)
})

function getTableOfUser(user){
    if (user == "alumno"){
        table = "alumnos"
        passTable = "webUsers"
        sinPassTable = "alumnos_sin_pass"
        clave_col = "numero_control"
        passView = "webUsers_vieww"
        return;
    } 
    if (user == "profesor"){
        table = "profesores"
        passTable = "profesoresWebUsers"
        sinPassTable = "profesores_sin_pass"
        clave_col = "clave_profesor"
        passView = "profesoresWebUsers_vieww"
    }     
}

function setAllusers(res){
    dbCon((error,connection)=>{
        let query ="SELECT * FROM cebdatabase." + sinPassTable
        connection.query(query,(error,results,fields) => {
            console.log(query)
            if(error || !results)
                return res.sendStatus(400)
                
            generatePasswords(results)
            res.sendStatus(200)
            
        })
    })
}

function setuser(res,id){

    dbCon((error,connection)=>{
        let query ="SELECT * FROM cebdatabase." + passView + " where " + clave_col +" = '" + id + "'"
        connection.query(query,(error,results,fields) => {
            console.log(error)
            if(error || !results || results.length == 0 || !results[0].email )
                return res.sendStatus(400)
                
            generatePassword(results)
            res.sendStatus(200)
            
        })
    })
}

async function generatePassword(userObj){
    let user = generateAluPass(userObj[0]);
    updateteUser(user)
}

function updateteUser(user){
    return new Promise((resume,reject)=>{
        dbCon((error,connection) =>{
            let query = 'update '+ passTable +' set password = "' + user[1] + '" where ' + clave_col + '= "' + user[0] + '"'

            connection.query(query,(error,results,fields) => {
                console.log(error)
                resume()
            })
        })
    })

}

async function generatePasswords(users){
    let webUserstoAdd = []

    users.forEach(user => {
        webUserstoAdd.push(generateAluPass(user))

    });

    mailer.sendMails(mails)
    storeusers(webUserstoAdd);
    
}

let mails = []

function generateAluPass(user){

    let generatePassword =()=>Math.random().toString(36).slice(-8);
        let decryptedPass = generatePassword();
        let password = bcrypt.hashSync(decryptedPass, 10); 
        mails.push(
            {
                template:"Tu contraseña web es: " + decryptedPass + ", recuerda guardarla muy bien",
                mail:user.email,
                nombres:user.nombre_completo || user.nombres
            }
        )
        return [user[clave_col],password]
}

function storeusers (users){
    dbCon((error,connection) =>{
        
        let query = 'insert into ' + passTable + ' (??) VALUES ?'

        const insert_columns =[clave_col,"password"];

        connection.query(query,[insert_columns, users],(error,results,fields) => {

            console.log(error)
        })
    })
}



module.exports = route