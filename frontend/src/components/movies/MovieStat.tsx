import { InfoCard } from '@/components/ui/InfoCard';
import { cn } from '@/lib/utils';

interface MovieStatProps {
  label: string;
  value: string | number;
  className?: string;
}

export function MovieStat({ label, value, className }: MovieStatProps) {
  return (
    <InfoCard 
      className={cn('w-full md:w-[128px] h-[72px]', className)}
      style={{ borderRadius: '4px', padding: '16px', gap: '8px' }}
    >
      <h4 className="uppercase text-gray-400 font-bold text-xs leading-tight">
        {label}
      </h4>
      <p className="text-white text-sm font-bold">
        {value}
      </p>
    </InfoCard>
  );
}
