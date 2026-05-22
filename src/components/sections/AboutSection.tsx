import { User, MapPin, Coffee } from 'lucide-react';

const INFO = [
  { key: 'name',       value: 'Kalyan Babu K',                  color: '#7ee787' },
  { key: 'role',       value: 'Student',  color: '#39c5cf' },
  { key: 'location',   value: 'Hyderabad, TG, India',           color: '#f9c74f' },
  { key: 'email',      value: 'khlvn2005@gmail.com',           color: '#39c5cf' },
  { key: 'github',     value: 'github.com/K-Kalyan-B',         color: '#b3b1ad' },
  { key: 'linkedin',   value: 'linkedin.com/in/kalyan-kakarapathi',    color: '#b3b1ad' },
  { key: 'available',  value: 'Open to opportunities',       color: '#7ee787' },
];

const TRAITS = [
  'Problem Solver', 'Clean Code Advocate',
  'Coffee Addict', 'Night Owl Coder',
];

export default function AboutSection() {
  return (
    <div className="space-y-6 slide-in">
      <div className="text-xs text-[#4e5566]">
        # Output of: <span className="glow-cyan">whoami --verbose</span>
      </div>

      {/* Profile header */}
      <div className="flex items-start gap-6 flex-wrap">
        <div className="w-20 h-20 rounded border border-[#1e2433] flex items-center justify-center shrink-0"
             style={{ background: 'linear-gradient(135deg, #0f1318 0%, #1e2433 100%)' }}>
          <User size={36} className="text-[#39c5cf]" style={{ filter: 'drop-shadow(0 0 6px rgba(57,197,207,0.5))' }} />
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold glow-green">Kalyan Babu</div>
          <div className="text-sm text-[#39c5cf]">CS Student</div>
          <div className="flex items-center gap-1 text-xs text-[#f9c74f] mt-1">
            <MapPin size={10} />
            <span>Hyderabad, TG</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-2 h-2 rounded-full bg-[#7ee787] animate-pulse" />
            <span className="text-xs text-[#7ee787]">Available for hire</span>
          </div>
        </div>
      </div>

      {/* uid / gid style info */}
      <div className="bg-[#0c1015] rounded border border-[#1a1f2e] p-4 space-y-2">
        {INFO.map(({ key, value, color }) => (
          <div key={key} className="flex items-baseline gap-0 text-sm font-mono">
            <span className="text-[#4e5566] w-16 shrink-0 text-xs">{key}</span>
            <span className="text-[#2a2e38] mr-3 text-xs">=</span>
            <span style={{ color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <div className="text-xs text-[#4e5566]">
          # /etc/profile — biography
        </div>
        <div className="text-sm text-[#b3b1ad] leading-relaxed border-l-2 border-[#1e2433] pl-4">
          Web Developer in the making
          Strong foundation in DSA with Java/C++
          Building dynamic websites with HTML, CSS, JavaScript
          Eager to learn, create, and make an impact!
        </div>
      </div>

      {/* Traits */}
      <div className="space-y-2">
        <div className="text-xs text-[#4e5566]"># personality traits []</div>
        <div className="flex flex-wrap gap-2">
          {TRAITS.map(t => (
            <span key={t} className="text-xs px-2 py-1 border border-[#1e2433] text-[#4e5566] rounded hover:border-[#39c5cf] hover:text-[#39c5cf] transition-colors cursor-default">
              "{t}"
            </span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'years exp', value: '0' },
          { label: 'projects', value: '1' },
          { label: 'commits', value: '10' },
          { label: 'coffees', value: '∞' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#0c1015] border border-[#1a1f2e] rounded p-3 text-center hover:border-[#39c5cf] transition-colors">
            <div className="text-xl font-bold glow-cyan">{value}</div>
            <div className="text-[10px] text-[#4e5566] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Fun footer */}
      <div className="flex items-center gap-2 text-xs text-[#2a2e38]">
        <Coffee size={11} />
        <span>Last fueled: 47 minutes ago</span>
      </div>
    </div>
  );
}
