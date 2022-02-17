import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Row, Col, Container } from 'react-bootstrap';

const Header = () => (
    <Navbar bg="primary" expand="lg">
        <Container>
            <Link to={"/"} className="navbar-brand text-white">
                <strong>Força</strong> do Hábito
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown
                    id="cadastrar-navbar-button"
                    title="Cadastrar"
                    >
                        <Link to={"/cliente/create"} className="dropdown-item">
                            Cliente
                        </Link>
                        <Link to={"/categoria/create"} className="dropdown-item">
                            Categoria
                        </Link>
                    </NavDropdown>
                    <NavDropdown
                    id="relatorio-navbar-button"
                    title="Relatório"
                    >
                        <Link to={"/clientes"} className="dropdown-item">
                            Clientes
                        </Link>
                        <Link to={"/categorias"} className="dropdown-item">
                            Categorias
                        </Link>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default Header