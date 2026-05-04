"use client";

import React, { useState, useMemo } from 'react';
import { createTheme, ThemeProvider as BWThemeProvider } from '@mui/material/styles';

// Import components
import Hero from "./Hero";
import TokenizationProcess from "./TokenizationProcess";
import IssuerSection from "./IssuerSection";
import HowToTokenize from "./HowToTokenize";
import TokenDistribution from "./TokenDistribution";
import TokenManagement from "./TokenManagement";
import FAQSection from "./FAQSection";
import FinalCTA from "./FinalCTA";
import CreateAssetModal from "./tokenizationDemo";

export default function TokenizationContent() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const bwTheme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#ffffff' },
      background: { default: '#000000', paper: '#000000' },
      text: { primary: '#ffffff', secondary: '#aaaaaa' },
    },
  }), []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TokenizationProcess onLaunchCreator={openCreateModal} />
      <IssuerSection />
      <HowToTokenize />
      <TokenDistribution />
      <TokenManagement />
      <FAQSection />
      <FinalCTA />

      {/* The Modal remains in the parent component */}
      <BWThemeProvider theme={bwTheme}>
        <CreateAssetModal open={isCreateModalOpen} onClose={closeCreateModal} />
      </BWThemeProvider>
    </div>
  );
}
