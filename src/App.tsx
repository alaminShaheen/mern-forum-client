import NavigationBar from 'Components/GenericComponents/NavigationBar';
import ProtectedRoute from 'Components/GenericComponents/ProtectedRoute';
import jwtDecode from 'jwt-decode';
import { User } from 'Models/user.model';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import Post from 'Pages/Post';
import Register from 'Pages/Register';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useUserContext, useTokenContext } from 'Store';

const App = () => {
    const { userState } = useUserContext();
    const { tokenState } = useTokenContext();
    const isAuthenticated = () => {
        console.log('present');
        if (tokenState?.AccessToken && tokenState?.RefreshToken && userState?.Email) {
            console.log(jwtDecode<User>(tokenState.AccessToken));
            if (jwtDecode<User>(tokenState.AccessToken)) {
                return true;
            }
            return false;
        }
        return false;
    };
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
                    <Route exact path="/login">
                        {isAuthenticated() ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register">{isAuthenticated() ? <Redirect to="/" /> : <Register />}</Route>
                    <Route component={DefaultRoutes} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;
