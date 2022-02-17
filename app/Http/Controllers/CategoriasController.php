<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Http\Resources\Categoria as CategoriaResource;
use App\Http\Resources\CategoriaCollection;
use Illuminate\Support\Str;

class CategoriasController extends Controller
{
    public function index()
    {
        return new CategoriaCollection(Categoria::all());
    }

    public function show(Categoria $categoria)
    {
        return response()->json([
            'categoria'=>$categoria
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|max:255',
        ],[
            'nome.required'         => 'Por favor, escreva o nome da categoria',
            'nome.max'              => 'O nome da categoria pode ter no máximo 255 caracteres'
        ]);
        $data = array_merge($request->all(), ['slug' => Str::slug($request->nome)]);
        $categoria = Categoria::create($data);

        return response()->json([
            'message'=>'Categoria cadastrada com sucesso!'
        ]);
    }
    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nome'=>'required'
        ],[
            'nome.required'         => 'Por favor, escreva o nome da categoria'
        ]);

        try{

            $categoria->fill($request->post())->update();

            return response()->json([
                'message'=>'Categoria atualizada com sucesso!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Ops! Algo de errado aconteceu ao tentar salvar o dado no banco. Por favor, tente novamente mais tarde!'
            ],500);
        }
    }
    public function destroy(Categoria $categoria)
    {
        try {
            $categoria->delete();

            return response()->json([
                'message'=>'Categoria excluída com sucesso!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Ops! Algo de errado aconteceu ao tentar excluir o dado no banco. Por favor, tente novamente mais tarde!'
            ]);
        }
    }
}
