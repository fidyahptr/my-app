import React from 'react';
import { useState } from 'react';

const Song = ({ title, artist, album, image, url }) => {
	const [isSelect, setIsSelect] = useState('Select');

	const handleClickSelect = () => {
		if (isSelect === 'Select') setIsSelect('Deselect');
		else if (isSelect === 'Deselect') setIsSelect('Select');
	};

	return (
		<div className="album">
			<img src={image} alt="" className="albumImage" />
			<p className="albumTitle">
				{title} - <span>{artist}</span>
			</p>
			<p className="albumName">{album}</p>
			<button className="search-btn" onClick={handleClickSelect}>
				<a href={url}>{isSelect}</a>
			</button>
		</div>
	);
};

export default Song;
