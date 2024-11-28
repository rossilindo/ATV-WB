import React, { useState } from "react";
import axios from "axios";

const CadastroCliente = () => {
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");

    const formatCpf = (value: string) => {
        let v = value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        return v
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const formatTelefone = (value: string) => {
        let v = value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        if (v.length > 10) {
            return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7, 11)}`;
        } else if (v.length > 5) {
            return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6, 10)}`;
        } else if (v.length > 2) {
            return `(${v.substring(0, 2)}) ${v.substring(2, 5)}`;
        }
        return v;
    };

    const formatRg = (value: string) => {
        let v = value.replace(/\D/g, '');
        if (v.length > 9) v = v.substring(0, 9);
        return v.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const clienteData = { nome, nomeSocial, cpf, rg, telefone, genero };

        try {
            const response = await axios.post("http://localhost:5000/clientes", clienteData);
                // Limpa os campos após a confirmação de sucesso
                alert("Cliente cadastrado com sucesso!"); // Alerta de sucesso
                setNome("");
                setNomeSocial("");
                setCpf("");
                setRg("");
                setTelefone("");
                setGenero("");
        } catch (error) {
            console.error("Erro ao cadastrar cliente", error);
        }
    };

    return (
        <div className="bg-gray-800 text-white min-h-screen p-8">
            <h1 className="text-3xl font-semibold text-center mb-6">Cadastrar Cliente</h1>

            <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
                {/* Campos do formulário */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-sm font-medium">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="nomeSocial" className="text-sm font-medium">Nome Social</label>
                        <input
                            id="nomeSocial"
                            type="text"
                            value={nomeSocial}
                            onChange={(e) => setNomeSocial(e.target.value)}
                            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="cpf" className="text-sm font-medium">CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(formatCpf(e.target.value))}
                            maxLength={14}
                            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="rg" className="text-sm font-medium">RG</label>
                        <input
                            id="rg"
                            type="text"
                            value={rg}
                            onChange={(e) => setRg(formatRg(e.target.value))}
                            maxLength={12}
                            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="telefone" className="text-sm font-medium">Telefone</label>
                    <input
                        id="telefone"
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                        maxLength={15}
                        className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="genero" className="text-sm font-medium">Gênero</label>
                    <select
                        id="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroCliente;
