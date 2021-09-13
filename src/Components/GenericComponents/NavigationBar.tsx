import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { NavbarBrand, NavbarToggler, Navbar, NavItem, NavLink, Nav, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import AuthServices from "Services/auth.services";
import { useTokenContext, useUserContext } from "Store";
import { clearToken } from "Store/Token/tokenAction";
import { clearUser } from "Store/User/userAction";

const NavigationBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { userState, userDispatch } = useUserContext();
	const { tokenDispatch, tokenState } = useTokenContext();
	const history = useHistory();
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await AuthServices.logout(tokenState.RefreshToken);
			tokenDispatch(clearToken());
			userDispatch(clearUser());
			history.push("/login");
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggle = () => setIsOpen(!isOpen);
	return (
		<Navbar style={{ padding: "1% 5%" }} sticky="top" color="light" light expand="md">
			<Link to="/" className="mr-auto">
				<NavbarBrand>📝 AskMe!</NavbarBrand>
			</Link>
			<Nav navbar>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav style={{ display: "flex", alignItems: "center" }}>
						<i style={{ fontSize: "1.5rem" }} className="fas fa-user-circle"></i>
						<i style={{ fontSize: "1rem" }} className="fas fa-caret-down ml-2"></i>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Welcome, {userState.FirstName}</DropdownItem>
						<DropdownItem divider />
						<DropdownItem onClick={handleLogout} style={{ display: "flex", alignItems: "center" }}>
							<span>Logout</span>
							<i className="fas fa-sign-out-alt ml-2" />
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</Navbar>
	);
};

export default NavigationBar;
