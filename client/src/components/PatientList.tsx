import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Patient } from "@shared/schema";
import SearchBar from "./SearchBar";
import PatientTable from "./PatientTable";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

interface PatientListProps {
  patients: Patient[];
  isLoading?: boolean;
  onPatientClick?: (patient: Patient) => void;
  onAddNewPatient?: () => void;
}

export default function PatientList({ 
  patients, 
  isLoading = false, 
  onPatientClick,
  onAddNewPatient 
}: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = 
        patient.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.nik.includes(searchQuery);
      
      const matchesRoom = roomFilter === "all" || patient.ruangan === roomFilter;
      
      return matchesSearch && matchesRoom;
    });
  }, [patients, searchQuery, roomFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  // Get unique rooms for filter
  const rooms = useMemo(() => {
    const uniqueRooms = Array.from(new Set(patients.map(p => p.ruangan)));
    return uniqueRooms.sort();
  }, [patients]);

  const handleSearchClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleRoomFilterChange = (value: string) => {
    setRoomFilter(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner text="Memuat daftar pasien..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-md">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">Daftar Pasien Aktif</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {patients.length} pasien terdaftar dalam sistem
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {filteredPatients.length} hasil
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleSearchClear}
                placeholder="Cari nama atau NIK pasien..."
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={roomFilter} onValueChange={handleRoomFilterChange}>
                <SelectTrigger className="w-48" data-testid="select-room-filter">
                  <SelectValue placeholder="Filter ruangan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Ruangan</SelectItem>
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          {(searchQuery || roomFilter !== "all") && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Menampilkan {filteredPatients.length} dari {patients.length} pasien
              </span>
              {searchQuery && (
                <Badge variant="outline">
                  Pencarian: "{searchQuery}"
                </Badge>
              )}
              {roomFilter !== "all" && (
                <Badge variant="outline">
                  Ruangan: {roomFilter}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient List */}
      {filteredPatients.length === 0 ? (
        patients.length === 0 ? (
          <EmptyState 
            type="no-patients" 
            onAction={onAddNewPatient}
          />
        ) : (
          <EmptyState 
            type="no-results" 
            onAction={handleSearchClear}
          />
        )
      ) : (
        <>
          <PatientTable 
            patients={paginatedPatients}
            onPatientClick={onPatientClick}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="text-sm text-muted-foreground">
                  Halaman {currentPage} dari {totalPages} 
                  ({startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPatients.length)} dari {filteredPatients.length} hasil)
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-1"
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                    data-testid="button-next-page"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}