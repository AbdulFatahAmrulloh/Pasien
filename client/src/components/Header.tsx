import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, List, Menu } from "lucide-react";

interface HeaderProps {
  currentView: "form" | "list";
  onViewChange: (view: "form" | "list") => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-card-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-md">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Modul Rawat Inap</h1>
              <p className="text-sm text-muted-foreground">Sistem Manajemen Pasien</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === "form" ? "default" : "ghost"}
              onClick={() => onViewChange("form")}
              className="gap-2"
              data-testid="button-patient-form"
            >
              <UserPlus className="w-4 h-4" />
              Pasien Masuk
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              onClick={() => onViewChange("list")}
              className="gap-2"
              data-testid="button-patient-list"
            >
              <List className="w-4 h-4" />
              Daftar Pasien
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-card-border py-4">
            <nav className="flex flex-col gap-2">
              <Button
                variant={currentView === "form" ? "default" : "ghost"}
                onClick={() => {
                  onViewChange("form");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start gap-2"
                data-testid="button-mobile-patient-form"
              >
                <UserPlus className="w-4 h-4" />
                Pasien Masuk
              </Button>
              <Button
                variant={currentView === "list" ? "default" : "ghost"}
                onClick={() => {
                  onViewChange("list");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start gap-2"
                data-testid="button-mobile-patient-list"
              >
                <List className="w-4 h-4" />
                Daftar Pasien
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}