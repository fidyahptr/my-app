import './App.css';
import data from './Data';

function App() {
	let obj;
	obj = (
		<div className="album">
			<img src={data.album.images[1].url} alt="" className="albumImage" />
			<p className="albumTitle">
				{data.name} - <span>{data.artists[0].name}</span>
			</p>
			<p className="albumName">{data.album.name}</p>
			<button>
				<a href={data.external_urls.spotify}>Select</a>
			</button>
		</div>
	);
	return (
		<div className="App">
			<h1> Song </h1>
			<div>{obj} </div>
		</div>
	);
}

export default App;
