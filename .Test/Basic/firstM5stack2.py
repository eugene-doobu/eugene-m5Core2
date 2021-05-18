from m5stack import *
from m5stack_ui import *
from uiflow import *

# 버튼을 클릭하면 배경색이 변경되는 프로그램

screen = M5Screen()
screen.clean_screen()
screen.set_screen_bg_color(0xFFFFFF)

def buttonA_wasPressed():
  screen.set_screen_bg_color(0x00FFFF)
btnA.wasPressed(buttonA_wasPressed)

def buttonC_wasPressed():
  screen.set_screen_bg_color(0xFF00FF)
btnC.wasPressed(buttonC_wasPressed)

def buttonB_wasPressed():
  screen.set_screen_bg_color(0xFFFF00)
btnB.wasPressed(buttonB_wasPressed)
