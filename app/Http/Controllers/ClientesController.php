<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Http\Resources\Cliente as ClienteResource;
use App\Http\Resources\ClienteCollection;

class ClientesController extends Controller
{
    public function index()
    {
        return new ClienteCollection(Cliente::all());
    }

    public function show(Cliente $cliente)
    {
        return response()->json([
            'cliente'=>$cliente
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'categoria_id'  => 'required',
            'nome'          => 'required|max:255',
        ], [
            'categoria_id.required' => 'Por favor, selecione a categoria',
            'nome.required'         => 'Por favor, escreva o nome do cliente',
            'nome.max'              => 'O nome do cliente pode ter no máximo 255 caracteres'
        ]);

        $cliente = Cliente::create($request->all());

        return response()->json([
            'message'=>'Cliente cadastrado com sucesso!'
        ]);
    }
    public function update(Request $request, Cliente $cliente)
    {
        $request->validate([
            'categoria_id'  => 'required',
            'nome'          => 'required'
        ],[
            'categoria_id.required' => 'Por favor, selecione a categoria',
            'nome.required'         => 'Por favor, escreva o nome do cliente']
        );

        try{

            $cliente->fill($request->post())->update();

            return response()->json([
                'message'=>'Cliente atualizado com sucesso!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Ops! Algo de errado aconteceu ao tentar salvar o dado no banco. Por favor, tente novamente mais tarde!'
            ],500);
        }
    }
    public function destroy(Cliente $cliente)
    {
        try {
            $cliente->delete();

            return response()->json([
                'message'=>'Cliente excluído com sucesso!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Ops! Algo de errado aconteceu ao tentar excluir o dado no banco. Por favor, tente novamente mais tarde!'
            ]);
        }
    }
}
