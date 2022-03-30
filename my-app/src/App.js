import './App.css';
import data from './Data';
import Song from './components/song/index';
import SearchBar from './pages/SearchBar/index';

function App() {
	return (
		<div className="App">
			<h1> Song </h1>
			<SearchBar />
		</div>
	);
}

export default App;
