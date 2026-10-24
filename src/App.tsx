import React, { useEffect } from 'react';
import { EditorialNavbar } from './components/EditorialNavbar';
import { FullPageHeroVideo } from './components/FullPageHeroVideo';
import { HeroDocumentaryPlate } from './components/HeroDocumentaryPlate';
import { EditorialBioSection } from './components/EditorialBioSection';
import { ChaptersSection } from './components/ChaptersSection';
import { ProofOfWorkArchive } from './components/ProofOfWorkArchive';
import { PhotoMosaicSection } from './components/PhotoMosaicSection';
import { VisualProofsSection } from './components/VisualProofsSection';
import { SocialTestimonialsSection } from './components/SocialTestimonialsSection';
import { LatestUpdatesSection } from './components/LatestUpdatesSection';
import { ArchivalAiAgentSection } from './components/ArchivalAiAgentSection';
import { EditorialContactSection } from './components/EditorialContactSection';
import { EditorialFooter } from './components/EditorialFooter';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  useEffect(() => {
    // Autostart quiet ambient sound engine on first user interaction
    soundEngine.autoStart();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E2E1] relative flex flex-col font-inter selection:bg-[#D32F2F] selection:text-white">
      {/* Editorial Top Bar Navigation */}
      <EditorialNavbar
        onOpenContact={() => scrollTo('contact')}
      />

      {/* Main Single-Page Sequential Flow */}
      <main className="flex-1">
        {/* 1. Full-screen hero image on load with Mark Chinedum Daniel, DRAPEVANGELIST, Community Operations Manager */}
        <FullPageHeroVideo
          onScrollToBio={() => scrollTo('bio')}
          onOpenContact={() => scrollTo('contact')}
        />

        {/* 2. Scrolling down: Image moves up to reveal Bio Section */}
        <EditorialBioSection
          onExploreChapters={() => scrollTo('chapters')}
          onExploreProof={() => scrollTo('proof-of-work')}
        />

        {/* 2b. Another image at the end of the bio: Featured Documentary Dispatch Plate */}
        <div id="bio-plate">
          <HeroDocumentaryPlate
            onScrollToLedger={() => scrollTo('proof-of-work')}
            onScrollToAi={() => scrollTo('ai-agent')}
          />
        </div>

        {/* 3. Chapters: Education, Certificates, Events, Posts Held + Seven Chapters Timeline */}
        <ChaptersSection
          onScrollToProof={() => scrollTo('proof-of-work')}
        />

        {/* 4. Proof of Work: Impact stats + Verified Public Metrics 6-number board + 71 Records */}
        <ProofOfWorkArchive />

        {/* 5. Photojournalistic Mosaic: "Most Weeks, A Different Community" */}
        <div id="photo-mosaic">
          <PhotoMosaicSection
            onScrollToGallery={() => scrollTo('visual-proofs')}
          />
        </div>

        {/* 5b. Visual Proofs: Filterable Media Grid with High-Res Lightbox & Upload/Link Manager */}
        <VisualProofsSection />

        {/* 6. Testimonials with links from social media */}
        <SocialTestimonialsSection />

        {/* 7. Latest Updates: Timeline of important activities */}
        <LatestUpdatesSection />

        {/* 7b. "Ask Anything. Get Answers Fast." Archival AI Agent Terminal */}
        <ArchivalAiAgentSection />

        {/* 8. Connect Page & Closing Manifesto */}
        <EditorialContactSection />
      </main>

      {/* Editorial Footer */}
      <EditorialFooter />
    </div>
  );
}
