import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MovieCard } from '../MovieCard';
import type { Movie } from '@/services/movie.service';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: Movie = {
  id: '1',
  title: 'Inception',
  originalTitle: 'Inception',
  description: 'A mind-bending thriller',
  releaseDate: '2010-07-16',
  duration: 148,
  genre: 'Action, Sci-Fi',
  posterUrl: 'https://example.com/poster.jpg',
  voteAverage: 8.5,
  userId: 'user1',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  tagline: 'Your mind is the scene of the crime',
  user: {
    id: 'user1',
    name: 'John Doe',
    email: 'john@test.com',
  },
};

describe('MovieCard', () => {
  const renderMovieCard = (movie: Movie = mockMovie) => {
    return render(
      <BrowserRouter>
        <MovieCard movie={movie} />
      </BrowserRouter>
    );
  };

  it('renders movie title', () => {
    renderMovieCard();
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('renders movie genre', () => {
    renderMovieCard();
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
  });

  it('displays movie poster', () => {
    renderMovieCard();
    const poster = screen.getByRole('img', { name: /inception/i }) || 
                   document.querySelector('[style*="background-image"]');
    expect(poster).toBeTruthy();
  });

  it('navigates to movie details on click', () => {
    renderMovieCard();
    const card = screen.getByText('Inception').closest('div');
    if (card) {
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith('/movies/1');
    }
  });

  it('shows vote percentage when available', () => {
    renderMovieCard();
    const percentage = Math.round((mockMovie.voteAverage || 0) * 10);
    expect(screen.getByText(percentage.toString())).toBeInTheDocument();
  });

  it('handles missing poster gracefully', () => {
    const movieWithoutPoster = { ...mockMovie, posterUrl: undefined };
    renderMovieCard(movieWithoutPoster);
    expect(screen.getByText('🎬')).toBeInTheDocument();
  });

  it('handles missing genre', () => {
    const movieWithoutGenre = { ...mockMovie, genre: undefined };
    renderMovieCard(movieWithoutGenre);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('shows progress ring on hover', () => {
    const { container } = renderMovieCard();
    const card = screen.getByText('Inception').closest('div');
    
    if (card) {
      fireEvent.mouseEnter(card);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    }
  });

  it('hides genre text on hover', () => {
    renderMovieCard();
    const card = screen.getByText('Inception').closest('div');
    const genreText = screen.getByText('Action, Sci-Fi');
    
    if (card) {
      fireEvent.mouseEnter(card);
      expect(genreText).toHaveClass('hidden');
    }
  });
});
