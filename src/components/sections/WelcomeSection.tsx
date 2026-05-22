type Section = 'welcome' | 'about' | 'projects' | 'skills' | 'experience' | 'contact';

const COMMANDS: { cmd: string; desc: string; section: Section }[] = [
  { cmd: 'whoami',       desc: 'Display information about me',       section: 'about'      },
  { cmd: 'ls -la',       desc: 'List all projects with details',      section: 'projects'   },
  { cmd: 'cat skills',   desc: 'Read my technical skills file',       section: 'skills'     },
  { cmd: 'history',      desc: 'Show work experience timeline',       section: 'experience' },
  { cmd: 'ssh contact',  desc: 'Open a secure channel to reach me',   section: 'contact'    },
];

interface Props {
  onNavigate: (section: Section, cmd?: string) => void;
}

export default function WelcomeSection({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* ASCII banner */}
      <pre className="ascii-art glow-green select-none">
{`██╗  ██╗ █████╗ ██╗  ██╗   ██╗ █████╗ ███╗   ██╗    ██████╗  █████╗ ██████╗ ██╗   ██╗
██║ ██╔╝██╔══██╗██║  ╚██╗ ██╔╝██╔══██╗████╗  ██║    ██╔══██╗██╔══██╗██╔══██╗██║   ██║
█████╔╝ ███████║██║   ╚████╔╝ ███████║██╔██╗ ██║    ██████╔╝███████║██████╔╝██║   ██║
██╔═██╗ ██╔══██║██║    ╚██╔╝  ██╔══██║██║╚██╗██║    ██╔══██╗██╔══██║██╔══██╗██║   ██║
██║  ██╗██║  ██║███████╗██║   ██║  ██║██║ ╚████║    ██████╔╝██║  ██║██████╔╝╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝
`}
      </pre>

      <div className="space-y-1 text-sm slide-in">
        <div className="text-[#39c5cf]">Welcome to <span className="glow-green font-bold">Kalyan Babu</span>'s interactive portfolio.</div>
        <div className="text-[#4e5566]">CS Student</div>
      </div>

      <div className="border-l-2 border-[#1e2433] pl-4 space-y-1 text-xs text-[#4e5566]">
        <div>Last login: Thu May 21 09:42:17 2026 from 192.168.1.1</div>
        <div>System: KBOS v1.0.0 LTS (portfolio.local)</div>
        <div>Uptime: 3 years, 247 days, 14:22</div>
      </div>

      {/* Help table */}
      <div className="space-y-2">
        <div className="text-xs text-[#4e5566] mb-3">
          — available commands ————————————————————————
        </div>
        {COMMANDS.map(({ cmd, desc, section }) => (
          <button
            key={cmd}
            onClick={() => onNavigate(section, cmd)}
            className="w-full flex items-start gap-4 text-sm text-left group hover:bg-[#0f1318] px-3 py-2 rounded transition-colors"
          >
            <span className="glow-cyan font-bold w-28 shrink-0 group-hover:text-[#7ee787] transition-colors">
              {cmd}
            </span>
            <span className="text-[#4e5566] group-hover:text-[#7ee787] transition-colors">
              # {desc}
            </span>
          </button>
        ))}
      </div>

      <div className="text-xs text-[#2a2e38] mt-4">
        Tip: Use ↑↓ arrow keys for command history, Tab for autocomplete.
      </div>
    </div>
  );
}
