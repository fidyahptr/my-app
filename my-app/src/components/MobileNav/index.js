import React from 'react';
import { Flex, Box, IconButton, Stack, HStack, VStack, Avatar, Text, useColorModeValue } from '@chakra-ui/react';

const MobileNav = ({ onOpen, username, image }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
			/>

			<Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
				MusicPlay
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton size="lg" variant="ghost" aria-label="open menu" />
				<Flex alignItems={'center'}>
					<HStack>
						<Avatar size={'md'} src={image} />
						<VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
							<Text fontSize="sm">{username}</Text>
							<Text fontSize="xs" color="gray.600">
								Profile
							</Text>
						</VStack>
						<Box display={{ base: 'none', md: 'flex' }}></Box>
					</HStack>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default MobileNav;
