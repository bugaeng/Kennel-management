// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//   import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"; //데이터베이스 링크 안에 추가적인것을 넣기위한 set,ref 
  import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAKlYaOC3qlsXwt5e9xFDadVCMNEffNe24",
  //   authDomain: "trylogin-now.firebaseapp.com",
  //   databaseURL: "https://trylogin-now-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "trylogin-now",
  //   storageBucket: "trylogin-now.appspot.com",
  //   messagingSenderId: "503987516936",
  //   appId: "1:503987516936:web:c1b1d99533faf08a2d43bd"
  // };

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  const auth = getAuth();

  const logout1 = document.getElementById('logout1'); // ko
  const logout2 = document.getElementById('logout2'); // eng

  logout1.addEventListener('click',(e)=>{ //로그아웃 클릭시 

  e.preventDefault();
  signOut(auth).then(() => {
  
    alert('logOut'); //로그아웃 특징은 로그아웃 되면서 로그인에 담겨진 정보가 싹다 없어진다.
    console.log('로그아웃');
  
  
    window.location.href="/domabam.html";//주소잡아줘야 이동함
    }).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
    });
  });

  logout2.addEventListener('click',(e)=>{ //로그아웃 클릭시 

    e.preventDefault();
    signOut(auth).then(() => {
    
      alert('logOut'); //로그아웃 특징은 로그아웃 되면서 로그인에 담겨진 정보가 싹다 없어진다.
      console.log('Logout');
    
    
      window.location.href="/domabam.html";//주소잡아줘야 이동함
      }).catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      });
    
    
    
    });