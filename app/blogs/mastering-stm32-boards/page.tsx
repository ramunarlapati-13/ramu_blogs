"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Cpu, Zap, Timer, Radio, Rocket, Menu, X } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

const sections = [
    { id: "overview", title: "Series Overview", icon: Menu },
    { id: "day1", title: "Day 1: Foundation & Setup", icon: Cpu },
    { id: "day2", title: "Day 2: GPIO & Interrupts", icon: Zap },
    { id: "day3", title: "Day 3: Timers & PWM", icon: Timer },
    { id: "day4", title: "Day 4: Communication Protocols", icon: Radio },
    { id: "day5", title: "Day 5: Advanced Features", icon: Rocket },
];

export default function STM32BlogPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [isNavOpen, setIsNavOpen] = useState(false);
    const SHARE_URL = "https://ramublogs.vercel.app/blogs/mastering-stm32-boards";

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
            setIsNavOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src="/images/stm32/day1a.jpg"
                    alt="STM32 Boards"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
                <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
                    <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                        Mastering STM32 Boards
                    </h1>
                    <p className="mb-6 text-xl text-zinc-300 md:text-2xl">
                        A Complete 5-Day Journey from Basics to Advanced
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>By Ramu Narlapati</span>
                        <span>•</span>
                        <span>January 29, 2026</span>
                        <span>•</span>
                        <span>90 min read</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar Navigation */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-2">
                        <div className="mb-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                            Table of Contents
                        </div>
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left transition-colors ${activeSection === section.id
                                        ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-400'
                                        : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                                        }`}
                                >
                                    <Icon className={`h-4 w-4 ${activeSection === section.id ? 'text-indigo-400' : 'text-zinc-500'}`} />
                                    <span className={`text-sm font-medium ${activeSection === section.id ? 'text-indigo-100' : ''}`}>
                                        {section.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">


                    <div className="mb-12">
                        <ShareButtons
                            url={SHARE_URL}
                            title="Mastering STM32 Boards: A 5-Day Journey"
                        />
                    </div>

                    {/* Overview Section */}
                    <section id="overview" className="mb-20 scroll-mt-32">
                        <h2 className="mb-6 text-4xl font-bold">Welcome to Your STM32 Journey</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-zinc-300">
                                Welcome to the ultimate STM32 mastery series! Over the next 5 days, we'll transform you from a complete beginner to someone who can confidently build professional STM32 projects. This comprehensive journey covers everything from basic GPIO to advanced features like ADC, DMA, and real-time operating systems.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Why STM32?</h3>
                            <ul className="space-y-2 text-zinc-300">
                                <li><strong>Industry Standard:</strong> Used in automotive, industrial automation, IoT devices, and consumer electronics</li>
                                <li><strong>Powerful ARM Cortex-M Core:</strong> 32-bit processing with excellent performance</li>
                                <li><strong>Rich Peripheral Set:</strong> Timers, ADC, DAC, communication interfaces (UART, I2C, SPI), and more</li>
                                <li><strong>Excellent Ecosystem:</strong> Free development tools, extensive documentation, and active community</li>
                                <li><strong>Scalable:</strong> From simple LED control to complex real-time systems</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">What You'll Learn</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {[
                                    { day: 1, title: "Foundation & Setup", topics: "Architecture, IDE setup, LED blink" },
                                    { day: 2, title: "GPIO & Interrupts", topics: "Button input, EXTI, debouncing" },
                                    { day: 3, title: "Timers & PWM", topics: "Timer interrupts, PWM, servo control" },
                                    { day: 4, title: "Communication", topics: "UART, I2C, SPI protocols" },
                                    { day: 5, title: "Advanced Features", topics: "ADC, DAC, DMA, FreeRTOS" },
                                ].map((item) => (
                                    <div key={item.day} className="rounded-lg border border-white/10 bg-white/5 p-4">
                                        <h4 className="font-semibold text-indigo-400">Day {item.day}: {item.title}</h4>
                                        <p className="text-sm text-zinc-400">{item.topics}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-8 text-2xl font-semibold">Hardware Requirements</h3>
                            <ul className="text-zinc-300">
                                <li>STM32 Development Board (STM32F103C8T6 "Blue Pill" or STM32 Nucleo)</li>
                                <li>USB to Serial adapter (if using Blue Pill)</li>
                                <li>Breadboard and jumper wires</li>
                                <li>LEDs, resistors (220Ω), push buttons</li>
                                <li>Optional: Servo motor, sensors (DHT11, LM35)</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Software Requirements</h3>
                            <ul className="text-zinc-300">
                                <li>STM32CubeIDE (free, all-in-one development environment)</li>
                                <li>STM32CubeMX (for peripheral configuration)</li>
                                <li>ST-Link drivers</li>
                            </ul>
                        </div>
                    </section>

                    {/* Day 1 Section */}
                    <section id="day1" className="mb-20 scroll-mt-32">
                        <div className="mb-8">
                            <img src="/images/stm32/day1a.jpg" alt="Day 1" className="w-3/4 mx-auto rounded-lg" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Day 1: Foundation & Setup</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Today we're building the foundation for everything that follows. We'll understand STM32 architecture, set up your development environment, and write your first program to blink an LED - the "Hello World" of embedded systems.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Understanding STM32 Architecture</h3>
                            <h4 className="text-xl font-semibold text-indigo-400">ARM Cortex-M Core</h4>
                            <p className="text-zinc-300">
                                STM32 microcontrollers are built around ARM Cortex-M processors (M0, M3, M4, M7). These are 32-bit RISC processors optimized for embedded applications, offering excellent performance per watt.
                            </p>

                            <h4 className="text-xl font-semibold text-indigo-400">Memory Organization</h4>
                            <ul className="text-zinc-300">
                                <li><strong>Flash Memory:</strong> Stores your program code (typically 64KB-512KB)</li>
                                <li><strong>SRAM:</strong> Volatile memory for variables and stack (typically 20KB-128KB)</li>
                                <li><strong>System Memory:</strong> Contains bootloader for programming</li>
                            </ul>

                            <h4 className="text-xl font-semibold text-indigo-400">Peripherals</h4>
                            <p className="text-zinc-300">
                                STM32 boards come with rich peripherals: GPIO, Timers, ADC, DAC, UART, I2C, SPI, USB, CAN, and more.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Setting Up STM32CubeIDE</h3>
                            <ol className="space-y-2 text-zinc-300">
                                <li>Download STM32CubeIDE from ST's website</li>
                                <li>Install and launch the IDE</li>
                                <li>Create a new STM32 project</li>
                                <li>Select your target board (e.g., STM32F103C8)</li>
                                <li>Configure the project settings</li>
                            </ol>

                            <h3 className="mt-8 text-2xl font-semibold">Your First Program: LED Blink</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`/* USER CODE BEGIN WHILE */
while (1)
{
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);   // LED ON
    HAL_Delay(1000);                                        // Wait 1 second
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET); // LED OFF
    HAL_Delay(1000);                                        // Wait 1 second
    /* USER CODE END WHILE */
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Key Concepts Learned</h3>
                            <ul className="text-zinc-300">
                                <li>STM32 architecture and memory organization</li>
                                <li>Setting up development environment</li>
                                <li>GPIO configuration and control</li>
                                <li>HAL library basics</li>
                                <li>Compiling and uploading code</li>
                            </ul>
                        </div>
                    </section>

                    {/* Day 2 Section */}
                    <section id="day2" className="mb-20 scroll-mt-32">
                        <div className="mb-8">
                            <img src="/images/stm32/day2a.jpg" alt="Day 2" className="w-3/4 mx-auto rounded-lg" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Day 2: GPIO Input & Interrupts</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Today we level up from simple output to reading inputs and handling interrupts. You'll learn to read buttons, handle external interrupts, and build an interactive LED controller.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">GPIO Input Modes</h3>
                            <ul className="text-zinc-300">
                                <li><strong>Pull-up:</strong> Internal resistor pulls pin HIGH when button not pressed</li>
                                <li><strong>Pull-down:</strong> Internal resistor pulls pin LOW when button not pressed</li>
                                <li><strong>Floating:</strong> No internal resistor (requires external pull-up/down)</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Reading Button State (Polling)</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Read button state
if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0) == GPIO_PIN_SET) {
    // Button pressed
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);
} else {
    // Button released
    HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET);
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">External Interrupts (EXTI)</h3>
                            <p className="text-zinc-300">
                                Interrupts allow the MCU to respond immediately to events without constantly checking (polling). This is more efficient and enables faster response times.
                            </p>

                            <h4 className="text-xl font-semibold text-indigo-400">Interrupt Callback</h4>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if (GPIO_Pin == GPIO_PIN_0) {
        // Toggle LED on button press
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
    }
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Debouncing Techniques</h3>
                            <p className="text-zinc-300">
                                Mechanical buttons "bounce" - they make and break contact multiple times when pressed. We need to debounce to get clean button presses.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`uint32_t lastDebounceTime = 0;
uint32_t debounceDelay = 50;  // 50ms

void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    uint32_t currentTime = HAL_GetTick();
    
    if ((currentTime - lastDebounceTime) > debounceDelay) {
        if (GPIO_Pin == GPIO_PIN_0) {
            HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
        }
        lastDebounceTime = currentTime;
    }
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Advanced: Multi-Function Button</h3>
                            <p className="text-zinc-300">
                                Let's build something more sophisticated! We can detect single press, double press, and long press events. Single press toggles the LED, double press activates blink mode, and long press turns everything off. This demonstrates state machines and advanced input handling.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Key Concepts Learned</h3>
                            <ul className="text-zinc-300">
                                <li>GPIO input configuration (pull-up, pull-down, floating)</li>
                                <li>Polling vs. interrupts</li>
                                <li>External interrupt (EXTI) configuration</li>
                                <li>Debouncing techniques</li>
                                <li>Building interactive applications</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Practice Exercises</h3>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                                <li>Create a button that cycles through 3 LED brightness levels</li>
                                <li>Implement a "press and hold" feature to gradually increase LED brightness</li>
                                <li>Build a reaction time game where the LED turns on randomly and you measure button press speed</li>
                                <li>Create a combination lock requiring a specific button press sequence to unlock the LED</li>
                            </ul>
                        </div>
                    </section>

                    {/* Day 3 Section */}
                    <section id="day3" className="mb-20 scroll-mt-32">
                        <div className="mb-8">
                            <img src="/images/stm32/day3a.jpg" alt="Day 3" className="w-3/4 mx-auto rounded-lg" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Day 3: Timers & PWM</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Timers are the heartbeat of embedded systems. Today we'll master timer interrupts for non-blocking delays and PWM for controlling LED brightness and servo motors.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Understanding Timers</h3>
                            <p className="text-zinc-300">
                                STM32 has multiple timer types: Basic, General-purpose, and Advanced. They can count up/down, generate interrupts, create PWM signals, and measure input signals.
                            </p>

                            <h4 className="text-xl font-semibold text-indigo-400">Timer Calculation</h4>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// For 1 second interrupt with 72MHz clock:
// Prescaler = 7200 - 1  (72MHz / 7200 = 10kHz)
// Period = 10000 - 1     (10kHz / 10000 = 1Hz = 1 second)`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Timer Interrupt for Non-Blocking Blink</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
    if (htim->Instance == TIM2) {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
    }
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">PWM for LED Brightness Control</h3>
                            <p className="text-zinc-300">
                                PWM (Pulse Width Modulation) varies the duty cycle to control average power. Perfect for LED dimming and motor speed control.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Start PWM
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);

// Set brightness (0-100%)
for (int brightness = 0; brightness <= 100; brightness++) {
    __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, brightness);
    HAL_Delay(20);
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Servo Motor Control</h3>
                            <p className="text-zinc-300">
                                Servos use PWM with 50Hz frequency. Pulse width determines angle: 1ms = 0°, 1.5ms = 90°, 2ms = 180°.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`void setServoAngle(uint8_t angle) {
    // Map angle (0-180) to pulse width (1000-2000 µs)
    uint16_t pulse = 1000 + (angle * 1000 / 180);
    __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, pulse);
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Input Capture: Frequency Measurement</h3>
                            <p className="text-zinc-300">
                                Input capture allows you to measure pulse width, frequency, decode PWM signals, and read ultrasonic sensors. Configure TIM4 Channel 1 in input capture direct mode with prescaler 83 for 1MHz timer frequency. The timer captures the counter value when an input signal changes, allowing precise timing measurements.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Key Concepts Learned</h3>
                            <ul className="text-zinc-300">
                                <li>Timer architecture and configuration</li>
                                <li>Timer interrupts for non-blocking delays</li>
                                <li>PWM generation and duty cycle control</li>
                                <li>Servo motor control with precise PWM</li>
                                <li>Input capture for frequency and pulse width measurement</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Practice Exercises</h3>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                                <li>Create a "breathing" LED effect with smooth PWM transitions</li>
                                <li>Control 2 LEDs with different PWM frequencies</li>
                                <li>Build an RGB LED controller using 3 PWM channels</li>
                                <li>Create a servo-based "radar" scanner sweeping from 0 to 180 degrees</li>
                            </ul>
                        </div>
                    </section>

                    {/* Day 4 Section */}
                    <section id="day4" className="mb-20 scroll-mt-32">
                        <div className="mb-8">
                            <img src="/images/stm32/day4a.jpg" alt="Day 4" className="w-3/4 mx-auto rounded-lg" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Day 4: Communication Protocols</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Communication is key in embedded systems. Today we'll master UART, I2C, and SPI - the three most common protocols for interfacing with sensors, displays, and other devices.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Protocol Comparison</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-zinc-300">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-2">Protocol</th>
                                            <th className="p-2">Wires</th>
                                            <th className="p-2">Speed</th>
                                            <th className="p-2">Use Case</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/10">
                                            <td className="p-2">UART</td>
                                            <td className="p-2">2 (TX, RX)</td>
                                            <td className="p-2">9600-115200 bps</td>
                                            <td className="p-2">Serial communication, debugging</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="p-2">I2C</td>
                                            <td className="p-2">2 (SDA, SCL)</td>
                                            <td className="p-2">100-400 kHz</td>
                                            <td className="p-2">Multiple sensors on same bus</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2">SPI</td>
                                            <td className="p-2">4 (MOSI, MISO, SCK, CS)</td>
                                            <td className="p-2">1-10 MHz+</td>
                                            <td className="p-2">High-speed displays, SD cards</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="mt-8 text-2xl font-semibold">UART Communication</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Send string via UART
char msg[] = "Hello from STM32!\\r\\n";
HAL_UART_Transmit(&huart1, (uint8_t*)msg, strlen(msg), HAL_MAX_DELAY);

// Receive data
uint8_t rxData;
HAL_UART_Receive(&huart1, &rxData, 1, HAL_MAX_DELAY);`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">I2C Temperature Sensor</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`#define LM75_ADDRESS 0x48 << 1  // I2C address (shifted for HAL)

// Read temperature
uint8_t tempData[2];
HAL_I2C_Mem_Read(&hi2c1, LM75_ADDRESS, 0x00, 1, tempData, 2, HAL_MAX_DELAY);

// Convert to Celsius
int16_t temp = (tempData[0] << 8) | tempData[1];
float temperature = temp / 256.0;`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">SPI Display Interface</h3>
                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Send command to SPI display
void sendCommand(uint8_t cmd) {
    HAL_GPIO_WritePin(DC_GPIO_Port, DC_Pin, GPIO_PIN_RESET);  // Command mode
    HAL_GPIO_WritePin(CS_GPIO_Port, CS_Pin, GPIO_PIN_RESET);  // Select device
    HAL_SPI_Transmit(&hspi1, &cmd, 1, HAL_MAX_DELAY);
    HAL_GPIO_WritePin(CS_GPIO_Port, CS_Pin, GPIO_PIN_SET);    // Deselect
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Choosing the Right Protocol</h3>
                            <p className="text-zinc-300">
                                Use UART when you need simple point-to-point communication, debugging output to a PC, GPS module communication, or Bluetooth module interfacing. Choose I2C when connecting multiple sensors on one bus, using EEPROMs or RTCs, dealing with limited GPIO pins, or when moderate speed is acceptable. Select SPI for high-speed data transfer, driving displays (OLED, LCD, TFT), SD card communication, or when you have enough GPIO pins available.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Key Concepts Learned</h3>
                            <ul className="text-zinc-300">
                                <li>UART for serial communication and debugging</li>
                                <li>I2C for multi-device communication</li>
                                <li>SPI for high-speed data transfer</li>
                                <li>Protocol selection based on requirements</li>
                                <li>Real sensor and display interfacing</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Practice Exercises</h3>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                                <li>Build a UART command interpreter that responds to text commands</li>
                                <li>Create an I2C device scanner that lists all connected devices</li>
                                <li>Display sensor data on an OLED screen using SPI or I2C</li>
                                <li>Build a data logger that records sensor readings via UART</li>
                            </ul>
                        </div>
                    </section>

                    {/* Day 5 Section */}
                    <section id="day5" className="mb-20 scroll-mt-32">
                        <div className="mb-8">
                            <img src="/images/stm32/day5a.jpg" alt="Day 5" className="w-3/4 mx-auto rounded-lg" />
                        </div>
                        <h2 className="mb-6 text-4xl font-bold">Day 5: Advanced Features & Complete Project</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Welcome to the final day! We'll explore advanced features like ADC, DAC, DMA, and low power modes. Then we'll build a complete Weather Station project integrating everything you've learned.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Analog-to-Digital Converter (ADC)</h3>
                            <p className="text-zinc-300">
                                ADC converts analog signals (0-3.3V) to digital values (0-4095 for 12-bit ADC). Essential for reading sensors like temperature, light, potentiometers.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Read ADC value
HAL_ADC_Start(&hadc1);
HAL_ADC_PollForConversion(&hadc1, HAL_MAX_DELAY);
uint32_t adcValue = HAL_ADC_GetValue(&hadc1);

// Convert to voltage
float voltage = (adcValue * 3.3) / 4095.0;`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Digital-to-Analog Converter (DAC)</h3>
                            <p className="text-zinc-300">
                                DAC converts digital values to analog voltages. Used for audio, waveform generation, and analog control signals.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Generate sine wave
for (int i = 0; i < 360; i++) {
    float sine = sin(i * 3.14159 / 180.0);
    uint32_t dacValue = (uint32_t)((sine + 1) * 2047.5);
    HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, dacValue);
    HAL_Delay(10);
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Direct Memory Access (DMA)</h3>
                            <p className="text-zinc-300">
                                DMA transfers data between peripherals and memory without CPU intervention, freeing the CPU for other tasks.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// UART transmit with DMA
char msg[] = "DMA Transfer!\\r\\n";
HAL_UART_Transmit_DMA(&huart1, (uint8_t*)msg, strlen(msg));

// ADC continuous conversion with DMA
uint16_t adcBuffer[100];
HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adcBuffer, 100);`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Low Power Modes</h3>
                            <p className="text-zinc-300">
                                STM32 offers multiple power modes: Run mode (highest power, all clocks running), Sleep mode (fast wake-up, CPU off but peripherals on), Stop mode (medium wake-up, most clocks off, low power), and Standby mode (slow wake-up, almost everything off, lowest power). Use Sleep mode for short idle periods, Stop mode for longer idle with quick wake-up needed, and Standby for maximum power saving when wake-up time isn't critical.
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Complete Weather Station Project</h3>
                            <p className="text-zinc-300">
                                Let's integrate everything: ADC for temperature sensor, I2C for humidity sensor, UART for data logging, and PWM for fan control.
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`while (1) {
    // Read temperature (ADC)
    float temp = readTemperature();
    
    // Read humidity (I2C)
    float humidity = readHumidity();
    
    // Log data (UART)
    char buffer[50];
    sprintf(buffer, "Temp: %.1f°C, Humidity: %.1f%%\\r\\n", temp, humidity);
    HAL_UART_Transmit(&huart1, (uint8_t*)buffer, strlen(buffer), HAL_MAX_DELAY);
    
    // Control fan based on temperature (PWM)
    if (temp > 30) {
        setFanSpeed(100);  // Full speed
    } else if (temp > 25) {
        setFanSpeed(50);   // Half speed
    } else {
        setFanSpeed(0);    // Off
    }
    
    HAL_Delay(5000);  // Update every 5 seconds
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Introduction to FreeRTOS</h3>
                            <p className="text-zinc-300">
                                FreeRTOS is a real-time operating system for microcontrollers. It enables multitasking, allowing multiple tasks to run "simultaneously."
                            </p>

                            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
                                <code className="text-sm text-zinc-300">{`// Task 1: Blink LED
void vTask1(void *pvParameters) {
    while(1) {
        HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

// Task 2: Read sensor
void vTask2(void *pvParameters) {
    while(1) {
        float temp = readTemperature();
        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}`}</code>
                            </pre>

                            <h3 className="mt-8 text-2xl font-semibold">Key Concepts Learned</h3>
                            <ul className="text-zinc-300">
                                <li>ADC for analog sensor reading</li>
                                <li>DAC for waveform generation</li>
                                <li>DMA for efficient data transfer</li>
                                <li>Low power modes for battery applications</li>
                                <li>Building complete integrated projects</li>
                                <li>Introduction to FreeRTOS multitasking</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Final Challenge</h3>
                            <p className="text-zinc-300">
                                Build a Smart Home Controller with temperature/humidity monitoring, light level detection and automatic lighting, motor control for fans, OLED display for status, UART control interface, data logging to SD card, and low power sleep mode for energy efficiency. Share your projects with the community!
                            </p>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-20">
                        <div className="rounded-lg border border-indigo-500/20 bg-indigo-950/20 p-8">
                            <h2 className="mb-4 text-3xl font-bold">🎉 Congratulations!</h2>
                            <p className="mb-4 text-lg text-zinc-300">
                                You've completed the 5-day STM32 mastery journey! You've learned everything from basic GPIO to advanced features like ADC, DMA, and FreeRTOS. You're now equipped to build professional embedded systems projects.
                            </p>

                            <h3 className="mb-3 text-xl font-semibold">Next Steps</h3>
                            <ul className="space-y-2 text-zinc-300">
                                <li>Build your own projects combining multiple concepts</li>
                                <li>Explore advanced topics: CAN bus, USB, Ethernet</li>
                                <li>Learn about low-level register programming</li>
                                <li>Dive deeper into FreeRTOS and real-time systems</li>
                                <li>Join STM32 community forums and share your projects</li>
                            </ul>

                            <div className="mt-6 flex gap-4">
                                <a
                                    href="https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
                                >
                                    ST Official Resources
                                </a>
                                <a
                                    href="https://github.com/STMicroelectronics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                                >
                                    GitHub Examples
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Share Again */}
                    <div className="mb-12">
                        <ShareButtons
                            url={SHARE_URL}
                            title="Mastering STM32 Boards: A 5-Day Journey"
                        />
                    </div>

                </main>
            </div >
        </div >
    );
}
