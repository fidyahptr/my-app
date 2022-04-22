import React from 'react';

interface songInterface {
	id: string;
	title: string;
	artist: string;
	image: string;
	album: string;
	url: string;
	handleClickSelect: (id: string) => void;
	isSelected: boolean;
}

const Song = ({ id, title, artist, album, image, url, handleClickSelect, isSelected }: songInterface) => {
	return (
		<div className="album">
			<img src={image} alt="" className="albumImage" />
			<p className="albumTitle">
				{title} - <span>{artist}</span>
			</p>
			<p className="albumName">{album}</p>
			<button
				className="search-btn"
				onClick={() => {
					handleClickSelect(id);
				}}
			>
				{isSelected ? 'Selected' : 'Select'}
			</button>
		</div>
	);
};

export default Song;
