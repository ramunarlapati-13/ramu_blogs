# 🚀 STM32 Mastery Series - Day 3: Timers & PWM

## Welcome to Day 3! ⚡

Today we're diving into one of the most powerful features of STM32: **Timers**. We'll learn to create precise timing, generate PWM signals, and build professional-grade embedded applications.

---

## 📚 Today's Learning Objectives

By the end of Day 3, you'll master:
- Timer fundamentals and architecture
- PWM (Pulse Width Modulation) generation
- LED brightness control
- Servo motor control
- Input capture for frequency measurement
- Non-blocking delays

---

## ⏱️ Understanding STM32 Timers

### Timer Types:

**1. Basic Timers (TIM6, TIM7)**
- Simple up-counting
- Used for time base generation
- Triggers for DAC/ADC

**2. General Purpose Timers (TIM2-TIM5, TIM9-TIM14)**
- Up/down/up-down counting
- PWM generation
- Input capture
- Output compare
- **Most versatile!**

**3. Advanced Timers (TIM1, TIM8)**
- All general-purpose features
- Complementary outputs
- Dead-time insertion
- Motor control applications

### Timer Architecture:

```
Clock Source → Prescaler → Counter → Auto-Reload Register
                  ↓           ↓            ↓
               (Divide)   (Counts up)  (Reset value)
                            ↓
                    Compare Registers → PWM Output
                            ↓
                      Interrupt/Event
```

---

## 🔢 Timer Calculation Basics

### Formula:

```
Timer Frequency = Clock Frequency / (Prescaler + 1)
Timer Period = (Auto-Reload Register + 1) / Timer Frequency
```

### Example:

```
Clock: 84 MHz (STM32F401)
Prescaler: 8399
ARR (Auto-Reload): 9999

Timer Frequency = 84,000,000 / (8399 + 1) = 10,000 Hz
Timer Period = (9999 + 1) / 10,000 = 1 second
```

---

## 💻 Project 1: Non-Blocking LED Blink with Timer

### Step 1: Configure Timer in CubeMX

1. **Timers** → **TIM2**
2. **Clock Source**: Internal Clock
3. **Configuration**:
   - Prescaler: 8399 (for 84MHz clock)
   - Counter Period (ARR): 9999
   - This gives us 1 Hz (1 second period)
4. **NVIC Settings**: Enable TIM2 global interrupt
5. **Generate Code**

### Step 2: Implement Timer Interrupt

```c
/* main.c - In main() function, before while loop */
HAL_TIM_Base_Start_IT(&htim2);  // Start timer with interrupt

/* main.c - Timer callback function */
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
    if (htim->Instance == TIM2)
    {
        // This executes every 1 second
        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }
}

/* main.c - Main loop is now free! */
while (1)
{
    // CPU can do other tasks
    // Timer handles LED blinking automatically
}
```

**Advantages over HAL_Delay():**
✅ Non-blocking  
✅ Precise timing  
✅ CPU free for other tasks  
✅ Multiple timers can run simultaneously

---

## 🌟 PWM: Pulse Width Modulation

### What is PWM?

PWM creates an analog-like output using digital signals:

```
Duty Cycle 0%:   ________________________________________
Duty Cycle 25%:  ‾‾‾‾____‾‾‾‾____‾‾‾‾____‾‾‾‾____
Duty Cycle 50%:  ‾‾‾‾‾____‾‾‾‾‾____‾‾‾‾‾____‾‾‾‾‾____
Duty Cycle 75%:  ‾‾‾‾‾‾‾‾‾____‾‾‾‾‾‾‾‾‾____‾‾‾‾‾‾‾‾‾____
Duty Cycle 100%: ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

**Applications:**
- LED brightness control
- Motor speed control
- Servo positioning
- Audio generation
- Power regulation

### PWM Formula:

```
Duty Cycle (%) = (CCR / ARR) × 100

Where:
- CCR = Capture/Compare Register value
- ARR = Auto-Reload Register value
```

---

## 💡 Project 2: LED Brightness Control with PWM

### Step 1: Configure PWM in CubeMX

1. **Timers** → **TIM3**
2. **Clock Source**: Internal Clock
3. **Channel 1**: PWM Generation CH1
4. **Configuration**:
   - Prescaler: 83 (for 84MHz → 1MHz timer clock)
   - Counter Period (ARR): 999 (1kHz PWM frequency)
   - Pulse (CCR): 0 (start at 0% duty cycle)
5. **Pin**: Select appropriate pin (e.g., PA6 for TIM3_CH1)
6. **Generate Code**

### Step 2: Basic PWM Control

```c
/* main.c - Start PWM in main() */
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);

/* main.c - Set brightness (0-100%) */
void setBrightness(uint8_t brightness)
{
    // Convert 0-100% to CCR value (0-999)
    uint16_t pulse = (brightness * 999) / 100;
    __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, pulse);
}

/* main.c - Fade in/out effect */
while (1)
{
    // Fade in
    for (uint8_t brightness = 0; brightness <= 100; brightness++)
    {
        setBrightness(brightness);
        HAL_Delay(10);
    }
    
    // Fade out
    for (uint8_t brightness = 100; brightness > 0; brightness--)
    {
        setBrightness(brightness);
        HAL_Delay(10);
    }
}
```

### Step 3: Button-Controlled Brightness

```c
/* main.c - Combine with Day 2 interrupts */
volatile uint8_t brightness = 0;

void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if (GPIO_Pin == BUTTON_Pin)
    {
        // Increase brightness by 25% each press
        brightness += 25;
        if (brightness > 100) brightness = 0;
        
        setBrightness(brightness);
    }
}
```

---

## 🤖 Project 3: Servo Motor Control

### Understanding Servos:

Servos use PWM signals (typically 50Hz) with pulse widths:
- **1ms pulse** = 0° position
- **1.5ms pulse** = 90° position (center)
- **2ms pulse** = 180° position

### Step 1: Configure for Servo (50Hz PWM)

**CubeMX Settings:**
- Prescaler: 83 (84MHz → 1MHz)
- ARR: 19999 (1MHz / 20000 = 50Hz)
- This gives 20ms period (50Hz)

### Step 2: Servo Control Code

```c
/* main.c - Servo control functions */

// Set servo angle (0-180 degrees)
void setServoAngle(uint8_t angle)
{
    // Constrain angle
    if (angle > 180) angle = 180;
    
    // Map angle to pulse width (1ms to 2ms)
    // 1ms = 1000 ticks, 2ms = 2000 ticks
    uint16_t pulse = 1000 + ((angle * 1000) / 180);
    
    __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, pulse);
}

/* main.c - Sweep servo back and forth */
while (1)
{
    // Sweep from 0 to 180
    for (uint8_t angle = 0; angle <= 180; angle += 5)
    {
        setServoAngle(angle);
        HAL_Delay(50);
    }
    
    // Sweep from 180 to 0
    for (uint8_t angle = 180; angle > 0; angle -= 5)
    {
        setServoAngle(angle);
        HAL_Delay(50);
    }
}
```

---

## 📊 Project 4: Input Capture - Frequency Measurement

### What is Input Capture?

Captures the timer counter value when an input signal changes:
- Measure pulse width
- Measure frequency
- Decode PWM signals
- Read ultrasonic sensors

### Step 1: Configure Input Capture

**CubeMX:**
1. **TIM4** → **Channel 1**: Input Capture direct mode
2. **Prescaler**: 83 (1MHz timer)
3. **ARR**: 0xFFFF (maximum)
4. **Enable** TIM4 global interrupt

### Step 2: Frequency Measurement Code

```c
/* main.c - Global variables */
volatile uint32_t IC_Val1 = 0;
volatile uint32_t IC_Val2 = 0;
volatile uint32_t Difference = 0;
volatile uint8_t Is_First_Captured = 0;
volatile float Frequency = 0;

/* main.c - Start input capture */
HAL_TIM_IC_Start_IT(&htim4, TIM_CHANNEL_1);

/* main.c - Input capture callback */
void HAL_TIM_IC_CaptureCallback(TIM_HandleTypeDef *htim)
{
    if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_1)
    {
        if (Is_First_Captured == 0)
        {
            IC_Val1 = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
            Is_First_Captured = 1;
        }
        else
        {
            IC_Val2 = HAL_TIM_ReadCapturedValue(htim, TIM_CHANNEL_1);
            
            // Calculate difference
            if (IC_Val2 > IC_Val1)
            {
                Difference = IC_Val2 - IC_Val1;
            }
            else
            {
                Difference = (0xFFFF - IC_Val1) + IC_Val2;
            }
            
            // Calculate frequency (Timer at 1MHz)
            Frequency = 1000000.0 / Difference;
            
            Is_First_Captured = 0;
        }
    }
}
```

---

## 🎓 Key Concepts Learned Today

✅ Timer architecture and types  
✅ Timer calculations (prescaler, ARR)  
✅ Non-blocking delays with timer interrupts  
✅ PWM generation and duty cycle control  
✅ LED brightness control  
✅ Servo motor positioning  
✅ Input capture for frequency measurement  
✅ Multiple timer usage

---

## 🏋️ Practice Exercises

**Beginner:**
1. Create a "breathing" LED effect with smooth PWM transitions
2. Control 2 LEDs with different PWM frequencies

**Intermediate:**
3. Build a RGB LED controller (3 PWM channels)
4. Create a servo-based "radar" scanner (0° to 180° sweep)
5. Implement a software-based "tone" generator using PWM

**Advanced:**
6. Build an ultrasonic distance sensor reader (HC-SR04)
7. Create a motor speed controller with acceleration/deceleration
8. Implement a multi-channel LED dimmer with smooth transitions

---

## 🐛 Common Issues & Solutions

**Problem 1: PWM not working**
- Verify pin is configured as alternate function
- Check timer clock is enabled
- Ensure HAL_TIM_PWM_Start() is called

**Problem 2: Servo jitters**
- Use stable power supply (servos draw current!)
- Add capacitor (100µF-1000µF) near servo
- Ensure 50Hz PWM frequency

**Problem 3: Input capture misses edges**
- Check signal voltage levels (0-3.3V)
- Verify interrupt priority
- Use appropriate edge detection (rising/falling)

---

## 🔜 Tomorrow's Preview: Day 4

Get ready for communication protocols:
- **UART**: Serial communication with PC
- **I2C**: Multi-device bus communication
- **SPI**: High-speed peripheral interfacing
- **Real sensors**: Temperature, accelerometer, displays

---

## 💬 Challenge of the Day

Build a **PWM-based music player**:
- Use PWM to generate different frequencies (musical notes)
- Play a simple melody (e.g., "Happy Birthday")
- Bonus: Add button control to switch songs

Share your melody! 🎵

---

**#STM32 #Timers #PWM #EmbeddedSystems #Microcontrollers #ARM #ServoMotor #Electronics #Day3**

---

*Day 3 complete! Tomorrow we connect to the outside world with communication protocols!* 🌐
