import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Movie } from '@/services/movie.service';
import { CircularProgress } from '@/components/ui/CircularProgress';

interface MovieCardProps {
  movie: Movie;
  onUpdate?: () => void;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const votePercentage = movie.voteAverage ? Math.round(movie.voteAverage * 10) : 0;

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-lg rounded-[4px] w-full h-[241px] lg:h-[355px] group hover:cursor-pointer overflow-hidden relative"
    >
      <img
        src={movie.posterUrl || ''}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative flex flex-col-reverse h-full p-2 md:p-4">
        <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        
        <div className="z-10">
          <h2 className="font-montserrat font-semibold uppercase text-base leading-tight text-white">
            {movie.title}
          </h2>
          <p className={`relative font-montserrat text-xs text-white mt-2 transition-all delay-200 ease-in ${isHovered ? 'block' : 'hidden'}`}>
            {movie.genre}
          </p>
        </div>
        
        {movie.voteAverage && (
          <div className={`${isHovered ? 'flex' : 'hidden'} justify-center flex-auto mt-[25%] transition-all delay-200 ease-in`}>
            <CircularProgress percentage={votePercentage} size="md" />
          </div>
        )}
      </div>
    </div>
  );
}
