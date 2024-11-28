import React, { useState } from "react";

interface Cliente {
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
}

interface ListaClienteProps {
    tema: string;
    clientes: Cliente[];
}

const ListaCliente: React.FC<ListaClienteProps> = ({ tema, clientes }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(10);
    const [filtro, setFiltro] = useState("");

    const clientesFiltrados = clientes.filter(cliente =>
        `${cliente.nome} ${cliente.sobrenome}`.toLowerCase().includes(filtro.toLowerCase())
    );

    const indiceUltimo = paginaAtual * itensPorPagina;
    const indicePrimeiro = indiceUltimo - itensPorPagina;
    const clientesAtuais = clientesFiltrados.slice(indicePrimeiro, indiceUltimo);

    const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    return (
        <div className={`flex flex-col space-y-4 ${tema}`}>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="p-2 rounded border border-gray-300 w-full max-w-xs bg-[#252524] text-white"
                />
            </div>
            <table className="min-w-full bg-[#252524] rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left text-gray-300">Nome</th>
                        <th className="py-2 px-4 text-left text-gray-300">Sobrenome</th>
                        <th className="py-2 px-4 text-left text-gray-300">Telefone</th>
                        <th className="py-2 px-4 text-left text-gray-300">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesAtuais.length > 0 ? (
                        clientesAtuais.map((cliente, index) => (
                            <tr key={index} className="hover:bg-gray-600 transition duration-200">
                                <td className="py-2 px-4 text-gray-300">{cliente.nome}</td>
                                <td className="py-2 px-4 text-gray-300">{cliente.sobrenome}</td>
                                <td className="py-2 px-4 text-gray-300">{cliente.telefone}</td>
                                <td className="py-2 px-4 text-gray-300">{cliente.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-2 px-4 text-gray-300 text-center">Nenhum cliente encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={paginaAnterior}
                    disabled={paginaAtual === 1}
                    className={`font-semibold py-2 px-4 rounded ${paginaAtual === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                >
                    Anterior
                </button>
                <span className="text-gray-300">
                    Página {paginaAtual} de {totalPaginas}
                </span>
                <button
                    onClick={proximaPagina}
                    disabled={paginaAtual === totalPaginas}
                    className={`font-semibold py-2 px-4 rounded ${paginaAtual === totalPaginas ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                >
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default ListaCliente;
