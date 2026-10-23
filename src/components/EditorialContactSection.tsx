import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { Mail, Check, Copy, ArrowUpRight, Send } from 'lucide-react';

export const EditorialContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactContent, setContactContent] = useState(() => curationStore.getLiveContent().contact);

  useEffect(() => {
    const unsub = curationStore.subscribe(() => {
      setContactContent(curationStore.getLiveContent().contact);
    });
    return unsub;
  }, []);

  const email = contactContent.email || 'drapevangelist@gmail.com';

  const copyEmail = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-[#262626] bg-[#0A0A0A] text-[#E5E2E1]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Closing Manifesto & Call to Action */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16 pb-14 border-b border-[#262626]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D32F2F] font-bold block">
            THE CLOSING DISPATCH
          </span>
          <h2 className="font-oswald text-5xl sm:text-7xl lg:text-8xl leading-[0.88] uppercase font-bold text-[#FFFFFF] tracking-tight whitespace-pre-line">
            {contactContent.manifestoTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#8E9192] max-w-2xl mx-auto pt-2 leading-relaxed font-inter">
            {contactContent.manifestoBody}
          </p>

          {/* Direct Network Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-xs uppercase text-[#C4C7C7] tracking-widest">
            <span className="flex items-center gap-2 text-[#FFFFFF] font-bold">
              <span className="w-2 h-2 bg-[#D32F2F]"></span> BASE BUILDERS
            </span>
            <span className="flex items-center gap-2 text-[#FFFFFF] font-bold">
              <span className="w-2 h-2 bg-[#D32F2F]"></span> MOVEMENT NETWORK
            </span>
            <span className="flex items-center gap-2 text-[#FFFFFF] font-bold">
              <span className="w-2 h-2 bg-[#D32F2F]"></span> BLOCKCHAIN UNIPORT
            </span>
            <span className="flex items-center gap-2 text-[#FFFFFF] font-bold">
              <span className="w-2 h-2 bg-[#D32F2F]"></span> ETHNIGERIA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Inquiries & Verified Channels */}
          <div className="lg:col-span-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D32F2F] font-bold mb-2 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#D32F2F]" />
              <span>DIRECT INQUIRIES & ADVISORY</span>
            </div>

            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#FFFFFF]">
              Connect & Collaborate
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#8E9192] leading-relaxed max-w-lg font-inter">
              {contactContent.channelsSubtext}
            </p>

            {/* Direct Email Card */}
            <div className="mt-8 p-5 bg-[#131313] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#757575] block font-bold">Direct Electronic Mail</span>
                <span className="text-base sm:text-lg font-mono text-[#FFFFFF] mt-0.5 block font-bold">{email}</span>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider bg-[#0A0A0A] border border-[#262626] hover:border-[#D32F2F] text-[#FFFFFF] hover:text-[#D32F2F] transition-colors cursor-pointer self-start sm:self-center"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#D32F2F]" />
                    <span className="text-[#D32F2F] font-bold">Copied Address</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Verified Public Channels */}
            <div className="mt-8">
              <div className="text-xs font-mono uppercase tracking-wider text-[#757575] mb-3 font-bold">
                Verified Social & Publishing Channels
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[...SOCIAL_LINKS.web3, ...SOCIAL_LINKS.web2].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#131313] border border-[#262626] hover:border-[#D32F2F] transition-colors group block"
                  >
                    <div className="flex items-center justify-between text-xs text-[#FFFFFF] font-bold font-oswald uppercase tracking-wider group-hover:text-[#D32F2F]">
                      <span>{s.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 text-[#D32F2F]" />
                    </div>
                    <div className="text-[11px] font-mono text-[#757575] mt-1 truncate">
                      {s.handle}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Broadsheet Direct Dispatch Form */}
          <div className="lg:col-span-6 bg-[#131313] border border-[#262626] p-7 sm:p-9 shadow-2xl">
            <h3 className="font-oswald text-2xl uppercase font-bold text-[#FFFFFF]">
              Transmit a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-[#8E9192] mt-1.5 font-inter mb-6">
              Send a note regarding ecosystem collaborations, campus workshops, or speaking requests.
            </p>

            {formSent ? (
              <div className="p-6 bg-[#0A0A0A] border border-[#D32F2F] text-center space-y-3">
                <div className="h-10 w-10 bg-[#1A1A1A] text-[#D32F2F] flex items-center justify-center mx-auto border border-[#262626]">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">Message Dispatched</h4>
                <p className="text-xs text-[#8E9192] font-inter">
                  Thank you for reaching out. Drapevangelist will review your communication shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 text-xs font-mono uppercase tracking-wider text-[#FFFFFF] hover:text-[#D32F2F] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] mb-1.5 font-bold">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera (Base Ecosystem)"
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#262626] text-sm text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F] font-inter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] mb-1.5 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@protocol.org"
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#262626] text-sm text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F] font-inter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] mb-1.5 font-bold">
                    Collaboration Scope / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your initiative, campus workshop request, or project inquiry..."
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#262626] text-sm text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F] font-inter resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#FFFFFF]"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Communication</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
