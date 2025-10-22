import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, unknown>) => void;
}

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState({
    genre: '',
    duration: '',
    releaseDate: '',
  });

  if (!isOpen) return null;

  const handleApply = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
    onApply(cleanFilters);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-light-bg-base p-6 shadow-2xl dark:bg-dark-bg-ui">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Filtros</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label="Gênero"
            placeholder="Ex: Ação, Drama..."
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          />

          <Input
            label="Duração (minutos)"
            placeholder="Ex: 120"
            type="number"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          />

          <Input
            label="Data de Lançamento"
            type="date"
            value={filters.releaseDate}
            onChange={(e) => setFilters({ ...filters, releaseDate: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end items-center gap-4 h-[44px] max-w-[533px] ml-auto">
          <Button onClick={onClose} variant="soft">
            Cancelar
          </Button>
          <Button onClick={handleApply} variant="primary">
            Aplicar Filtro
          </Button>
        </div>
      </div>
    </div>
  );
}
