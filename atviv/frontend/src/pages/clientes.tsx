import { useState, useEffect } from "react";
import SideBar from "../components/sidebar/sidebar";
import { Link } from "react-router-dom";

export interface ITelefone {
    id: number;
    ddd: string;
    numero: string;
}

export interface IEndereco {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

export interface ICliente {
    id: number;
    nome: string;
    sobreNome: string;
    email: string;
    endereco: IEndereco;
    telefones: Array<ITelefone>;
}

function Cliente() {
    const [clientes, setClientes] = useState<ICliente[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [clienteIdToDelete, setClienteIdToDelete] = useState<number | null>(null);

    const getClientes = () => {
        fetch('http://localhost:32832/clientes')
            .then((response) => response.json())
            .then((data) => setClientes(data));
    };

    const excluirClientes = (id: number) => {
        fetch('http://localhost:32832/cliente/excluir', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
            .then(() => {
                alert('Cliente excluído com sucesso');
                getClientes();
                setModalVisible(false); // Fechar o modal após excluir
            })
            .catch((erro) => console.log(erro));
    };

    const openModal = (id: number) => {
        setClienteIdToDelete(id);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setClienteIdToDelete(null);
    };

    useEffect(() => getClientes(), []);

    return (
        <>
            <SideBar />

            <div className="min-h-screen bg-gray-900 p-8">
                <h1 className="text-5xl text-blue-400 font-semibold mb-8">
                    Clientes
                </h1>
                <Link to="/clientes/cadastro">
                    <button className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 flex items-center justify-center space-x-2">
                        <span className="material-icons">add</span>
                        <span>Cadastrar Cliente</span>
                    </button>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clientes.map((cliente) => (
                        <div key={cliente.id} className="bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-700 transition-all hover:bg-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">{cliente.nome}</h2>

                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <p className="text-lg font-semibold text-blue-400 mb-2">Email:</p>
                                <p className="text-gray-300">{cliente.email || "Não informado"}</p>
                            </div>

                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <p className="text-lg font-semibold text-blue-400 mb-2">Telefone(s):</p>
                                <ul className="space-y-1 ml-4">
                                    {cliente.telefones.map((telefone) => (
                                        <li key={telefone.id} className="flex items-center text-gray-300">
                                            <span className="material-icons mr-2 text-blue-500">phone</span>
                                            ({telefone.ddd}) {telefone.numero}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <p className="text-lg font-semibold text-blue-400 mb-2">Endereço:</p>
                                <ul className="space-y-1 text-gray-300 ml-4">
                                    <li><span className="font-medium">Estado:</span> {cliente.endereco.estado}</li>
                                    <li><span className="font-medium">Cidade:</span> {cliente.endereco.cidade}</li>
                                    <li><span className="font-medium">CEP:</span> {cliente.endereco.codigoPostal}</li>
                                    <li><span className="font-medium">Bairro:</span> {cliente.endereco.bairro}</li>
                                    <li><span className="font-medium">Rua:</span> {cliente.endereco.rua}</li>
                                    <li><span className="font-medium">Nº:</span> {cliente.endereco.numero}</li>
                                </ul>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <Link to={`/clientes/editar/${cliente.id}`}>
                                    <button className="flex items-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                        <span className="material-icons mr-1">edit</span> Editar
                                    </button>
                                </Link>
                                <button
                                    onClick={() => openModal(cliente.id)}
                                    className="flex items-center bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                >
                                    <span className="material-icons mr-1">delete</span> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
        </div >

            {/* Modal de Confirmação */ }
    {
        modalVisible && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-10 text-center">Tem certeza que deseja excluir este cliente?</h2>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => excluirClientes(clienteIdToDelete!)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                        >
                            Confirmar
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        </>
    );
}

export default Cliente;
