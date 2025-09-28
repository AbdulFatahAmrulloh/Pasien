import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { insertPatientSchema, type InsertPatient } from "@shared/schema";

interface PatientFormProps {
  onSubmit: (data: InsertPatient) => Promise<void>;
  isLoading?: boolean;
}

export default function PatientForm({ onSubmit, isLoading = false }: PatientFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<InsertPatient>({
    resolver: zodResolver(insertPatientSchema),
    defaultValues: {
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: new Date(),
      dokterPenanggungJawab: "",
      ruangan: "",
    },
  });

  const handleSubmit = async (data: InsertPatient) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-md">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Formulir Pasien Masuk</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Daftarkan pasien baru untuk rawat inap
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Pasien</h3>
                
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama lengkap pasien"
                          {...field}
                          data-testid="input-nama"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK (Nomor Induk Kependudukan) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan 16 digit NIK"
                          maxLength={16}
                          {...field}
                          data-testid="input-nik"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Medis</h3>
                
                <FormField
                  control={form.control}
                  name="diagnosa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosa Masuk *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan diagnosa atau keluhan utama pasien"
                          className="min-h-[100px]"
                          {...field}
                          data-testid="input-diagnosa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggalMasuk"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Masuk *</FormLabel>
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              data-testid="button-date-picker"
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: id })
                              ) : (
                                <span>Pilih tanggal masuk</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsCalendarOpen(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            data-testid="calendar-picker"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hospital Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Rumah Sakit</h3>
                
                <FormField
                  control={form.control}
                  name="dokterPenanggungJawab"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dokter Penanggung Jawab *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama dokter penanggung jawab"
                          {...field}
                          data-testid="input-dokter"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ruangan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ruangan *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Ruang 101, ICU, NICU"
                          {...field}
                          data-testid="input-ruangan"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 gap-2"
                  data-testid="button-submit-patient"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Daftarkan Pasien
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                  data-testid="button-reset-form"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}