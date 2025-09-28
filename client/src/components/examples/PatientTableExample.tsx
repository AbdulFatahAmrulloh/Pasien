import PatientTable from "../PatientTable";
import { Patient } from "@shared/schema";

export default function PatientTableExample() {
  const mockPatients: Patient[] = [
    {
      id: "1",
      nama: "Budi Santoso",
      nik: "3201012345678901",
      diagnosa: "Hipertensi dan Diabetes Mellitus",
      tanggalMasuk: new Date("2024-01-15"),
      dokterPenanggungJawab: "dr. Sarah Wijaya, Sp.PD",
      ruangan: "VIP 101"
    },
    {
      id: "2", 
      nama: "Siti Rahayu",
      nik: "3201012345678902",
      diagnosa: "Pneumonia",
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
    }
  ];

  return (
    <div className="p-6">
      <PatientTable 
        patients={mockPatients}
        onPatientClick={(patient) => console.log("Clicked patient:", patient.nama)}
      />
    </div>
  );
}