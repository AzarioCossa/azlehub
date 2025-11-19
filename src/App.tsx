import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardHome } from '@/pages/DashboardHome';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';

function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = TOOLS_REGISTRY.find(t => t.id === activeToolId);

  // Renderiza o componente da ferramenta ou a dashboard
  const renderContent = () => {
    if (activeTool) {
      const ToolComponent = activeTool.component;
      return <ToolComponent />;
    }
    return <DashboardHome onNavigate={setActiveToolId} />;
  };

  return (
    <MainLayout activeToolId={activeToolId} onNavigate={setActiveToolId}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;