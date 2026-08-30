import React, { useState } from 'react';
import { PageMode, ProjectItem } from './types';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Mascot } from './components/Mascot';
import { AudioToggle } from './components/AudioToggle';
import { Web3View } from './components/Web3View';
import { Web2View } from './components/Web2View';
import { ProjectModal } from './components/ProjectModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageMode>('web3');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2E1A] text-[#F5F3E8] relative flex flex-col font-sans selection:bg-[#B7F34A] selection:text-[#0B2E1A]">
      {/* 0-100% Preloader on first load */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Interactive Hide-and-Seek Mascot */}
      <Mascot />

      {/* Sticky Top Navigation with dual-mode switch */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onOpenContact={scrollToContact}
      />

      {/* Main Dynamic View Content (Web3 or Web2) */}
      <main className="flex-1">
        {currentPage === 'web3' ? (
          <Web3View onSelectProject={setSelectedProject} />
        ) : (
          <Web2View onSelectProject={setSelectedProject} />
        )}

        {/* Shared Contact Card */}
        <ContactSection id="contact" />
      </main>

      {/* Bottom Left Floating Audio Toggle & Equalizer */}
      <AudioToggle />

      {/* Footer */}
      <Footer />

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
