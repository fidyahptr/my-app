import './App.css';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import setToken from './redux/token/tokenAction';
import CreatePlaylist from './pages/CreatePlaylist/index';
import Landing from './pages/Landing/index';
import NotFound from './pages/NotFound/index';

function App() {
	const token = useSelector(state => state.setToken);
	return (
		// <ChakraProvider>
		// 	<Provider store={store}>
		<div className="App">
			{/* <h1> Song </h1> */}
			{/* <CreatePlaylist /> */}
			{/* <Landing /> */}
			{/* <NotFound /> */}
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
		// 	</Provider>
		// </ChakraProvider>
	);
}

export default App;
