import { useState } from 'react';
import { Star, GitFork, ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    name: 'Smart Attendance System using MTCNN',
    desc: 'An attendance system created using mtcnn,FaceNet,Flask which recognises face and their liveliness.',
    lang: 'Python',
    stars: 0,
    forks: 0,
    tags: ['Flask', 'Python', 'CNN',],
    color: '#f9c74f',
    size: '1.4 MB',
    perms: 'drwxr-xr-x',
    updated: '2026-05-18',
    url: '#',
  }
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  Go:         '#00acd7',
  Rust:       '#dea584',
  Python:     '#3572a5',
  Shell:      '#89e051',
};

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4 slide-in">
      <div className="text-xs text-[#4e5566] space-y-1">
        <div>total {PROJECTS.length}</div>
        <div className="text-[#2a2e38]">
          {'permissions  owner  group  size      date          name'}
        </div>
      </div>

      {PROJECTS.map((p) => (
        <div
          key={p.name}
          className="project-card rounded"
          style={{ background: '#0c1015' }}
        >
          {/* ls -la row */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#0f1318] transition-colors rounded text-xs"
            onClick={() => setExpanded(expanded === p.name ? null : p.name)}
          >
            <span className="text-[#2a2e38] shrink-0 hidden sm:inline">{p.perms}</span>
            <span className="text-[#4e5566] shrink-0 hidden sm:inline">alex  staff</span>
            <span className="text-[#4e5566] shrink-0 w-14 text-right hidden sm:inline">{p.size}</span>
            <span className="text-[#4e5566] shrink-0 hidden md:inline">{p.updated}</span>
            <span className="glow-cyan font-bold flex-1" style={{ color: p.color }}>
              {p.name}/
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex items-center gap-1 text-[#4e5566]">
                <Star size={10} />
                {p.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-[#4e5566]">
                <GitFork size={10} />
                {p.forks}
              </span>
              <span className="text-[#2a2e38] ml-1">{expanded === p.name ? '▾' : '▸'}</span>
            </div>
          </button>

          {/* Expanded detail */}
          {expanded === p.name && (
            <div className="px-4 pb-4 pt-1 border-t border-[#1a1f2e] fade-in space-y-3">
              <p className="text-sm text-[#b3b1ad] leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded border border-[#1e2433] text-[#4e5566] hover:border-[#39c5cf] hover:text-[#39c5cf] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: LANG_COLORS[p.lang] || '#b3b1ad' }}
                  />
                  <span className="text-[#4e5566]">{p.lang}</span>
                </div>
                <a href={p.url} className="flex items-center gap-1 text-xs text-[#39c5cf] hover:glow-cyan transition-colors">
                  <Github size={11} /> Source
                </a>
                <a href={p.url} className="flex items-center gap-1 text-xs text-[#39c5cf] hover:glow-cyan transition-colors">
                  <ExternalLink size={11} /> Demo
                </a>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-xs text-[#2a2e38] pt-2">
        6 directories listed  ·  click any row to expand
      </div>
    </div>
  );
}
