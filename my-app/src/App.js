import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CreatePlaylist from './pages/CreatePlaylist/index';
import Landing from './pages/Landing/index';
import NotFound from './pages/NotFound/index';

function App() {
	const token = useSelector(state => state.setToken);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						{!token ? <Landing /> : <Redirect to="/create-playlist" />}
					</Route>
					<Route path="/create-playlist">
						{!token && <Redirect to="/" />}
						<CreatePlaylist />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
