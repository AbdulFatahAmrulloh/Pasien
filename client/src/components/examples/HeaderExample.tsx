import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [currentView, setCurrentView] = useState<"form" | "list">("form");

  return (
    <Header 
      currentView={currentView} 
      onViewChange={setCurrentView}
    />
  );
}