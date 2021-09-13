import NavigationBar from "Components/GenericComponents/NavigationBar";
import ProtectedRoute from "Components/GenericComponents/ProtectedRoute";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Post from "Pages/Post";
import Register from "Pages/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
	// return <Home />;
	const DefaultRoutes = () => {
		return (
			<>
				<NavigationBar />
				<Switch>
					<ProtectedRoute exact path="/" component={Home} />
					<ProtectedRoute path="/:postId" component={Post} />
				</Switch>
			</>
		);
	};
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route component={DefaultRoutes} />
				</Switch>
			</BrowserRouter>
			{/* <Home /> */}
		</>
	);
};

export default App;
