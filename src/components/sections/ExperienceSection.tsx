import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// {
//     pid: '001',
//     company: 'Stripe',
//     role: 'Senior Software Engineer',
//     start: '2022-03',
//     end: 'present',
//     cpu: '94.2%',
//     mem: '8.1GB',
//     status: 'running',
//     desc: 'Led the migration of the Billing API to a microservices architecture, reducing p99 latency by 42%. Built an internal observability platform serving 300+ engineers.',
//     highlights: [
//       'Architected event-driven billing pipeline processing 50M+ events/day',
//       'Reduced deployment cycle from 45 min to 8 min via CI/CD overhaul',
//       'Mentored 4 junior engineers through structured pairing sessions',
//       'Authored 3 internal RFCs adopted org-wide',
//     ],
//     stack: ['Go', 'TypeScript', 'Kubernetes', 'Prometheus', 'PostgreSQL'],
//   },

const JOBS = [
  {
    pid: '000',
    company: 'None',
    role: 'None',
    start: '',
    end: '',
    cpu: '',
    mem: '',
    status: 'ready',
    desc : '',
    highlights : [],
    stack : [],
  }
];

const STATUS_COLOR: Record<string, string> = {
  running:  '#7ee787',
  sleeping: '#f9c74f',
  zombie:   '#4e5566',
};

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<string | null>('001');

  return (
    <div className="space-y-4 slide-in">
      <div className="text-xs text-[#4e5566] space-y-1">
        <div># Output of: <span className="glow-cyan">ps aux --sort=-cpu | grep engineer</span></div>
        <div className="text-[#2a2e38]">USER  PID  %CPU  %MEM  STAT  START   COMMAND</div>
      </div>

      {JOBS.map((job) => (
        <div key={job.pid} className="project-card rounded" style={{ background: '#0c1015' }}>
          {/* ps aux row */}
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs hover:bg-[#0f1318] transition-colors rounded"
            onClick={() => setExpanded(expanded === job.pid ? null : job.pid)}
          >
            <span className="text-[#4e5566] w-7 shrink-0 hidden sm:inline">{job.pid}</span>
            <span className="text-[#4e5566] w-12 shrink-0 hidden sm:inline">{job.cpu}</span>
            <span className="text-[#4e5566] w-14 shrink-0 hidden sm:inline">{job.mem}</span>
            <span
              className="w-16 shrink-0 hidden sm:inline"
              style={{ color: STATUS_COLOR[job.status] }}
            >
              {job.status}
            </span>
            <span className="text-[#4e5566] shrink-0 hidden md:inline">{job.start}</span>
            <span className="flex-1 font-bold" style={{ color: '#39c5cf' }}>
              {job.company}
              <span className="text-[#4e5566] font-normal ml-2">— {job.role}</span>
            </span>
            <ChevronRight
              size={14}
              className="shrink-0 text-[#2a2e38] transition-transform"
              style={{ transform: expanded === job.pid ? 'rotate(90deg)' : 'none' }}
            />
          </button>

          {expanded === job.pid && (
            <div className="px-4 pb-4 pt-1 border-t border-[#1a1f2e] fade-in space-y-3">
              <div className="flex gap-3 items-center text-xs">
                <span className="text-[#4e5566]">{job.start} → {job.end}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: `${STATUS_COLOR[job.status]}15`,
                    color: STATUS_COLOR[job.status],
                    border: `1px solid ${STATUS_COLOR[job.status]}40`,
                  }}
                >
                  {job.status}
                </span>
              </div>

              <p className="text-sm text-[#b3b1ad] leading-relaxed">{job.desc}</p>

              <div className="space-y-1.5">
                {job.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 text-xs text-[#4e5566]">
                    <span className="glow-green shrink-0">▸</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {job.stack.map(s => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 border border-[#1a1f2e] text-[#4e5566] rounded hover:border-[#39c5cf] hover:text-[#39c5cf] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="text-xs text-[#2a2e38] pt-1">
        4 processes listed  ·  click any row to inspect
      </div>
    </div>
  );
}
