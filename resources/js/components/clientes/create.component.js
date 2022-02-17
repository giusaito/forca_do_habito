import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

export default function CreateCliente() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("")
    const [categoria_id, setCategoriaId] = useState("")
    const [categorias, defineCategorias] = useState([])
    const [validationError, setValidationError] = useState({})
    
    useEffect(()=>{
        buscarCategorias() 
    },[])

    const buscarCategorias = async () => {
        await axios.get(`http://localhost:8000/api/categorias`).then(({data})=>{
            defineCategorias(data.data)
            {setCategoriaId(data.data[0].id)}
        })
    }

    const adicionarCliente = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('nome', nome)
        formData.append('categoria_id', categoria_id)

        await axios.post(`http://localhost:8000/api/clientes`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className="container cadastro">
            <div className="row">
                <div className="col-12">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faTachometerAlt} /> Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            <FontAwesomeIcon icon={faEdit} /> Cadastrar Cliente
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <div className="form-wrapper">
                        {
                            Object.keys(validationError).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {
                                                    Object.entries(validationError).map(([key, value]) => (
                                                        <li key={key}>{value}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <Form onSubmit={adicionarCliente}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" value={nome} onChange={(event) => {
                                            setNome(event.target.value)
                                        }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col>
                                    <Form.Group controlId="Category">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control as="select" onChange={(event) => {
                                            setCategoriaId(event.target.value)
                                        }}>
                                        {
                                            categorias.length > 0 && (
                                                categorias.map(({ id, nome }, index)=>(
                                                    <option value={id} key={index}>{nome}</option>
                                                ))
                                            )
                                        }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="success" className="mt-2" size="md" block="block" type="submit">
                                Salvar
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}