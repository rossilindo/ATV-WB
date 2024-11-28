import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const [servicos, setServicos] = useState<any[]>([]);

  useEffect(() => {
    const fetchServicos = async () => {
      const response = await fetch("http://localhost:5000/servicos");
      const data = await response.json();
      setServicos(data);
    };

    fetchServicos();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/servicos/${id}`, {
      method: "DELETE",
    });
    setServicos(servicos.filter(servico => servico.id !== id));
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Serviços</h1>
      <table className="min-w-full bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600">
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Preço</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(servico => (
            <tr key={servico.id} className="hover:bg-gray-600 border-t border-gray-500">
              <td className="px-6 py-4">{servico.nome}</td>
              <td className="px-6 py-4">{servico.preco}</td>
              <td className="px-6 py-4 flex space-x-2">
                <Link to={`/servicos/editar/${servico.id}`} className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-300">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(servico.id)} 
                  className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors duration-300">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/servicos/cadastrar" className="bg-green-600 text-white px-4 py-2 mt-6 inline-block">
        Cadastrar Serviço
      </Link>
    </div>
  );
};

export default Servicos;
