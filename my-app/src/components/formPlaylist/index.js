import { useEffect, useState } from 'react';
import axios from 'axios';

const FormPlaylist = ({ token, spotifyId, uris }) => {
	const initialValue = {
		title: '',
		desc: '',
	};
	const [userId, setUserId] = useState('');
	const [form, setForm] = useState(initialValue);

	const handleSubmit = async event => {
		event.preventDefault();
		await axios
			.post(
				`https://api.spotify.com/v1/users/${spotifyId}/playlists`,
				{
					name: form.title,
					description: form.desc,
					public: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(response => {
				setUserId(response.data.id);
				console.log(response.data.id);
			})
			.catch(error => {
				console.log(error);
			});

		setForm(initialValue);
	};

	useEffect(() => {
		if (userId) addSongToPlaylist(userId);
	}, [userId]);

	const addSongToPlaylist = async playlist_id => {
		await axios
			.post(
				`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
				{
					uris: uris,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(response => {
				console.log(response.data);
				alert('berhasil');
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setForm(prevState => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	return (
		<div>
			<h1>Create Playlist</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={form.title}
						onChange={handleChange}
						maxLength="10"
					/>
				</div>
				<div>
					<label htmlFor="desc">Description</label>
					<input type="text" name="desc" id="desc" value={form.desc} onChange={handleChange} />
				</div>
				<div>
					<input className="search-btn search-song" type="submit" value="Submit" />
				</div>
			</form>
		</div>
	);
};

export default FormPlaylist;
