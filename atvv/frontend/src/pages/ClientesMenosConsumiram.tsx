import { useEffect, useState } from "react";

function ClientesMenosConsumiram() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch('http://localhost:5000/clientes/menos-consumidos');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        setError("Erro ao buscar clientes menos consumidos.");
        console.error("Erro ao buscar clientes menos consumidos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 bg-gray-700 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">Clientes Menos Consumidos</h2>

        <ul className="space-y-4">
          {clientes.length > 0 ? (
            clientes.map((cliente, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-300"
              >
                <div className="flex-1">
                  <span className="text-xl font-medium">{cliente.nome}</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-400 text-sm">Consumo: {cliente.total_consumo || 0}</span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">Nenhum cliente encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ClientesMenosConsumiram;
