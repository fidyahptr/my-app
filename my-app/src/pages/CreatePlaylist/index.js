import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Song from '../../components/song/index';
import axios from 'axios';
import { Box, Heading, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import './index.css';
import PlaylistForm from '../../components/formPlaylist/index';
import MobileNav from '../../components/MobileNav/index';
import SidebarContent from '../../components/SidebarContent/index';

const CreatePlaylist = () => {
	//redux
	const token = useSelector(state => state.setToken);

	//state
	const [searchSong, setSearchSong] = useState('');
	const [songData, setSongData] = useState([]);
	const [isSelect, setIsSelect] = useState([]);
	const [selectedSong, setSelectedSong] = useState([]);
	const [spotifyId, setSpotifyId] = useState('');
	const [userData, setUserData] = useState();

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		getSpotifyId(token);
	}, []);

	// if success get token and spotifyId, website will get user profile
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
			<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
				<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
				<Drawer
					autoFocus={false}
					isOpen={isOpen}
					placement="left"
					onClose={onClose}
					returnFocusOnClose={false}
					onOverlayClick={onClose}
					size="full"
				>
					<DrawerContent>
						<SidebarContent onClose={onClose} />
					</DrawerContent>
				</Drawer>

				{/* MobileNav */}
				{userData && (
					<MobileNav onOpen={onOpen} username={userData.display_name} image={userData.images[0].url} />
				)}
				{/* End of MobileNav */}

				{/* Content */}
				<Box ml={{ base: 0, md: 60 }} p="4" textAlign="center">
					<div>
						<PlaylistForm token={token} spotifyId={spotifyId} uris={isSelect} />

						<Heading as="h3" size="lg" mt={6} pb={4}>
							Search Song
						</Heading>
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
				</Box>
				{/* End of Content */}
			</Box>
		</>
	);
};

export default CreatePlaylist;
