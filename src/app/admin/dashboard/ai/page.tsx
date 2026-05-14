'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const suggestions = [
  'Draft a follow-up email for a student who hasn\'t responded in 3 days',
  'Write a WhatsApp message to a new lead interested in Malaysia',
  'Summarise the benefits of studying at APU vs Sunway University',
  'Write an offer letter acceptance congratulations message',
  'What documents are needed for a Malaysian student visa?',
  'Draft a scholarship application tips message for students',
];

function formatTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export default function AdminAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm your EduSpark AI Assistant. I can help you draft emails, follow-up messages, summarise student info, write WhatsApp messages, and answer questions about universities and visa processes. What do you need?",
      time: formatTime(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are EduSpark AI — a helpful assistant for the EduSpark International Study admin team. EduSpark is a Bangladeshi education consultancy helping students study abroad (primarily Malaysia, UK, Australia, Canada, USA, Europe). You help admins: draft emails and WhatsApp messages, write follow-ups for leads, summarise student profiles, explain visa processes, compare universities, and suggest scholarship options. Keep responses concise, professional, and tailored to the education consultancy context. Use emojis sparingly.`,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response. Please try again.';

      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_ai',
        role: 'assistant',
        content: reply,
        time: formatTime(),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_err',
        role: 'assistant',
        content: '⚠️ Connection error. Please check your internet and try again.',
        time: formatTime(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const copyMsg = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearChat = () => {
    setMessages([{
      id: '0', role: 'assistant',
      content: "Chat cleared. How can I help you?",
      time: formatTime(),
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <style>{`
        .ai-page { display: flex; flex-direction: column; height: calc(100vh - 64px); max-height: calc(100vh - 64px); }
        .ai-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-shrink: 0; }
        .ai-title-wrap { display: flex; align-items: center; gap: 12px; }
        .ai-title-icon { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #0b3d91, #a855f7); display: flex; align-items: center; justify-content: center; }
        .ai-title { font-size: 1.3rem; font-weight: 800; color: #fff; margin: 0; }
        .ai-sub { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin-top: 2px; }
        .ai-clear-btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.5); font-size: 0.78rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: 0.2s; }
        .ai-clear-btn:hover { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.8); }

        .ai-body { display: flex; gap: 20px; flex: 1; min-height: 0; }

        /* Chat */
        .ai-chat-wrap { flex: 1; display: flex; flex-direction: column; min-height: 0; }
        .ai-messages { flex: 1; overflow-y: auto; padding: 4px 0 16px; display: flex; flex-direction: column; gap: 16px; }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 100px; }

        .ai-msg { display: flex; gap: 10px; align-items: flex-start; }
        .ai-msg.user { flex-direction: row-reverse; }
        .ai-msg-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ai-msg-icon.bot { background: linear-gradient(135deg, #0b3d91, #a855f7); }
        .ai-msg-icon.user { background: linear-gradient(135deg, #ff7a00, #ff9d40); }

        .ai-bubble-wrap { display: flex; flex-direction: column; max-width: 75%; }
        .ai-msg.user .ai-bubble-wrap { align-items: flex-end; }

        .ai-bubble {
          padding: 12px 16px; border-radius: 16px;
          font-size: 0.875rem; line-height: 1.7;
          white-space: pre-wrap; word-break: break-word;
        }
        .ai-bubble.bot { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); border-radius: 4px 16px 16px 16px; }
        .ai-bubble.user { background: rgba(11,61,145,0.5); border: 1px solid rgba(11,61,145,0.6); color: #fff; border-radius: 16px 4px 16px 16px; }

        .ai-msg-footer { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .ai-msg-time { font-size: 0.65rem; color: rgba(255,255,255,0.25); }
        .ai-copy-btn { display: flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 6px; font-size: 0.65rem; font-weight: 600; cursor: pointer; border: none; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); font-family: inherit; transition: 0.2s; }
        .ai-copy-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }

        /* Typing indicator */
        .ai-typing { display: flex; gap: 4px; align-items: center; padding: 14px 16px; }
        .ai-typing-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); animation: typingBounce 1.2s ease-in-out infinite; }
        .ai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); opacity:0.4; } 30% { transform: translateY(-6px); opacity:1; } }

        /* Input */
        .ai-input-wrap {
          display: flex; gap: 10px; align-items: flex-end;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; margin-top: 12px; flex-shrink: 0;
        }
        .ai-textarea {
          flex: 1; background: transparent; border: none; outline: none;
          color: #fff; font-size: 0.88rem; font-family: inherit; resize: none;
          max-height: 150px; line-height: 1.5;
        }
        .ai-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .ai-send-btn { width: 36px; height: 36px; border-radius: 10px; background: #0b3d91; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: 0.2s; }
        .ai-send-btn:hover { background: #1a56c4; transform: scale(1.05); }
        .ai-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        /* Sidebar */
        .ai-sidebar { width: 240px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
        .ai-sug-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px; }
        .ai-sug-title { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
        .ai-sug-btn { width: 100%; text-align: left; padding: 9px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 9px; color: rgba(255,255,255,0.55); font-size: 0.78rem; font-family: inherit; cursor: pointer; margin-bottom: 6px; line-height: 1.4; transition: 0.2s; }
        .ai-sug-btn:last-child { margin-bottom: 0; }
        .ai-sug-btn:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.15); }

        .ai-info-card { background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.2); border-radius: 14px; padding: 16px; }
        .ai-info-title { font-size: 0.78rem; font-weight: 700; color: #c084fc; margin-bottom: 8px; }
        .ai-info-text { font-size: 0.75rem; color: rgba(255,255,255,0.4); line-height: 1.6; }

        @media (max-width: 900px) {
          .ai-sidebar { display: none; }
          .ai-body { gap: 0; }
        }
      `}</style>

      <div className="ai-header">
        <div className="ai-title-wrap">
          <div className="ai-title-icon"><Bot size={20} color="#fff" /></div>
          <div>
            <h1 className="ai-title">AI Assistant</h1>
            <p className="ai-sub">Powered by Claude · EduSpark context included</p>
          </div>
        </div>
        <button className="ai-clear-btn" onClick={clearChat}>
          <RefreshCw size={12} /> Clear Chat
        </button>
      </div>

      <div className="ai-body">
        {/* Chat */}
        <div className="ai-chat-wrap">
          <div className="ai-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ai-msg ${msg.role}`}>
                <div className={`ai-msg-icon ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                  {msg.role === 'assistant' ? <Bot size={14} color="#fff" /> : <User size={14} color="#fff" />}
                </div>
                <div className="ai-bubble-wrap">
                  <div className={`ai-bubble ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                    {msg.content}
                  </div>
                  <div className="ai-msg-footer">
                    <span className="ai-msg-time">{msg.time}</span>
                    {msg.role === 'assistant' && (
                      <button className="ai-copy-btn" onClick={() => copyMsg(msg.id, msg.content)}>
                        {copied === msg.id ? <><Check size={9} /> Copied</> : <><Copy size={9} /> Copy</>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-msg">
                <div className="ai-msg-icon bot"><Bot size={14} color="#fff" /></div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 16px 16px 16px' }}>
                  <div className="ai-typing">
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="ai-input-wrap">
            <textarea
              ref={textareaRef}
              className="ai-textarea"
              rows={1}
              placeholder="Ask anything — draft emails, follow-ups, visa info, university comparisons..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="ai-send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="ai-sidebar">
          <div className="ai-sug-card">
            <div className="ai-sug-title"><Sparkles size={11} /> Suggestions</div>
            {suggestions.map((s, i) => (
              <button key={i} className="ai-sug-btn" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
          <div className="ai-info-card">
            <div className="ai-info-title">✨ What I can do</div>
            <div className="ai-info-text">
              Draft emails & WhatsApp messages<br />
              Follow-up templates for leads<br />
              University comparisons<br />
              Visa process guidance<br />
              Scholarship suggestions<br />
              Student profile summaries
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
