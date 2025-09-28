import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";
import { Patient } from "@shared/schema";
import PatientCard from "./PatientCard";

interface PatientTableProps {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
}

type SortField = "nama" | "tanggalMasuk" | "ruangan" | "dokterPenanggungJawab";
type SortDirection = "asc" | "desc";

export default function PatientTable({ patients, onPatientClick }: PatientTableProps) {
  const [sortField, setSortField] = useState<SortField>("tanggalMasuk");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortField) {
      case "nama":
        aValue = a.nama.toLowerCase();
        bValue = b.nama.toLowerCase();
        break;
      case "tanggalMasuk":
        aValue = new Date(a.tanggalMasuk);
        bValue = new Date(b.tanggalMasuk);
        break;
      case "ruangan":
        aValue = a.ruangan.toLowerCase();
        bValue = b.ruangan.toLowerCase();
        break;
      case "dokterPenanggungJawab":
        aValue = a.dokterPenanggungJawab.toLowerCase();
        bValue = b.dokterPenanggungJawab.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-auto p-2 justify-start font-semibold hover-elevate"
      data-testid={`button-sort-${field}`}
    >
      <span>{children}</span>
      {sortField === field ? (
        sortDirection === "asc" ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1" />
        )
      ) : (
        <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />
      )}
    </Button>
  );

  return (
    <div className="space-y-4" data-testid="patient-table">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-card border border-card-border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-muted/50 border-b border-card-border">
            <div className="grid grid-cols-5 gap-4 p-4">
              <SortButton field="nama">Nama Pasien</SortButton>
              <SortButton field="tanggalMasuk">Tanggal Masuk</SortButton>
              <SortButton field="dokterPenanggungJawab">Dokter</SortButton>
              <SortButton field="ruangan">Ruangan</SortButton>
              <div className="font-semibold text-foreground p-2">Diagnosa</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-card-border">
            {sortedPatients.map((patient) => (
              <div
                key={patient.id}
                className="grid grid-cols-5 gap-4 p-4 hover-elevate cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
                data-testid={`row-patient-${patient.id}`}
              >
                <div>
                  <p className="font-medium text-foreground" data-testid={`text-name-${patient.id}`}>
                    {patient.nama}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-nik-${patient.id}`}>
                    NIK: {patient.nik}
                  </p>
                </div>
                <div className="text-foreground" data-testid={`text-date-${patient.id}`}>
                  {formatDate(patient.tanggalMasuk)}
                </div>
                <div className="text-foreground" data-testid={`text-doctor-${patient.id}`}>
                  {patient.dokterPenanggungJawab}
                </div>
                <div className="text-foreground" data-testid={`text-room-${patient.id}`}>
                  {patient.ruangan}
                </div>
                <div className="text-foreground" data-testid={`text-diagnosis-${patient.id}`}>
                  {patient.diagnosa}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden grid gap-4">
        {sortedPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => onPatientClick?.(patient)}
          />
        ))}
      </div>
    </div>
  );
}