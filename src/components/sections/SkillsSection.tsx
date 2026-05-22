import { useState, useEffect } from 'react';

const SKILL_GROUPS = [
  {
    label: 'languages',
    comment: '# proficiency — lines of prod code shipped',
    skills: [
      { name: 'TypeScript',  level: 96, color: '#3178c6' },
      { name: 'Go',          level: 88, color: '#00acd7' },
      { name: 'Python',      level: 85, color: '#3572a5' },
      { name: 'Rust',        level: 70, color: '#dea584' },
      { name: 'Bash/Shell',  level: 82, color: '#89e051' },
      { name: 'SQL',         level: 90, color: '#f9c74f' },
    ],
  },
  {
    label: 'frontend',
    comment: '# frameworks & tools',
    skills: [
      { name: 'React',       level: 95, color: '#39c5cf' },
      { name: 'Next.js',     level: 88, color: '#b3b1ad' },
      { name: 'Tailwind CSS',level: 92, color: '#38bdf8' },
      { name: 'GraphQL',     level: 84, color: '#e535ab' },
      { name: 'Vite / esbuild', level: 87, color: '#f9c74f' },
    ],
  },
  {
    label: 'backend & infra',
    comment: '# platforms & operations',
    skills: [
      { name: 'Node.js',     level: 94, color: '#7ee787' },
      { name: 'Kubernetes',  level: 82, color: '#326ce5' },
      { name: 'Docker',      level: 90, color: '#2496ed' },
      { name: 'PostgreSQL',  level: 88, color: '#79c0ff' },
      { name: 'Redis',       level: 83, color: '#ff6b6b' },
      { name: 'Terraform',   level: 78, color: '#844fba' },
    ],
  },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(level), index * 60 + 100);
    return () => clearTimeout(t);
  }, [level, index]);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-[#b3b1ad]">{name}</span>
        <span className="text-[#4e5566]">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1a1f2e] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-5 slide-in">
      <div className="text-xs text-[#4e5566]">
        # Output of: <span className="glow-cyan">cat ~/.config/skills.conf</span>
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 border-b border-[#1a1f2e] pb-0">
        {SKILL_GROUPS.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActiveTab(i)}
            className={`text-xs px-3 py-2 transition-all relative ${
              activeTab === i
                ? 'text-[#7ee787]'
                : 'text-[#4e5566] hover:text-[#b3b1ad]'
            }`}
          >
            [{g.label}]
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[#7ee787]" style={{ boxShadow: '0 0 6px rgba(126,231,135,0.6)' }} />
            )}
          </button>
        ))}
      </div>

      {/* Active group */}
      <div key={activeTab} className="fade-in space-y-4">
        <div className="text-xs text-[#2a2e38]">{SKILL_GROUPS[activeTab].comment}</div>
        <div className="space-y-3">
          {SKILL_GROUPS[activeTab].skills.map((s, i) => (
            <SkillBar key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>

      {/* Summary tags */}
      <div className="pt-2 space-y-2">
        <div className="text-xs text-[#4e5566]"># additional_tools[]</div>
        <div className="flex flex-wrap gap-2">
          {[
            'GitHub Actions', 'AWS', 'GCP', 'Vercel', 'Supabase',
            'Nginx', 'Prometheus', 'Grafana', 'Jest', 'Playwright',
            'Linear', 'Figma', 'Neovim', 'Tmux',
          ].map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 border border-[#1a1f2e] text-[#4e5566] rounded hover:border-[#39c5cf] hover:text-[#39c5cf] transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
