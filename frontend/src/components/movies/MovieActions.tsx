import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MovieActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function MovieActions({ onEdit, onDelete }: MovieActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        onClick={onDelete}
        variant="soft"
        className="flex items-center gap-3"
      >
        <Trash2 className="h-4 w-4" />
        Deletar
      </Button>
      <Button
        onClick={onEdit}
        variant="primary"
        className="flex items-center gap-3"
      >
        <Edit className="h-4 w-4" />
        Editar
      </Button>
    </div>
  );
}
