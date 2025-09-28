import { useState } from "react";
import PatientForm from "../PatientForm";
import { InsertPatient } from "@shared/schema";

export default function PatientFormExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: InsertPatient) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    alert("Pasien berhasil didaftarkan!");
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <PatientForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}