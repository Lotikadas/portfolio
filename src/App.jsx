import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, BriefcaseIcon, AcademicCapIcon, ArrowTopRightOnSquareIcon, EnvelopeIcon, PhoneIcon, Bars3Icon, XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { profile, contact, about, experiences, education, skills, projects, navigation } from './content'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [expandedExp, setExpandedExp] = useState({})
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      const ids = navigation.map((n) => n.href)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleExp = (idx) => {
    setExpandedExp((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormStatus(null)
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-lg">Skip to content</a>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
        {/* Header */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{profile.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">{profile.title}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <button key={item.name} onClick={() => document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm font-medium transition-colors ${activeSection === item.href ? 'text-pink-500 dark:text-pink-400' : 'hover:text-pink-500 dark:hover:text-pink-400'}`}>
                  {item.name}
                </button>
              ))}
              <button onClick={() => setDarkMode((d) => !d)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
              </button>
            </div>
            <div className="flex md:hidden items-center space-x-3">
              <button onClick={() => setDarkMode((d) => !d)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
              </button>
              <button onClick={() => setMobileMenuOpen((o) => !o)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
              <div className="px-4 py-3 space-y-2">
                {navigation.map((item) => (
                  <button key={item.name} onClick={() => { document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-gray-800 dark:hover:text-pink-400 transition-colors">
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="View LinkedIn profile">
            <img src={profile.photo} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-pink-400 shadow-lg mb-6 hover:scale-105 transition-transform cursor-pointer" />
          </a>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{profile.name}</h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">{profile.title}</h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-6">{profile.bio}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href={profile.resumeFile} download className="px-6 py-3 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition flex items-center gap-2">
              <ArrowDownTrayIcon className="h-5 w-5" /> Resume
            </a>
            <a href={`tel:${contact.phone.replace(/[\s()-]/g, '')}`} className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 dark:hover:bg-gray-800 transition flex items-center gap-2"><PhoneIcon className="h-5 w-5" /> {contact.phone}</a>
          </div>
        </section>

        {/* About + Experience Section */}
        <section id="about" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50 fade-in-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">{about.heading}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">{about.description}</p>
            <ol id="experience" className="relative border-l-4 border-pink-300 dark:border-pink-600 scroll-mt-20">
              {experiences.map((exp, idx) => {
                const showAll = expandedExp[idx];
                const points = showAll ? exp.bullets : exp.bullets.slice(0, 3);
                return (
                  <li key={idx} className="mb-10 ml-6">
                    <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-pink-100 dark:bg-pink-700 rounded-full ring-4 ring-white dark:ring-gray-900">
                      <BriefcaseIcon className="w-6 h-6 text-pink-500 dark:text-pink-200" />
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
                      {exp.bullets.length > 3 && (
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
        <section id="education" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50 fade-in-section">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Education</h2>
            <div className="flex flex-col items-center gap-6">
              {education.map((edu, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-xl">
                  <AcademicCapIcon className="h-8 w-8 text-pink-500 dark:text-pink-300" />
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
        <section id="skills" className="py-16 px-4 fade-in-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, idx) => {
                const colors = [
                  { heading: 'text-rose-600 dark:text-rose-300', pill: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-200 border-rose-200/60 dark:border-rose-700/30', accent: 'from-rose-400 to-rose-500' },
                  { heading: 'text-fuchsia-600 dark:text-fuchsia-300', pill: 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-200 border-fuchsia-200/60 dark:border-fuchsia-700/30', accent: 'from-fuchsia-400 to-fuchsia-500' },
                  { heading: 'text-violet-600 dark:text-violet-300', pill: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-200 border-violet-200/60 dark:border-violet-700/30', accent: 'from-violet-400 to-violet-500' },
                ][idx % 3]
                return (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-1 h-6 rounded-full bg-gradient-to-b ${colors.accent}`} />
                      <h3 className={`font-semibold text-lg ${colors.heading}`}>{skill.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span key={i} className={`px-3 py-1.5 text-sm rounded-lg border ${colors.pill} hover:shadow-sm transition-shadow`}>{item}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50 fade-in-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-pink-600 dark:text-pink-300">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 text-xs rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  {project.link && project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-pink-500 hover:underline text-sm">
                      View Project <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 fade-in-section">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="your.email@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" rows={4} required value={formData.message} onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Tell me about your project..."></textarea>
              </div>
              {formStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center">Message sent successfully!</div>
              )}
              {formStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">Something went wrong. Please try again or email directly.</div>
              )}
              <button type="submit" disabled={submitting} className="w-full px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-8 text-gray-700 dark:text-gray-300">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-pink-500 transition-colors"><EnvelopeIcon className="h-5 w-5 text-pink-500" /> {contact.email}</a>
              <a href={`tel:${contact.phone.replace(/[\s()-]/g, '')}`} className="flex items-center gap-2 hover:text-pink-500 transition-colors"><PhoneIcon className="h-5 w-5 text-pink-500" /> {contact.phone}</a>
              <div className="flex items-center gap-2"><ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600" /> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold">{profile.name}</span> &middot; {profile.title}
            </div>
            <div className="flex items-center gap-4">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                <EnvelopeIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="text-gray-400">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
          </div>
        </footer>

        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 p-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all z-50">
            <ChevronUpIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default App
