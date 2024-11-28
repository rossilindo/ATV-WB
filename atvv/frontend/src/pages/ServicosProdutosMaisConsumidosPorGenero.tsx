import React, { useEffect, useState } from "react";

// Definição do tipo para Produto
type Produto = {
    nome: string;
    consumo: number;
};

// Definição do tipo para Servico
type Servico = {
    nome: string;
    consumo: number;
};

type GeneroConsumo = {
    genero: string;
    produtos: Produto[];
    servicos: Servico[];
};

const ServicosProdutosMaisConsumidosPorGenero: React.FC = () => {
    const [dadosPorGenero, setDadosPorGenero] = useState<GeneroConsumo[]>([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/produtos-servicos/por-genero"
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log("Dados retornados pela API:", data);

                    if (Array.isArray(data)) {
                        const processados: GeneroConsumo[] = data.map((item: any) => {
                            console.log("Item do gênero:", item);

                            // Agrupar produtos por nome e somar as quantidades
                            const produtosMap: { [key: string]: number } = {};
                            item.consumos
                                .filter((consumo: any) => consumo.produto !== null)
                                .forEach((produto: any) => {
                                    const nomeProduto = produto.produto?.nome || "Desconhecido";
                                    const quantidade = produto.quantidade || 0;
                                    if (produtosMap[nomeProduto]) {
                                        produtosMap[nomeProduto] += quantidade; // Soma as quantidades
                                    } else {
                                        produtosMap[nomeProduto] = quantidade; // Inicia com a quantidade
                                    }
                                });

                            // Agrupar serviços por nome e somar as quantidades
                            const servicosMap: { [key: string]: number } = {};
                            item.consumos
                                .filter((consumo: any) => consumo.servico !== null)
                                .forEach((servico: any) => {
                                    const nomeServico = servico.servico?.nome || "Desconhecido";
                                    const quantidade = servico.quantidade || 0;
                                    if (servicosMap[nomeServico]) {
                                        servicosMap[nomeServico] += quantidade; // Soma as quantidades
                                    } else {
                                        servicosMap[nomeServico] = quantidade; // Inicia com a quantidade
                                    }
                                });

                            return {
                                genero: item.genero || "Indefinido",
                                produtos: Object.keys(produtosMap).map((nomeProduto) => ({
                                    nome: nomeProduto,
                                    consumo: produtosMap[nomeProduto],
                                }))
                                .sort((a, b) => b.consumo - a.consumo), // Ordenação de produtos

                                servicos: Object.keys(servicosMap).map((nomeServico) => ({
                                    nome: nomeServico,
                                    consumo: servicosMap[nomeServico],
                                }))
                                .sort((a, b) => b.consumo - a.consumo), // Ordenação de serviços
                            };
                        });

                        console.log("Dados processados:", processados);

                        setDadosPorGenero(processados);
                    } else {
                        console.error("Formato inesperado de dados:", data);
                    }
                } else {
                    console.error("Erro ao buscar os dados");
                }
            } catch (error) {
                console.error("Erro ao buscar produtos e serviços por gênero:", error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-800 text-white p-6">
            <h1 className="text-4xl font-semibold mb-6 text-center">
                Consumo por Gênero
            </h1>

            <div className="flex justify-center gap-12">
                {/* Gênero Masculino */}
                <div className="w-full sm:w-1/2">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Masculino</h2>
                    {dadosPorGenero
                        .filter((item) => item.genero === "Masculino")
                        .map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 mb-6 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between gap-6">
                                    {/* Produtos */}
                                    <div className="w-1/2">
                                        <h3 className="text-lg font-semibold">Produtos</h3>
                                        <table className="w-full mt-2 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-600">
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Nome
                                                    </th>
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Consumo
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.produtos.map((produto, produtoIndex) => (
                                                    <tr
                                                        key={produtoIndex}
                                                        className="hover:bg-gray-600"
                                                    >
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {produto.nome}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {produto.consumo}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Serviços */}
                                    <div className="w-1/2">
                                        <h3 className="text-lg font-semibold">Serviços</h3>
                                        <table className="w-full mt-2 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-600">
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Nome
                                                    </th>
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Consumo
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.servicos.map((servico, servicoIndex) => (
                                                    <tr
                                                        key={servicoIndex}
                                                        className="hover:bg-gray-600"
                                                    >
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {servico.nome}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {servico.consumo}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Gênero Feminino */}
                <div className="w-full sm:w-1/2">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4 text-center">Feminino</h2>
                    {dadosPorGenero
                        .filter((item) => item.genero === "Feminino")
                        .map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 mb-6 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between gap-6">
                                    {/* Produtos */}
                                    <div className="w-1/2">
                                        <h3 className="text-lg font-semibold">Produtos</h3>
                                        <table className="w-full mt-2 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-600">
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Nome
                                                    </th>
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Consumo
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.produtos.map((produto, produtoIndex) => (
                                                    <tr
                                                        key={produtoIndex}
                                                        className="hover:bg-gray-600"
                                                    >
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {produto.nome}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {produto.consumo}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Serviços */}
                                    <div className="w-1/2">
                                        <h3 className="text-lg font-semibold">Serviços</h3>
                                        <table className="w-full mt-2 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-600">
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Nome
                                                    </th>
                                                    <th className="px-4 py-2 text-left border-b border-gray-500">
                                                        Consumo
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.servicos.map((servico, servicoIndex) => (
                                                    <tr
                                                        key={servicoIndex}
                                                        className="hover:bg-gray-600"
                                                    >
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {servico.nome}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-500">
                                                            {servico.consumo}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ServicosProdutosMaisConsumidosPorGenero;
