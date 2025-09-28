import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Cari nama atau NIK pasien..." 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10"
          data-testid="input-search"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            data-testid="button-clear-search"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}