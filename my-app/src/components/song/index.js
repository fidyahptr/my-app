import React from 'react';

const index = ({ title, artist, album, image, url }) => {
	return (
		<div className="album">
			<img src={image} alt="" className="albumImage" />
			<p className="albumTitle">
				{title} - <span>{artist}</span>
			</p>
			<p className="albumName">{album}</p>
			<button>
				<a href={url}>Select</a>
			</button>
		</div>
	);
};

export default index;
