import { useState } from "react";
import PatientList from "../PatientList";
import { Patient } from "@shared/schema";

export default function PatientListExample() {
  const [isLoading, setIsLoading] = useState(false);

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
    }
  ];

  return (
    <div className="p-6">
      <PatientList
        patients={mockPatients}
        isLoading={isLoading}
        onPatientClick={(patient) => console.log("Patient clicked:", patient.nama)}
        onAddNewPatient={() => console.log("Add new patient clicked")}
      />
    </div>
  );
}