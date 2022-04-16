import React from 'react';

const Song = ({ id, title, artist, album, image, url, handleClickSelect, isSelected }) => {
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
				<a href={url}>{isSelected ? 'Selected' : 'Select'}</a>
			</button>
		</div>
	);
};

export default Song;
