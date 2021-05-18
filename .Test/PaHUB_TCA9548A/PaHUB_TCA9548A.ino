/*
    Description: Use PaHUB Unit to expand multiple I2C devices and scan the I2C addresses of the slave devices in order.
*/

#include <Wire.h>
#include <M5Core2.h>
#include "MAX30100.h"
#include "ClosedCube_TCA9548A.h"

#define FRONT 2

#define X_LOCAL 100
#define Y_LOCAL 35
#define X_OFFSET 160
#define Y_OFFSET 34

#define PaHub_I2C_ADDRESS	0x70

ClosedCube::Wired::TCA9548A tca9548a;

// Sampling is tightly related to the dynamic range of the ADC.
// refer to the datasheet for further info
#define SAMPLING_RATE                       MAX30100_SAMPRATE_100HZ

// The LEDs currents must be set to a level that avoids clipping and maximises the
// dynamic range
#define IR_LED_CURRENT                      MAX30100_LED_CURR_24MA
#define RED_LED_CURRENT                     MAX30100_LED_CURR_27_1MA

// The pulse width of the LEDs driving determines the resolution of
// the ADC (which is a Sigma-Delta).
// set HIGHRES_MODE to true only when setting PULSE_WIDTH to MAX30100_SPC_PW_1600US_16BITS
#define PULSE_WIDTH                         MAX30100_SPC_PW_1600US_16BITS
#define HIGHRES_MODE                        true

// Instantiate a MAX30100 sensor class
MAX30100 sensor;

void setup()
{
	M5.begin();
  Wire.begin();
	M5.Lcd.fillScreen(TFT_BLACK); 
  tca9548a.address(PaHub_I2C_ADDRESS);
	M5.Lcd.setTextFont(4);
	M5.Lcd.setCursor(70, 0, 4);
	M5.Lcd.setTextColor(YELLOW,TFT_BLACK);
	M5.Lcd.println(("PaHUB Example"));
	M5.Lcd.setTextColor(TFT_WHITE,TFT_BLACK);

  uint8_t returnCode = 0;
  uint8_t address;

  for( uint8_t channel=0; channel<TCA9548A_MAX_CHANNELS; channel++ ) {
    returnCode = tca9548a.selectChannel(channel);
    if( returnCode == 0 ) {
      for(address = 0x01; address < 0x7F; address++ ) {
        Wire.beginTransmission(address);
        returnCode = Wire.endTransmission();
        if (returnCode == 0) {
          if(address == 0x57){ // heart address
            Serial.print("Initializing MAX30100..");
        
            // Initialize the sensor
            // Failures are generally due to an improper I2C wiring, missing power supply
            // or wrong target chip
            while (!sensor.begin()) {
                Serial.println("Sensor not found");
                M5.Lcd.setTextFont(4);
                M5.Lcd.setCursor(50, 100, 4);
                M5.Lcd.println("Sensor not found");
                delay(1000);
            } 
        
            Serial.println("SUCCESS");
            // Set up the wanted parameters
            sensor.setMode(MAX30100_MODE_SPO2_HR);
            sensor.setLedsCurrent(IR_LED_CURRENT, RED_LED_CURRENT);
            sensor.setLedsPulseWidth(PULSE_WIDTH);
            sensor.setSamplingRate(SAMPLING_RATE);
            sensor.setHighresModeEnabled(HIGHRES_MODE);
          }
        } 
      }    
    }
    delay(200);
  }
}

byte ReadHeart(uint8_t address){
  // .ir=(uint16_t)((buffer[i*4] << 8) | buffer[i*4 + 1])
  // .red=(uint16_t)((buffer[i*4 + 2] << 8) | buffer[i*4 + 3])
  if(address == 0x57){
    uint16_t ir, red;
    sensor.update();
    
    Serial.print("Read heart sensor: ");
    Serial.print(Wire.requestFrom(address, 128));
    Serial.print(" ");
    Serial.print(Wire.available());
    Serial.print(" ");
    byte status = Wire.read();
    Serial.println(status);
    Serial.println(Wire.read());
    Serial.println(Wire.read());
    Serial.println(Wire.read());
    sensor.resetFifo();
    
    return status;
  }
  return -1;
}

void PaHUB(void){
	uint8_t returnCode = 0;
	uint8_t address;
  for( uint8_t channel=0; channel<TCA9548A_MAX_CHANNELS; channel++ ) {
		M5.Lcd.setCursor(X_LOCAL, Y_LOCAL + Y_OFFSET*channel , FRONT);
		M5.Lcd.printf("                                                                ");
		M5.Lcd.setCursor(X_LOCAL, Y_LOCAL + Y_OFFSET*channel , FRONT);
		M5.Lcd.printf("CH%d : ",channel);
		returnCode = tca9548a.selectChannel(channel);
		if( returnCode == 0 ) {
			for(address = 0x01; address < 0x7F; address++ ) {
				Wire.beginTransmission(address);
        returnCode = Wire.endTransmission();
				if (returnCode == 0) {
					// Serial.print("I2C device = \n");
					M5.Lcd.printf("0X%X  ",address);

          ReadHeart(address);
				} 
			}    
		}
		delay(200); 	 
  }
}



void loop()
{
	PaHUB();
}
