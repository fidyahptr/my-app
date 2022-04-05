import React from 'react';
import { useState } from 'react';

const Song = ({ title, artist, album, image, url, handleClickSelect, isSelected }) => {
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
					handleClickSelect(url);
				}}
			>
				<a href={url}>{isSelected ? 'Selected' : 'Select'}</a>
			</button>
		</div>
	);
};

export default Song;
