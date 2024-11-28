import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Clientes = () => {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch("http://localhost:5000/clientes");
      const data = await response.json();
      setClientes(data);
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/clientes/${id}`, {
      method: "DELETE",
    });
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Clientes</h1>
      <table className="min-w-full bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600">
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Nome Social</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Gênero</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">CPF</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">RG</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Telefone</th>
            <th className="px-6 py-3 text-left border-r border-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id} className="hover:bg-gray-600 border-t border-gray-500">
              <td className="px-6 py-4">{cliente.nome}</td>
              <td className="px-6 py-4">{cliente.nomeSocial}</td>
              <td className="px-6 py-4">{cliente.genero}</td>
              <td className="px-6 py-4">{cliente.cpf}</td>
              <td className="px-6 py-4">{cliente.rg}</td>
              <td className="px-6 py-4">{cliente.telefone}</td>
              <td className="px-6 py-4 flex space-x-2">
                <Link to={`/clientes/editar/${cliente.id}`} className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-300">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(cliente.id)} 
                  className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors duration-300">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/clientes/cadastrar" className="bg-green-600 text-white px-4 py-2 mt-6 inline-block">
        Cadastrar Cliente
      </Link>
    </div>
  );
};

export default Clientes;
