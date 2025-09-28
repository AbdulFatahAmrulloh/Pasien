import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Stethoscope, MapPin } from "lucide-react";
import { Patient } from "@shared/schema";

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
}

export default function PatientCard({ patient, onClick }: PatientCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer" 
      onClick={onClick}
      data-testid={`card-patient-${patient.id}`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-base" data-testid={`text-patient-name-${patient.id}`}>
                {patient.nama}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-patient-nik-${patient.id}`}>
                NIK: {patient.nik}
              </p>
            </div>
            <Badge variant="secondary" data-testid={`badge-room-${patient.id}`}>
              {patient.ruangan}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Stethoscope className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Diagnosa:</span>
              <span className="text-foreground font-medium" data-testid={`text-diagnosis-${patient.id}`}>
                {patient.diagnosa}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Dokter:</span>
              <span className="text-foreground font-medium" data-testid={`text-doctor-${patient.id}`}>
                {patient.dokterPenanggungJawab}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Tanggal Masuk:</span>
              <span className="text-foreground font-medium" data-testid={`text-admission-date-${patient.id}`}>
                {formatDate(patient.tanggalMasuk)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}