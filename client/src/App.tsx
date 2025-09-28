import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "./lib/queryClient";
import { Patient, InsertPatient } from "@shared/schema";

// Components
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import LoadingSpinner from "./components/LoadingSpinner";

// Mock data for demo - todo: remove mock functionality
const mockPatients: Patient[] = [
  {
    id: "1",
    nama: "Budi Santoso",
    nik: "3201012345678901",
    diagnosa: "Hipertensi dan Diabetes Mellitus Tipe 2",
    tanggalMasuk: new Date("2024-01-15"),
    dokterPenanggungJawab: "dr. Sarah Wijaya, Sp.PD",
    ruangan: "VIP 101"
  },
  {
    id: "2",
    nama: "Siti Rahayu",
    nik: "3201012345678902",
    diagnosa: "Pneumonia Komunitas",
    tanggalMasuk: new Date("2024-01-16"),
    dokterPenanggungJawab: "dr. Ahmad Rahman, Sp.P",
    ruangan: "Kelas 1A"
  },
  {
    id: "3",
    nama: "Joko Widodo",
    nik: "3201012345678903",
    diagnosa: "Post Operasi Appendektomi",
    tanggalMasuk: new Date("2024-01-14"),
    dokterPenanggungJawab: "dr. Lisa Permata, Sp.B",
    ruangan: "ICU 02"
  },
  {
    id: "4",
    nama: "Maya Sari",
    nik: "3201012345678904",
    diagnosa: "Gastritis Akut",
    tanggalMasuk: new Date("2024-01-17"),
    dokterPenanggungJawab: "dr. Rina Hartono, Sp.PD",
    ruangan: "Kelas 2B"
  },
  {
    id: "5",
    nama: "Andi Pratama",
    nik: "3201012345678905",
    diagnosa: "Fraktur Femur",
    tanggalMasuk: new Date("2024-01-13"),
    dokterPenanggungJawab: "dr. Bambang Sutrisno, Sp.OT",
    ruangan: "VIP 102"
  },
  {
    id: "6",
    nama: "Dewi Lestari",
    nik: "3201012345678906",
    diagnosa: "Stroke Iskemik",
    tanggalMasuk: new Date("2024-01-12"),
    dokterPenanggungJawab: "dr. Michael Tan, Sp.S",
    ruangan: "ICU 01"
  },
  {
    id: "7",
    nama: "Rahman Ali",
    nik: "3201012345678907",
    diagnosa: "Infark Miokard Akut",
    tanggalMasuk: new Date("2024-01-18"),
    dokterPenanggungJawab: "dr. Sari Indah, Sp.JP",
    ruangan: "ICCU 01"
  }
];

function HospitalApp() {
  const [currentView, setCurrentView] = useState<"form" | "list">("list");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Simulate loading mock data with delay - todo: remove mock functionality
  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setPatients(mockPatients);
      setIsLoading(false);
    };

    loadPatients();
  }, []);

  // Handle patient form submission - todo: replace with real API call
  const handlePatientSubmit = async (data: InsertPatient) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new patient with mock ID - todo: remove mock functionality
      const newPatient: Patient = {
        ...data,
        id: Date.now().toString(),
      };
      
      // Add to local state - todo: replace with API call
      setPatients(prev => [newPatient, ...prev]);
      
      // Show success message
      toast({
        title: "Berhasil!",
        description: `Pasien ${data.nama} berhasil didaftarkan`,
      });
      
      // Switch to patient list view
      setCurrentView("list");
      
    } catch (error) {
      console.error("Error submitting patient:", error);
      toast({
        title: "Gagal!",
        description: "Terjadi kesalahan saat mendaftarkan pasien",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle patient card/row click - todo: implement patient detail view
  const handlePatientClick = (patient: Patient) => {
    console.log("Patient clicked:", patient);
    toast({
      title: "Informasi Pasien",
      description: `Menampilkan detail untuk ${patient.nama}`,
    });
  };

  const handleAddNewPatient = () => {
    setCurrentView("form");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === "form" ? (
          <PatientForm
            onSubmit={handlePatientSubmit}
            isLoading={isSubmitting}
          />
        ) : (
          <PatientList
            patients={patients}
            isLoading={isLoading}
            onPatientClick={handlePatientClick}
            onAddNewPatient={handleAddNewPatient}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HospitalApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;