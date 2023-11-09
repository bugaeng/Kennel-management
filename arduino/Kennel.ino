//1101 14:43

//센서 관련 헤더
#include "DHT.h"
#include <LiquidCrystal_I2C.h>
//sql 관련 헤더
#include <Firebase_ESP_Client.h>
#include <addons/RTDBHelper.h>
//와이파이 관련 헤더
#include <ESP8266WiFi.h>
//와이파이 연결을 위한 id pw
const char *ssid = "2F_es_room";
const char *password = "0424719222";


//아두이노 소자 컨트롤을 위한 핀 설정
#define DHTPIN 5 //board pin 3
#define DHTTYPE DHT11
#define LED D7

//파이어베이스 연결 세팅
#define DATABASE_URL "https://kennel-592d9-default-rtdb.asia-southeast1.firebasedatabase.app/" // RTDB의 URL realtime database에서 확인
#define DATABASE_SECRET "hgtHCtQw3BErb6YrGBgF49GuPHwHDnEKKz8OEEzn"    // RTDB의 비밀번호 프로젝트 설정 > 서비스 계정에서 확인


WiFiClient client;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
unsigned long dataMillis = 0;

int led = 0; // 0=OFF , 1=ON
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27,16,2);

void setup() {
    Serial.begin(9600);
    pinMode(LED,OUTPUT);
    lcd.init();
    lcd.backlight();
    dht.begin();
    WiFi_connect();
    FireBase_connect();
}

void loop(){


        if(millis()-dataMillis > 3000){
          dataMillis = millis();
          if(Firebase.RTDB.getInt(&fbdo,"/LED_STATE/led")){
            String tempT = fbdo.to<const char *>();
            led = tempT.toInt();
            Serial.print("Status: ");
            Serial.println(led);
          }
          else Serial.println(fbdo.errorReason().c_str());
          sendData();
        }
        
    
}

void WiFi_connect(){
    Serial.println("---------------------------------------");
    Serial.println(ssid);
    // 와이파이 이름과 비밀번호를 통해 WIFI연결을 시작 // WL_CONNECTED라는 값을 돌려준다
    WiFi.begin(ssid, password); 
    while (WiFi.status() != WL_CONNECTED) {
        // 네트워크의 연결 상태, 8개의 리턴값
        // STATUS와 WL_CONNECTED 값이 같은지를 통해 제대로 연결이 되있는지를 확인할 수 있다
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("Wifi connected!");
    Serial.println("\nConnected to network");
    Serial.print("My IP address is: ");
    Serial.println(WiFi.localIP());
}
void FireBase_connect(){
    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
    config.database_url = DATABASE_URL;
    config.signer.tokens.legacy_token = DATABASE_SECRET;
    Firebase.reconnectWiFi(true);
    Firebase.begin(&config, &auth);// FireBase 시작
    delay(1000);
}
void sendData(){
    float temp = dht.readTemperature();
    float humi = dht.readHumidity();

    if(led==0){
        if(!isnan(temp)&&!isnan(humi)){
            LCD_OUT();
          if (Firebase.RTDB.setFloat(&fbdo, "/TEMPERATURE/value", temp)) {
            Serial.print("온도 저장 성공: ");
            Serial.println(temp);
          } 
          else {
            Serial.print("온도 저장 실패: ");
            Serial.println(fbdo.errorReason().c_str());
          }
          if (Firebase.RTDB.setFloat(&fbdo, "/HUMIDITY/value", humi)) {
            Serial.print("습도 저장 성공: ");
            Serial.println(humi);
          } 
          else {
            Serial.print("습도 저장 실패: ");
            Serial.println(fbdo.errorReason().c_str());
          }
          analogWrite(LED,LOW);
          if (Firebase.RTDB.setFloat(&fbdo, "/BRIGHT/value", 0)) {
                Serial.print("밝기 저장 성공: ");
                Serial.println("LED OFF");
            } 
            else {
                Serial.print("밝기 저장 실패: ");
                Serial.println(fbdo.errorReason().c_str());
            }
        }
    }
    else if(led==1){
        if(!isnan(temp)&&!isnan(humi)){
            LCD_OUT();
          if (Firebase.RTDB.setFloat(&fbdo, "/TEMPERATURE/value", temp)) {
            Serial.print("온도 저장 성공: ");
            Serial.println(temp);
          } 
          else {
            Serial.print("온도 저장 실패: ");
            Serial.println(fbdo.errorReason().c_str());
          }
          if (Firebase.RTDB.setFloat(&fbdo, "/HUMIDITY/value", humi)) {
              Serial.print("습도 저장 성공: ");
            Serial.println(humi);
          } 
          else {
            Serial.print("습도 저장 실패: ");
            Serial.println(fbdo.errorReason().c_str());
          }

            int bright = 255-temp*3; //온도가 높을수록 밝기를 낮춤
            analogWrite(LED,bright);
            if (Firebase.RTDB.setFloat(&fbdo, "/BRIGHT/value", bright)) {
                Serial.print("밝기 저장 성공: ");
                Serial.println(bright);
            } 
            else {
                Serial.print("밝기 저장 실패: ");
                Serial.println(fbdo.errorReason().c_str());
            }
        }
    }
}
void LCD_OUT(){
    float temp = dht.readTemperature();
    float humi = dht.readHumidity();
    lcd.setCursor(0,0);
    lcd.print("temp = ");
    lcd.setCursor(8,0);
    lcd.print(temp);
    lcd.setCursor(0,1);
    lcd.print("humi = ");
    lcd.setCursor(8,1);
    lcd.print(humi);
}
