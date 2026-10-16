require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { randomUUID } = require('crypto');



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});



let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};



//home route
app.get('/', (req, res) => {
  let q = "select count(*) from user";
  connection.query(q,(err, result) => {
  if (err) {
    console.log(err);
    res.send("error in db");
    return;
  }
  let count = result[0]['count(*)']
  console.log(result);
  res.render("home.ejs", {count});
});
});



//show route
app.get("/user", (req, res) => {
  
  let q = "select * from user";

  connection.query(q,(err, users) => {
  if (err) {
    console.log(err);
    res.send("error in db");
    return;
  }
  console.log(users);
  res.render("showusers.ejs",{users});
})});



//EDIT ROUTE
app.get("/user/:id/edit",(req,res) => {
  let id = req.params.id;
  let q = `select * from user where id = '${id}'`;
  
  connection.query(q,(err, result) => {
  if (err) {
    console.log(err);
    res.send("error in db");
    return;
  }
  console.log(result);
  let user = result[0]
  res.render("edit.ejs",{user});

})});



//UPDATE-EDIT ROUTE
app.patch("/user/:id", (req, res) => {
 let id = req.params.id;
 let{password:formpass, username:newusername} = req.body;
 let q = `select * from user where id = '${id}'`;

 connection.query(q,(err, result) => {
  if (err) {
    console.log(err);
    res.send("error in db");
    return;
  }
  let user = result[0];
  if(formpass != user.password){
    res.send("password is incorrect");
    return;
  }
  else{
    let q2 = `update user set username = '${newusername}' where id = '${id}'`;
    
    connection.query(q2, (err,result)=>{
      if(err){
        console.log(err);
        res.send("error in db");
        return;
      }
      res.redirect("/user");
    })
  }
})});



// ADD NEW USER ROUTE
app.get("/user/newuser", (req,res) => {
  res.render("newuser.ejs");
});

app.post("/user", (req,res) => {
  let {username, email, password} = req.body;
  let id = randomUUID();
  let q = `insert into user (id, username, email, password ) values ('${id}', '${username}', '${email}', '${password}')`;

  connection.query(q,(err, result) => {
    if (err) {
      console.log(err);
      res.send("error in db");
      return;
    }
    res.redirect("/user");
  });
});



//DELETE USER ROUTE
app.delete("/user/:id", (req,res) => {
  let id = req.params.id;
  let q = `delete from user where id = '${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      res.send("error in db");
      return;
    }
    res.redirect("/user");
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



//USER DETAILS INSERTION
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];
// for (let i = 0; i < 50; i++) {
//   data.push(getRandomUser());
// }

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("50 users inserted successfully");
// });