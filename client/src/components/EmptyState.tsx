import { UserX, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "no-patients" | "no-results" | "error";
  onAction?: () => void;
}

export default function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = {
    "no-patients": {
      icon: UserX,
      title: "Belum Ada Pasien",
      description: "Belum ada pasien yang terdaftar dalam sistem rawat inap.",
      buttonText: "Daftarkan Pasien Baru",
      testId: "empty-no-patients"
    },
    "no-results": {
      icon: Search,
      title: "Tidak Ada Hasil",
      description: "Tidak ada pasien yang sesuai dengan pencarian Anda.",
      buttonText: "Bersihkan Pencarian",
      testId: "empty-no-results"
    },
    "error": {
      icon: UserX,
      title: "Gagal Memuat Data",
      description: "Terjadi kesalahan saat memuat data pasien. Silakan coba lagi.",
      buttonText: "Coba Lagi",
      testId: "empty-error"
    }
  };

  const { icon: Icon, title, description, buttonText, testId } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4" data-testid={testId}>
      <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">{description}</p>
      {onAction && (
        <Button onClick={onAction} variant="outline" className="gap-2" data-testid="button-empty-action">
          <Plus className="w-4 h-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
}