import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, BriefcaseIcon, AcademicCapIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import './App.css'

const navigation = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Education', href: 'education' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]

const experiences = [
  {
    year: 'Jun 2023 – Present',
    title: 'Senior Finance Analyst',
    company: 'Westinghouse Electric Company',
    description: [
      'Built a SQL to Excel pipeline to consolidate historical financials and SAP data, cutting processing time by 80% and accelerating forecasts and trend analysis.',
      'Created AR trend visuals with Think-cell connecting Excel and PowerPoint, cutting reporting time by 30% and improving leadership visibility into cash cycles.',
      'Reduced business planning and forecasting time by 50% for a key unit through development of a streamlined procedure, improving operational efficiency.',
      'Managed payroll and 500+ monthly invoices with 98% on-time accuracy; improved month-end close efficiency by 20% via SAP Ariba reconciliations.',
      'Designed a standardized checklist for planning and consolidation, cutting errors by 30% and enhancing reporting accuracy across cross-functional departments.',
      'Leveraged Workiva to produce compliant financial reports, cutting reporting time by 40% and supporting faster strategic decisions.'
    ],
    icon: BriefcaseIcon,
  },
  {
    year: 'May 2022 – Aug 2022',
    title: 'Finance Control Intern',
    company: 'Westinghouse Electric Company',
    description: [
      'Analyzed financial data, monitored 50+ SOX controls, reporting violations and contributed to a 25% improvement in audit readiness and risk mitigation.',
      'Launched routine SOC 1 compliance assessments with cross-functional finance teams and periodic reviews with external auditors; this strengthened audit integrity and decreased reporting errors by 20% within three months.',
      'Monitored risk violations and deployed targeted corrective controls, optimizing resolution efficiency and achieving time savings of up to 8 hours per month.'
    ],
    icon: BriefcaseIcon,
  },
  {
    year: 'Nov 2018 – May 2021',
    title: 'Finance Analyst',
    company: 'Northern Trust Corporation',
    description: [
      'Reconciled reports as a transfer agent for 10+ high-value clients, including Barclays and Blackrock, adhering to Financial Conduct Authority CASS7 regulations and minimizing regulatory breaches.',
      'Delivered tailored data solutions for audit teams, supporting 10+ audits/year and improving resolution time by 25%.',
      'Ensured 100% FCA-compliant CASS 6 reconciliations, supporting accurate cash flow forecasting and regulatory reporting.',
      'Cut data search time by 90% through implementation of an exception file, saving ~10 hours/month.',
      'Trained 5 team members on CASS6, CASS7, and FCA regulations, boosting compliance accuracy.'
    ],
    icon: BriefcaseIcon,
  },
  {
    year: 'Jan 2018 – Jul 2018',
    title: 'Accountant and Senior Education Counsellor',
    company: 'Suvigyan Career Net Counselling Services Pvt. Ltd.',
    description: [
      'Supervised financial performance metrics and advised senior management on key strategic decisions, ensuring alignment with company objectives and contributing to a 15% increase in overall revenue growth within the fiscal year.'
    ],
    icon: BriefcaseIcon,
  },
  {
    year: 'Mar 2016 – Jun 2017',
    title: 'Partner and Educator',
    company: 'Leading Edge Tutorial',
    description: [
      'Spearheaded personalized tutoring programs incorporating visualization techniques to simplify complex financial concepts, raising average scores by 15%.'
    ],
    icon: BriefcaseIcon,
  },
]

const education = [
  {
    school: 'Clark University',
    location: 'Worcester, MA',
    degree: 'Master of Science in Finance (MSF) in Quantitative Finance',
    year: 'Aug 2021 - May 2023',
    icon: AcademicCapIcon,
  },
]

const skills = [
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

const projects = [
  {
    title: 'Exotic Options Analysis',
    description: 'Conducted in-depth analysis of Exotic Options payouts using advanced pricing models, including Black-Scholes and Monte Carlo simulations, to assess risk and optimize investment strategies.',
    technologies: ['Black-Scholes', 'Monte Carlo', 'Excel', 'Python'],
    link: '#',
  },
  {
    title: 'Harley-Davidson Financial Forecasting',
    description: 'Developed comprehensive earnings and stock price forecasts for Harley-Davidson by performing detailed stock valuation and financial analysis, providing insights into future performance trends.',
    technologies: ['Stock Valuation', 'Financial Analysis', 'Excel'],
    link: '#',
  },
  {
    title: 'Morgan Stanley Research',
    description: "Evaluated Morgan Stanley's financial trajectory by evaluating prior 10K reports, assessing current market positioning, and determining future growth potential, culminating in an investment recommendation leveraging tools like Bloomberg terminal and pitchbook.",
    technologies: ['Bloomberg Terminal', 'Pitchbook', '10K Reports'],
    link: '#',
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [expandedExp, setExpandedExp] = useState({})

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleExp = (idx) => {
    setExpandedExp((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
        {/* Header */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Lotika Das</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Senior Finance Analyst</span>
            </div>
            <div className="flex items-center space-x-6">
              {navigation.map((item) => (
                <button key={item.name} onClick={() => document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                  {item.name}
                </button>
              ))}
              <button onClick={() => setDarkMode((d) => !d)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <a href="https://www.linkedin.com/in/lotika-das" target="_blank" rel="noopener noreferrer">
            <img src="/profile_image.jpeg" alt="Lotika Das" className="w-32 h-32 rounded-full border-4 border-pink-400 shadow-lg mb-6 hover:scale-105 transition-transform" />
          </a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Lotika Das</h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">Senior Finance Analyst</h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-6">Empowering organizations with data-driven financial strategies, risk management, and leadership. 8+ years of experience in Fortune 500 companies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href="/resume.pdf" download className="px-6 py-3 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition flex items-center gap-2">
              <ArrowDownTrayIcon className="h-5 w-5" /> Resume
            </a>
            <a href="tel:+14156012347" className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 dark:hover:bg-gray-800 transition flex items-center gap-2"><PhoneIcon className="h-5 w-5" /> +1 (415) 601-2347</a>
          </div>
        </section>

        {/* About + Experience Section */}
        <section id="about" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">About Me & Experience</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">I am a results-driven finance professional passionate about transforming complex data into actionable business insights. I thrive in fast-paced environments and love mentoring the next generation of analysts.</p>
            <ol className="relative border-l-4 border-pink-300 dark:border-pink-600">
              {experiences.map((exp, idx) => {
                const showAll = expandedExp[idx];
                const points = showAll ? exp.description : exp.description.slice(0, 3);
                return (
                  <li key={idx} className="mb-10 ml-6">
                    <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-pink-100 dark:bg-pink-700 rounded-full ring-4 ring-white dark:ring-gray-900">
                      <exp.icon className="w-6 h-6 text-pink-500 dark:text-pink-200" />
                    </span>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-pink-100 dark:border-pink-700/30">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold text-lg text-pink-600 dark:text-pink-300">{exp.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{exp.year}</span>
                      </div>
                      <div className="font-medium text-gray-700 dark:text-gray-200 mb-2">{exp.company}</div>
                      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1 mb-2">
                        {points.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      {exp.description.length > 3 && (
                        <button
                          onClick={() => toggleExp(idx)}
                          className="text-xs text-pink-500 hover:underline focus:outline-none"
                        >
                          {showAll ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Education</h2>
            <div className="flex flex-col items-center gap-6">
              {education.map((edu, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-xl">
                  <edu.icon className="h-8 w-8 text-pink-500 dark:text-pink-300" />
                  <div>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{edu.school} &middot; {edu.location}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <h3 className="font-semibold text-lg mb-4 text-pink-600 dark:text-pink-300">{skill.category}</h3>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                    {skill.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-pink-600 dark:text-pink-300">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 text-xs rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <a href={project.link} className="mt-4 inline-flex items-center gap-1 text-pink-500 hover:underline text-sm">
                    View Project <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Contact</h2>
            <form className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="your.email@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-medium">Send Message</button>
            </form>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-8 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2"><EnvelopeIcon className="h-5 w-5 text-pink-500" /> lotikadas.official@gmail.com</div>
              <div className="flex items-center gap-2"><PhoneIcon className="h-5 w-5 text-pink-500" /> +1 (415) 601-2347</div>
              <div className="flex items-center gap-2"><ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600" /> <a href="https://www.linkedin.com/in/lotika-das" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold">Lotika Das</span> &middot; Senior Finance Analyst
            </div>
            <div className="text-gray-400">&copy; {new Date().getFullYear()} Lotika Das. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
