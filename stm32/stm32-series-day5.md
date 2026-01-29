# 🚀 STM32 Mastery Series - Day 5: Advanced Features & Complete Project

## Welcome to Day 5 - The Grand Finale! 🎯

Today we're bringing everything together! We'll explore advanced features like ADC, DAC, DMA, and build a complete **Weather Station** project that combines all the skills from Days 1-4.

---

## 📚 Today's Learning Objectives

- ADC (Analog-to-Digital Conversion)
- DAC (Digital-to-Analog Conversion)
- DMA (Direct Memory Access)
- Low Power Modes
- FreeRTOS basics
- Complete integrated project

---

## 📊 ADC: Reading Analog Signals

### What is ADC?

Converts analog voltage (0-3.3V) to digital value (0-4095 for 12-bit ADC)

**Formula:**
```
Digital Value = (Analog Voltage / Reference Voltage) × (2^Resolution - 1)

Example: 1.65V input with 3.3V reference, 12-bit ADC
Digital = (1.65 / 3.3) × 4095 = 2047
```

### Common Applications:
- Temperature sensors (LM35, thermistors)
- Light sensors (LDR, photodiodes)
- Potentiometers
- Battery voltage monitoring
- Analog joysticks

---

## 💻 Project 1: ADC Temperature & Light Sensor

### Configure in CubeMX:

1. **ADC1** → IN0 (PA0)
2. **Resolution**: 12 bits
3. **Continuous Conversion**: Enabled
4. **Sampling Time**: 84 cycles
5. Generate code

### Read ADC:

```c
uint16_t adcValue;
float voltage;
float temperature;

// Start ADC
HAL_ADC_Start(&hadc1);

while (1)
{
    // Wait for conversion
    HAL_ADC_PollForConversion(&hadc1, 100);
    
    // Read value
    adcValue = HAL_ADC_GetValue(&hadc1);
    
    // Convert to voltage
    voltage = (adcValue * 3.3) / 4095.0;
    
    // For LM35: 10mV per °C
    temperature = voltage * 100.0;
    
    sprintf(msg, "ADC: %d, Voltage: %.2fV, Temp: %.1f°C\r\n", 
            adcValue, voltage, temperature);
    HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
    
    HAL_Delay(1000);
}
```

### Multi-Channel ADC:

```c
// Configure multiple channels in CubeMX
uint16_t adcValues[3];

// Read all channels
for (int i = 0; i < 3; i++)
{
    HAL_ADC_Start(&hadc1);
    HAL_ADC_PollForConversion(&hadc1, 100);
    adcValues[i] = HAL_ADC_GetValue(&hadc1);
}
```

---

## 🔊 DAC: Generating Analog Signals

### What is DAC?

Converts digital value to analog voltage

**Applications:**
- Audio generation
- Waveform generation
- Analog control signals
- Voltage references

### Configure in CubeMX:

1. **DAC** → OUT1 (PA4)
2. **Trigger**: Software trigger
3. Generate code

### Generate Waveforms:

```c
// Sine wave generation
void generateSineWave(void)
{
    HAL_DAC_Start(&hdac, DAC_CHANNEL_1);
    
    for (int i = 0; i < 360; i++)
    {
        float sine = sin(i * 3.14159 / 180.0);
        uint16_t dacValue = (uint16_t)((sine + 1.0) * 2047.5);
        
        HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, dacValue);
        HAL_Delay(10);
    }
}

// Triangle wave
void generateTriangle(void)
{
    HAL_DAC_Start(&hdac, DAC_CHANNEL_1);
    
    // Rising edge
    for (uint16_t i = 0; i < 4095; i += 10)
    {
        HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, i);
        HAL_Delay(1);
    }
    
    // Falling edge
    for (uint16_t i = 4095; i > 0; i -= 10)
    {
        HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, i);
        HAL_Delay(1);
    }
}
```

---

## ⚡ DMA: Direct Memory Access

### Why DMA?

**Without DMA:** CPU manually transfers data (blocking)  
**With DMA:** Hardware transfers data automatically (non-blocking)

**Benefits:**
- CPU free for other tasks
- Faster data transfer
- Lower power consumption
- Essential for high-speed peripherals

### Configure DMA for ADC:

**CubeMX:**
1. **ADC1** → DMA Settings
2. Add DMA Request: ADC1
3. Mode: Circular
4. Data Width: Half Word
5. Generate code

### DMA ADC Code:

```c
#define ADC_CHANNELS 3
uint16_t adcDMA[ADC_CHANNELS];

// Start ADC with DMA
HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adcDMA, ADC_CHANNELS);

// Data automatically updates in background!
while (1)
{
    sprintf(msg, "CH0:%d CH1:%d CH2:%d\r\n", 
            adcDMA[0], adcDMA[1], adcDMA[2]);
    HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
    
    HAL_Delay(500);
}
```

---

## 🔋 Low Power Modes

### Power Modes:

| Mode | Wake-up Time | Power | Clocks Running |
|------|--------------|-------|----------------|
| **Run** | - | Highest | All |
| **Sleep** | Fast | High | CPU off, peripherals on |
| **Stop** | Medium | Low | Most clocks off |
| **Standby** | Slow | Lowest | Almost everything off |

### Sleep Mode:

```c
// Enter sleep mode
HAL_PWR_EnterSLEEPMode(PWR_MAINREGULATOR_ON, PWR_SLEEPENTRY_WFI);

// Wake up on interrupt (button, timer, etc.)
```

### Stop Mode:

```c
// Configure wake-up source (e.g., button interrupt)
HAL_PWR_EnterSTOPMode(PWR_LOWPOWERREGULATOR_ON, PWR_STOPENTRY_WFI);

// After wake-up, reconfigure clocks
SystemClock_Config();
```

---

## 🎯 Complete Project: Weather Station

### Features:

✅ Temperature sensor (I2C)  
✅ Humidity sensor (I2C)  
✅ Light level (ADC)  
✅ OLED display (SPI/I2C)  
✅ Data logging via UART  
✅ Button controls  
✅ LED indicators

### Hardware:

- STM32 Nucleo board
- BME280 (temp/humidity/pressure) - I2C
- LDR (light sensor) - ADC
- SSD1306 OLED - I2C
- Button - GPIO
- LED - GPIO

### Complete Code Structure:

```c
/* main.c - Weather Station */

// Sensor data structure
typedef struct {
    float temperature;
    float humidity;
    float pressure;
    uint16_t lightLevel;
} WeatherData_t;

WeatherData_t weather;

// BME280 functions
void BME280_Init(void);
WeatherData_t BME280_ReadAll(void);

// Display functions
void Display_Init(void);
void Display_Update(WeatherData_t data);

// Main loop
int main(void)
{
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_I2C1_Init();
    MX_ADC1_Init();
    MX_USART2_UART_Init();
    
    BME280_Init();
    Display_Init();
    
    HAL_UART_Transmit(&huart2, (uint8_t*)"Weather Station Started\r\n", 25, 100);
    
    while (1)
    {
        // Read sensors
        weather = BME280_ReadAll();
        
        // Read light sensor
        HAL_ADC_Start(&hadc1);
        HAL_ADC_PollForConversion(&hadc1, 100);
        weather.lightLevel = HAL_ADC_GetValue(&hadc1);
        
        // Update display
        Display_Update(weather);
        
        // Log to UART
        sprintf(msg, "Temp:%.1f°C Hum:%.1f%% Press:%.1fhPa Light:%d\r\n",
                weather.temperature, weather.humidity, 
                weather.pressure, weather.lightLevel);
        HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
        
        HAL_Delay(2000);
    }
}
```

---

## 🚀 FreeRTOS Basics (Bonus)

### Why RTOS?

- Multitasking
- Task scheduling
- Resource management
- Better code organization

### Enable in CubeMX:

1. **Middleware** → **FREERTOS**
2. **Interface**: CMSIS_V2
3. Create tasks in CubeMX

### Simple Example:

```c
void Task_ReadSensors(void *argument)
{
    for(;;)
    {
        // Read sensors
        weather = BME280_ReadAll();
        osDelay(1000);
    }
}

void Task_UpdateDisplay(void *argument)
{
    for(;;)
    {
        // Update display
        Display_Update(weather);
        osDelay(500);
    }
}

void Task_LogData(void *argument)
{
    for(;;)
    {
        // Log via UART
        sprintf(msg, "Temp: %.1f°C\r\n", weather.temperature);
        HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
        osDelay(2000);
    }
}
```

---

## 🎓 5-Day Journey Complete!

### What You've Learned:

**Day 1:** Foundation, GPIO Output, LED Blink  
**Day 2:** GPIO Input, Interrupts, Buttons  
**Day 3:** Timers, PWM, Servo Control  
**Day 4:** UART, I2C, SPI Communication  
**Day 5:** ADC, DAC, DMA, Complete Project

---

## 🏆 Final Challenge

Build a **Smart Home Controller**:
- Temperature/humidity monitoring
- Light level detection
- Motor control (fan)
- OLED display
- UART control interface
- Data logging
- Low power sleep mode

---

## 📚 Next Steps

**Continue Learning:**
- CAN bus communication
- USB device/host
- Ethernet connectivity
- Bootloader development
- RTOS advanced features
- DSP applications

**Resources:**
- STM32 Reference Manuals
- Application Notes
- Community forums
- GitHub projects

---

## 💬 Congratulations! 🎉

You've completed the 5-day STM32 journey from scratch to advanced! You now have the skills to build professional embedded systems.

**What will you build next?** Share your projects!

---

**#STM32 #EmbeddedSystems #ADC #DAC #DMA #FreeRTOS #IoT #Day5 #Complete**

---

*Thank you for following this 5-day series! Keep building, keep learning!* 🚀
