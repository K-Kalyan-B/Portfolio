import { useState, FormEvent } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, Terminal } from 'lucide-react';

const LINKS = [
  { icon: Github,   label: 'github',   value: 'github.com/K-Kalyan-B',         href: '#', color: '#b3b1ad' },
  { icon: Linkedin, label: 'linkedin', value: 'linkedin.com/in/kalyan-kakarapathi',     href: '#', color: '#79c0ff' },
  { icon: Twitter,  label: 'twitter',  value: '-',                 href: '#', color: '#39c5cf' },
  { icon: Mail,     label: 'email',    value: 'khlvn2005@gmail.com', href: 'mailto:khlvn2005@gmail.com', color: '#7ee787' },
];

export default function ContactSection() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="space-y-4 slide-in">
        <div className="text-xs text-[#4e5566]"># ssh handshake complete</div>
        <div className="bg-[#0c1015] border border-[#1e2433] rounded p-6 space-y-3">
          <div className="glow-green text-sm font-bold">Connection established!</div>
          <div className="text-xs text-[#4e5566] space-y-1">
            <div>Encrypted tunnel: <span className="text-[#7ee787]">TLS 1.3</span></div>
            <div>Message delivered to: <span className="text-[#39c5cf]">khlvn2005@gmail.com</span></div>
            <div>Response time: <span className="text-[#f9c74f]">typically &lt; 24h</span></div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setFields({ name: '', email: '', subject: '', message: '' }); }}
            className="text-xs text-[#39c5cf] hover:text-[#7ee787] transition-colors mt-2"
          >
            # send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 slide-in">
      <div className="text-xs text-[#4e5566]">
        # Output of: <span className="glow-cyan">ssh -v khlvn2005@gmail.com</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="text-xs text-[#4e5566]"># compose encrypted message</div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { key: 'name',    placeholder: 'Your name',    type: 'text'  },
              { key: 'email',   placeholder: 'Your email',   type: 'email' },
              { key: 'subject', placeholder: 'Subject',      type: 'text'  },
            ].map(({ key, placeholder, type }) => (
              <div key={key} className="space-y-1">
                <div className="text-xs text-[#2a2e38]">{key}:</div>
                <div
                  className="flex items-center gap-2 border rounded px-3 py-2 transition-all"
                  style={{
                    background: '#0c1015',
                    borderColor: focusedField === key ? '#39c5cf' : '#1a1f2e',
                    boxShadow: focusedField === key ? '0 0 10px rgba(57,197,207,0.1)' : 'none',
                  }}
                >
                  <span className="text-[#2a2e38] text-xs shrink-0">$</span>
                  <input
                    type={type}
                    value={fields[key as keyof typeof fields]}
                    onChange={e => setFields(prev => ({ ...prev, [key]: e.target.value }))}
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={placeholder}
                    className="bg-transparent border-none outline-none text-sm text-[#b3b1ad] placeholder-[#2a2e38] w-full font-mono"
                  />
                </div>
              </div>
            ))}

            <div className="space-y-1">
              <div className="text-xs text-[#2a2e38]">message:</div>
              <div
                className="border rounded px-3 py-2 transition-all"
                style={{
                  background: '#0c1015',
                  borderColor: focusedField === 'message' ? '#39c5cf' : '#1a1f2e',
                  boxShadow: focusedField === 'message' ? '0 0 10px rgba(57,197,207,0.1)' : 'none',
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-[#2a2e38] text-xs shrink-0 mt-0.5">$</span>
                  <textarea
                    value={fields.message}
                    onChange={e => setFields(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your message..."
                    rows={4}
                    className="bg-transparent border-none outline-none text-sm text-[#b3b1ad] placeholder-[#2a2e38] w-full font-mono resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-[#7ee787] text-[#7ee787] rounded hover:bg-[#7ee787] hover:text-[#0a0e14] transition-all duration-200 disabled:opacity-50"
              style={{ textShadow: sending ? 'none' : '0 0 8px rgba(126,231,135,0.4)' }}
            >
              {sending ? (
                <>
                  <span className="animate-spin inline-block w-3 h-3 border border-[#7ee787] border-t-transparent rounded-full" />
                  Establishing tunnel...
                </>
              ) : (
                <>
                  <Send size={13} />
                  ssh-keygen &amp;&amp; send
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <div className="text-xs text-[#4e5566]"># available endpoints</div>
          <div className="space-y-2">
            {LINKS.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 px-3 py-3 bg-[#0c1015] border border-[#1a1f2e] rounded hover:border-[#39c5cf] transition-all group"
              >
                <Icon size={14} style={{ color }} className="shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(57,197,207,0.5)]" />
                <span className="text-xs text-[#4e5566] w-16 shrink-0">{label}</span>
                <span className="text-sm font-mono" style={{ color }} >{value}</span>
              </a>
            ))}
          </div>

          <div className="bg-[#0c1015] border border-[#1a1f2e] rounded p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#4e5566]">
              <Terminal size={11} />
              <span>connection info</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex gap-2">
                <span className="text-[#2a2e38] w-24">protocol</span>
                <span className="text-[#7ee787]">TLS 1.3</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#2a2e38] w-24">response time</span>
                <span className="text-[#f9c74f]">&lt; 24 hours</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#2a2e38] w-24">timezone</span>
                <span className="text-[#b3b1ad]">PST (UTC-8)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#2a2e38] w-24">status</span>
                <span className="flex items-center gap-1.5 text-[#7ee787]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787] animate-pulse" />
                  accepting connections
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
