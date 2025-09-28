import { useState } from "react";
import SearchBar from "../SearchBar";

export default function SearchBarExample() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-6 max-w-md">
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onClear={() => setSearchValue("")}
        placeholder="Cari nama atau NIK pasien..."
      />
      <p className="text-sm text-muted-foreground mt-2">
        Current value: "{searchValue}"
      </p>
    </div>
  );
}