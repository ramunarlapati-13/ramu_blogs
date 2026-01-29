# 🚀 STM32 Mastery Series - Day 4: Communication Protocols

## Welcome to Day 4! 🌐

Today we're connecting our STM32 to the outside world! We'll master the three essential communication protocols: **UART**, **I2C**, and **SPI**.

---

## 📚 Today's Learning Objectives

- UART serial communication
- I2C multi-device bus
- SPI high-speed interfacing
- Interfacing real sensors
- Debugging with serial monitor

---

## 📡 Communication Protocols Overview

| Protocol | Wires | Speed | Distance | Devices | Use Case |
|----------|-------|-------|----------|---------|----------|
| **UART** | 2 | Low-Med | Long | 1-to-1 | PC communication, GPS |
| **I2C** | 2 | Low-Med | Short | Multi | Sensors, EEPROMs |
| **SPI** | 4+ | High | Short | Multi | Displays, SD cards |

---

## 🔌 UART: Serial Communication

### What is UART?

- Asynchronous (no shared clock)
- Serial data transmission
- Full-duplex communication
- Point-to-point connection

### UART Frame:

```
[Start][Data Bits (8)][Parity][Stop]
Common: 8N1 = 8 data, No parity, 1 stop
```

### Wiring:

```
STM32 TX → Device RX
STM32 RX → Device TX
GND → GND
```

---

## 💻 Project 1: UART Communication

### Configure in CubeMX:

1. **USART2** → Asynchronous mode
2. Baud: 115200, 8N1
3. Generate code

### Basic Code:

```c
#include <stdio.h>
#include <string.h>

char msg[100];

// Send data
HAL_UART_Transmit(&huart2, (uint8_t*)"Hello!\r\n", 8, 100);

// Formatted output
sprintf(msg, "Count: %d\r\n", counter);
HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
```

### UART Reception:

```c
uint8_t rxData;

// Start reception
HAL_UART_Receive_IT(&huart2, &rxData, 1);

// Callback
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
    if (huart->Instance == USART2)
    {
        // Echo received data
        HAL_UART_Transmit(&huart2, &rxData, 1, 10);
        
        // Re-enable reception
        HAL_UART_Receive_IT(&huart2, &rxData, 1);
    }
}
```

---

## 🔗 I2C: Multi-Device Bus

### What is I2C?

- 2-wire: SDA (data) + SCL (clock)
- Multi-master, multi-slave
- Up to 127 devices
- Requires pull-up resistors

### I2C Transaction:

```
START → [Address + R/W] → ACK → [Data] → ACK → STOP
```

---

## 💻 Project 2: I2C Temperature Sensor

### Configure in CubeMX:

1. **I2C1** → I2C mode
2. Speed: 100 kHz (Standard)
3. Generate code

### I2C Scanner:

```c
void I2C_Scanner(void)
{
    for (uint8_t i = 1; i < 128; i++)
    {
        if (HAL_I2C_IsDeviceReady(&hi2c1, (i << 1), 1, 10) == HAL_OK)
        {
            sprintf(msg, "Found: 0x%02X\r\n", i);
            HAL_UART_Transmit(&huart2, (uint8_t*)msg, strlen(msg), 100);
        }
    }
}
```

### Read Sensor:

```c
#define SENSOR_ADDR 0x68

float readTemperature(void)
{
    uint8_t data[2];
    
    HAL_I2C_Mem_Read(&hi2c1, (SENSOR_ADDR << 1), 0x11, 1, data, 2, 100);
    
    int16_t temp = (data[0] << 8) | data[1];
    return temp / 256.0;
}
```

---

## ⚡ SPI: High-Speed Interface

### What is SPI?

- 4-wire: MOSI, MISO, SCK, CS
- Full-duplex
- Master-slave architecture
- Fastest protocol

### SPI Signals:

```
MOSI: Master Out Slave In
MISO: Master In Slave Out
SCK: Clock
CS: Chip Select
```

---

## 💻 Project 3: SPI Display

### Configure in CubeMX:

1. **SPI1** → Full-Duplex Master
2. Prescaler: 16
3. Mode: 0 (CPOL=0, CPHA=0)
4. Generate code

### Basic SPI:

```c
void SPI_WriteCommand(uint8_t cmd)
{
    HAL_GPIO_WritePin(CS_PORT, CS_PIN, GPIO_PIN_RESET);
    HAL_SPI_Transmit(&hspi1, &cmd, 1, 10);
    HAL_GPIO_WritePin(CS_PORT, CS_PIN, GPIO_PIN_SET);
}
```

---

## 🎓 Key Concepts Learned

✅ UART serial communication  
✅ I2C multi-device bus  
✅ SPI high-speed interface  
✅ Sensor interfacing  
✅ Protocol selection

---

## 🏋️ Practice Exercises

**Beginner:**
1. UART command interpreter
2. I2C device scanner

**Intermediate:**
3. Display sensor data on OLED
4. Data logger via UART

**Advanced:**
5. Multi-sensor dashboard
6. SD card logger

---

## 🔜 Tomorrow: Day 5

- ADC/DAC
- DMA
- Low Power Modes
- FreeRTOS
- Complete Weather Station Project

---

**#STM32 #UART #I2C #SPI #EmbeddedSystems #Day4**
