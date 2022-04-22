import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Box,
	Stack,
	Button,
	useColorModeValue,
	Textarea,
} from '@chakra-ui/react';

const FormPlaylist = ({ token, spotifyId, uris }) => {
	const initialValue = {
		title: '',
		desc: '',
	};
	const [userId, setUserId] = useState('');
	const [form, setForm] = useState(initialValue);

	const isError = form.title.length >= 10;

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
				alert(`${form.title} Playlist added!`);
			})
			.catch(error => {
				console.log(error);
				alert(`${form.title} Playlist cannot added!`);
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
			<Heading as="h2" size="xl" mt={6} pb={4}>
				Create Playlist
			</Heading>
			<form onSubmit={handleSubmit}>
				<Box
					maxW="sm"
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
					mt="5"
					mx="auto"
				>
					<Stack spacing={4}>
						<FormControl htmlFor="title" isInvalid={isError} isRequired>
							<FormLabel>Title</FormLabel>
							<Input
								type="text"
								name="title"
								id="title"
								value={form.title}
								onChange={handleChange}
								maxLength={10}
							/>
							{!isError ? (
								<FormHelperText textAlign="left">Title min. 10 Character</FormHelperText>
							) : (
								<FormErrorMessage>Cannot more than 10</FormErrorMessage>
							)}
						</FormControl>
						<FormControl id="desc">
							<FormLabel>Description</FormLabel>
							<Textarea
								name="desc"
								id="desc"
								value={form.desc}
								onChange={handleChange}
								placeholder="Description Playlist"
							/>
						</FormControl>
						<Stack spacing={10}>
							<Button
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								type="submit"
							>
								Submit
							</Button>
						</Stack>
					</Stack>
				</Box>
			</form>
		</div>
	);
};

export default FormPlaylist;
