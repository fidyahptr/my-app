import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { Flex, Box, Checkbox, Stack, Link, Button, Text, useColorModeValue } from '@chakra-ui/react';

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
				const alertSucces = (
					<Alert status="success">
						<AlertIcon />
						{form.title} Playlist added. Fire on!
					</Alert>
				);
				console.log(alertSucces);
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
			<Heading as="h2" size="xl" mt={6} mb={2}>
				Create Playlist
			</Heading>
			<Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" />
						</FormControl>
						<Stack spacing={10}>
							<Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
								<Checkbox>Remember me</Checkbox>
								<Link color={'blue.400'}>Forgot password?</Link>
							</Stack>
							<Button
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Flex>

			<form onSubmit={handleSubmit}>
				{/* <FormControl isInvalid={isError}>
					<FormLabel htmlFor="title">Email</FormLabel>
					<Input
						id="title"
						type="text"
						value={form.title}
						onChange={handleChange}
						maxLength={10}
						colorScheme={'white'}
					/>
					{!isError ? (
						<FormHelperText>Enter the email you&apos;d like to receive the newsletter on.</FormHelperText>
					) : (
						<FormErrorMessage>Email is required.</FormErrorMessage>
					)}
				</FormControl> */}
				{/* {!isError ? (
					<FormHelperText>Enter the email you&apos;d like to receive the newsletter on.</FormHelperText>
				) : (
					<FormErrorMessage>Email is required.</FormErrorMessage>
				)} */}
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
