import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Mail, Check, Copy, Send, ArrowUpRight, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  id?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ id = 'contact' }) => {
  const [copied, setCopied] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const email = 'drapevangelist@gmail.com';

  const handleCopyEmail = async () => {
    soundEngine.playClick();
    let success = false;

    // Try modern navigator.clipboard first
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        success = true;
      } catch {
        // Fallback below if not focused or blocked by iframe permissions
      }
    }

    // Fallback using temporary textarea element and execCommand
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject || 'Inquiry regarding Web3 / Creative Collaboration')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id={id} className="border-t border-[#F5F3E8]/8 py-16 sm:py-20">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold mb-6">
          Get in touch
        </h2>

        <div className="rounded-3xl bg-[#061F11] border border-[#F5F3E8]/8 p-8 sm:p-12 shadow-2xl transition-all">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F3E8] leading-tight mb-3">
                Let's build something — Web3, AI, or creative.
              </h3>
              <p className="text-sm sm:text-base text-[#F5F3E8]/70 leading-relaxed">
                Available for Web3 community management, technical writing, IRL event coordination, AI tooling consulting, and creative collaborations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              {/* Primary Email Me Button */}
              <a
                href={`mailto:${email}?subject=Collaboration%20Inquiry`}
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#B7F34A] px-6 py-3.5 text-sm font-bold text-[#0B2E1A] hover:bg-[#CFFF6E] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#B7F34A]/10"
              >
                <Mail className="h-4 w-4" />
                <span>Email Me</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-[#6B8F71]/50 bg-transparent px-4 py-3.5 text-sm font-medium text-[#F5F3E8] hover:border-[#B7F34A] hover:text-[#B7F34A] transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#B7F34A]" />
                    <span className="text-[#B7F34A] text-xs font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#6B8F71]" />
                    <span className="text-xs">Copy Email</span>
                  </>
                )}
              </button>

              {/* Ghost Twitter Link */}
              <a
                href="https://x.com/drapevangelist1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#6B8F71]/50 bg-transparent px-5 py-3.5 text-sm font-medium text-[#F5F3E8] hover:border-[#B7F34A] hover:text-[#B7F34A] transition-all"
              >
                <span>@drapevangelist1</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* Toggle quick composer */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowComposer(!showComposer);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#6B8F71] hover:text-[#B7F34A] transition-colors ml-1 cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{showComposer ? 'Hide composer' : 'Quick note'}</span>
              </button>
            </div>
          </div>

          {/* Quick Message Composer Accordion */}
          {showComposer && (
            <form onSubmit={handleSendDraft} className="mt-8 pt-8 border-t border-[#F5F3E8]/8 animate-in fade-in duration-200">
              <h4 className="font-display text-sm font-bold text-[#F5F3E8] mb-3">
                Draft a direct message to Drapevangelist:
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Subject (e.g. Web3 Community Lead role / IRL Event / Music Collaboration)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl bg-[#14532D]/40 border border-[#F5F3E8]/10 px-4 py-3 text-sm text-[#F5F3E8] placeholder:text-[#6B8F71] focus:border-[#B7F34A] focus:outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Your message or project scope..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl bg-[#14532D]/40 border border-[#F5F3E8]/10 px-4 py-3 text-sm text-[#F5F3E8] placeholder:text-[#6B8F71] focus:border-[#B7F34A] focus:outline-none resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#B7F34A] px-5 py-2.5 text-xs font-bold text-[#0B2E1A] hover:bg-[#CFFF6E] transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Launch in Mail Client</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
