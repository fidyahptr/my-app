import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import CreatePlaylist from './pages/CreatePlaylist/index';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1> Song </h1>
				<CreatePlaylist />
			</div>
		</Provider>
	);
}

export default App;
