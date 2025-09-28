import PatientCard from "../PatientCard";
import { Patient } from "@shared/schema";

export default function PatientCardExample() {
  const mockPatient: Patient = {
    id: "1",
    nama: "Budi Santoso",
    nik: "3201012345678901",
    diagnosa: "Hipertensi dan Diabetes Mellitus Tipe 2",
    tanggalMasuk: new Date("2024-01-15"),
    dokterPenanggungJawab: "dr. Sarah Wijaya, Sp.PD",
    ruangan: "VIP 101"
  };

  return (
    <div className="p-6 max-w-md">
      <PatientCard 
        patient={mockPatient}
        onClick={() => console.log("Patient card clicked:", mockPatient.nama)}
      />
    </div>
  );
}