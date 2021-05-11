#include <WiFi.h> 
#include <WebSocketsClient.h> 
#include <M5Core2.h> 
#include "config.h"

WebSocketsClient webSocket;
uint32_t comDelay = 1000; // ms

bool isPressedBtnA = false;
bool isPressedBtnB = false;
bool isPressedBtnC = false;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      //webSocket.sendTXT("Connected");
      break;
    case WStype_TEXT:
      Serial.printf("[WSc] get text: %s\n", payload);
      // event syncColor(payload);
      break;
    case WStype_BIN:
    case WStype_ERROR:      
    case WStype_FRAGMENT_TEXT_START:
    case WStype_FRAGMENT_BIN_START:
    case WStype_FRAGMENT:
    case WStype_FRAGMENT_FIN:
      break;
  }
}

void setupWiFi()
{
 WiFi.begin(_name, _password); // need modify wifi name and password

 // Wait some time to connect to wifi
 for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
     Serial.print(".");
     delay(1000);
 }

 // Check if connected to wifi
 if(WiFi.status() != WL_CONNECTED) {
     Serial.println("No Wifi!");
     return;
 }

 Serial.println("Connected to Wifi, Connecting to server.");
  // server address, port and URL
  webSocket.begin(_ip, _port, "/"); // need modify ip and port

  // event handler
  webSocket.onEvent(webSocketEvent);

  // try ever 5000 again if connection has failed
  webSocket.setReconnectInterval(5000);
}

void setup()
{
 // com setup
 Serial.begin(115200);
 Serial.println("Start");
 
 // Power ON Stabilizing...
 delay(500);
 M5.begin();
 
 M5.Lcd.fillScreen(BLACK);
 M5.Lcd.setTextColor(GREEN);
 M5.Lcd.setTextSize(2);
 M5.Lcd.println("M5Core2 Websocket Test");
 M5.Lcd.println("When the button is pressed");
 M5.Lcd.println("the unity server receives a message");

 setupWiFi();
}

void loop() {
 if(M5.BtnA.wasPressed() || M5.BtnA.isPressed())
 {
   isPressedBtnA = true;
 }
 if(M5.BtnB.wasPressed() || M5.BtnB.isPressed())
 {
   isPressedBtnB = true;
 }
 if(M5.BtnC.wasPressed() || M5.BtnC.isPressed())
 {
   isPressedBtnC = true;
 }

 static uint32_t pre_send_time = 0;
 uint32_t time = millis();
 if(time - pre_send_time > comDelay){
   pre_send_time = time;
   
   String isPressedBtnAStr = (isPressedBtnA ? "true": "false");
   String isPressedBtnBStr = (isPressedBtnB ? "true": "false");
   String isPressedBtnCStr = (isPressedBtnC ? "true": "false");
   String btn_str = "{\"A\":" + isPressedBtnAStr + 
     ", \"B\":" + isPressedBtnBStr + 
     ", \"C\":" + isPressedBtnCStr + "}";

   webSocket.sendTXT(btn_str);
   
  isPressedBtnA = false;
  isPressedBtnB = false;
  isPressedBtnC = false;
 }
 webSocket.loop();

 M5.update();
}
