import React from 'react';
import { render, screen } from '@testing-library/react';
import Song from '../../components/song/index';

describe('Search', () => {
	test('MSW Spotify Search API', () => {
		render(
			<Song
				id={''}
				title={''}
				artist={''}
				album={''}
				image={''}
				url={''}
				handleClickSelect={function(id: string): void {
					throw new Error('Function not implemented.');
				}}
				isSelected={false}
			/>
		);
		const checkData = screen.findByText('Love');
		expect(checkData).toBeInTheDocument;
	});
});
