import './App.css';
import data from './Data';
import Song from './components/song/index';

function App() {
	return (
		<div className="App">
			<h1> Song </h1>
			<Song
				title={data.name}
				artist={data.artists[0].name}
				album={data.album.name}
				image={data.album.images[1].url}
				url={data.external_urls.spotify}
			/>
		</div>
	);
}

export default App;
