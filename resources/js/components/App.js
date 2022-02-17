import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
    import Header from './Header'

    import EditarCategoria from "./categorias/edit.component";
    import ListarCategorias from "./categorias/list.component";
    import AdicionarCategoria from "./categorias/create.component";

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
              </Routes>
            </div>
          </Router>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))