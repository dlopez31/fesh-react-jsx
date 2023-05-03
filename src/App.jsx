import { useCallback, useState } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';
import './App.css';

function App() {
	const [sort, setSort] = useState(false);
	const { error, search, setSearch } = useSearch();
	const { movies, getMovies, loading } = useMovies({ search, sort });

	const debouncedGetMovies = useCallback(
		debounce(search => {
			getMovies({ search });
		}, 300),
		[]
	);

	const handleOnSubmit = e => {
		e.preventDefault();
		getMovies({ search });
	};

	const handleOnChange = e => {
		const newSearch = e.target.value;
		setSearch(newSearch);
		debouncedGetMovies(newSearch);
	};

	const handleSort = () => {
		setSort(!sort);
	};

	return (
		<div className='page'>
			<header>
				<h1>Buscador de películas</h1>
				<form onSubmit={handleOnSubmit} className='form'>
					<input
						style={{
							border: '1px solid transparent',
							borderColor: error ? 'red' : 'transparent',
						}}
						value={search}
						onChange={handleOnChange}
						placeholder='Avenger, Star Wars, The Matrix...'
					/>
					<input type='checkbox' onChange={handleSort} checked={sort} />
					<button type='submit'>Buscar</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>
			<main>{loading ? <p>Cargando ...</p> : <Movies movies={movies} />}</main>
		</div>
	);
}

export default App;
