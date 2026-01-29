# 🚀 STM32 Mastery Series - Day 2: GPIO Input & Interrupts

## Welcome Back! 🎯

Yesterday we made an LED blink - today we're making our STM32 **interactive**! We'll learn to read buttons, handle interrupts, and build responsive embedded systems.

---

## 📚 Today's Learning Objectives

By the end of Day 2, you'll master:
- GPIO input configuration (pull-up/pull-down)
- Reading button states
- External interrupts (EXTI)
- Debouncing techniques
- Building an interactive LED controller

---

## 🔌 Understanding GPIO Input Modes

### Input Configuration Types:

**1. Floating Input**
```
Pin is not connected to VCC or GND internally
⚠️ Problem: Reads random values when nothing is connected
```

**2. Pull-Up Input**
```
Internal resistor connects pin to VCC (3.3V)
Default state: HIGH (1)
Button press (to GND): LOW (0)
✅ Most common for buttons
```

**3. Pull-Down Input**
```
Internal resistor connects pin to GND
Default state: LOW (0)
Button press (to VCC): HIGH (1)
```

### Visual Representation:

```
Pull-Up Configuration:
    VCC (3.3V)
       |
      [R] 10kΩ - 100kΩ (internal)
       |
       ├─── To MCU Pin
       |
    [Button]
       |
      GND
```

---

## 💻 Project 1: Button-Controlled LED

### Hardware Setup:

**Nucleo Board:**
- LED: PA5 (onboard LED)
- Button: PC13 (onboard user button)

**Custom Board:**
- LED → Any GPIO pin + 220Ω resistor → GND
- Button → Any GPIO pin (with pull-up) + Button to GND

### Step 1: Configure in STM32CubeMX

1. **Open** your project from Day 1
2. **Configure LED pin** (PA5):
   - Mode: GPIO_Output
   - Label: LED
3. **Configure Button pin** (PC13):
   - Mode: GPIO_Input
   - GPIO Pull-up/Pull-down: Pull-up
   - Label: BUTTON
4. **Generate Code**

### Step 2: Polling Method (Simple)

```c
/* main.c - Inside while(1) loop */

while (1)
{
    // Read button state
    GPIO_PinState buttonState = HAL_GPIO_ReadPin(BUTTON_GPIO_Port, BUTTON_Pin);
    
    // Button pressed? (LOW because of pull-up)
    if (buttonState == GPIO_PIN_RESET)
    {
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);  // LED ON
    }
    else
    {
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);  // LED OFF
    }
    
    HAL_Delay(10);  // Small delay to reduce CPU usage
}
```

**How it works:**
- Continuously checks button state in a loop
- Simple but CPU-intensive
- Not ideal for power-sensitive applications

---

## ⚡ Interrupts: The Smart Way

### Why Use Interrupts?

❌ **Polling**: CPU constantly checks the button  
✅ **Interrupts**: CPU does other work, responds only when button is pressed

**Benefits:**
- Lower power consumption
- Faster response time
- CPU free for other tasks
- More professional approach

### Step 1: Configure Interrupt in CubeMX

1. **Select button pin** (PC13)
2. **Mode**: GPIO_EXTI13 (External Interrupt)
3. **GPIO Pull-up/Pull-down**: Pull-up
4. **Trigger**: Falling edge (button press)
5. **NVIC Settings** tab:
   - Enable "EXTI line[15:10] interrupts"
6. **Generate Code**

### Step 2: Implement Interrupt Handler

```c
/* main.c - Add this global variable before main() */
volatile uint8_t ledState = 0;

/* main.c - The interrupt callback function */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if (GPIO_Pin == BUTTON_Pin)
    {
        // Toggle LED state
        ledState = !ledState;
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, ledState);
    }
}

/* main.c - Simplified main loop */
while (1)
{
    // CPU is free to do other tasks!
    // Interrupt handles button presses automatically
    HAL_Delay(100);
}
```

---

## 🔧 Button Debouncing

### The Problem:

When you press a physical button, it doesn't make clean contact:

```
Ideal:     ______|‾‾‾‾‾‾‾‾‾‾
Reality:   ______|‾|_|‾|_|‾‾‾  (bouncing!)
```

This causes **multiple interrupts** from a single press!

### Solution 1: Software Debouncing (Simple)

```c
/* main.c - Global variables */
volatile uint32_t lastPressTime = 0;
#define DEBOUNCE_DELAY 200  // 200ms

void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if (GPIO_Pin == BUTTON_Pin)
    {
        uint32_t currentTime = HAL_GetTick();
        
        // Check if enough time has passed since last press
        if ((currentTime - lastPressTime) > DEBOUNCE_DELAY)
        {
            ledState = !ledState;
            HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, ledState);
            lastPressTime = currentTime;
        }
    }
}
```

### Solution 2: Hardware Debouncing

Add a capacitor (0.1µF - 1µF) across the button:

```
    VCC
     |
    [R] Pull-up
     |
     ├─── To MCU Pin
     |
  [Button]
     |
    [C] 0.1µF (debounce capacitor)
     |
    GND
```

---

## 💡 Project 2: Multi-Function Button Controller

Let's build something more advanced!

**Features:**
- Single press: Toggle LED
- Double press: Blink mode
- Long press: Turn off

```c
/* main.c - Enhanced button handler */

#define DOUBLE_PRESS_TIME 300   // 300ms window for double press
#define LONG_PRESS_TIME 1000    // 1 second for long press

typedef enum {
    LED_OFF,
    LED_ON,
    LED_BLINK
} LedMode_t;

volatile LedMode_t ledMode = LED_OFF;
volatile uint32_t pressCount = 0;
volatile uint32_t firstPressTime = 0;
volatile uint32_t pressStartTime = 0;

void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if (GPIO_Pin == BUTTON_Pin)
    {
        uint32_t currentTime = HAL_GetTick();
        
        // Detect press start
        if (HAL_GPIO_ReadPin(BUTTON_GPIO_Port, BUTTON_Pin) == GPIO_PIN_RESET)
        {
            pressStartTime = currentTime;
            
            // Check for double press
            if ((currentTime - firstPressTime) < DOUBLE_PRESS_TIME)
            {
                pressCount = 2;
            }
            else
            {
                pressCount = 1;
                firstPressTime = currentTime;
            }
        }
        // Detect press release
        else
        {
            uint32_t pressDuration = currentTime - pressStartTime;
            
            if (pressDuration > LONG_PRESS_TIME)
            {
                // Long press detected
                ledMode = LED_OFF;
            }
            else if (pressCount == 2)
            {
                // Double press detected
                ledMode = LED_BLINK;
                pressCount = 0;
            }
            else if (pressCount == 1)
            {
                // Single press - toggle
                ledMode = (ledMode == LED_ON) ? LED_OFF : LED_ON;
            }
        }
    }
}

/* main.c - Main loop handles LED modes */
while (1)
{
    switch (ledMode)
    {
        case LED_OFF:
            HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);
            break;
            
        case LED_ON:
            HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
            break;
            
        case LED_BLINK:
            HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
            HAL_Delay(250);
            break;
    }
    
    HAL_Delay(10);
}
```

---

## 🎓 Key Concepts Learned Today

✅ GPIO input modes (floating, pull-up, pull-down)  
✅ Reading digital inputs with HAL_GPIO_ReadPin()  
✅ External interrupts (EXTI)  
✅ Interrupt callbacks and handlers  
✅ Button debouncing (software & hardware)  
✅ State machines for complex behaviors  
✅ Edge detection (rising/falling)

---

## 🏋️ Practice Exercises

**Beginner:**
1. Create a button that cycles through 3 LED brightness levels
2. Implement a "press and hold" to gradually increase LED brightness

**Intermediate:**
3. Build a reaction time game: LED turns on randomly, measure button press speed
4. Create a combination lock: specific button press sequence unlocks LED

**Advanced:**
5. Implement multiple buttons with priority interrupts
6. Create a state machine with 5+ states controlled by button combinations

---

## 🐛 Common Issues & Solutions

**Problem 1: Button triggers multiple times**
- Solution: Implement debouncing (software or hardware)

**Problem 2: Interrupt not firing**
- Check NVIC is enabled in CubeMX
- Verify correct edge detection (rising/falling)
- Ensure HAL_GPIO_EXTI_IRQHandler is called

**Problem 3: LED doesn't respond**
- Verify GPIO pin configuration
- Check pull-up/pull-down settings
- Test with polling first, then add interrupts

---

## 🔜 Tomorrow's Preview: Day 3

Get ready for:
- **Timers**: Precise timing without blocking
- **PWM**: Control LED brightness smoothly
- **Input Capture**: Measure signal frequencies
- **Encoder Reading**: Rotary encoder interfacing

---

## 💬 Challenge of the Day

Build a "Simon Says" game:
- LED blinks a pattern
- User must replicate with button presses
- Pattern gets longer each round

Share your implementation! 🎮

---

**#STM32 #EmbeddedSystems #Interrupts #GPIO #Microcontrollers #ARM #Electronics #Programming #Day2**

---

*Day 2 of 5 complete! Tomorrow we unlock the power of timers and PWM. Follow along!* ⚡
