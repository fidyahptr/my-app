import { useEffect, useState } from 'react';
import Song from '../components/song/index';

const CLIENT_ID = process.env.local.REACT_APP_SPOTIFY_CLIENT_ID;
const BASE_URL = process.env.REACT_APP_SPOTIFY_BASE_URL;
const AUTHORIZE_URL = process.env.REACT_APP_SPOTIFY_AUTHORIZE_LINK;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPE = 'playlist-modify-private';

const SearchBar = () => {
	const [token, setToken] = useState(null);
	const [query, setQuery] = useState('');
	const { result, setResult } = Song();

	const parseToken = url => {
		const url_parsed = url.split('&')[0].split('=');
		const token = url_parsed(url_parsed.length - 1);
		setToken(token);
	};

	const handleAuthUser = () => {
		window.location.replace(
			`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`
		);
	};

	const handleSearch = async () => {
		const response = await fetch(`${BASE_URL}search?`, {
			params: {
				q: query,
				type: 'track',
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(response => {
			setResult(response.data.tracks.items);
		});
	};

	useEffect(() => {
		if (window.location.hash) {
			parseToken(window.location.hash);
		}
	}, []);

	const listSong = result.map(a => (
		<Song
			title={a.name}
			artist={a.artists[0].name}
			album={a.album.name}
			image={a.album.images[1].url}
			url={a.external_urls.spotify}
		/>
	));

	return (
		<>
			{!token && (
				<button onClick={handleAuthUser} className="login-btn">
					Login
				</button>
			)}
			{token && (
				<div className="search-container">
					<input className="search-bar" value={query} onChange={e => setQuery(e.target.value)}></input>
					<button className="search-btn" type="submit" onClick={handleSearch}>
						Search
					</button>
				</div>
			)}

			{listSong}
		</>
	);
};

export default SearchBar;
