#include <M5Core2.h>

#define imgName wifi2604577
extern unsigned char imgName[];

void setup()
{
  M5.begin();
  M5.Lcd.drawBitmap(0, 0, 320, 240, (uint16_t *)imgName);
}

void loop()
{
}
