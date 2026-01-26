
export const BLOG_CONTENT = {
    "future-of-high-altitude-wind-energy": {
        title: "The Future of High-Altitude Wind Energy",
        date: "January 3, 2026",
        category: "Energy",
        readTime: "5 min read",
        author: {
            name: "Ramu Narlapati",
            avatar: "/images/author-ramu.png"
        },
        heroImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop",
        content: [
            {
                type: "paragraph",
                text: "Imagine a world where wind turbines don't need massive steel towers or acres of land. Instead, they float high in the sky, like kites dancing in the breeze, capturing the powerful, consistent winds that exist at higher altitudes. This isn't science fiction; it's the promising reality of High-Altitude Wind Energy (HAWE)."
            },
            {
                type: "heading",
                text: "Why Look Up?"
            },
            {
                type: "paragraph",
                text: "Traditional wind turbines are limited by their height. The higher you go, the stronger and more consistent the wind becomes. At 500 meters and above, wind speeds can be significantly higher than at ground level. HAWE systems aim to tap into this untethered potential."
            },
            {
                type: "paragraph",
                text: "Airborne Wind Energy Systems (AWES) typically use tethered aircraft or kites to harvest energy. These devices can fly at altitudes between 200m and 500m, accessing a resource that traditional windmills simply can't reach."
            },
            {
                type: "heading",
                text: "Key Advantages"
            },
            {
                type: "list",
                items: [
                    "Low Material Cost: Without the need for heavy towers and massive foundations, AWES can reduce material usage by up to 90%.",
                    "Higher Efficiency: Access to stronger, more persistent winds means a higher capacity factor compared to ground-based turbines.",
                    "Mobility: These systems can be deployed rapidly in remote areas or disaster zones where power is needed urgently."
                ]
            },
            {
                type: "heading",
                text: "The Challenges Ahead"
            },
            {
                type: "paragraph",
                text: "Despite the potential, the path to commercialization isn't without hurdles. Autonomous control systems must be fail-safe to manage the kites during turbulent weather. Furthermore, airspace regulations need to evolve to accommodate these flying power plants safely alongside traditional aviation."
            },
            {
                type: "heading",
                text: "Conclusion"
            },
            {
                type: "paragraph",
                text: "High-altitude wind energy represents a bold leap forward in renewable technology. While it may not replace traditional wind farms overnight, it offers a complementary solution that could unlock vast new energy reserves, helping us power a greener future."
            }
        ]
    },
    "industrial-iot-workshop": {
        title: "From Concept to Cloud: My Journey with Industrial IoT",
        date: "January 9, 2026",
        category: "IoT",
        readTime: "3 min read", // Estimated
        author: {
            name: "Ramu Narlapati",
            avatar: "/images/author-ramu.png"
        },
        heroImage: "/images/industrial-iot-hero.png",
        content: [
            {
                type: "paragraph",
                text: "I recently wrapped up an intensive Industrial IoT workshop that took me beyond theory and deep into real-world hardware integration. The journey from understanding the basics to building a fully functional cloud-connected system was nothing short of exhilarating."
            },
            {
                type: "heading",
                text: "What I Mastered"
            },
            {
                type: "list",
                items: [
                    "Microcontrollers: A deep dive into the architecture and logic of Arduino and ESP8266.",
                    "Connectivity: Implementing real-time data transmission via Wi-Fi, bridging the physical and digital worlds.",
                    "Cloud Computing: Managing and visualizing live data streams using ThingSpeak."
                ]
            },
            {
                type: "heading",
                text: "The Project: Login-Free Dashboard"
            },
            {
                type: "paragraph",
                text: "The highlight of the workshop was developing a custom ThingSpeak Dashboard. Unlike standard setups, this one allows for instant data monitoring using only a Channel ID—no login required! This approach significantly streamlines how we view live sensor data, making industrial monitoring more accessible and efficient."
            },
            {
                type: "paragraph",
                text: "You can check out the live dashboard here: https://lnkd.in/gHERCbue"
            },
            {
                type: "heading",
                text: "Looking Ahead"
            },
            {
                type: "paragraph",
                text: "Armed with these new skills in IIoT, automation, and embedded systems, I'm excited to tackle complex automation challenges. The ability to connect hardware to the cloud opens up endless possibilities for innovation in Industry 4.0."
            }
        ]
    },
    "getting-started-with-arduino-uno": {
        title: "Mastering the Arduino Uno: A Comprehensive Guide",
        date: "January 12, 2026",
        category: "Electronics",
        readTime: "10 min read",
        author: {
            name: "Ramu Narlapati",
            avatar: "/images/author-ramu.png"
        },
        heroImage: "/images/arduino-uno-bg.png",
        content: [
            {
                type: "paragraph",
                text: "The Arduino Uno is arguably the most recognizable microcontroller board in the world. For hobbyists, students, and engineers alike, it serves as the definitive gateway into the world of electronics and programming. But what makes this little blue board so special? Why, after all these years, does it remain the gold standard for beginners? In this comprehensive guide, we'll dive deep into the Arduino Uno's architecture, its hardware specifications, and how you can master it to build everything from simple home automation systems to complex robotics."
            },
            {
                type: "heading",
                text: "Introduction to the Arduino Ecosystem"
            },
            {
                type: "paragraph",
                text: "Arduino is an open-source electronics platform based on easy-to-use hardware and software. The 'Uno' in the name usually refers to the Arduino Uno R3, the third revision of the board. It bridges the critical gap between complex electronics engineering and creative coding, allowing anyone—regardless of background—to build interactive objects. The ecosystem thrives on its massive community, meaning if you can imagine a project, someone has likely shared code or a tutorial for it."
            },
            {
                type: "heading",
                text: "Hardware Specifications: Under the Hood"
            },
            {
                type: "paragraph",
                text: "At the heart of the Arduino Uno is the ATmega328P microcontroller. While it may not compete with the raw processing power of a Raspberry Pi or modern PC, its real-time processing capabilities are perfect for hardware control. Understanding its specs is crucial for knowing the limits of your projects:"
            },
            {
                type: "list",
                items: [
                    "Microcontroller: ATmega328P (8-bit AVR family)",
                    "Operating Voltage: 5V",
                    "Input Voltage (recommended): 7-12V",
                    "Digital I/O Pins: 14 (of which 6 provide PWM output for simulating analog outputs)",
                    "Analog Input Pins: 6 (10-bit resolution)",
                    "DC Current per I/O Pin: 20 mA",
                    "Flash Memory: 32 KB (ATmega328P) of which 0.5 KB used by bootloader",
                    "SRAM: 2 KB (ATmega328P) - This is where your variables live during runtime",
                    "EEPROM: 1 KB (ATmega328P) - Non-volatile memory for storing small amounts of data"
                ]
            },
            {
                type: "heading",
                text: "Deep Dive: The Pinout"
            },
            {
                type: "paragraph",
                text: "The headers bordering the board are your interface to the physical world. Let's break them down:"
            },
            {
                type: "paragraph",
                text: "1. Power Pins: The board can be powered via USB or the DC barrel jack. The power pins include 3.3V and 5V outputs to power your sensors and modules. The GND pins are the common ground reference."
            },
            {
                type: "paragraph",
                text: "2. Analog Inputs (A0-A5): These pins are designed to read continuous voltage signals (0-5V). They use an internal Analog-to-Digital Converter (ADC) to translate voltage levels into a number between 0 and 1023. This is essential for reading temperature sensors, light sensors (LDRs), and potentiometers."
            },
            {
                type: "paragraph",
                text: "3. Digital I/O (0-13): These pins deal in absolutes: HIGH (5V) or LOW (0V). They can input data (detecting a button press) or output signals (turning on an LED). Note that pins 3, 5, 6, 9, 10, and 11 act as PWM (Pulse Width Modulation) pins, marked with a tilde (~), allowing for 'dimming' effects."
            },
            {
                type: "paragraph",
                text: "4. Communication Pins: Pins 0 (RX) and 1 (TX) are used for Serial communication. Be careful using these if you are also communicating with the computer via USB, as they share the same line."
            },
            {
                type: "heading",
                text: "Programming: The Arduino IDE"
            },
            {
                type: "paragraph",
                text: "The hardware is useless without software. The Arduino Integrated Development Environment (IDE) is where you write your code, or 'sketches'. It uses a simplified version of C++, hiding much of the complexity of register manipulation."
            },
            {
                type: "paragraph",
                text: "Every Arduino sketch requires two fundamental functions:"
            },
            {
                type: "list",
                items: [
                    "void setup() { ... }: This runs exactly once when the board is powered up or reset. It's used to initialize variables, pin modes, and start libraries.",
                    "void loop() { ... }: This runs continuously after setup completes. It contains the main logic of your program, constantly monitoring inputs and controlling outputs."
                ]
            },
            {
                type: "heading",
                text: "Your First Project: The Basic Blink"
            },
            {
                type: "paragraph",
                text: "The 'Hello World' of hardware is blinking an LED. The Uno has a handy built-in LED connected to pin 13, so you don't even need external components to test it."
            },
            {
                type: "paragraph",
                text: "Here is the logic: inside `setup`, you define pin 13 as an OUTPUT. Inside `loop`, you write a HIGH signal to the pin, wait for 1000 milliseconds (1 second), write a LOW signal, and wait again. This creates the blinking effect."
            },
            {
                type: "code",
                text: `void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}`
            },
            {
                type: "heading",
                text: "Expanding Horizons: Shields and Modules"
            },
            {
                type: "paragraph",
                text: "Once you master the basics, the true power of Arduino comes from 'Shields'—pre-built circuit boards that stack on top of the Uno to add specific capabilities. Need to connect to the internet? There's a WiFi shield. Want to drive high-power motors? Get a Motor Driver shield. This modularity allows for rapid prototyping."
            },
            {
                type: "heading",
                text: "Conclusion"
            },
            {
                type: "paragraph",
                text: "The Arduino Uno is more than just a microcontroller; it's a tool for empowerment. It demystifies technology and puts the power of creation into your hands. Whether you are automating your garden, building a weather station, or designing a robot, the journey starts with this humble blue board."
            }
        ]
    },
    "8085-microprocessor-complete-guide": {
        title: "Intel 8085 Microprocessor: The Foundation of Modern Computing",
        date: "January 26, 2026",
        category: "Microprocessors",
        readTime: "12 min read",
        author: {
            name: "Ramu Narlapati",
            avatar: "/images/author-ramu.png"
        },
        heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        content: [
            {
                type: "paragraph",
                text: "The Intel 8085 microprocessor holds a special place in computing history. Released in 1976 as a successor to the legendary 8080, the 8085 introduced several improvements while maintaining software compatibility. Even today, decades later, it remains a cornerstone of computer science education, teaching generations of engineers the fundamentals of microprocessor architecture and assembly language programming."
            },
            {
                type: "heading",
                text: "What is the 8085 Microprocessor?"
            },
            {
                type: "paragraph",
                text: "The 8085 is an 8-bit microprocessor, meaning it processes data in chunks of 8 bits (1 byte) at a time. The '85' in its name refers to the fact that it requires only a single +5V power supply, unlike its predecessor the 8080 which needed multiple voltages (+5V, -5V, and +12V). This simplified design made it more practical and cost-effective for embedded systems and educational purposes."
            },
            {
                type: "heading",
                text: "Key Technical Specifications"
            },
            {
                type: "list",
                items: [
                    "Data Bus Width: 8-bit (can process one byte at a time)",
                    "Address Bus Width: 16-bit (can address up to 64KB of memory: 2^16 = 65,536 locations)",
                    "Clock Speed: 3 MHz (with variants up to 6 MHz)",
                    "Instruction Set: 74 instructions including data transfer, arithmetic, logical, branch, and stack operations",
                    "Registers: 8-bit accumulator, six general-purpose registers (B, C, D, E, H, L), 16-bit stack pointer and program counter",
                    "Interrupts: 5 hardware interrupts (TRAP, RST 7.5, RST 6.5, RST 5.5, INTR) plus software interrupts",
                    "I/O Ports: 256 input ports and 256 output ports",
                    "Power Supply: Single +5V DC"
                ]
            },
            {
                type: "heading",
                text: "Architecture Deep Dive"
            },
            {
                type: "paragraph",
                text: "Understanding the internal architecture is crucial to mastering the 8085. The processor is divided into several functional blocks:"
            },
            {
                type: "paragraph",
                text: "1. Arithmetic Logic Unit (ALU): The brain of the processor, performing all arithmetic operations (addition, subtraction, increment, decrement) and logical operations (AND, OR, XOR, NOT, compare). It works with 8-bit data and includes the accumulator register."
            },
            {
                type: "paragraph",
                text: "2. Timing and Control Unit: Generates all timing and control signals required for internal operations and external interfacing. It decodes instructions and generates appropriate control signals for each machine cycle."
            },
            {
                type: "paragraph",
                text: "3. Register Array: Contains multiple 8-bit registers that can work individually or in pairs. The registers B, C, D, E, H, and L can be paired (BC, DE, HL) to form 16-bit registers for addressing operations."
            },
            {
                type: "paragraph",
                text: "4. Interrupt Control: Manages five hardware interrupts with different priorities. TRAP is the highest priority non-maskable interrupt, followed by RST 7.5, RST 6.5, RST 5.5, and INTR (maskable)."
            },
            {
                type: "heading",
                text: "Pin Configuration (40-Pin DIP)"
            },
            {
                type: "paragraph",
                text: "The 8085 comes in a 40-pin Dual In-line Package. Understanding the pins is essential for interfacing:"
            },
            {
                type: "list",
                items: [
                    "AD0-AD7 (Pins 12-19): Multiplexed Address/Data bus - These pins serve dual purposes: they carry the lower 8 bits of the address during the first clock cycle and data during subsequent cycles",
                    "A8-A15 (Pins 21-28): Upper 8 bits of the address bus, providing the remaining address lines",
                    "ALE (Pin 30): Address Latch Enable - Goes high when AD0-AD7 contains address, used to demultiplex the bus",
                    "IO/M̅ (Pin 34): Distinguishes between I/O operations (high) and memory operations (low)",
                    "RD̅ and WR̅ (Pins 32, 31): Read and Write control signals",
                    "S0, S1 (Pins 29, 33): Status signals indicating the current operation type",
                    "RESET IN (Pin 36): Active low reset input",
                    "CLK OUT (Pin 37): System clock output",
                    "INTR, INTA̅ (Pins 10, 11): Interrupt request and acknowledge signals"
                ]
            },
            {
                type: "heading",
                text: "Instruction Set Categories"
            },
            {
                type: "paragraph",
                text: "The 8085's 74 instructions are classified into five main categories:"
            },
            {
                type: "paragraph",
                text: "1. Data Transfer Instructions: Move data between registers, memory, and I/O ports. Examples include MOV (move data between registers), MVI (move immediate data), LDA (load accumulator direct), STA (store accumulator), LHLD (load HL pair), and SHLD (store HL pair)."
            },
            {
                type: "paragraph",
                text: "2. Arithmetic Instructions: Perform mathematical operations. ADD, ADI (add immediate), SUB, SUI (subtract immediate), INR (increment), DCR (decrement), INX/DCX (increment/decrement register pairs), DAA (decimal adjust accumulator)."
            },
            {
                type: "paragraph",
                text: "3. Logical Instructions: Execute logical operations. ANA (AND with accumulator), ANI (AND immediate), ORA (OR with accumulator), XRA (XOR), CMP (compare), CMA (complement accumulator), and rotate instructions (RLC, RRC, RAL, RAR)."
            },
            {
                type: "paragraph",
                text: "4. Branching Instructions: Control program flow. JMP (unconditional jump), conditional jumps (JZ, JNZ, JC, JNC, JP, JM, JPE, JPO), CALL and RET for subroutines, and RST for restart interrupts."
            },
            {
                type: "paragraph",
                text: "5. Stack and Machine Control: PUSH/POP for stack operations, HLT (halt), NOP (no operation), EI/DI (enable/disable interrupts), SIM/RIM (set/read interrupt mask)."
            },
            {
                type: "heading",
                text: "A Simple Programming Example"
            },
            {
                type: "paragraph",
                text: "Let's write a simple 8085 assembly program to add two 8-bit numbers stored in memory locations 2050H and 2051H, and store the result at 2052H:"
            },
            {
                type: "code",
                text: `; Program to add two 8-bit numbers
; Memory: 2050H = 25H, 2051H = 35H

START:  LDA 2050H    ; Load accumulator with contents of 2050H
        MOV B, A     ; Move accumulator content to register B
        LDA 2051H    ; Load accumulator with contents of 2051H
        ADD B        ; Add B to accumulator
        STA 2052H    ; Store result at 2052H
        HLT          ; Halt the program

; Result: 2052H will contain 5AH (25H + 35H = 5AH)`
            },
            {
                type: "paragraph",
                text: "This simple program demonstrates data movement, arithmetic operation, and program control—three fundamental concepts in microprocessor programming."
            },
            {
                type: "heading",
                text: "Real-World Applications"
            },
            {
                type: "paragraph",
                text: "While modern systems use far more advanced processors, the 8085 was instrumental in various applications:"
            },
            {
                type: "list",
                items: [
                    "Industrial Control Systems: Manufacturing equipment, process control, automation",
                    "Instrumentation: Digital multimeters, oscilloscopes, data acquisition systems",
                    "Communication Devices: Early modems, terminals, and data communication equipment",
                    "Home Appliances: Microwave ovens, washing machines with digital controls",
                    "Educational Kits: Microprocessor trainers and development boards for teaching purposes",
                    "Traffic Light Controllers: Managing intersection signals and timing",
                    "Medical Equipment: Early diagnostic devices and patient monitoring systems"
                ]
            },
            {
                type: "heading",
                text: "Why Study the 8085 Today?"
            },
            {
                type: "paragraph",
                text: "You might wonder why we still teach the 8085 when modern processors have billions of transistors. The answer lies in its pedagogical value:"
            },
            {
                type: "list",
                items: [
                    "Simplicity: With only 74 instructions and straightforward architecture, students can grasp fundamental concepts without overwhelming complexity",
                    "Foundational Knowledge: Principles learned here—registers, instruction cycles, memory addressing, interrupts—apply to all processors",
                    "Hardware Understanding: The 8085's simple pin configuration makes it ideal for learning hardware interfacing",
                    "Assembly Programming: Teaches low-level programming concepts before moving to higher-level languages",
                    "Timing Analysis: Clear timing diagrams help understand clock cycles, machine cycles, and instruction timing"
                ]
            },
            {
                type: "heading",
                text: "Addressing Modes Explained"
            },
            {
                type: "paragraph",
                text: "The 8085 supports several addressing modes that determine how operands are accessed:"
            },
            {
                type: "list",
                items: [
                    "Direct Addressing: The address of the operand is specified in the instruction (e.g., LDA 2050H)",
                    "Register Addressing: Operand is in a register (e.g., MOV A, B)",
                    "Register Indirect: Address is in a register pair (e.g., MOV A, M where M refers to memory location pointed by HL)",
                    "Immediate Addressing: Data is part of the instruction (e.g., MVI A, 32H)",
                    "Implicit Addressing: Operand is implied by the instruction (e.g., CMA operates on accumulator)"
                ]
            },
            {
                type: "heading",
                text: "The Evolution Path"
            },
            {
                type: "paragraph",
                text: "The 8085 was a stepping stone in Intel's microprocessor evolution. It led to the 8086/8088 (16-bit processors that powered the original IBM PC), then to the 80286, 80386, and eventually to the x86 architecture that dominates desktop computing today. Understanding the 8085 provides historical context for how we arrived at modern computing architecture."
            },
            {
                type: "heading",
                text: "Conclusion"
            },
            {
                type: "paragraph",
                text: "The Intel 8085 microprocessor may be a relic of the 1970s, but its impact on education and its role in the evolution of computing cannot be overstated. For anyone serious about understanding computer architecture, embedded systems, or low-level programming, the 8085 serves as the perfect starting point. Its elegant simplicity, combined with sufficient power to demonstrate core concepts, ensures it remains relevant in classrooms worldwide. Whether you're a student, hobbyist, or professional engineer, mastering the 8085 provides a solid foundation for understanding all processors that came after it."
            }
        ]
    }
};
