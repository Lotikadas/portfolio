// ============================================================
// PORTFOLIO CONTENT — Edit this file to update the website.
// No need to touch App.jsx. Just change values below and save.
// ============================================================

// --- Personal Info ---
export const profile = {
  name: 'Lotika Das',
  title: 'Senior Finance Analyst',
  bio: 'Empowering organizations with data-driven financial strategies, risk management, and leadership. 8+ years of experience in Fortune 500 companies.',
  photo: '/profile_image.jpeg',
  resumeFile: '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/lotika-das',
}

// --- Contact Details ---
export const contact = {
  email: 'lotikadas.official@gmail.com',
  phone: '+1 (415) 601-2347',
  formspreeId: 'xjykoook',
}

// --- About Section ---
export const about = {
  heading: 'About Me & Experience',
  description:
    'I am a results-driven finance professional passionate about transforming complex data into actionable business insights. I thrive in fast-paced environments and love mentoring the next generation of analysts.',
}

// --- Work Experience ---
export const experiences = [
  {
    year: 'Jun 2023 – Present',
    title: 'Senior Finance Analyst',
    company: 'Westinghouse Electric Company',
    bullets: [
      'Built a SQL to Excel pipeline to consolidate historical financials and SAP data, cutting processing time by 80% and accelerating forecasts and trend analysis.',
      'Created AR trend visuals with Think-cell connecting Excel and PowerPoint, cutting reporting time by 30% and improving leadership visibility into cash cycles.',
      'Reduced business planning and forecasting time by 50% for a key unit through development of a streamlined procedure, improving operational efficiency.',
      'Managed payroll and 500+ monthly invoices with 98% on-time accuracy; improved month-end close efficiency by 20% via SAP Ariba reconciliations.',
      'Designed a standardized checklist for planning and consolidation, cutting errors by 30% and enhancing reporting accuracy across cross-functional departments.',
      'Leveraged Workiva to produce compliant financial reports, cutting reporting time by 40% and supporting faster strategic decisions.',
    ],
  },
  {
    year: 'May 2022 – Aug 2022',
    title: 'Finance Control Intern',
    company: 'Westinghouse Electric Company',
    bullets: [
      'Analyzed financial data, monitored 50+ SOX controls, reporting violations and contributed to a 25% improvement in audit readiness and risk mitigation.',
      'Launched routine SOC 1 compliance assessments with cross-functional finance teams and periodic reviews with external auditors; this strengthened audit integrity and decreased reporting errors by 20% within three months.',
      'Monitored risk violations and deployed targeted corrective controls, optimizing resolution efficiency and achieving time savings of up to 8 hours per month.',
    ],
  },
  {
    year: 'Nov 2018 – May 2021',
    title: 'Finance Analyst',
    company: 'Northern Trust Corporation',
    bullets: [
      'Reconciled reports as a transfer agent for 10+ high-value clients, including Barclays and Blackrock, adhering to Financial Conduct Authority CASS7 regulations and minimizing regulatory breaches.',
      'Delivered tailored data solutions for audit teams, supporting 10+ audits/year and improving resolution time by 25%.',
      'Ensured 100% FCA-compliant CASS 6 reconciliations, supporting accurate cash flow forecasting and regulatory reporting.',
      'Cut data search time by 90% through implementation of an exception file, saving ~10 hours/month.',
      'Trained 5 team members on CASS6, CASS7, and FCA regulations, boosting compliance accuracy.',
    ],
  },
  {
    year: 'Jan 2018 – Jul 2018',
    title: 'Accountant and Senior Education Counsellor',
    company: 'Suvigyan Career Net Counselling Services Pvt. Ltd.',
    bullets: [
      'Supervised financial performance metrics and advised senior management on key strategic decisions, ensuring alignment with company objectives and contributing to a 15% increase in overall revenue growth within the fiscal year.',
    ],
  },
  {
    year: 'Mar 2016 – Jun 2017',
    title: 'Partner and Educator',
    company: 'Leading Edge Tutorial',
    bullets: [
      'Spearheaded personalized tutoring programs incorporating visualization techniques to simplify complex financial concepts, raising average scores by 15%.',
    ],
  },
]

// --- Education ---
export const education = [
  {
    school: 'Clark University',
    location: 'Worcester, MA',
    degree: 'Master of Science in Finance (MSF) in Quantitative Finance',
    year: 'Aug 2021 - May 2023',
  },
]

// --- Skills (grouped by category) ---
export const skills = [
  {
    category: 'Financial Analysis',
    items: [
      'Financial Planning and Analysis',
      'Corporate Accounting',
      'Accounts Payable',
      'Financial Controls and SOX controls',
      'Compliance',
      'Financial Reporting',
      'Reconciliation',
      'Internal Audit',
      'Business planning and consolidation',
      'Budgeting',
    ],
  },
  {
    category: 'Tools & Software',
    items: [
      'Microsoft Excel (Advanced)',
      'SAP',
      'Tableau',
      'Power BI',
      'SQL',
      'R',
      'Workiva',
      'Prime',
      'Ariba',
      'Concur',
      'Appzen',
      'Think-cell',
      'Teammate Audit Solutions',
    ],
  },
  {
    category: 'Regulatory Compliance',
    items: [
      'GAAP',
      'Sarbanes-Oxley Act (SOX)',
      'SEC Regulations',
      'IFRS',
      'Internal Auditing',
      'Risk Management',
    ],
  },
]

// --- Projects ---
export const projects = [
  {
    title: 'Exotic Options Analysis',
    description:
      'Conducted in-depth analysis of Exotic Options payouts using advanced pricing models, including Black-Scholes and Monte Carlo simulations, to assess risk and optimize investment strategies.',
    technologies: ['Black-Scholes', 'Monte Carlo', 'Excel', 'Python'],
    link: 'https://github.com/Lotikadas/portfolio/blob/main/reports/exotic_options.pdf',
  },
  {
    title: 'Harley-Davidson Financial Forecasting',
    description:
      'Developed comprehensive earnings and stock price forecasts for Harley-Davidson by performing detailed stock valuation and financial analysis, providing insights into future performance trends.',
    technologies: ['Stock Valuation', 'Financial Analysis', 'Excel'],
    link: 'https://github.com/Lotikadas/portfolio/blob/main/reports/Harley_Davidson_Inc_Stock_valuation.pdf',
  },
  {
    title: 'Morgan Stanley Research',
    description:
      "Evaluated Morgan Stanley's financial trajectory by evaluating prior 10K reports, assessing current market positioning, and determining future growth potential, culminating in an investment recommendation leveraging tools like Bloomberg terminal and pitchbook.",
    technologies: ['Bloomberg Terminal', 'Pitchbook', '10K Reports'],
    link: 'https://github.com/Lotikadas/portfolio/blob/main/reports/morgan-stanley-research.pdf',
  },
]

// --- Navigation (add/remove/reorder sections here) ---
export const navigation = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Education', href: 'education' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]
