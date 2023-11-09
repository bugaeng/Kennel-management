const express = require("express") //npm install express 설치하면 사용할수 있는 서버 생성 
const server = express(); // 서버 객체 생성 
const bodyParser = require('body-parser')
const db = require("./config");
const { database } = require("firebase-admin");

server.use(bodyParser.json()); // 미들 웨어 설정 
server.use(bodyParser.urlencoded({extended : true}));
const PORT = process.env.PORT || 3000;
const ref = db.ref()

server.get('/read', function (req, res) {
  ref.once('value', function (snapshot, error) {
      const data = snapshot.val();

      if (error) {
          console.error(error);
      }
      else
          console.log("success save !!");

      console.log(snapshot.val());
      return res.json(data);
  });
});

// server.post('/set', function (req, res) {
//   ref.once('value', function (snapshot, error) {

//   })
// })

server.all("/*", (req, response) => {
  response.status(404).json({
      "status" :404,
      "message" : " bad request"

  });
})

// 서버연결
server.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });