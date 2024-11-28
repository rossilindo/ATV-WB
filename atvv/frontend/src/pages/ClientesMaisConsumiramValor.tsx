import React, { useEffect, useState } from 'react';

// Definir a interface para o cliente
interface Cliente {
  nome: string;
  totalConsumo: number;
}

const ClientesMaisConsumiramValor = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);  // Aplicar o tipo Cliente ao estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chamada para o backend para buscar os dados dos clientes
    fetch('http://localhost:5000/clientes/mais-consumidos-valor') // Corrigindo a URL (removendo a barra extra)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white py-4">Carregando...</div>;
  }

  if (clientes.length === 0) {
    return <div className="text-center text-white py-4">Nenhum cliente encontrado.</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes Mais Consumidos por Valor</h1>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto bg-gray-700 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Total Consumido</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index} className="hover:bg-gray-600">
                <td className="px-6 py-4">{cliente.nome}</td>
                <td className="px-6 py-4">{cliente.totalConsumo.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesMaisConsumiramValor;
