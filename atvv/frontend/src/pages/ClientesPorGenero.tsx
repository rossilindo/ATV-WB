import { useEffect, useState } from "react";

function ClientesPorGenero() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch('http://localhost:5000/clientes/por-genero');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes por gênero:", error);
      }
    }
    fetchClientes();
  }, []);

  // Dividir clientes por gênero
  const clientesMasculinos = clientes.filter(cliente => cliente.genero === 'Masculino');
  const clientesFemininos = clientes.filter(cliente => cliente.genero === 'Feminino');

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Clientes por Gênero</h2>

      <div className="flex w-full justify-between gap-8">
        {/* Coluna Masculina */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-center mb-4 text-blue-400">Masculino</h3>
          {clientesMasculinos.length > 0 ? (
            <ul className="space-y-4">
              {clientesMasculinos.map((cliente, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                >
                  <span className="font-semibold">{cliente.nome}</span> -{" "}
                  <span className="text-blue-400">{cliente.genero}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-red-500">Nenhum cliente masculino encontrado.</div>
          )}
        </div>

        {/* Coluna Feminina */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-center mb-4 text-pink-400">Feminino</h3>
          {clientesFemininos.length > 0 ? (
            <ul className="space-y-4">
              {clientesFemininos.map((cliente, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                >
                  <span className="font-semibold">{cliente.nome}</span> -{" "}
                  <span className="text-pink-400">{cliente.genero}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-red-500">Nenhum cliente feminino encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientesPorGenero;
