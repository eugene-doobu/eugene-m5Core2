#include <M5Core2.h>
 
RTC_TimeTypeDef RTCtime;
RTC_TimeTypeDef RTCtime_Now;

char timeStrbuff[64];

void ScreenA(){
  uint32_t bgColor = 0x07FF; // Cyan
  M5.Lcd.setTextFont(2);
  M5.Lcd.setTextColor(0x0000, bgColor);
  M5.Lcd.fillScreen(bgColor);
  M5.Lcd.setCursor(0,80);
  M5.Lcd.println("This is A Example");
  M5.Lcd.setCursor(20,100);
  M5.Lcd.println("This is A Example");
  M5.Lcd.setCursor(40,120);
  M5.Lcd.println("This is A Example");
}

void ScreenB(){
  uint32_t bgColor = 0xFFE0; // Yellow
  M5.Lcd.setTextFont(1);
  M5.Lcd.setTextColor(0x0000, bgColor);
  M5.Lcd.fillScreen(bgColor);
  M5.Lcd.setCursor(0,60);
  M5.Lcd.println("This is B Example");
  M5.Lcd.setCursor(-20,70);
  M5.Lcd.println("This is B Example");
  M5.Lcd.setCursor(30,100);
  M5.Lcd.println("This is B Example");
}

void ScreenC(){
  uint32_t bgColor = 0xF81F; // Magenta
  M5.Lcd.setTextColor(0xC618, bgColor);
  M5.Lcd.fillScreen(bgColor);
  M5.Lcd.setCursor(160,80);
  M5.Lcd.println("This is C Example");
  M5.Lcd.fillTriangle(0,0,30,0,15,15,0x00);
}

void setup()
{
  M5.begin(true,true,true,true);

  RTCtime.Hours = 10;
  RTCtime.Minutes = 30;
  RTCtime.Seconds = 45;

  M5.Lcd.setTextFont(2);
  M5.Lcd.setCursor(0,30);
  M5.Lcd.println("");
  M5.Lcd.println("BtnA:  ScreenA, Cyan Screen");
  M5.Lcd.println("");
  M5.Lcd.println("BtnB:  ScreenB, Yellow Screen");
  M5.Lcd.println("");
  M5.Lcd.println("BtnC:  ScreenC, Magenta Screen");
}

void loop()
{

  M5.update();

  if(M5.BtnA.wasPressed())
  { 
    ScreenA();
  }
  if(M5.BtnB.wasPressed())
  {
    ScreenB();
  }
  if(M5.BtnC.wasPressed())
  {
    ScreenC();
  }

  M5.Lcd.setCursor(0,180);
  M5.Rtc.GetTime(&RTCtime_Now);
  sprintf(timeStrbuff,"RTC Time Now is %02d:%02d:%02d",
         RTCtime_Now.Hours,RTCtime_Now.Minutes,RTCtime_Now.Seconds);
  M5.Lcd.println(timeStrbuff);

}
