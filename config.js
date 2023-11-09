const admin = require("firebase-admin");

// 프로젝트 설정 > 새로운 비공개키 생성
const serviceAccount = require("./Kennel-adminkey.json"); //비공개키 경로 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), //인증내용 

  //realtime database 주소
  databaseURL: "https://kennel-592d9-default-rtdb.asia-southeast1.firebasedatabase.app/" //데이터베이스 사용할것이다.
});

const db = admin.database(); //내 파이어 베이스 프로젝트의 RTDB 참조자 생성 

module.exports = db; //const db 를 모듈화를 합니다. 