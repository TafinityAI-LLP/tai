import React, { useState, useEffect } from 'react';
import './TechHero.css';

// Realistic modern code snippets that cycle on the laptop screen
const CODE_SNIPPETS = [
  {
    filename: '⚛  index.jsx',
    tech: 'React 19 • Next.js',
    lines: [
      [
        { text: "import ", color: "pink" },
        { text: "React, { useState } " },
        { text: "from ", color: "pink" },
        { text: "'react'", color: "green" },
        { text: ";" }
      ],
      [
        { text: "import ", color: "pink" },
        { text: "{ motion } " },
        { text: "from ", color: "pink" },
        { text: "'framer-motion'", color: "green" },
        { text: ";" }
      ],
      [],
      [
        { text: "export default function ", color: "purple" },
        { text: "TafinityAI", color: "yellow" },
        { text: "() {" }
      ],
      [
        { text: "  return (" }
      ],
      [
        { text: "    <", color: "cyan" },
        { text: "main", color: "cyan" },
        { text: " className=" },
        { text: "\"min-h-screen\"", color: "yellow" },
        { text: ">", color: "cyan" }
      ],
      [
        { text: "      <", color: "cyan" },
        { text: "AIAutomation", color: "yellow" },
        { text: " active=", color: "pink" },
        { text: "{true}", color: "purple" },
        { text: " />", color: "cyan" }
      ],
      [
        { text: "      <", color: "cyan" },
        { text: "CloudScale", color: "yellow" },
        { text: " ppo=", color: "pink" },
        { text: "\"100%\"", color: "green" },
        { text: " />", color: "cyan" }
      ],
      [
        { text: "    </", color: "cyan" },
        { text: "main", color: "cyan" },
        { text: ">", color: "cyan" }
      ],
      [
        { text: "  );" }
      ],
      [
        { text: "}" }
      ]
    ]
  },
  {
    filename: '⚡  agentCore.ts',
    tech: 'TypeScript • Neural',
    lines: [
      [
        { text: "import ", color: "pink" },
        { text: "{ NeuralMesh, Agent } " },
        { text: "from ", color: "pink" },
        { text: "'@tafinity/ai'", color: "green" },
        { text: ";" }
      ],
      [],
      [
        { text: "export const ", color: "purple" },
        { text: "agent", color: "yellow" },
        { text: " = " },
        { text: "new ", color: "pink" },
        { text: "Agent({" }
      ],
      [
        { text: "  model: " },
        { text: "'tafinity-ultra-v3'", color: "green" },
        { text: "," }
      ],
      [
        { text: "  latency: " },
        { text: "'< 10ms Edge'", color: "green" },
        { text: "," }
      ],
      [
        { text: "  autoScale: " },
        { text: "true", color: "purple" },
        { text: "," }
      ],
      [
        { text: "  security: " },
        { text: "'Enterprise-NDA'", color: "yellow" }
      ],
      [
        { text: "});" }
      ],
      [],
      [
        { text: "await ", color: "pink" },
        { text: "agent." },
        { text: "deployProduction", color: "yellow" },
        { text: "();" }
      ]
    ]
  },
  {
    filename: '🚀  CloudDeploy.py',
    tech: 'Python 3.12 • Mesh',
    lines: [
      [
        { text: "from ", color: "pink" },
        { text: "tafinity_cluster " },
        { text: "import ", color: "pink" },
        { text: "Mesh, Pipeline", color: "yellow" }
      ],
      [],
      [
        { text: "class ", color: "purple" },
        { text: "EnterpriseSaaS", color: "yellow" },
        { text: ":" }
      ],
      [
        { text: "    def ", color: "purple" },
        { text: "__init__", color: "cyan" },
        { text: "(self):" }
      ],
      [
        { text: "        self.nodes = Mesh.spin_cluster()" }
      ],
      [
        { text: "        self.status = " },
        { text: "'LIVE_99.99%'", color: "green" }
      ],
      [],
      [
        { text: "pipeline = EnterpriseSaaS()" }
      ],
      [
        { text: "pipeline.dispatch_instant_scale()" }
      ]
    ]
  }
];

// Helper to render tokens up to char limit
function renderTokens(tokens, charLimit) {
  let remaining = charLimit;
  const elements = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (remaining <= 0) break;

    const visibleText = token.text.slice(0, remaining);
    remaining -= token.text.length;

    elements.push(
      <span key={i} className={token.color || ''}>
        {visibleText}
      </span>
    );
  }

  return elements;
}

const TechHero = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSnippet = CODE_SNIPPETS[snippetIndex];
  const currentLines = currentSnippet.lines;
  const activeLine = currentLines[currentLineIndex] || [];
  const activeLineTotalChars = activeLine.reduce((sum, token) => sum + token.text.length, 0);

  useEffect(() => {
    if (isPaused) {
      // Pause when snippet completes, then advance to next snippet
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
      }, 3200);
      return () => clearTimeout(pauseTimer);
    }

    // Typing tick
    const typingTimer = setTimeout(() => {
      if (currentCharIndex < activeLineTotalChars) {
        // Typing within the current line
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Line finished
        if (currentLineIndex + 1 < currentLines.length) {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          // All lines in snippet finished
          setIsPaused(true);
        }
      }
    }, activeLineTotalChars === 0 ? 60 : 38);

    return () => clearTimeout(typingTimer);
  }, [currentCharIndex, currentLineIndex, activeLineTotalChars, currentLines.length, isPaused]);

  return (
    <section className="tech-hero" aria-label="Premium technology illustration">
      <div className="scene">
        {/* Ambient lighting & orbits */}
        <div className="glow"></div>
        <div className="orbit one"></div>
        <div className="orbit two"></div>
        <span className="orb a"></span>
        <span className="orb b"></span>
        <span className="orb c"></span>

        {/* Desk Plant */}
        <div className="plant" aria-hidden="true">
          <span className="leaf l1"></span>
          <span className="leaf l2"></span>
          <span className="leaf l3"></span>
          <span className="leaf l4"></span>
          <span className="leaf l5"></span>
          <span className="pot"></span>
        </div>

        {/* 3D LAPTOP WITH LIVE TYPING CODE SCREEN */}
        <div className="laptop" aria-label="Laptop showing live coding IDE">
          <div className="screen">
            <div className="screenbar">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="filename">{currentSnippet.filename}</span>
              <span className="live-status">
                <span className={`live-dot ${isPaused ? 'compiled' : 'typing'}`} />
                {isPaused ? 'Compiled ✓' : 'Live Typing...'}
              </span>
            </div>

            <div className="editor">
              <div className="files">
                <strong>▾ tafinity-ai</strong>
                　📁 src<br />
                　📁 agents<br />
                　📁 cloud<br />
                　📁 api<br />
                　⚛ index.jsx<br />
                　⚡ aiAgent.ts<br />
                　🚀 CloudDeploy.py<br />
                　▤ package.json
              </div>

              {/* Code Screen with Live Typing & Line Numbers */}
              <div className="code-container">
                <div className="line-numbers">
                  {currentLines.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`line-num ${idx === currentLineIndex ? 'active' : ''}`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  ))}
                </div>

                <div className="code">
                  {currentLines.map((lineTokens, lineIdx) => {
                    const isCompletedLine = lineIdx < currentLineIndex;
                    const isCurrentLine = lineIdx === currentLineIndex;

                    if (isCompletedLine) {
                      return (
                        <div key={lineIdx} className="code-line">
                          {renderTokens(lineTokens, 9999)}
                        </div>
                      );
                    }

                    if (isCurrentLine) {
                      return (
                        <div key={lineIdx} className="code-line current">
                          {renderTokens(lineTokens, currentCharIndex)}
                          <span className="typing-cursor"></span>
                        </div>
                      );
                    }

                    return <div key={lineIdx} className="code-line empty">&nbsp;</div>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="laptop-base"></div>
          <div className="trackpad"></div>
        </div>

        {/* ULTRA-PREMIUM EXTERNAL KEYBOARD ON DESK */}
        <div className="desk-keyboard" aria-hidden="true">
          <div className="keyboard-chassis">
            <div className="kb-top-bar">
              <span className="kb-brand">TAFINITY PRO</span>
              <span className="kb-led"></span>
            </div>
            <div className="kb-keys">
              {/* Row 1: Function row */}
              <div className="kb-row">
                <span className="key f-key">Esc</span>
                <span className="key f-key">F1</span>
                <span className="key f-key">F2</span>
                <span className="key f-key">F3</span>
                <span className="key f-key">F4</span>
                <span className="key f-key">F5</span>
                <span className="key f-key">F6</span>
                <span className="key f-key">F7</span>
                <span className="key f-key">F8</span>
                <span className="key f-key">F9</span>
                <span className="key f-key">F10</span>
                <span className="key f-key">F11</span>
                <span className="key f-key">F12</span>
                <span className="key f-key del">Del</span>
              </div>
              {/* Row 2: Number row */}
              <div className="kb-row">
                <span className="key">~</span>
                <span className="key">1</span>
                <span className="key">2</span>
                <span className="key">3</span>
                <span className="key">4</span>
                <span className="key">5</span>
                <span className="key">6</span>
                <span className="key">7</span>
                <span className="key">8</span>
                <span className="key">9</span>
                <span className="key">0</span>
                <span className="key">-</span>
                <span className="key">=</span>
                <span className="key backspace">Bksp</span>
              </div>
              {/* Row 3: QWERTY */}
              <div className="kb-row">
                <span className="key tab">Tab</span>
                <span className="key">Q</span>
                <span className="key">W</span>
                <span className="key">E</span>
                <span className="key">R</span>
                <span className="key">T</span>
                <span className="key">Y</span>
                <span className="key">U</span>
                <span className="key">I</span>
                <span className="key">O</span>
                <span className="key">P</span>
                <span className="key">[</span>
                <span className="key">]</span>
                <span className="key">\</span>
              </div>
              {/* Row 4: Home row */}
              <div className="kb-row">
                <span className="key caps">Caps</span>
                <span className="key">A</span>
                <span className="key">S</span>
                <span className="key">D</span>
                <span className="key">F</span>
                <span className="key">G</span>
                <span className="key">H</span>
                <span className="key">J</span>
                <span className="key">K</span>
                <span className="key">L</span>
                <span className="key">;</span>
                <span className="key">'</span>
                <span className="key enter">Enter</span>
              </div>
              {/* Row 5: Shift row */}
              <div className="kb-row">
                <span className="key shift-l">Shift</span>
                <span className="key">Z</span>
                <span className="key">X</span>
                <span className="key">C</span>
                <span className="key">V</span>
                <span className="key">B</span>
                <span className="key">N</span>
                <span className="key">M</span>
                <span className="key">,</span>
                <span className="key">.</span>
                <span className="key">/</span>
                <span className="key shift-r">Shift</span>
              </div>
              {/* Row 6: Bottom row with Spacebar */}
              <div className="kb-row">
                <span className="key mod">Ctrl</span>
                <span className="key mod">Opt</span>
                <span className="key mod">Cmd</span>
                <span className="key spacebar"></span>
                <span className="key mod">Cmd</span>
                <span className="key mod">Opt</span>
                <span className="key arrow">◄</span>
                <span className="key arrow">▲</span>
                <span className="key arrow">▼</span>
                <span className="key arrow">►</span>
              </div>
            </div>
          </div>
        </div>

        {/* ULTRA-PREMIUM ERGONOMIC MOUSE ON DESK */}
        <div className="desk-mouse" aria-hidden="true">
          <div className="mouse-body">
            <div className="mouse-left-click"></div>
            <div className="mouse-right-click"></div>
            <div className="mouse-wheel"></div>
            <div className="mouse-led"></div>
          </div>
          <div className="mouse-shadow"></div>
        </div>

        {/* FLOATING PERFORMANCE & TECH BADGES */}
        <div className="badge performance">
          <div>
            <div>Optimized<br />Performance</div>
            <div className="mini-bars">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>

        <div className="badge tech">
          <span className="icon">‹/›</span>
          <span>Modern<br />Technologies</span>
        </div>

        <div className="badge scale">
          <span className="icon">↗</span>
          <span>Scalable<br />Solutions</span>
        </div>
      </div>
    </section>
  );
};

export default TechHero;
