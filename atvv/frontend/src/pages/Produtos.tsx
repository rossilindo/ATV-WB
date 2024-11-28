import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Produtos = () => {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch("http://localhost:5000/produtos");
      const data = await response.json();
      setProdutos(data);
    };

    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    });
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Produtos</h1>
      <table className="min-w-full bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600">
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Preço</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id} className="hover:bg-gray-600 border-t border-gray-500">
              <td className="px-6 py-4">{produto.nome}</td>
              <td className="px-6 py-4">{produto.preco}</td>
              <td className="px-6 py-4 flex space-x-2">
                <Link to={`/produtos/editar/${produto.id}`} className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-300">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(produto.id)} 
                  className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors duration-300">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/produtos/cadastrar" className="bg-green-600 text-white px-4 py-2 mt-6 inline-block">
        Cadastrar Produto
      </Link>
    </div>
  );
};

export default Produtos;
