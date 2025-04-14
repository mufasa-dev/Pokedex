import {  Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PokeNavBar, HeroImage } from "./styles";

export const PokeNav = ({setTheme}) => {
    return (
        <PokeNavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <HeroImage src={require('../../assets/male.png')}/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="pokedex">My Team</Nav.Link>
            <Nav.Link href="list">Pokedex</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Theme" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => setTheme("water")}>Water</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("grass")}>Grass</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("fire")}>Fire</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("poison")}>Poison</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setTheme("electric")}>Electic</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </PokeNavBar>
    )
}