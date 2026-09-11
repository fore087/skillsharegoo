import { SubjectAssessment, LearningResource, FeedbackSubmission, AssessmentResultData } from '../types';

export const SUBJECT_ASSESSMENTS: SubjectAssessment[] = [
  {
    id: 'asm-dpi',
    courseId: 'crs-101',
    subject: 'Digital Public Infrastructure',
    title: 'Digital Public Infrastructure & Interoperability Assessment',
    description: 'Evaluate your understanding of modular digital public goods, unified API gateways, minimal disclosure citizen identity, and asynchronous event-driven government architectures.',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    passingScorePercent: 70,
    totalQuestions: 5,
    questions: [
      {
        id: 'dpi-q1',
        question: 'Which of the following represents the primary core characteristic of modular Digital Public Goods (DPGs)?',
        options: [
          'Proprietary closed-source code restricted to a single cloud vendor ecosystem',
          'Open-source, adhering to open standards, interoperable, and privacy-respecting',
          'Direct manual paper-filing replication without database schema changes',
          'Monolithic single-tenant software that cannot be self-hosted on sovereign infrastructure'
        ],
        correctIndex: 1,
        explanation: 'DPGs must be open source, standards-based, and modular to empower public institutions to deploy without vendor lock-in and respect citizen rights.'
      },
      {
        id: 'dpi-q2',
        question: 'In modern citizen identity management, what does the architectural principle of "Minimal Disclosure" mandate?',
        options: [
          'Agencies must conceal data security incidents from the public and press',
          'Verifiers only receive binary proof (e.g. over 18: YES) without exposing unnecessary attributes like birth date or address',
          'Citizens are legally prohibited from inspecting their personal public dossiers',
          'All regional government entities must maintain separate duplicated biometric databases'
        ],
        correctIndex: 1,
        explanation: 'Minimal disclosure (typically implemented through zero-knowledge proofs or verifiable credentials) ensures verification without exposing sensitive personal identifiable information.'
      },
      {
        id: 'dpi-q3',
        question: 'Why is an asynchronous, decoupled event-driven architecture preferred for inter-ministerial data exchange?',
        options: [
          'It eliminates the need for cybersecurity encryption across public channels',
          'It prevents cascading timeouts across agencies when one ministry backend experiences latency or temporary downtime',
          'It completely removes the requirement for internet or network connectivity between departments',
          'It forces every public department to run the exact same database vendor engine'
        ],
        correctIndex: 1,
        explanation: 'Event-driven architectures decouple sender and receiver, ensuring resilience so slow or offline agency backends do not block civil transactions.'
      },
      {
        id: 'dpi-q4',
        question: 'What is the role of an API Gateway in a unified e-governance service delivery platform?',
        options: [
          'It replaces the need for database backups across departments',
          'It provides unified routing, rate limiting, authentication, telemetry, and security policy enforcement for microservices',
          'It serves as the physical hardware server rack in municipal data centers',
          'It converts all public data into non-searchable static image files'
        ],
        correctIndex: 1,
        explanation: 'An API Gateway acts as a central reverse proxy that manages authentication, SSL termination, rate-limiting, and routing across heterogeneous public services.'
      },
      {
        id: 'dpi-q5',
        question: 'Which international standard is commonly used for secure, verifiable digital credentials and citizen wallets?',
        options: [
          'W3C Verifiable Credentials (VC) and Decentralized Identifiers (DIDs)',
          'Standard CSV spreadsheets shared over unencrypted email',
          'Legacy proprietary Active Directory schemas with shared passwords',
          'Static unwatermarked PDF files stored on public cloud buckets'
        ],
        correctIndex: 0,
        explanation: 'W3C Verifiable Credentials define a cryptographically verifiable standard for digital certificates, credentials, and citizen identity attributes.'
      }
    ]
  },
  {
    id: 'asm-data',
    courseId: 'crs-102',
    subject: 'Data Analytics',
    title: 'Data Analytics & Evidence-Based Policymaking Exam',
    description: 'Assess competencies in statistical significance testing, SQL aggregation, causal inference, and building transparent public sector metric dashboards.',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    passingScorePercent: 70,
    totalQuestions: 5,
    questions: [
      {
        id: 'data-q1',
        question: 'In empirical policy evaluation, what is the primary risk of conflating correlation with causation?',
        options: [
          'It decreases server database query execution speeds',
          'It leads policymakers to fund interventions that may have zero true causal impact on target citizen outcomes',
          'It causes spreadsheet files to exceed cell capacity limits',
          'It prevents visual charts from rendering in color'
        ],
        correctIndex: 1,
        explanation: 'Correlation does not imply causation; confounding variables may explain simultaneous trends, leading to ineffective or wasteful policy allocations.'
      },
      {
        id: 'data-q2',
        question: 'Which SQL clause is used to filter aggregated metrics produced by a GROUP BY operation?',
        options: [
          'WHERE',
          'HAVING',
          'ORDER BY',
          'LIMIT'
        ],
        correctIndex: 1,
        explanation: 'The HAVING clause filters grouped summary records after aggregation, whereas WHERE filters individual rows prior to grouping.'
      },
      {
        id: 'data-q3',
        question: 'When analyzing skewed income or response-time datasets, which measure of central tendency is least distorted by extreme outliers?',
        options: [
          'Arithmetic Mean',
          'Median',
          'Standard Deviation',
          'Maximum Range'
        ],
        correctIndex: 1,
        explanation: 'The median represents the 50th percentile and is robust against extreme outliers that heavily skew the arithmetic mean.'
      },
      {
        id: 'data-q4',
        question: 'What is the primary purpose of a "Difference-in-Differences" (DiD) quasi-experimental research design?',
        options: [
          'To calculate standard tax deductions for municipal employees',
          'To isolate causal policy treatment effects by comparing changes over time between treatment and control groups',
          'To compress massive JSON datasets into zip archives',
          'To speed up CPU processing on graphics cards'
        ],
        correctIndex: 1,
        explanation: 'Difference-in-Differences controls for underlying time trends by contrasting the before-and-after change of an intervention group against an untreated counterfactual control.'
      },
      {
        id: 'data-q5',
        question: 'Which visualization best represents the distribution and dispersion of continuous administrative performance metrics across departments?',
        options: [
          '3D Pie Chart',
          'Box-and-Whisker Plot (Boxplot)',
          'Concentric Donut Chart',
          'Unordered Word Cloud'
        ],
        correctIndex: 1,
        explanation: 'Box-and-whisker plots clearly depict medians, interquartile ranges (IQR), quartiles, and statistical outliers across multiple cohorts.'
      }
    ]
  },
  {
    id: 'asm-cyber',
    courseId: 'crs-103',
    subject: 'Cybersecurity',
    title: 'Zero-Trust Architecture & Threat Mitigation Check',
    description: 'Demonstrate mastery of zero-trust perimeter defense, multi-factor authentication, principle of least privilege, and critical incident response protocols.',
    difficulty: 'Advanced',
    durationMinutes: 20,
    passingScorePercent: 75,
    totalQuestions: 5,
    questions: [
      {
        id: 'cyber-q1',
        question: 'What is the core philosophical axiom underpinning the Zero-Trust Architecture (ZTA) framework (NIST SP 800-207)?',
        options: [
          'Trust all network traffic originating inside the local office LAN network',
          'Never trust, always verify every access request regardless of origin or perimeter location',
          'Rely exclusively on perimeter firewalls while disabling internal endpoint logging',
          'Allow administrators unrestricted root access without multi-factor verification'
        ],
        correctIndex: 1,
        explanation: 'Zero Trust assumes network perimeters are breached and mandates continuous verification of identity, device health, and context for every request.'
      },
      {
        id: 'cyber-q2',
        question: 'How does the "Principle of Least Privilege" (PoLP) protect sensitive citizen records?',
        options: [
          'It grants all public employees access to all national records to maximize speed',
          'Users and services are granted only the minimum permissions necessary to perform their legitimate job functions',
          'It hides government databases by disabling SSL certificates',
          'It mandates weekly password changes using easily guessable dictionary words'
        ],
        correctIndex: 1,
        explanation: 'Least privilege minimizes lateral blast radiuses during account compromises by restricting access to only strictly necessary assets.'
      },
      {
        id: 'cyber-q3',
        question: 'Which multi-factor authentication (MFA) mechanism is most resilient against real-time phishing and adversary-in-the-middle (AiTM) proxy attacks?',
        options: [
          'SMS-based one-time text passcodes',
          'FIDO2 / WebAuthn hardware security keys with cryptographic origin binding',
          'Security challenge questions like mother maiden name',
          'Static 4-digit numeric PINs transmitted via email'
        ],
        correctIndex: 1,
        explanation: 'FIDO2 / WebAuthn binds cryptographic public-key credentials directly to the browser origin URL, rendering credential harvesting proxies impotent.'
      },
      {
        id: 'cyber-q4',
        question: 'In public sector disaster recovery, what is the critical difference between RTO and RPO?',
        options: [
          'RTO governs financial budget, while RPO governs developer headcount',
          'RTO (Recovery Time Objective) defines maximum acceptable downtime; RPO (Recovery Point Objective) defines maximum acceptable data loss age',
          'RTO is for hardware only, while RPO is for office buildings',
          'There is no technical difference between the two terms'
        ],
        correctIndex: 1,
        explanation: 'RTO measures how quickly systems must be restored, while RPO measures the tolerance threshold for lost transactional data measured in elapsed time.'
      },
      {
        id: 'cyber-q5',
        question: 'What is the first operational priority during the "Containment" phase of a detected ransomware incident?',
        options: [
          'Format all servers immediately without preserving forensic memory dumps',
          'Isolate affected endpoints from the network to stop lateral propagation while capturing ephemeral forensic artifacts',
          'Pay ransom demands via untraceable vouchers immediately',
          'Delete intrusion detection logs to prevent panic'
        ],
        correctIndex: 1,
        explanation: 'Isolation prevents lateral worming across sovereign networks while forensic volatility memory preserves attacker footholds for attribution.'
      }
    ]
  },
  {
    id: 'asm-ai',
    courseId: 'crs-104',
    subject: 'Artificial Intelligence',
    title: 'AI Foundations & Algorithmic Ethics in Governance',
    description: 'Examine responsible AI deployment, bias mitigation, explainability (XAI), automated decision auditing, and human-in-the-loop safeguards.',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    passingScorePercent: 70,
    totalQuestions: 5,
    questions: [
      {
        id: 'ai-q1',
        question: 'When an automated machine learning model is used for citizen benefit eligibility, why is "Explainability" (XAI) legally and ethically paramount?',
        options: [
          'It reduces the amount of electricity consumed by neural networks',
          'Citizens have a right to understand the specific factors and rationales determining life-altering administrative determinations',
          'It converts neural networks into unreadable binary files',
          'It allows government agencies to bypass constitutional due process'
        ],
        correctIndex: 1,
        explanation: 'Explainability ensures transparency, enables administrative appeals, satisfies due process rights, and uncovers unlawful discriminatory heuristics.'
      },
      {
        id: 'ai-q2',
        question: 'How can historical training data induce algorithmic bias in predictive criminal justice or credit models?',
        options: [
          'Training data only reflects futuristic simulated scenarios',
          'The model codifies and amplifies pre-existing systemic disparities and historical over-policing present in historical records',
          'Computers inherently dislike certain demographic groups',
          'Hardware storage chips alter math equations at random'
        ],
        correctIndex: 1,
        explanation: 'Machine learning algorithms learn patterns directly from historical records; if past arrests or loan approvals contained systemic bias, the model reproduces that bias.'
      },
      {
        id: 'ai-q3',
        question: 'What does a "Human-in-the-Loop" (HITL) architectural design guarantee in high-stakes public decisions?',
        options: [
          'Human operators manually type every single line of Python code at runtime',
          'A qualified human official retains review, discretion, and final sign-off authority before critical determinations take effect',
          'The machine model runs without any software oversight',
          'All decisions are delayed by at least twelve months'
        ],
        correctIndex: 1,
        explanation: 'HITL ensures automated outputs serve as decision-support recommendations, keeping accountability and discretion firmly with human civil servants.'
      },
      {
        id: 'ai-q4',
        question: 'What is "Data Drift" in production machine learning monitoring?',
        options: [
          'Cables physically detaching from server racks over time',
          'Statistically significant shifts in input feature distributions over time compared to the training baseline, causing model performance decay',
          'Deleting old database tables every month',
          'Compressing image files into JPEG format'
        ],
        correctIndex: 1,
        explanation: 'Data drift occurs when real-world distributions evolve (e.g. inflation, policy changes), causing static models trained on past data to become inaccurate.'
      },
      {
        id: 'ai-q5',
        question: 'Under international AI governance frameworks, which categorization best describes automated biometric surveillance in public spaces?',
        options: [
          'Minimal Risk / Unregulated Utility',
          'High Risk or Unacceptable Risk requiring stringent compliance, conformity assessments, and logging',
          'Standard Open-Source Educational Toy',
          'Zero-Audit Permissible Service'
        ],
        correctIndex: 1,
        explanation: 'Frameworks like the EU AI Act classify remote biometric identification in public spaces as High or Unacceptable Risk due to fundamental rights implications.'
      }
    ]
  }
];

export const LEARNING_RESOURCES: LearningResource[] = [
  // Recorded Lectures
  {
    id: 'res-lec-01',
    courseId: 'crs-101',
    courseTitle: 'Public Sector Digital Transformation',
    title: 'Executive Masterclass: Architecting Sovereign Digital Public Goods',
    type: 'lecture',
    description: 'Comprehensive 45-minute recorded lecture by Dr. Marcus Vance detailing open-source government architectures, identity registries, and interoperability protocols.',
    durationOrPages: '46 mins',
    author: 'Dr. Marcus Vance, Faculty Lead',
    dateAdded: 'Feb 18, 2026',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Standard embed format simulation
    contentSnippet: 'In this session, we dissect the three architectural layers of digital public infrastructure: identity rails, payment switchboards, and consent-driven data exchange frameworks.',
    tags: ['DPI', 'Architecture', 'Video Masterclass', 'GovTech']
  },
  {
    id: 'res-lec-02',
    courseId: 'crs-102',
    courseTitle: 'Data Analytics',
    title: 'Hands-on Lab: Advanced SQL Aggregations & Cohort Retention Analytics',
    type: 'lecture',
    description: 'Practical step-by-step walkthrough covering window functions, CTEs, and cohort analysis for public program performance monitoring.',
    durationOrPages: '38 mins',
    author: 'Sarah Lin, M.Sc., Lead Analyst',
    dateAdded: 'Feb 10, 2026',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    contentSnippet: 'Learn how to construct resilient queries that calculate rolling averages, year-over-year variances, and percentiles across multimillion-row citizen registries.',
    tags: ['SQL', 'Data Analytics', 'Walkthrough', 'Query Optimization']
  },
  {
    id: 'res-lec-03',
    courseId: 'crs-103',
    courseTitle: 'Enterprise Cybersecurity & Data Protection',
    title: 'Live Briefing: Ransomware Defense & Rapid Containment Protocols',
    type: 'lecture',
    description: 'Emergency response tactical session detailing network isolation, memory dumps, and safe restoration from immutable air-gapped backups.',
    durationOrPages: '52 mins',
    author: 'Lt. Cmdr. Julian Reyes, Cybersecurity Advisor',
    dateAdded: 'Jan 28, 2026',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    contentSnippet: 'Dissecting a live ransomware tabletop exercise: from initial lateral reconnaissance detection to perimeter containment and post-incident remediation.',
    tags: ['Cybersecurity', 'Zero Trust', 'Incident Response']
  },

  // PDFs
  {
    id: 'res-pdf-01',
    courseId: 'crs-101',
    courseTitle: 'Public Sector Digital Transformation',
    title: 'National Digital Public Infrastructure Implementation Blueprint (V3.2)',
    type: 'pdf',
    description: 'Official 64-page architectural standard and reference implementation manual for national and provincial civil service digitizations.',
    fileSize: '4.8 MB',
    durationOrPages: '64 Pages',
    author: 'Central Digital Directorate & NBDCA',
    dateAdded: 'Feb 05, 2026',
    downloadUrl: '#download-blueprint-pdf',
    contentSnippet: 'SECTION 4.2: Interoperability Specifications for Restful API Contracts. All inter-agency payloads must conform to OpenAPI 3.1 specifications with mutual TLS (mTLS) authentication...',
    tags: ['Policy Standard', 'Architecture Manual', 'Official PDF']
  },
  {
    id: 'res-pdf-02',
    courseId: 'crs-104',
    courseTitle: 'AI Foundations & Ethical Governance',
    title: 'Algorithmic Impact Assessment (AIA) Official Audit Template & Scoring Rubric',
    type: 'pdf',
    description: 'Mandatory statutory risk matrix for evaluating disparate impact, automated decision transparency, and training data provenance.',
    fileSize: '2.1 MB',
    durationOrPages: '32 Pages',
    author: 'Committee on Public AI Ethics',
    dateAdded: 'Jan 22, 2026',
    downloadUrl: '#download-aia-pdf',
    contentSnippet: 'CHECKLIST 2.1: Disparate Impact Ratio Analysis. Does the automated screening model demonstrate an approval rate for protected groups lower than 80% of the baseline cohort?...',
    tags: ['AI Ethics', 'Audit Rubric', 'Compliance PDF']
  },
  {
    id: 'res-pdf-03',
    courseId: 'crs-103',
    courseTitle: 'Enterprise Cybersecurity & Data Protection',
    title: 'Zero-Trust Architecture Migration Roadmap for Public Agencies',
    type: 'pdf',
    description: 'Step-by-step phased transition plan following NIST SP 800-207 guidelines, from legacy perimeter networks to micro-segmented zero trust environments.',
    fileSize: '3.6 MB',
    durationOrPages: '48 Pages',
    author: 'National Cybersecurity Center',
    dateAdded: 'Feb 12, 2026',
    downloadUrl: '#download-zta-pdf',
    contentSnippet: 'PHASE 1: Asset Inventory and Identity Federation. Prior to firewall decommission, all administrative users must be migrated to hardware-backed MFA tokens...',
    tags: ['Cybersecurity', 'Zero Trust', 'NIST Standards']
  },

  // Presentations
  {
    id: 'res-ppt-01',
    courseId: 'crs-101',
    courseTitle: 'Public Sector Digital Transformation',
    title: 'Slide Deck: Citizen-Centric Service Design & Journey Mapping Workshop',
    type: 'presentation',
    description: 'High-impact 28-slide deck illustrating life-event based service delivery, reduction of civil administrative burdens, and omnichannel accessibility.',
    fileSize: '8.4 MB',
    durationOrPages: '28 Slides',
    author: 'Dr. Marcus Vance',
    dateAdded: 'Feb 15, 2026',
    downloadUrl: '#download-ppt-01',
    contentSnippet: 'SLIDE 7: The "Tell Us Once" Principle. Why citizens should never have to submit the same government-issued birth certificate to three separate municipal agencies.',
    tags: ['Service Design', 'Slide Deck', 'Executive Presentation']
  },
  {
    id: 'res-ppt-02',
    courseId: 'crs-102',
    courseTitle: 'Data Analytics',
    title: 'Executive Briefing: Turning Raw Telemetry into Actionable Policy Dashboards',
    type: 'presentation',
    description: 'Visual slide presentation breaking down the data maturity curve: from descriptive reporting to diagnostic, predictive, and prescriptive governance.',
    fileSize: '6.2 MB',
    durationOrPages: '22 Slides',
    author: 'Sarah Lin, M.Sc.',
    dateAdded: 'Jan 30, 2026',
    downloadUrl: '#download-ppt-02',
    contentSnippet: 'SLIDE 12: Cognitive Load in Data Visualization. Minimizing non-data ink, establishing color hierarchies, and avoiding chart-junk in ministerial briefings.',
    tags: ['Data Visualization', 'Executive Briefing', 'Slide Deck']
  },

  // Study Materials
  {
    id: 'res-mat-01',
    courseId: 'crs-102',
    courseTitle: 'Data Analytics',
    title: 'Essential SQL & Statistical Functions Quick Reference Cheat Sheet',
    type: 'study_material',
    description: 'Laminated 4-page reference card with syntax examples for window functions, aggregations, regular expressions, and hypothesis testing benchmarks.',
    fileSize: '1.2 MB',
    durationOrPages: '4 Pages',
    author: 'Statistical Faculty Team',
    dateAdded: 'Feb 02, 2026',
    downloadUrl: '#download-cheat-sheet',
    contentSnippet: 'QUICK LOOKUP: ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY budget DESC) AS dept_rank. Calculates localized ordinal rankings without self-joins.',
    tags: ['Cheat Sheet', 'Quick Reference', 'SQL Cheat Sheet']
  },
  {
    id: 'res-mat-02',
    courseId: 'crs-103',
    courseTitle: 'Enterprise Cybersecurity & Data Protection',
    title: 'Incident First Responder Playbook & Triage Flowchart',
    type: 'study_material',
    description: 'Emergency flowchart guiding IT officers through breach discovery, containment, evidence preservation, regulatory notification, and public disclosure.',
    fileSize: '1.8 MB',
    durationOrPages: '6 Pages',
    author: 'Incident Response Coordination Unit',
    dateAdded: 'Feb 14, 2026',
    downloadUrl: '#download-playbook',
    contentSnippet: 'DECISION NODE: Is active exfiltration observed? IF YES: Immediately severed WAN link on affected virtual subnet; do NOT power off bare-metal hypervisor to preserve RAM state.',
    tags: ['Playbook', 'Flowchart', 'Emergency Response']
  },
  {
    id: 'res-mat-03',
    courseId: 'crs-104',
    courseTitle: 'AI Foundations & Ethical Governance',
    title: 'Public AI Ethics Checklist & Model Card Documentation Standard',
    type: 'study_material',
    description: 'Standardized model card template to record model purpose, training corpus demographic breakdown, limitations, and benchmark accuracies.',
    fileSize: '950 KB',
    durationOrPages: '5 Pages',
    author: 'Responsible AI Taskforce',
    dateAdded: 'Jan 18, 2026',
    downloadUrl: '#download-model-card',
    contentSnippet: 'SECTION 3: Out-of-Scope Use Cases. Explicitly list operational contexts where this model MUST NOT be deployed without independent human verification.',
    tags: ['Model Cards', 'Checklist', 'Governance Guide']
  }
];

export const INITIAL_FEEDBACK: FeedbackSubmission[] = [
  {
    id: 'fb-101',
    traineeId: 'usr-trainee-01',
    traineeName: 'Priya Sharma',
    traineeDepartment: 'Digital Governance & Policy Division',
    courseId: 'crs-101',
    courseTitle: 'Public Sector Digital Transformation & Citizen Services',
    overallRating: 5,
    criteriaRatings: {
      contentQuality: 5,
      instructorClarity: 5,
      practicalValue: 5,
      platformEase: 4
    },
    comment: 'The focus on modular digital public goods and real-world API interoperability gave me concrete frameworks that we are already testing in our departmental sprint.',
    recommend: true,
    createdAt: 'March 01, 2026'
  },
  {
    id: 'fb-102',
    traineeId: 'usr-trainee-02',
    traineeName: 'Jonathan Becker',
    traineeDepartment: 'Revenue & Customs Administration',
    courseId: 'crs-103',
    courseTitle: 'Enterprise Cybersecurity & Data Protection',
    overallRating: 5,
    criteriaRatings: {
      contentQuality: 5,
      instructorClarity: 4,
      practicalValue: 5,
      platformEase: 5
    },
    comment: 'The Zero-Trust architecture module and incident response tabletop exercises were exceptionally realistic and relevant to modern public sector threats.',
    recommend: true,
    createdAt: 'February 24, 2026'
  }
];
