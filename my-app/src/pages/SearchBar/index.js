import { useEffect, useState } from 'react';
import Song from '../../components/song/index';
import axios from 'axios';
import url from './auth';
import './index.css';

const SearchBar = () => {
	const [token, setToken] = useState(null);
	const [searchSong, setSearchSong] = useState('');
	const [songData, setSongData] = useState([]);

	useEffect(() => {
		const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
		const accessToken = queryString.get('access_token');
		setToken(accessToken);
	}, []);

	const getSong = async () => {
		await axios
			.get(`https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`)
			.then(response => {
				setSongData(response.data.tracks.items);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const listSong = songData.map(a => (
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
				<button className="button-login">
					<a href={url}>Login</a>
				</button>
			)}
			<br />
			{token && (
				<div className="search-container">
					<input
						className="search-bar"
						type="search"
						placeholder="Search Song"
						onChange={e => setSearchSong(e.target.value)}
					/>
					<button className="search-btn search-song" type="button" onClick={getSong}>
						Search
					</button>
				</div>
			)}
			<div className="content">{listSong}</div>
		</>
	);
};

export default SearchBar;
