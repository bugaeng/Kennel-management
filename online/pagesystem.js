const toggleSwitchs = document.querySelectorAll(".switch > input[type='checkbox']") // 스위치  체크박스 
const fanIcons = document.querySelector('.notice__thumb img');
const fanState1 = document.querySelector('.fan-state1'); //설정이 하나로만 집을수있게 Seletor 로 되있으니 다른 기능에도 이런걸 추가하기위하여 
const fanState2 = document.querySelector('.fan-state2');
const fanState3 = document.querySelector('.fan-state3');


toggleSwitchs.forEach(function(element){
  if(element.classList.contains("fan1")){
    element.addEventListener("change", function(event){
      if(element.checked){
    
        fanState1.innerText = 'ON';
        fanState1.style.color='red';
        fanIcons.style.animationPlayState = 'running';
      }else{

        fanState1.innerText = 'OFF';
        fanState1.style.color='green';
        fanIcons.style.animationPlayState = 'paused';

      }
    })
  }
  //추가하기위함
  if(element.classList.contains("fan2")){
    element.addEventListener("change", function(event){
      if(element.checked){
    
        fanState2.innerText = 'ON';
        fanState2.style.color='red';

        $img = document.querySelector(".img-container1 > img"); //사진변경해주는 자바스크립트 
        $img.src = `https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdzLcu2%2Fbtszk6l2nqI%2F9myZsphS1oXXQsYiZyQlz1%2Fimg.png`; //대신 html 에 <div class="img-container"> 이미지 소스 <div> 이렇게 덮어줘야함 
     
      }else{

        fanState2.innerText = 'OFF';
        fanState2.style.color='green';

        
        $img = document.querySelector(".img-container1 > img");
        $img.src = `https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZJRiL%2Fbtszve3AQfr%2F7slJSGAi0cMf8RLY5Yaov0%2Fimg.png`; 
      }
      


    })
  }
//추가하기위함 
var Target = document.getElementById("clock");
function clock() {
    var time = new Date();

    var year = time.getFullYear();
    var month = time.getMonth();
    var date = time.getDate();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    Target.innerText = 
    `${year}. ${month + 1}. ${date}.  ` +
    `${hours < 10 ? `0${hours}` : hours}: ${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds} `;
        
};

clock();
setInterval(clock, 1000);



  if(element.classList.contains("fan3")){
    element.addEventListener("change", function(event){

 

      if(element.checked){
        
        fanState3.innerText = 'ON';
        fanState3.style.color='red';
        $img = document.querySelector(".img-container > img"); //사진변경해주는 자바스크립트 
        $img.src = `https://cdn-icons-png.flaticon.com/512/1582/1582439.png`; //대신 html 에 <div class="img-container"> 이미지 소스 <div> 이렇게 덮어줘야함 
      }else{
      
        fanState3.innerText = 'OFF';
        fanState3.style.color='green';

        $img = document.querySelector(".img-container > img");
        $img.src = `https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fwpjeg%2FbtszpzNTbR6%2FLlQjzutqT827nJFXTkAqmK%2Fimg.png`;
      }
    });
  };
});



var ball = document.getElementById('blackBall'); //오른쪽 눈알
var ball2 = document.getElementById('blackBall2'); //왼쪽 눈알

// 초기 위치를 설정
var initialX = 0;
var initialY = 0;

ball.style.left = initialX + '%';
ball.style.top = initialY + '%';
ball2.style.left = initialX + '%';
ball2.style.top = initialY + '%';

document.onmousemove = function (event) {
	var x = (event.clientX / window.innerWidth) * 100 + '%';
	var y = (event.clientY / window.innerHeight) * 100 + '%';

	ball.style.left = x;
	ball.style.top = y;
	ball.style.transform = 'translate(' + x + ', ' + y + ')';
  ball2.style.left = x;
	ball2.style.top = y;
	ball2.style.transform = 'translate(' + x + ', ' + y + ')';
};
       
        
        
        
        
        
        


