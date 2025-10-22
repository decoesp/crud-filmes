import { MovieStat } from './MovieStat';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { InfoCard } from '@/components/ui/InfoCard';
import { formatCurrency, formatDate, formatDuration } from '@/lib/utils';

interface MovieStatsGridProps {
  votePercentage: number;
  voteCount?: number;
  releaseDate: string;
  duration: number;
  status?: string;
  budget?: number;
  revenue?: number;
  profit?: number | null;
}

export function MovieStatsGrid({
  votePercentage,
  voteCount,
  releaseDate,
  duration,
  status,
  budget,
  revenue,
  profit,
}: MovieStatsGridProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap gap-2 justify-between md:justify-end">
        <InfoCard 
          className="w-[183px] md:w-[200px] h-[72px]"
          style={{ borderRadius: '4px', padding: '16px', gap: '8px' }}
        >
          <h4 className="uppercase text-gray-400 font-bold text-xs">
            Classificação Indicativa
          </h4>
          <p className="text-white font-semibold text-sm">13 anos</p>
        </InfoCard>

        <InfoCard 
          className="w-[76px] h-[72px]"
          style={{ borderRadius: '4px', padding: '16px', gap: '8px' }}
        >
          <h4 className="uppercase text-gray-400 font-bold text-xs">Votos</h4>
          <p className="text-white font-semibold text-sm">
            {voteCount ? Number(voteCount).toLocaleString() : 'N/A'}
          </p>
        </InfoCard>

        <div className="flex justify-center">
          <CircularProgress percentage={votePercentage} size="sm" />
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <MovieStat 
          label="Lançamento" 
          value={formatDate(releaseDate)}
          className="w-[183px] md:w-[128px]"
        />
        <MovieStat 
          label="Duração" 
          value={formatDuration(duration)}
          className="w-[183px] md:w-[128px]"
        />
      </div>

      <div className="flex gap-2 justify-between">
        <MovieStat 
          label="Situação" 
          value={status || 'Desconhecido'}
          className="w-[183px] md:w-[128px]"
        />
        <MovieStat 
          label="Idioma" 
          value="Português"
          className="w-[183px] md:w-[128px]"
        />
      </div>

      {(budget || revenue) && (
        <div className="flex gap-2 justify-between flex-wrap">
          {budget && (
            <MovieStat 
              label="Orçamento" 
              value={formatCurrency(Number(budget))}
              className="w-[116.67px] md:w-[128px]"
            />
          )}
          {revenue && (
            <MovieStat 
              label="Receita" 
              value={formatCurrency(Number(revenue))}
              className="w-[116.67px] md:w-[128px]"
            />
          )}
          {profit !== null && profit !== undefined && (
            <MovieStat 
              label="Lucro" 
              value={formatCurrency(profit)}
              className="w-[116.67px] md:w-[128px]"
            />
          )}
        </div>
      )}
    </div>
  );
}
