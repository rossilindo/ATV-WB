import React from "react";

interface Cliente {
    id: number;
    nome: string;
}

interface ListaClienteProps {
    tema: string;
}

const ListaCliente: React.FC<ListaClienteProps> = ({ tema }) => {
    const clientes: Cliente[] = [
        { id: 1, nome: "Cliente 1" },
        { id: 2, nome: "Cliente 2" },
        { id: 3, nome: "Cliente 3" },
        { id: 4, nome: "Cliente 4" }
    ];

    return (
        <div className={`flex flex-col space-y-4 ${tema}`}>
            {clientes.map((cliente) => (
                <div
                    key={cliente.id}
                    className={`text-slate-50 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 ${
                        cliente.id === 2
                            ? "bg-blue-500 hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-gray-50"
                            : "bg-[#232325] text-black"
                    } ${tema}`}
                >
                    {cliente.nome}
                </div>
            ))}
        </div>
    );
};

export default ListaCliente;
