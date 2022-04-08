import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './pages/SearchBar/index';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1> Song </h1>
				<SearchBar />
			</div>
		</Provider>
	);
}

export default App;
