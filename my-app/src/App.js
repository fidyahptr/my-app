import './App.css';
import data from './Data';
import Song from './components/song/index';

function App() {
	const listSong = data.map(a => (
		<Song
			title={a.name}
			artist={a.artists[0].name}
			album={a.album.name}
			image={a.album.images[1].url}
			url={a.external_urls.spotify}
		/>
	));
	return (
		<div className="App">
			<h1> Song </h1>
			<div className="content">{listSong}</div>
		</div>
	);
}

export default App;
