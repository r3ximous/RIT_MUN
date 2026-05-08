import React, { useState, useEffect } from 'react';
import { 
  Globe, Calendar, Users, Mail, ArrowRight, 
  Clock, MapPin, ChevronRight, Menu, X, Award, FileText
} from 'lucide-react';

// Brand Colors from Roadmap
const BRAND_ORANGE = '#F76902';
const BRAND_DARK = '#1E1E1E';
const BRAND_LIGHT = '#F4F4F4';

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target date for the next conference (December 2026)
    const targetDate = new Date(2026, 11, 1, 9, 0, 0); // Year 2026, Month 11 (December), Day 1, 9:00 AM

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform -translate-y-1/2 mx-4 md:mx-auto max-w-4xl flex flex-wrap justify-around items-center gap-4">
      <div className="text-center md:text-left flex-1 min-w-[200px]">
        <h3 className="text-xl font-bold text-[#1E1E1E]">Conference Starts In:</h3>
        <p className="text-gray-500 text-sm">Prepare your position papers!</p>
      </div>
      <div className="flex gap-4 md:gap-8 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-[#1E1E1E] text-white text-3xl md:text-5xl font-bold w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-inner">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wider mt-2 font-semibold text-gray-600">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ setPage }) => (
  <div className="animate-fadeIn">
    {/* Hero Section */}
    <div 
      className="relative bg-[#1E1E1E] text-white py-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[70vh] text-center"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #2a2a2a 0%, #1E1E1E 100%)'
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F76902" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#F76902] text-sm font-semibold mb-4 border border-[#F76902]/30">
          <Globe className="w-4 h-4" />
          <span>RIT Model United Nations Conference</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Diplomacy in <span style={{ color: BRAND_ORANGE }}>Action</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Join hundreds of delegates at Rochester Institute of Technology for a weekend of rigorous debate, negotiation, and global problem-solving.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setPage('registration')}
            className="px-8 py-4 bg-[#F76902] hover:bg-[#d95c02] text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-[#F76902]/50 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Register Now <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setPage('committees')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-bold text-lg transition-all"
          >
            View Committees
          </button>
        </div>
      </div>
    </div>

    {/* Island Architecture: Countdown */}
    <CountdownTimer />

    {/* About Section */}
    <div className="py-20 px-6 bg-[#F4F4F4]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-[#F76902]/10 text-[#F76902] rounded-xl flex items-center justify-center mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#1E1E1E]">Diverse Committees</h3>
          <p className="text-gray-600 leading-relaxed">
            From the fast-paced Crisis committees to the expansive General Assembly, we offer a dynamic range of topics suitable for all experience levels.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-[#F76902]/10 text-[#F76902] rounded-xl flex items-center justify-center mb-6">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#1E1E1E]">Skill Building</h3>
          <p className="text-gray-600 leading-relaxed">
            Enhance your public speaking, negotiation, and policy-writing skills. RIT MUN is designed to challenge and grow tomorrow's leaders.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-[#F76902]/10 text-[#F76902] rounded-xl flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#1E1E1E]">RIT Campus</h3>
          <p className="text-gray-600 leading-relaxed">
            Experience the cutting-edge facilities of the Rochester Institute of Technology, blending technology with traditional diplomacy.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CommitteesPage = () => {
  const committees = [
    { name: "UN Security Council (UNSC)", type: "Crisis", desc: "Tackling immediate threats to international peace and security with dynamic crisis updates." },
    { name: "Human Rights Council (UNHRC)", type: "General Assembly", desc: "Addressing systemic human rights violations and establishing global protection frameworks." },
    { name: "DISEC", type: "General Assembly", desc: "Disarmament and International Security Committee focusing on cyber warfare and arms control." },
    { name: "Historical Crisis: 1962", type: "Joint Crisis", desc: "Navigate the Cuban Missile Crisis from the perspectives of the USA and USSR cabinets." },
    { name: "World Health Organization", type: "Specialized", desc: "Coordinating international responses to emerging global health pandemics." },
    { name: "Ad-Hoc Committee", type: "Advanced Crisis", desc: "A top-secret committee for experienced delegates. Topic revealed 24 hours before the conference." }
  ];

  return (
    <div className="animate-fadeIn py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Committees</h2>
        <p className="text-xl text-gray-600 max-w-3xl">Explore the specialized bodies, general assemblies, and crisis rooms that will define this year's conference. Background guides will be available closer to the date.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {committees.map((com, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#F76902] transition-colors group">
            <div className="text-xs font-bold text-[#F76902] uppercase tracking-wider mb-2">{com.type}</div>
            <h3 className="text-2xl font-bold text-[#1E1E1E] mb-3 group-hover:text-[#F76902] transition-colors">{com.name}</h3>
            <p className="text-gray-600 mb-6">{com.desc}</p>
            <button className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E] group-hover:text-[#F76902]">
              <FileText className="w-4 h-4" /> View Background Guide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SchedulePage = () => {
  const schedule = [
    { day: "Friday", date: "Nov 15", events: [
      { time: "3:00 PM - 5:00 PM", title: "Registration & Check-in", loc: "Campus Center" },
      { time: "5:30 PM - 6:30 PM", title: "Opening Ceremonies", loc: "Ingle Auditorium" },
      { time: "7:00 PM - 10:00 PM", title: "Committee Session I", loc: "Various Classrooms" }
    ]},
    { day: "Saturday", date: "Nov 16", events: [
      { time: "9:00 AM - 12:00 PM", title: "Committee Session II", loc: "Various Classrooms" },
      { time: "12:00 PM - 1:30 PM", title: "Lunch Break", loc: "Dining Halls" },
      { time: "1:30 PM - 5:00 PM", title: "Committee Session III", loc: "Various Classrooms" },
      { time: "7:00 PM - 10:00 PM", title: "Delegate Social", loc: "Gordon Field House" }
    ]},
    { day: "Sunday", date: "Nov 17", events: [
      { time: "9:30 AM - 12:30 PM", title: "Committee Session IV", loc: "Various Classrooms" },
      { time: "1:30 PM - 3:00 PM", title: "Closing Ceremonies & Awards", loc: "Ingle Auditorium" }
    ]}
  ];

  return (
    <div className="animate-fadeIn py-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Conference Schedule</h2>
        <p className="text-xl text-gray-600">A structured weekend of debate, networking, and diplomacy.</p>
      </div>

      <div className="space-y-12">
        {schedule.map((day, idx) => (
          <div key={idx} className="relative">
            <div className="sticky top-20 bg-white z-10 py-4 mb-6 border-b-2 border-[#F76902]">
              <h3 className="text-3xl font-bold text-[#1E1E1E]">{day.day} <span className="text-gray-400 font-normal text-xl ml-2">{day.date}</span></h3>
            </div>
            <div className="space-y-6">
              {day.events.map((event, eIdx) => (
                <div key={eIdx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start group">
                  <div className="w-full sm:w-48 flex-shrink-0 text-[#F76902] font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {event.time}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-5 border border-gray-100 group-hover:bg-[#F76902]/5 transition-colors">
                    <h4 className="text-xl font-bold text-[#1E1E1E] mb-1">{event.title}</h4>
                    <p className="text-gray-500 flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" /> {event.loc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RegistrationPage = () => (
  <div className="animate-fadeIn py-20 px-6 max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
      <div className="bg-[#1E1E1E] text-white p-10 md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-4xl font-extrabold mb-6">Join the Debate</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Secure your spot at the next RIT MUN conference. Registration includes access to all committee sessions, the delegate social, and conference materials.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F76902] flex items-center justify-center font-bold text-xs">1</div>
              <span>Early Bird Registration: $45</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F76902] flex items-center justify-center font-bold text-xs">2</div>
              <span>Regular Registration: $60</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F76902] flex items-center justify-center font-bold text-xs">3</div>
              <span>Delegation Fee: $30</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-10 md:w-1/2 bg-gray-50">
        <h3 className="text-2xl font-bold text-[#1E1E1E] mb-6">Registration Portal</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Delegation / School Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] focus:border-transparent outline-none transition-all" placeholder="e.g. RIT" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Head Delegate Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] focus:border-transparent outline-none transition-all" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Number of Delegates</label>
            <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] focus:border-transparent outline-none transition-all" placeholder="10" />
          </div>
          <button className="w-full mt-4 bg-[#F76902] hover:bg-[#d95c02] text-white font-bold py-4 rounded-lg transition-colors shadow-md">
            Proceed to Payment Gateway
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">This will redirect you to the official RIT payment portal.</p>
        </form>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="animate-fadeIn py-20 px-6 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-[#1E1E1E] mb-4">Contact the Secretariat</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have questions about the conference, registration, or logistics? We're here to help.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#F76902]/10 text-[#F76902] rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-[#1E1E1E] mb-1">Email Us</h4>
            <p className="text-gray-600">secgen@ritmun.org</p>
            <p className="text-gray-600">registration@ritmun.org</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#F76902]/10 text-[#F76902] rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-[#1E1E1E] mb-1">Location</h4>
            <p className="text-gray-600">Rochester Institute of Technology</p>
            <p className="text-gray-600">1 Lomb Memorial Dr</p>
            <p className="text-gray-600">Rochester, NY 14623</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F76902] outline-none"></textarea>
          </div>
          <button className="bg-[#1E1E1E] hover:bg-[#F76902] text-white font-bold py-3 px-6 rounded-lg transition-colors w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'committees', label: 'Committees' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'registration', label: 'Registration' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setPage={setActiveTab} />;
      case 'committees': return <CommitteesPage />;
      case 'schedule': return <SchedulePage />;
      case 'registration': return <RegistrationPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#F76902] selection:text-white">
      {/* Navigation Bar */}
      <nav className="bg-[#1E1E1E] text-white sticky top-0 z-50 border-b-4 border-[#F76902] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 bg-[#F76902] rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              RIT <span className="text-[#F76902]">MUN</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-semibold text-sm uppercase tracking-wider transition-colors duration-200 hover:text-[#F76902] ${
                  activeTab === link.id ? 'text-[#F76902] border-b-2 border-[#F76902] py-1' : 'text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('registration')}
              className="bg-[#F76902] hover:bg-white hover:text-[#F76902] text-white px-5 py-2 rounded font-bold transition-colors"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-[#F76902] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1E1E1E] border-t border-gray-800 animate-fadeIn">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left font-semibold text-lg py-2 ${
                    activeTab === link.id ? 'text-[#F76902]' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <Globe className="w-6 h-6 text-[#F76902]" />
               <span className="text-xl font-bold">RIT MUN</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Rochester Institute of Technology Model United Nations. Empowering students through diplomacy, debate, and international relations.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F76902]">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavClick('committees')} className="hover:text-white">Committees</button></li>
              <li><button onClick={() => handleNavClick('schedule')} className="hover:text-white">Schedule</button></li>
              <li><button onClick={() => handleNavClick('registration')} className="hover:text-white">Registration</button></li>
              <li><button onClick={() => handleNavClick('contact')} className="hover:text-white">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-[#F76902]">Legal & Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li className="pt-4 mt-4 border-t border-gray-800 text-xs">
                {/* Roadmap Reference */}
                Rebuilt with Astro & Tailwind <br/>(Simulated in React)
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RIT Model United Nations. All rights reserved.
        </div>
      </footer>
    </div>
  );
}