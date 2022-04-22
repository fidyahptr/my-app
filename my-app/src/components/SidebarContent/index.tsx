import React from 'react';
import { Flex, Box, CloseButton, Text, useColorModeValue, BoxProps } from '@chakra-ui/react';
import NavItem from '../NavItem/index';

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					MusicPlay
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<NavItem>Create Playlist</NavItem>
			<NavItem>Profile</NavItem>
		</Box>
	);
};

export default SidebarContent;
