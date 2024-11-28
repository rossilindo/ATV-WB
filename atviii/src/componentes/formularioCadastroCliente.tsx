import React, { useState } from "react";

interface FormularioCadastroClienteProps {
    tema: string;
    adicionarCliente: (cliente: { nome: string; sobrenome: string; telefone: string; email: string; }) => void;
}

const FormularioCadastroCliente: React.FC<FormularioCadastroClienteProps> = ({ tema, adicionarCliente }) => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (evento: React.FormEvent) => {
        evento.preventDefault();
        adicionarCliente({ nome, sobrenome, telefone, email });
        setNome("");
        setSobrenome("");
        setTelefone("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col space-y-4 ${tema}`}>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                className="p-2 rounded bg-[#252524] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder="Sobrenome"
                className="p-2 rounded bg-[#252524] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone"
                className="p-2 rounded bg-[#252524] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 rounded bg-[#252524] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                Cadastrar Cliente
            </button>
        </form>
    );
};

export default FormularioCadastroCliente;
