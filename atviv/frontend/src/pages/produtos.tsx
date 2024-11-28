import { Component, ReactNode } from "react";
import SideBar from "../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import EditarServico from "./editarServico";

function TelaProduto() {
    return (
        <>
            <SideBar />
            <main className="bg-gray-800 text-white min-h-screen p-6">
            <h1 className="text-5xl font-semibold mb-6 text-center">Produtos</h1>

                <table className="min-w-full bg-gray-700 shadow-lg overflow-hidden mb-6">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Nome</th>
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Descrição</th>
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Preço</th>
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Quantidade Vendida</th>
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Valor Total em Vendas</th>
                            <th className="px-6 py-3 text-left border-r border-gray-500 rounded-none">Opções</th>
                        </tr>
                    </thead>

                    <tbody>
                        {["Depilação", "Manicure", "Limpeza de pele", "Pintura de Cabelo"].map((produto, index) => (
                            <tr key={index} className="hover:bg-gray-600 border-t border-gray-500">
                                <td className="px-6 py-4 border-r border-gray-500">{produto}</td>
                                <td className="px-6 py-4 border-r border-gray-500">Descrição do {produto}</td>
                                <td className="px-6 py-4 border-r border-gray-500">$80.25</td>
                                <td className="px-6 py-4 border-r border-gray-500">0</td>
                                <td className="px-6 py-4 border-r border-gray-500">$0.00</td>
                                <td className="px-6 py-4 border-r border-gray-500">
                                    <Link to={'/produtos/Editar/${produtoId}'}>
                                        <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors duration-300 mr-2 border-none">
                                            Editar
                                        </button>
                                    </Link>
                                    <button 
                                        onClick={() => alert('Deletado com sucesso')} 
                                        className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors duration-300 border-none"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <Link 
                        to={'/produtos/cadastro'} 
                        className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors duration-300 border-none"
                    >
                        Adicionar Produto
                    </Link>
                </div>
            </main>
        </>
    );
}

export default TelaProduto;
