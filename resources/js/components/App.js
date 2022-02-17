import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
    import Header from './Header'

    import EditarCategoria from "./categorias/edit.component";
    import ListarCategorias from "./categorias/list.component";
    import AdicionarCategoria from "./categorias/create.component";

    import EditarCliente from "./clientes/edit.component";
    import ListarClientes from "./clientes/list.component";
    import AdicionarCliente from "./clientes/create.component";

    import '../../../public/css/style.css';

    class App extends Component {
      render () {
        return (
          <Router>
            <div>
              <Header />
              <Routes>
                <Route path="/categoria/create" element={<AdicionarCategoria />} />
                <Route path="/categoria/edit/:id" element={<EditarCategoria />} />
                <Route exact path='/categorias' element={<ListarCategorias />} />
                <Route path="/cliente/create" element={<AdicionarCliente />} />
                <Route path="/cliente/edit/:id" element={<EditarCliente />} />
                <Route exact path='/clientes' element={<ListarClientes />} />
              </Routes>
            </div>
          </Router>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))