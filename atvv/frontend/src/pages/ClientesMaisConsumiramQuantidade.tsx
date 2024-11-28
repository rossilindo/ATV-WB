import { useEffect, useState } from "react";

function ClientesMaisConsumiramQuantidade() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch('http://localhost:5000/clientes/mais-consumidos');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Dados recebidos da API:", data);

                if (!Array.isArray(data)) {
                    throw new Error('Formato de dados inválido');
                }
                setClientes(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro desconhecido');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchClientes();
    }, []);

    const calcularTotais = (cliente: any) => {
        let quantidadeTotal = 0;
        let totalConsumido = 0;

        cliente.consumos?.forEach((consumo: any) => {
            quantidadeTotal += consumo.quantidade;

            let precoItem = 0;

            if (consumo.produtoId !== null) {
                precoItem = buscarPrecoProduto(consumo.produtoId);
            } else if (consumo.servicoId !== null) {
                precoItem = buscarPrecoServico(consumo.servicoId);
            }

            totalConsumido += consumo.quantidade * precoItem;
        });

        return { quantidadeTotal, totalConsumido };
    };

    const buscarPrecoProduto = (produtoId: number) => {
        const precoProduto = 100;  // Exemplo: preço fixo
        return precoProduto;
    };

    const buscarPrecoServico = (servicoId: number) => {
        const precoServico = 50;  // Exemplo: preço fixo
        return precoServico;
    };

    const exibirTotalConsumido = (totalConsumido: number) => {
        return totalConsumido !== 0
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalConsumido)
            : 'R$ 0,00';
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center py-6">
            <h2 className="text-3xl font-semibold mb-6">Clientes Mais Consumidos em Quantidade</h2>

            {loading ? (
                <div className="text-center">Carregando...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-gray-700 border border-gray-500 rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-6 py-3 text-left">Cliente</th>
                                <th className="px-6 py-3 text-left">Quantidade Total</th>
                                <th className="px-6 py-3 text-left">Total Consumido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length > 0 ? (
                                clientes.map((cliente, index) => {
                                    const { quantidadeTotal, totalConsumido } = calcularTotais(cliente);
                                    return (
                                        <tr key={index} className="hover:bg-gray-600">
                                            <td className="px-6 py-4">{cliente.nome}</td>
                                            <td className="px-6 py-4">{quantidadeTotal}</td>
                                            <td className="px-6 py-4 text-center">
                                                {exibirTotalConsumido(totalConsumido)}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">Nenhum cliente com consumo encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ClientesMaisConsumiramQuantidade;
