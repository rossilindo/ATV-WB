import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/sidebar";
import { Link, redirect, redirectDocument, useNavigate, useParams } from "react-router-dom";
import Combobox from "react-widgets/Combobox";
import DataPicker from "react-widgets/DatePicker";
import axios from "axios"
import { ICliente, ITelefone } from "./clientes";

interface clienteId {
    id: number
}
interface addTelefone {
    ddd: string
    numero: string
}

function EditarCliente() {
    const [cliente, setCliente] = useState<ICliente>()
    const [ddd, setDDD] = useState<string>('')
    const [telefoneNumero, setTelefoneNumero] = useState<string>('')
    const { id } = useParams()
    const navigate = useNavigate()

    const getClienteId = () => {
        fetch(`http://localhost:32832/cliente/${id}`).then(resp => resp.json())
            .then(data => {
                setCliente(data)
                console.log('cliente')
                console.log(data)
            }).catch(erro => {
                console.log(erro)
            })
    }

    const removeTelefone = (telefoneRemovido, event) => {
        event.preventDefault();

        const index = cliente.telefones.indexOf(telefoneRemovido)

        console.log(index)

        const newTelefones = [...cliente.telefones]

        newTelefones.splice(index, 1)

        console.log(newTelefones)

        setCliente({ ...cliente, telefones: newTelefones })
    }

    const adicionaNumero = () => {
        const newTelefone: ITelefone = {
            id: null,
            ddd: ddd,
            numero: telefoneNumero,
        }


        const novosTelefones = [...cliente.telefones, newTelefone]
        console.log(novosTelefones)
        setCliente({ ...cliente, telefones: novosTelefones })
    }

    const atualizarCliente = () => {
        fetch('http://localhost:32832/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        }).then((resp) => console.log(resp))
        navigate('/clientes')
        window.location.reload();
    }

    useEffect(
        () => getClienteId()
        , []
    )


    return (
        <>
            <SideBar />
            <div className="bg-gray-900 p-8">
                <h2 className="text-white text-3xl font-bold mb-6">Cadastro de Cliente</h2>
                {cliente && (
                    <div className="space-y-6">
                        <Link to={'/clientes'} className="inline-flex items-center text-white border border-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
                        <i className="material-icons text-xl">arrow_back</i> 
                        </Link>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            {/* Nome e Sobrenome */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Campo Nome */}
                                <div className="flex flex-col">
                                    <label htmlFor="first_name" className="text-white text-sm mb-2">Nome do Cliente</label>
                                    <input
                                        value={cliente.nome}
                                        id="first_name"
                                        type="text"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                                    />
                                </div>

                                {/* Campo Sobrenome */}
                                <div className="flex flex-col">
                                    <label htmlFor="middle_name" className="text-white text-sm mb-2">Sobrenome</label>
                                    <input
                                        value={cliente.sobreNome}
                                        id="middle_name"
                                        type="text"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        onChange={(e) => setCliente({ ...cliente, sobreNome: e.target.value })}
                                    />
                                </div>

                                {/* Campo Email */}
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-white text-sm mb-2">Email</label>
                                    <input
                                        value={cliente.email}
                                        id="email"
                                        type="email"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Endereço */}
                            <h5 className="text-white text-lg mt-6 mb-4">Endereço</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Estado */}
                                <div className="flex flex-col">
                                    <label htmlFor="estado" className="text-white text-sm mb-2">Estado</label>
                                    <input
                                        value={cliente.endereco.estado}
                                        id="estado"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, estado: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* Cidade */}
                                <div className="flex flex-col">
                                    <label htmlFor="cidade" className="text-white text-sm mb-2">Cidade</label>
                                    <input
                                        value={cliente.endereco.cidade}
                                        id="cidade"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, cidade: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* Bairro */}
                                <div className="flex flex-col">
                                    <label htmlFor="bairro" className="text-white text-sm mb-2">Bairro</label>
                                    <input
                                        value={cliente.endereco.bairro}
                                        id="bairro"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, bairro: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* Rua */}
                                <div className="flex flex-col">
                                    <label htmlFor="rua" className="text-white text-sm mb-2">Rua</label>
                                    <input
                                        value={cliente.endereco.rua}
                                        id="rua"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, rua: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* Número */}
                                <div className="flex flex-col">
                                    <label htmlFor="numero" className="text-white text-sm mb-2">Número</label>
                                    <input
                                        value={cliente.endereco.numero}
                                        id="numero"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, numero: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* CEP */}
                                <div className="flex flex-col">
                                    <label htmlFor="CEP" className="text-white text-sm mb-2">CEP</label>
                                    <input
                                        value={cliente.endereco.codigoPostal}
                                        id="CEP"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, codigoPostal: e.target.value },
                                            })
                                        }
                                    />
                                </div>

                                {/* Informações Adicionais */}
                                <div className="flex flex-col">
                                    <label htmlFor="informacoes_adicionais" className="text-white text-sm mb-2">Informações Adicionais</label>
                                    <input
                                        value={cliente.endereco.informacoesAdicionais}
                                        id="informacoes_adicionais"
                                        className="bg-gray-700 text-white rounded-md p-4"
                                        type="text"
                                        onChange={(e) =>
                                            setCliente({
                                                ...cliente,
                                                endereco: { ...cliente.endereco, informacoesAdicionais: e.target.value },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {/* Telefones */}
                            <h5 className="text-white text-lg mt-6 mb-4">Telefones</h5>
                            {cliente.telefones.map((telefone, index) => (
                                <div className="flex space-x-4 mb-4" key={telefone.id}>
                                    <div className="flex flex-col">
                                        <label htmlFor={`ddd-${index}`} className="text-white text-sm mb-2">DDD</label>
                                        <input
                                            value={telefone.ddd}
                                            id={`ddd-${index}`}
                                            className="bg-gray-700 text-white rounded-md p-4 w-24"
                                            type="text"
                                            onChange={(e) => {
                                                const updatedTelefones = [...cliente.telefones];
                                                updatedTelefones[index] = { ...updatedTelefones[index], ddd: e.target.value };
                                                setCliente({ ...cliente, telefones: updatedTelefones });
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault(); // Impede o envio do formulário ao pressionar "Enter"
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor={`numero-${index}`} className="text-white text-sm mb-2">Telefone</label>
                                        <input
                                            value={telefone.numero}
                                            id={`numero-${index}`}
                                            className="bg-gray-700 text-white rounded-md p-4 w-48"
                                            type="text"
                                            onChange={(e) => {
                                                const updatedTelefones = [...cliente.telefones];
                                                updatedTelefones[index] = { ...updatedTelefones[index], numero: e.target.value };
                                                setCliente({ ...cliente, telefones: updatedTelefones });
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault(); // Impede o envio do formulário ao pressionar "Enter"
                                                }
                                            }}
                                        />
                                    </div>

                                    <button
                                        onClick={(e) => removeTelefone(telefone, e)}
                                        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-400 text-sm"
                                    >
                                        Excluir telefone
                                    </button>
                                </div>
                            ))}


                            {/* Botão de Adicionar Telefone */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={adicionaNumero}
                                    className="bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-400 text-sm"
                                >
                                    Adicionar
                                </button>
                            </div>

                            {/* Botão de Atualizar Cliente */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={atualizarCliente}
                                    className="bg-green-500 text-white rounded-md px-6 py-3 hover:bg-green-400 text-sm"
                                >
                                    Atualizar Cliente
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

        </>
    );

}

export default EditarCliente;