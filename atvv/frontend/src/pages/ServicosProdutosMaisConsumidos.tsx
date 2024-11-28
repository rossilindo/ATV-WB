import { useState, useEffect } from "react";

// Definição do tipo para Produto
type Produto = {
    nome: string;
    consumo: number;  // Quantidade consumida
};

// Definição do tipo para Servico
type Servico = {
    nome: string;
    consumo: number;  // Quantidade consumida
};

const ServicosProdutosMaisConsumidos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/produtos-servicos/mais-consumidos');
            
            if (response.ok) {
                const data = await response.json();

                const produtosComTotal = data.produtos
                    .map((produto: any) => ({
                        nome: produto.nome,
                        consumo: produto.consumos.reduce((acc: number, consumo: any) => acc + consumo.quantidade, 0),
                    }))
                    .sort((a: Produto, b: Produto) => b.consumo - a.consumo);

                const servicosComTotal = data.servicos
                    .map((servico: any) => ({
                        nome: servico.nome,
                        consumo: servico.consumos.reduce((acc: number, consumo: any) => acc + consumo.quantidade, 0),
                    }))
                    .sort((a: Servico, b: Servico) => b.consumo - a.consumo);

                setProdutos(produtosComTotal);
                setServicos(servicosComTotal);
            } else {
                console.error('Erro ao buscar os dados');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-800 text-white min-h-screen p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Produtos e Serviços Mais Consumidos</h1>

            <div className="flex justify-between gap-6">

                {/* Coluna de Produtos */}
                <div className="w-1/2 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">Produtos Mais Consumidos</h2>
                    <table className="min-w-full bg-gray-700 shadow-lg">
                        <thead>
                            <tr className="bg-blue-600">
                                <th className="px-6 py-3 text-left border-r border-gray-500">Nome</th>
                                <th className="px-6 py-3 text-left border-r border-gray-500">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto, index) => (
                                <tr key={index} className="hover:bg-gray-600 border-t border-gray-500">
                                    <td className="px-6 py-4">{produto.nome}</td>
                                    <td className="px-6 py-4">{produto.consumo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Coluna de Serviços */}
                <div className="w-1/2 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-500">Serviços Mais Consumidos</h2>
                    <table className="min-w-full bg-gray-700 shadow-lg">
                        <thead>
                            <tr className="bg-blue-600">
                                <th className="px-6 py-3 text-left border-r border-gray-500">Nome</th>
                                <th className="px-6 py-3 text-left border-r border-gray-500">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico, index) => (
                                <tr key={index} className="hover:bg-gray-600 border-t border-gray-500">
                                    <td className="px-6 py-4">{servico.nome}</td>
                                    <td className="px-6 py-4">{servico.consumo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ServicosProdutosMaisConsumidos;
