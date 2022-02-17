import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderTree, faTachometerAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function List() {

    const [clientes, defineClientes] = useState([])

    useEffect(()=>{
        buscarClientes() 
    },[])

    const buscarClientes = async () => {
        await axios.get(`http://localhost:8000/api/clientes`).then(({data})=>{
            defineClientes(data.data)
        })
    }

    const excluirCliente = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Você tem certeza?',
            text: "Não será possível reverter esta ação",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, exclua!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/clientes/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            buscarClientes()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container relatorio">
          <div className="row">
            <div className='col-12'>
                <Breadcrumb className="float-end">
                    <Breadcrumb.Item>
                        <Link to={"/"}>
                            <FontAwesomeIcon icon={faTachometerAlt} /> Home
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <FontAwesomeIcon icon={faEdit} /> Clientes
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <FontAwesomeIcon icon={faFolderTree} /> Relatório de Clientes
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Menu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientes.length > 0 && (
                                            clientes.map((row, key)=>(
                                                <tr key={key}>
                                                    <td>{row.nome}</td>
                                                    <td>
                                                        <Link to={`/categoria/edit/${row.id}`} className='btn btn-success me-2'>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                        <Button variant="danger" onClick={()=>excluirCliente(row.id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}