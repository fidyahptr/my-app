import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import setToken from '../../redux/token/tokenAction';
import Song from '../../components/song/index';
import axios from 'axios';
import url from './auth';
import './index.css';
import PlaylistForm from '../../components/formPlaylist/index';

const CreatePlaylist = () => {
	//redux
	const token = useSelector(state => state.setToken);
	const dispatch = useDispatch();

	//state
	const [searchSong, setSearchSong] = useState('');
	const [songData, setSongData] = useState([]);
	const [isSelect, setIsSelect] = useState([]);
	const [selectedSong, setSelectedSong] = useState([]);
	const [spotifyId, setSpotifyId] = useState('');
	const [userData, setUserData] = useState();

	useEffect(() => {
		const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
		const accessToken = queryString.get('access_token');
		getSpotifyId(accessToken);
		dispatch(setToken(accessToken));
		console.log(token);
	}, []);

	useEffect(() => {
		const getUserData = async () => {
			await axios
				.get(`https://api.spotify.com/v1/users/${spotifyId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(response => {
					setUserData(response.data);
					console.log(userData);
				})
				.catch(error => {
					console.log(error);
				});
		};
		getUserData();
	}, [token, spotifyId]);

	useEffect(() => {
		const songs = songData.map(prevState => ({
			...prevState,
			isSelected: isSelect.find(song => song === prevState.uri),
		}));
		setSelectedSong(songs);
		console.log(isSelect);
		console.log(spotifyId);
		console.log(token);
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
				console.log(spotifyId);
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
			key={a.uri}
			id={a.uri}
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
			<Router>
				<Switch>
					<Route exact path="/">
						{!token ? (
							<button className="button-login">
								<a href={url}>Login</a>
							</button>
						) : (
							<Redirect to="/create-playlist" />
						)}
					</Route>
					<Route path="/create-playlist">
						{!token && <Redirect to="/" />}
						<div>
							{userData && (
								<div>
									<img src={userData.images[0].url} alt="profil" />
									<a href={userData.external_urls.spotify}>link</a>
									<p>{userData.display_name}</p>
									<p>{userData.followers.total}</p>
								</div>
							)}
							<div>
								<PlaylistForm token={token} spotifyId={spotifyId} uris={isSelect} />
							</div>

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

							<div className="content">{listSong}</div>
						</div>
					</Route>
					<Route path="*">
						<h1>404</h1>
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default CreatePlaylist;
