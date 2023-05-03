import PropTypes from 'prop-types';
import { ListOfMovies } from './ListOfMovies';
import { NoMoviesResult } from './NoMovies';

export const Movies = ({ movies }) => {
	const hasMovies = movies?.length > 0;
	return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
};

Movies.propTypes = {
	movies: PropTypes.object,
};
