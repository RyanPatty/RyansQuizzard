import type { FlashcardSet, QuizSet } from "@/types/data"

export function generateSampleData() {
  const now = new Date().toISOString()

  const sampleFlashcards: FlashcardSet[] = [
    {
      id: `flashcard-${Date.now()}-1`,
      title: "DevOps Fundamentals",
      description: "Essential DevOps concepts and practices for modern software development",
      cards: [
        {
          id: "devops-1",
          front: "What is CI/CD?",
          back: "Continuous Integration/Continuous Deployment - automated practices for integrating code changes and deploying applications",
        },
        {
          id: "devops-2",
          front: "What is Infrastructure as Code (IaC)?",
          back: "Managing and provisioning infrastructure through machine-readable definition files rather than manual processes",
        },
        {
          id: "devops-3",
          front: "What is Docker?",
          back: "A containerization platform that packages applications and dependencies into lightweight, portable containers",
        },
        {
          id: "devops-4",
          front: "What is Kubernetes?",
          back: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications",
        },
        {
          id: "devops-5",
          front: "What is Git?",
          back: "A distributed version control system for tracking changes in source code during software development",
        },
        {
          id: "devops-6",
          front: "What is monitoring in DevOps?",
          back: "Continuous observation of applications and infrastructure to detect issues, track performance, and ensure reliability",
        },
        {
          id: "devops-7",
          front: "What is a microservice?",
          back: "An architectural approach where applications are built as a collection of small, independent services",
        },
        {
          id: "devops-8",
          front: "What is Ansible?",
          back: "An open-source automation tool for configuration management, application deployment, and task automation",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `flashcard-${Date.now()}-2`,
      title: "CompTIA A+ Core Concepts",
      description: "Hardware, software, and troubleshooting fundamentals for IT professionals",
      cards: [
        {
          id: "aplus-1",
          front: "What is RAM?",
          back: "Random Access Memory - volatile memory that temporarily stores data and programs currently in use",
        },
        {
          id: "aplus-2",
          front: "What is the difference between HDD and SSD?",
          back: "HDD uses spinning disks (mechanical), SSD uses flash memory (no moving parts, faster, more reliable)",
        },
        {
          id: "aplus-3",
          front: "What is the POST process?",
          back: "Power-On Self-Test - initial diagnostic testing sequence run by computer's BIOS/UEFI when powered on",
        },
        {
          id: "aplus-4",
          front: "What is DHCP?",
          back: "Dynamic Host Configuration Protocol - automatically assigns IP addresses and network configuration to devices",
        },
        {
          id: "aplus-5",
          front: "What is the purpose of a heat sink?",
          back: "Dissipates heat from computer components (especially CPU) to prevent overheating and maintain performance",
        },
        {
          id: "aplus-6",
          front: "What is RAID?",
          back: "Redundant Array of Independent Disks - combines multiple drives for improved performance, redundancy, or both",
        },
        {
          id: "aplus-7",
          front: "What is the Windows Registry?",
          back: "Hierarchical database that stores configuration settings and options for the Windows operating system",
        },
        {
          id: "aplus-8",
          front: "What is a subnet mask?",
          back: "Defines which portion of an IP address represents the network and which represents the host",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `flashcard-${Date.now()}-3`,
      title: "CompTIA Security+ Essentials",
      description: "Cybersecurity principles and practices for information security professionals",
      cards: [
        {
          id: "secplus-1",
          front: "What is encryption?",
          back: "Process of converting plaintext into ciphertext using algorithms and keys to protect data confidentiality",
        },
        {
          id: "secplus-2",
          front: "What is the CIA Triad?",
          back: "Confidentiality, Integrity, and Availability - fundamental principles of information security",
        },
        {
          id: "secplus-3",
          front: "What is multi-factor authentication (MFA)?",
          back: "Security method requiring two or more verification factors: something you know, have, or are",
        },
        {
          id: "secplus-4",
          front: "What is a firewall?",
          back: "Network security device that monitors and controls incoming and outgoing traffic based on security rules",
        },
        {
          id: "secplus-5",
          front: "What is social engineering?",
          back: "Manipulation techniques used to trick people into divulging confidential information or performing actions",
        },
        {
          id: "secplus-6",
          front: "What is a VPN?",
          back: "Virtual Private Network - creates secure, encrypted connection over public networks",
        },
        {
          id: "secplus-7",
          front: "What is malware?",
          back: "Malicious software designed to damage, disrupt, or gain unauthorized access to computer systems",
        },
        {
          id: "secplus-8",
          front: "What is PKI?",
          back: "Public Key Infrastructure - framework for managing digital certificates and public-key encryption",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `flashcard-${Date.now()}-4`,
      title: "JavaScript Fundamentals",
      description: "Core JavaScript concepts for web development",
      cards: [
        {
          id: "js-1",
          front: "What is a closure in JavaScript?",
          back: "A function that has access to variables in its outer scope even after the outer function has returned",
        },
        {
          id: "js-2",
          front: "What is the difference between let, const, and var?",
          back: "let: block-scoped, reassignable; const: block-scoped, immutable; var: function-scoped, hoisted",
        },
        {
          id: "js-3",
          front: "What is event bubbling?",
          back: "When an event triggers on a child element and propagates up through parent elements in the DOM tree",
        },
        {
          id: "js-4",
          front: "What is a promise in JavaScript?",
          back: "An object representing the eventual completion or failure of an asynchronous operation",
        },
        {
          id: "js-5",
          front: "What is the difference between == and ===?",
          back: "== performs type coercion, === checks both value and type without coercion",
        },
        {
          id: "js-6",
          front: "What is hoisting in JavaScript?",
          back: "The process where variable and function declarations are moved to the top of their scope during compilation",
        },
        {
          id: "js-7",
          front: "What is the 'this' keyword?",
          back: "A reference to the object that is currently executing the code, context-dependent",
        },
        {
          id: "js-8",
          front: "What is an arrow function?",
          back: "A concise way to write function expressions with implicit return and lexical 'this' binding",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `flashcard-${Date.now()}-5`,
      title: "React Development",
      description: "Essential React concepts and best practices",
      cards: [
        {
          id: "react-1",
          front: "What is JSX?",
          back: "JavaScript XML - a syntax extension that allows you to write HTML-like code in JavaScript",
        },
        {
          id: "react-2",
          front: "What is a React component?",
          back: "A reusable piece of UI that can accept props and return JSX to render",
        },
        {
          id: "react-3",
          front: "What is the difference between props and state?",
          back: "Props are read-only data passed from parent, state is internal data that can change",
        },
        {
          id: "react-4",
          front: "What is useEffect?",
          back: "A React Hook that lets you perform side effects in function components",
        },
        {
          id: "react-5",
          front: "What is the Virtual DOM?",
          back: "A lightweight copy of the actual DOM that React uses for efficient updates",
        },
        {
          id: "react-6",
          front: "What is a controlled component?",
          back: "A component whose value is controlled by React state rather than the DOM",
        },
        {
          id: "react-7",
          front: "What is React Context?",
          back: "A way to share data between components without prop drilling",
        },
        {
          id: "react-8",
          front: "What is the key prop used for?",
          back: "Helps React identify which items have changed, been added, or been removed in lists",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ]

  const sampleQuizzes: QuizSet[] = [
    {
      id: `quiz-${Date.now()}-1`,
      title: "DevOps Practices Quiz",
      description: "Test your knowledge of DevOps methodologies and tools",
      questions: [
        {
          id: "devops-q1",
          type: "multiple-choice",
          question: "Which of the following best describes the main goal of DevOps?",
          options: [
            "Faster software development only",
            "Better collaboration between development and operations teams",
            "Reducing infrastructure costs",
            "Eliminating the need for testing",
          ],
          correctAnswer: "Better collaboration between development and operations teams",
          explanation:
            "DevOps aims to break down silos between development and operations teams to improve collaboration, speed, and reliability",
        },
        {
          id: "devops-q2",
          type: "multiple-choice",
          question: "What is the primary benefit of containerization?",
          options: [
            "Increased hardware performance",
            "Application portability and consistency",
            "Reduced network latency",
            "Automatic code generation",
          ],
          correctAnswer: "Application portability and consistency",
          explanation:
            "Containers package applications with their dependencies, ensuring consistent behavior across different environments",
        },
        {
          id: "devops-q3",
          type: "true-false",
          question: "Infrastructure as Code (IaC) allows you to manage infrastructure using version control",
          correctAnswer: "True",
          explanation:
            "IaC treats infrastructure configuration as code, enabling version control, collaboration, and reproducible deployments",
        },
        {
          id: "devops-q4",
          type: "short-text",
          question: "What does CI stand for in DevOps?",
          correctAnswer: "Continuous Integration",
          explanation:
            "CI is the practice of frequently integrating code changes into a shared repository with automated testing",
        },
        {
          id: "devops-q5",
          type: "multiple-choice",
          question: "Which tool is commonly used for container orchestration?",
          options: ["Docker", "Kubernetes", "Jenkins", "Ansible"],
          correctAnswer: "Kubernetes",
          explanation:
            "Kubernetes is the leading container orchestration platform for managing containerized applications at scale",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `quiz-${Date.now()}-2`,
      title: "CompTIA A+ Hardware Quiz",
      description: "Test your knowledge of computer hardware components",
      questions: [
        {
          id: "aplus-q1",
          type: "multiple-choice",
          question: "Which component is considered the 'brain' of the computer?",
          options: ["RAM", "Hard Drive", "CPU", "Motherboard"],
          correctAnswer: "CPU",
          explanation:
            "The CPU (Central Processing Unit) executes instructions and performs calculations, making it the 'brain' of the computer",
        },
        {
          id: "aplus-q2",
          type: "multiple-choice",
          question: "What is the standard voltage for DDR4 RAM?",
          options: ["1.2V", "1.35V", "1.5V", "3.3V"],
          correctAnswer: "1.2V",
          explanation:
            "DDR4 RAM operates at 1.2V, which is lower than previous generations, improving energy efficiency",
        },
        {
          id: "aplus-q3",
          type: "true-false",
          question: "SATA III has a maximum transfer rate of 6 Gbps",
          correctAnswer: "True",
          explanation: "SATA III (SATA 3.0) supports transfer rates up to 6 Gbps, double that of SATA II",
        },
        {
          id: "aplus-q4",
          type: "short-text",
          question: "What does GPU stand for?",
          correctAnswer: "Graphics Processing Unit",
          explanation: "GPU handles graphics rendering and parallel processing tasks",
        },
        {
          id: "aplus-q5",
          type: "multiple-choice",
          question: "Which port type is commonly used for modern external storage devices?",
          options: ["PS/2", "Serial", "USB", "Parallel"],
          correctAnswer: "USB",
          explanation:
            "USB (Universal Serial Bus) is the standard for connecting external storage and peripheral devices",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `quiz-${Date.now()}-3`,
      title: "CompTIA Security+ Fundamentals",
      description: "Test your cybersecurity knowledge and best practices",
      questions: [
        {
          id: "secplus-q1",
          type: "multiple-choice",
          question: "Which of the following is NOT part of the CIA Triad?",
          options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
          correctAnswer: "Authentication",
          explanation:
            "The CIA Triad consists of Confidentiality, Integrity, and Availability. Authentication is a separate security principle",
        },
        {
          id: "secplus-q2",
          type: "multiple-choice",
          question: "What type of attack involves overwhelming a system with traffic?",
          options: ["Phishing", "DDoS", "SQL Injection", "Man-in-the-middle"],
          correctAnswer: "DDoS",
          explanation:
            "DDoS (Distributed Denial of Service) attacks flood systems with traffic to make them unavailable",
        },
        {
          id: "secplus-q3",
          type: "true-false",
          question: "AES is a symmetric encryption algorithm",
          correctAnswer: "True",
          explanation:
            "AES (Advanced Encryption Standard) uses the same key for both encryption and decryption, making it symmetric",
        },
        {
          id: "secplus-q4",
          type: "short-text",
          question: "What does PKI stand for?",
          correctAnswer: "Public Key Infrastructure",
          explanation: "PKI manages digital certificates and public-key encryption for secure communications",
        },
        {
          id: "secplus-q5",
          type: "multiple-choice",
          question: "Which authentication factor is 'something you are'?",
          options: ["Password", "Smart card", "Biometric", "PIN"],
          correctAnswer: "Biometric",
          explanation:
            "Biometric authentication (fingerprint, retina, etc.) is based on physical characteristics - 'something you are'",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: `quiz-${Date.now()}-4`,
      title: "JavaScript Fundamentals Quiz",
      description: "Test your knowledge of core JavaScript concepts",
      questions: [
        {
          id: "js-q1",
          type: "multiple-choice",
          question: "What is the output of typeof null?",
          options: ["null", "undefined", "object", "number"],
          correctAnswer: "object",
          explanation: "This is a known JavaScript quirk - typeof null returns 'object'",
        },
        {
          id: "js-q2",
          type: "true-false",
          question: "JavaScript is a single-threaded language",
          correctAnswer: "True",
          explanation: "JavaScript uses a single-threaded event loop model for execution",
        },
        {
          id: "js-q3",
          type: "multiple-choice",
          question: "What is the purpose of the 'use strict' directive?",
          options: [
            "Enable strict mode for better error checking",
            "Force synchronous execution",
            "Enable TypeScript features",
            "Optimize performance",
          ],
          correctAnswer: "Enable strict mode for better error checking",
          explanation: "Strict mode catches common coding mistakes and prevents certain actions",
        },
        {
          id: "js-q4",
          type: "short-text",
          question: "What does JSON stand for?",
          correctAnswer: "JavaScript Object Notation",
          explanation: "JSON is a lightweight data interchange format based on JavaScript object syntax",
        },
        {
          id: "js-q5",
          type: "multiple-choice",
          question: "Which method removes the last element from an array?",
          options: ["shift()", "unshift()", "pop()", "push()"],
          correctAnswer: "pop()",
          explanation: "pop() removes and returns the last element of an array",
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ]

  return { sampleFlashcards, sampleQuizzes }
}
