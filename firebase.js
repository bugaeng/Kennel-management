        //파이어베이스에서 값을 주고받기 위해 데이터베이스를 불러들이는 부분
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
        import { getDatabase , ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"; //SET, ONVAlue 함수로 데이터베이스 사용하기 위해 사용
        
        //나의 파이어베이스 sdk 값
        const firebaseConfig = {
        apiKey: "AIzaSyA_MiZBo3MLMNcOcMjpW70NPfXH8JuP_EE",
        authDomain: "kennel-592d9.firebaseapp.com",
        databaseURL: "https://kennel-592d9-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "kennel-592d9",
        storageBucket: "kennel-592d9.appspot.com",
        messagingSenderId: "108418980927",
        appId: "1:108418980927:web:771c23bd2bd36b52e02c8a"
        };
    
        // config database 등을 사용하기 위한 함수 지정
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        
        // 예시
        // const addBtn = document.getElementById("add");
        // addBtn.addEventListener("click", (e) => {
        //     e.preventDefault();
        //     const studentRef = ref(database, 'students');

        //     set(studentRef, {
        //         "full_name": "Andrew",
        //         "age": 17,
        //         "grade": "A"
        //     });
        // });

        // 파이어베이스 데이터 업데이트 : SDK에서 UPDATE는 따로 존재하지 않고, 특정 부분만 수정하게끔
        // const updateBtn = document.getElementById("update");
        // updateBtn.addEventListener("click", (e) => {
        //     e.preventDefault();
        //     const studentRef = ref(database, 'students');
        //     const updates = {
        //         "full_name": "Updated Name",
        //         "age": 18,
        //         "grade": "B"
        //     };

        //     set(studentRef, updates, { merge: true });
        // });

        // 응용 데이터 수정을 가장한 추가
        // const ledOnBtn = document.getElementById("fan1");
        // ledOnBtn.addEventListener("click", (e) => {
        //     //const ledRef = ref(database); // 이렇게 설정하면 하위폴더를 생성하지 않고 데이터 베이스 내 첫번째 상위항목에서 수정됨
        //     //그러나 다른 데이터도 다 삭제됨
        //     const ledRef = ref(database, 'LED_STATE');

        //     const updates = {
        //         "led":1
        //     };

        //     set(ledRef, updates, { merge: true });
        // })

        // const request = new XMLHttpRequest() 
        // request.open("POST", "http://localhost:3000/read")

        const test = document.getElementById("test");
        test.addEventListener("click", () => {
            const dt = new Date();
            const userdata = ref(database, 'user');
            const updates = {
            "time" : `${dt}`,
            "UID" : "아이디",
            "PAS" : "비밀번호"
            };

            set(userdata, updates, { merge: true });
            alert("저장되었습니다.");
        });
        

        const ledControl = document.getElementById("ledOn");
        ledControl.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            
            const ledRef = ref(database, 'LED_STATE');
            
            const updates = {
                "led": isChecked ? 1 : 0
            };

            set(ledRef, updates, { merge: true });
        });

        // const ledControl = document.getElementById("ledOn");
        // let isChecked = ledControl.checked; // 초기 스위치 상태 저장
        // const ledRef = ref(database, 'LED_STATE');

        // // 주기적으로 데이터 업데이트 함수
        // function updateLedState() {
        //     const updates = {
        //         "led": isChecked ? 1 : 0
        //     };

        //     set(ledRef, updates, { merge: true });
        // }

        // const ledOffBtn = document.getElementById("ledOff");
        // ledOffBtn.addEventListener("click", (e) => {
        //     const ledRef = ref(database, 'LED_STATE');

        //     const updates = {
        //         "led":0
        //     };

        //     set(ledRef, updates, { merge: true });
        // })

        

        // 데이터값을 출력하는 부분 onValue 사용
        const tempOn = document.getElementById("temp");
        const tempDown = document.getElementById("temp1");
        const tempUp = document.getElementById("temp2");
        const display = document.getElementById("Display");
        const warnningOn1 = document.getElementById("warnning1");
        const tempRef = ref(database, 'TEMPERATURE');
        onValue(tempRef, snapshot => {
        const object = snapshot.val();
        if (object) 
        {
            console.log(object.value , tempUp.value)
            tempOn.innerHTML = `${object.value}°C`;
            if (object.value > parseInt(tempUp.value))
            {
                warnningOn1.style.color = "red";
                warnningOn1.style.fontSize = "24px";
                warnningOn1.innerHTML = "온도가 높습니다.";
                display.style.color = "red";
                display.innerHTML = "Warning !";
                display.style.animation = "moving 0.5s 0s  alternate infinite  linear";
            }
            else if (object.value < parseInt(tempDown.value))
            {
                warnningOn1.style.color = "blue";
                warnningOn1.style.fontSize = "24px";
                warnningOn1.innerHTML = "온도가 낮습니다.";
                display.style.color = "red";
                display.innerHTML = "Warning !";
                display.style.animation = "moving 0.5s 0s  alternate infinite  linear";
            }
            else
            {
                warnningOn1.style.color = "green";
                warnningOn1.style.fontSize = "24px";
                warnningOn1.innerHTML = "정 상";
            }
        } 
        else 
        {
            tempOn.innerHTML = "Temperature data not found";
        }

        }, 
        error =>
        {
            console.error("Error fetching temperature data:", error);
        });
        const humiOn = document.getElementById("humi");
        const humiDown = document.getElementById("humi1");
        const humiUp = document.getElementById("humi2");
        const warnningOn2 = document.getElementById("warnning2");
        const humiRef = ref(database, 'HUMIDITY');
        onValue(humiRef, snapshot => {
        const object = snapshot.val();
        if (object) 
        {
            humiOn.innerHTML = `${object.value} %`;
            if (object.value > parseInt(humiUp.value))
            {
                warnningOn2.style.color = "red";
                warnningOn2.style.fontSize = "24px";
                warnningOn2.innerHTML = "습도가 높습니다.";
                display.style.color = "red";
                display.innerHTML = "Warning !";
                display.style.animation = "moving 0.5s 0s  alternate infinite  linear";
            }
            else if (object.value < parseInt(humiDown.value))
            {
                warnningOn2.style.color = "blue";
                warnningOn2.style.fontSize = "24px";
                warnningOn2.innerHTML = "습도가 낮습니다.";
                display.style.color = "red";
                display.innerHTML = "Warning !";
                display.style.animation = "moving 0.5s 0s  alternate infinite  linear";
            }
            else
            {
                warnningOn2.style.color = "green";
                warnningOn2.style.fontSize = "24px";
                warnningOn2.innerHTML = "정 상";
            }
        } 
        else 
        {
            humiOn.innerHTML = "Humidity data not found";
        }

        }, 
        error =>
        {
            console.error("Error fetching Humidity data:", error);
        });
        
        const lightOn = document.getElementById("light");
        const warnningOn3 = document.getElementById("warnning3");
        const lightRef = ref(database, 'BRIGHT');
        onValue(lightRef, snapshot => {
        const object = snapshot.val();
        if (object)     
        {
            lightOn.innerHTML = `${(object.value/255*100).toFixed(2)} %`;
            if ((object.value/255*100) > 80)
            {
                warnningOn3.style.color = "red";
                warnningOn3.style.fontSize = "24px";
                warnningOn3.innerHTML = "비 정 상";
                display.style.color = "red";
                display.innerHTML = "Warning !";
                display.style.animation = "moving 0.5s 0s  alternate infinite  linear";
            }
            else if((object.value/255*100) == 0)
            {
                warnningOn3.style.color = "GRAY";
                warnningOn3.style.fontSize = "24px";
                warnningOn3.innerHTML = "비활성화";
            }
            else
            {
                warnningOn3.style.color = "green";
                warnningOn3.style.fontSize = "24px";
                warnningOn3.innerHTML = "정 상";

            }
        } 
        else 
        {
            lightOn.innerHTML = "bright data not found";
        }

        }, 
        error =>
        {
            console.error("Error fetching bright data:", error);
        });

        onValue(humiRef, snapshot => {
            const object1 = snapshot.val();
        
            onValue(tempRef, snapshot => {
                const object2 = snapshot.val();
        
                // 온도와 습도 모두가 정상 범위에 있을 때 "None" 출력
                if (
                    parseInt(humiDown.value) <= object1.value && parseInt(humiUp.value) >= object1.value &&
                    parseInt(tempDown.value) <= object2.value && parseInt(tempUp.value) >= object2.value
                ) {
                    display.style.color = "gray";
                    display.innerHTML = "None";
                    display.style.animation = "none";
                }
            });
        });


        