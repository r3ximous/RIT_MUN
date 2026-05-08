import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, MapPin, ChevronRight, 
  Globe, Users, FileText, Mail, ArrowRight 
} from 'lucide-react';

// --- MOCK DATA (Representing Phase 3 Content Collections) ---
const COMMITTEES = [
  { id: 1, name: "United Nations Security Council (UNSC)", difficulty: "Advanced", topics: ["Cyberwarfare & International Security", "The Situation in the South China Sea"], size: "Small" },
  { id: 2, name: "World Health Organization (WHO)", difficulty: "Beginner", topics: ["Global Pandemic Preparedness", "Access to Essential Medicines in Developing Nations"], size: "Large" },
  { id: 3, name: "United Nations Human Rights Council (UNHRC)", difficulty: "Intermediate", topics: ["Protection of Refugees", "Freedom of Expression in the Digital Age"], size: "Medium" },
  { id: 4, name: "Disarmament and International Security (DISEC)", difficulty: "Intermediate", topics: ["Regulation of Autonomous Weapons", "Nuclear Proliferation in the Middle East"], size: "Large" },
];

const SCHEDULE = [
  { day: "Friday, Nov 10", events: [
    { time: "08:00 AM - 09:30 AM", title: "Registration & Breakfast", location: "Main Atrium", type: "Admin" },
    { time: "10:00 AM - 11:30 AM", title: "Opening Ceremony", location: "Grand Auditorium", type: "Ceremony" },
    { time: "12:00 PM - 03:00 PM", title: "Committee Session I", location: "Various Rooms", type: "Session" },
  ]},
  { day: "Saturday, Nov 11", events: [
    { time: "09:00 AM - 12:00 PM", title: "Committee Session II", location: "Various Rooms", type: "Session" },
    { time: "12:00 PM - 01:30 PM", title: "Delegate Lunch", location: "Cafeteria", type: "Social" },
    { time: "01:30 PM - 04:30 PM", title: "Committee Session III", location: "Various Rooms", type: "Session" },
  ]},
  { day: "Sunday, Nov 12", events: [
    { time: "09:00 AM - 11:30 AM", title: "Final Committee Session", location: "Various Rooms", type: "Session" },
    { time: "12:30 PM - 02:00 PM", title: "Closing Ceremony & Awards", location: "Grand Auditorium", type: "Ceremony" },
  ]},
];

// --- COMPONENTS ---

const Navbar = ({ currentRoute, setCurrentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/committees', label: 'Committees' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/registration', label: 'Registration' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNav = (path) => {
    setCurrentRoute(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => handleNav('/')}
          >
            <Globe className="h-8 w-8 text-[#F76902] mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-2xl text-[#1E1E1E] tracking-tight">RIT<span className="text-[#F76902]">MUN</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-sm font-medium transition-colors hover:text-[#F76902] ${
                  currentRoute === link.path ? 'text-[#F76902] border-b-2 border-[#F76902]' : 'text-[#1E1E1E]'
                }`}
                aria-current={currentRoute === link.path ? "page" : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1E1E1E] hover:text-[#F76902] focus:outline-none p-2"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#F4F4F4] absolute w-full border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentRoute === link.path 
                    ? 'bg-[#F76902] text-white' 
                    : 'text-[#1E1E1E] hover:bg-gray-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-[#1E1E1E] text-[#F4F4F4] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <Globe className="h-6 w-6 text-[#F76902] mr-2" />
          <span className="font-bold text-xl tracking-tight">RIT<span className="text-[#F76902]">MUN</span></span>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Empowering future leaders through diplomacy, debate, and international cooperation at Rochester Institute of Technology, Dubai.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><button className="hover:text-[#F76902] transition-colors">Code of Conduct</button></li>
          <li><button className="hover:text-[#F76902] transition-colors">Delegate Handbook</button></li>
          <li><button className="hover:text-[#F76902] transition-colors">Campus Map</button></li>
          <li><button className="hover:text-[#F76902] transition-colors">FAQ</button></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> mun@rit.edu</li>
          <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> RIT Dubai Campus, DSOA</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; {new Date().getFullYear()} RIT Model United Nations. All rights reserved.</p>
      <p className="mt-2 md:mt-0">Built with Astro & Tailwind (Prototype Phase)</p>
    </div>
  </footer>
);

// --- PAGES ---

const Home = ({ setCurrentRoute }) => (
  <main className="animate-in fade-in duration-500">
    {/* Hero Section */}
    <section className="relative bg-[#1E1E1E] text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Placeholder for actual background image */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-[#F76902]/20 text-[#F76902] text-sm font-semibold mb-6 border border-[#F76902]/50">
          Registrations Now Open
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          RIT Dubai Model United Nations
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
          Debate global issues. Forge international policies. Become the leader of tomorrow. Join us for our 5th annual conference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setCurrentRoute('/registration')}
            className="bg-[#F76902] hover:bg-[#d85c02] text-white font-bold py-3 px-8 rounded-md transition-all flex items-center justify-center group"
          >
            Register Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setCurrentRoute('/committees')}
            className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-md transition-all"
          >
            Explore Committees
          </button>
        </div>
      </div>
    </section>

    {/* Key Info Section */}
    <section className="py-16 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-[#F76902]/10 p-4 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-[#F76902]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">November 10-12, 2026</h3>
            <p className="text-gray-600">Three days of intense debate, networking, and social events.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-[#F76902]/10 p-4 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-[#F76902]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">RIT Dubai Campus</h3>
            <p className="text-gray-600">Hosted at the state-of-the-art campus in Dubai Silicon Oasis.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1">
            <div className="bg-[#F76902]/10 p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-[#F76902]" />
            </div>
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">300+ Delegates</h3>
            <p className="text-gray-600">Join university and high school students from across the region.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const Committees = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
    <div className="mb-12">
      <h1 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Committees</h1>
      <p className="text-xl text-gray-600 max-w-3xl">
        Explore the councils for this year's conference. Each committee is designed to challenge delegates on pressing global issues.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {COMMITTEES.map((com) => (
        <div key={com.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[#1E1E1E] leading-tight pr-4">{com.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              com.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              com.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {com.difficulty}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Agenda Topics</h3>
            <ul className="space-y-2">
              {com.topics.map((topic, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-[#F76902] mr-1 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" /> Size: {com.size}
            </span>
            <button className="text-[#F76902] font-semibold hover:text-[#d85c02] transition-colors flex items-center text-sm">
              View Background Guide <FileText className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const Schedule = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Conference Schedule</h1>
      <p className="text-xl text-gray-600">
        Plan your weekend. All times are local (GST).
      </p>
    </div>

    <div className="space-y-12">
      {SCHEDULE.map((dayPlan, idx) => (
        <section key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-[#1E1E1E] px-6 py-4">
            <h2 className="text-2xl font-bold text-white">{dayPlan.day}</h2>
          </div>
          <div className="p-0">
            {dayPlan.events.map((event, eIdx) => (
              <div 
                key={eIdx} 
                className={`flex flex-col sm:flex-row px-6 py-5 ${eIdx !== dayPlan.events.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
              >
                <div className="sm:w-1/3 mb-2 sm:mb-0">
                  <span className="text-sm font-bold text-[#F76902]">{event.time}</span>
                </div>
                <div className="sm:w-2/3">
                  <h3 className="text-lg font-bold text-[#1E1E1E] mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      event.type === 'Session' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'Ceremony' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  </main>
);

const Registration = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Registration</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Secure your spot at the largest collegiate MUN conference in the region.
      </p>
    </div>

    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div className="bg-[#F76902]/10 inline-block p-4 rounded-full mb-6">
        <FileText className="h-10 w-10 text-[#F76902]" />
      </div>
      <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4">Delegate Applications Open</h2>
      <p className="text-gray-600 mb-8">
        We utilize MyMUN for all conference registrations, allocations, and payments to ensure a seamless experience. 
        Click below to be redirected to our official portal.
      </p>
      
      <div className="p-6 bg-[#F4F4F4] rounded-lg mb-8 text-left">
        <h3 className="font-bold text-[#1E1E1E] mb-3">Key Deadlines:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between border-b border-gray-300 pb-2">
            <span>Early Bird Registration Ends:</span>
            <span className="font-semibold">September 15, 2026</span>
          </li>
          <li className="flex justify-between border-b border-gray-300 pb-2 pt-2">
            <span>Regular Registration Ends:</span>
            <span className="font-semibold">October 20, 2026</span>
          </li>
          <li className="flex justify-between pt-2">
            <span>Position Papers Due:</span>
            <span className="font-semibold">November 1, 2026</span>
          </li>
        </ul>
      </div>

      <a 
        href="#" 
        className="inline-block bg-[#F76902] hover:bg-[#d85c02] text-white font-bold py-3 px-8 rounded-md transition-colors w-full sm:w-auto"
        onClick={(e) => e.preventDefault()}
      >
        Apply on MyMUN
      </a>
    </div>
  </main>
);

const Contact = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Contact Us</h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Have questions about the conference? Our Secretariat is here to help.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Contact Info */}
      <div className="bg-[#1E1E1E] text-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <Mail className="h-6 w-6 text-[#F76902] mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-300 mb-1">General Inquiries: mun@rit.edu</p>
              <p className="text-gray-300">Registrations: reg.mun@rit.edu</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-6 w-6 text-[#F76902] mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-gray-300 leading-relaxed">
                Rochester Institute of Technology Dubai<br />
                Dubai Silicon Oasis<br />
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-700">
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F76902] transition-colors cursor-pointer">
              <span className="sr-only">Instagram</span>
              IG
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F76902] transition-colors cursor-pointer">
              <span className="sr-only">LinkedIn</span>
              IN
            </div>
          </div>
        </div>
      </div>

      {/* Form Form (Static Mockup) */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F76902] focus:border-[#F76902] outline-none transition-shadow"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F76902] focus:border-[#F76902] outline-none transition-shadow"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F76902] focus:border-[#F76902] outline-none transition-shadow bg-white"
            >
              <option>General Inquiry</option>
              <option>Registration Support</option>
              <option>Partnership/Sponsorship</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F76902] focus:border-[#F76902] outline-none transition-shadow resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#F76902] hover:bg-[#d85c02] text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </main>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const renderPage = () => {
    switch (currentRoute) {
      case '/': return <Home setCurrentRoute={setCurrentRoute} />;
      case '/committees': return <Committees />;
      case '/schedule': return <Schedule />;
      case '/registration': return <Registration />;
      case '/contact': return <Contact />;
      default: return <Home setCurrentRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#1E1E1E] font-sans selection:bg-[#F76902] selection:text-white flex flex-col">
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-[#F76902] focus:text-white focus:font-bold"
      >
        Skip to main content
      </a>

      <Navbar currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
      
      <div id="main-content" className="flex-grow">
        {renderPage()}
      </div>

      <Footer />
    </div>
  );
}