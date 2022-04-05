import { useEffect, useState } from 'react';
import Song from '../../components/song/index';
import axios from 'axios';
import url from './auth';
import './index.css';
import PlaylistForm from '../../components/formPlaylist/index';

const SearchBar = () => {
	const [token, setToken] = useState(null);
	const [searchSong, setSearchSong] = useState('');
	const [songData, setSongData] = useState([]);
	const [isSelect, setIsSelect] = useState([]);
	const [selectedSong, setSelectedSong] = useState([]);
	const [spotifyId, setSpotifyId] = useState('');

	useEffect(() => {
		const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
		const accessToken = queryString.get('access_token');
		getSpotifyId(accessToken);
		setToken(accessToken);
	}, []);

	useEffect(() => {
		const songs = songData.map(prevState => ({
			...prevState,
			isSelected: isSelect.find(song => song === prevState.external_urls.spotify),
		}));
		setSelectedSong(songs);
		console.log(isSelect);
	}, [songData, isSelect]);

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

	const getSpotifyId = async token => {
		await axios
			.get(`https://api.spotify.com/v1/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				setSpotifyId(response.data.id);
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleClickSelect = url => {
		let selected = isSelect.find(song => song === url);

		selected ? setIsSelect(isSelect.filter(song => song !== url)) : setIsSelect([...isSelect, url]);
	};

	const listSong = selectedSong.map(a => (
		<Song
			key={a.external_urls.spotify}
			title={a.name}
			artist={a.artists[0].name}
			album={a.album.name}
			image={a.album.images[1].url}
			url={a.external_urls.spotify}
			handleClickSelect={handleClickSelect}
			isSelected={a.isSelected}
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
			{token && (
				<div>
					<PlaylistForm token={token} spotifyId={spotifyId} urlSong={isSelect} />
				</div>
			)}
			<div className="content">{listSong}</div>
		</>
	);
};

export default SearchBar;
