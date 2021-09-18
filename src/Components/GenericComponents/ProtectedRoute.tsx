import IF from 'Components/GenericComponents/IF';
import jwtDecode from 'jwt-decode';
import { User } from 'Models/user.model';
import { Redirect, Route, RouteComponentProps, RouteProps, StaticContext } from 'react-router';
import { useTokenContext, useUserContext } from 'Store';

interface IProtectedRoute extends RouteProps {
    component: React.ComponentType<any> | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
}

const ProtectedRoute = ({ component: Component, ...rest }: IProtectedRoute) => {
    const { userState } = useUserContext();
    const { tokenState } = useTokenContext();
    const isAuthenticated = () => {
        if (tokenState.AccessToken && tokenState.RefreshToken && userState.Email) {
            if (jwtDecode<User>(tokenState.AccessToken)) {
                return true;
            }
            return false;
        }
        return false;
    };
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />;
                // return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
