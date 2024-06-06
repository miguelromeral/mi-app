import React, { useEffect, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import MovieCard from '../../shared/cards/MovieCard';
import { t } from 'i18next';
import i18n from '../../../i18n';

const PopularMoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await TmdbService.getPopularMovies();
        setMovies(popularMovies);
        setLoading(false);
        // console.log(popularMovies[0]);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, [i18n.language]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='container mx-auto px-2'>
        <h1 className='text-2xl font-bold py-2'>{t("screens.popular.title")}</h1>
        {movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesScreen;
