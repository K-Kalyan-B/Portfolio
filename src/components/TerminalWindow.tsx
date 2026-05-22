import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal, Maximize2, Minus, X } from 'lucide-react';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import WelcomeSection from './sections/WelcomeSection';

type Section = 'welcome' | 'about' | 'projects' | 'skills' | 'experience' | 'contact';

const NAV_COMMANDS: { cmd: string; section: Section; label: string }[] = [
  { cmd: 'whoami',       section: 'about',      label: 'whoami' },
  { cmd: 'ls -la',       section: 'projects',   label: 'ls -la' },
  { cmd: 'cat skills',   section: 'skills',     label: 'cat skills' },
  { cmd: 'history',      section: 'experience', label: 'history' },
  { cmd: 'ssh contact',  section: 'contact',    label: 'ssh contact' },
];

const VALID_COMMANDS: Record<string, Section> = {
  'whoami':      'about',
  'ls':          'projects',
  'ls -la':      'projects',
  'ls -l':       'projects',
  'cat skills':  'skills',
  'skills':      'skills',
  'history':     'experience',
  'experience':  'experience',
  'ssh contact': 'contact',
  'contact':     'contact',
  'home':        'welcome',
  'clear':       'welcome',
  'help':        'welcome',
};

function getPrompt(section: Section) {
  const user = 'Kalyan Babu';
  const host = 'portfolio';
  const paths: Record<Section, string> = {
    welcome:    '~',
    about:      '~/about',
    projects:   '~/projects',
    skills:     '~/skills',
    experience: '~/experience',
    contact:    '~/contact',
  };
  return { user, host, path: paths[section] };
}

export default function TerminalWindow() {
  const [activeSection, setActiveSection] = useState<Section>('welcome');
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputLines, setOutputLines] = useState<{ cmd: string; path: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prompt = getPrompt(activeSection);

  const navigate = (section: Section, cmd?: string) => {
    const command = cmd || NAV_COMMANDS.find(n => n.section === section)?.cmd || section;
    setOutputLines(prev => [...prev, { cmd: command, path: prompt.path }]);
    setActiveSection(section);
    setErrorMsg('');
    setInputValue('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleCommand = () => {
    const raw = inputValue.trim();
    if (!raw) return;

    setCommandHistory(prev => [raw, ...prev]);
    setHistoryIndex(-1);

    const lower = raw.toLowerCase();
    if (lower === 'clear') {
      setOutputLines([]);
      setActiveSection('welcome');
      setInputValue('');
      setErrorMsg('');
      return;
    }

    const target = VALID_COMMANDS[lower];
    if (target) {
      navigate(target, raw);
    } else {
      setErrorMsg(`command not found: ${raw}. Type 'help' to see available commands.`);
      setOutputLines(prev => [...prev, { cmd: raw, path: prompt.path }]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInputValue(commandHistory[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInputValue(next === -1 ? '' : commandHistory[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = Object.keys(VALID_COMMANDS);
      const match = cmds.find(c => c.startsWith(inputValue.toLowerCase()));
      if (match) setInputValue(match);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSection]);

  const renderSection = () => {
    const key = activeSection;
    switch (activeSection) {
      case 'about':      return <AboutSection key={key} />;
      case 'projects':   return <ProjectsSection key={key} />;
      case 'skills':     return <SkillsSection key={key} />;
      case 'experience': return <ExperienceSection key={key} />;
      case 'contact':    return <ContactSection key={key} />;
      default:           return <WelcomeSection key={key} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 md:p-6 lg:p-10">
      {/* Window chrome */}
      <div className="flex-1 flex flex-col rounded-lg overflow-hidden border border-[#1e2433] shadow-2xl"
           style={{ boxShadow: '0 0 60px rgba(126,231,135,0.05), 0 20px 60px rgba(0,0,0,0.6)' }}>

        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#0f1318] border-b border-[#1e2433]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 cursor-pointer transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 cursor-pointer transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:opacity-80 cursor-pointer transition-opacity" />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 text-xs text-[#4e5566]">
              <Terminal size={12} />
              <span>KalyanBabu@portfolio:~</span>
            </div>
          </div>

          <div className="flex gap-2 text-[#2a2e38]">
            <Minus size={14} className="hover:text-[#4e5566] cursor-pointer transition-colors" />
            <Maximize2 size={14} className="hover:text-[#4e5566] cursor-pointer transition-colors" />
            <X size={14} className="hover:text-[#4e5566] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Nav bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#0c1015] border-b border-[#1a1f2e] overflow-x-auto">
          <span className="text-[#2a2e38] text-xs mr-2 shrink-0">$</span>
          {NAV_COMMANDS.map(({ cmd, section, label }) => (
            <button
              key={section}
              onClick={() => navigate(section, cmd)}
              className={`nav-cmd text-xs px-3 py-1.5 rounded shrink-0 ${
                activeSection === section ? 'active text-[#7ee787]' : 'text-[#4e5566] hover:text-[#7ee787]'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => { setOutputLines([]); setActiveSection('welcome'); setErrorMsg(''); }}
            className="text-xs text-[#2a2e38] hover:text-[#4e5566] transition-colors shrink-0 px-2 py-1"
          >
            clear
          </button>
        </div>

        {/* Terminal body */}
        <div
          className="flex-1 overflow-y-auto terminal-scrollbar bg-[#0a0e14] p-4 md:p-6"
          style={{ minHeight: '60vh', maxHeight: '75vh' }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Output history */}
          {outputLines.map((entry, i) => (
            <div key={i} className="mb-4">
              <div className="text-xs flex items-center gap-1 mb-1">
                <span className="glow-green">KalyanBabu@portfolio</span>
                <span className="text-[#2a2e38]">:</span>
                <span className="glow-cyan">{entry.path}</span>
                <span className="text-[#b3b1ad]">$</span>
                <span className="text-[#b3b1ad] ml-1">{entry.cmd}</span>
              </div>
            </div>
          ))}

          {/* Current section content */}
          <div className="fade-in">
            {renderSection()}
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="mt-3 text-sm fade-in" style={{ color: '#ff6b6b' }}>
              bash: {errorMsg}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input line */}
        <div className="px-4 md:px-6 py-3 bg-[#0a0e14] border-t border-[#1a1f2e] flex items-center gap-2">
          <span className="text-xs glow-green shrink-0">{prompt.user}@{prompt.host}</span>
          <span className="text-[#2a2e38] text-xs shrink-0">:</span>
          <span className="text-xs glow-cyan shrink-0">{prompt.path}</span>
          <span className="text-[#b3b1ad] text-xs shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => { setInputValue(e.target.value); setErrorMsg(''); }}
            onKeyDown={handleKeyDown}
            className="terminal-input text-sm flex-1 min-w-0"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="type a command..."
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-[#2a2e38]">
        <span>KBOS v1.0.0 — portfolio.local</span>
        <span>↑↓ history  ⇥ autocomplete  ↵ execute</span>
      </div>
    </div>
  );
}
