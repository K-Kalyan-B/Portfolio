import { useState } from 'react';
import TerminalWindow from './components/TerminalWindow';
import BootSequence from './components/BootSequence';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#b3b1ad] font-mono overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 scanlines" />
      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : (
        <TerminalWindow />
      )}
    </div>
  );
}
