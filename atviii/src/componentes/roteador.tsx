import React, { useState } from 'react';
import ListaCliente from './listaCliente';
import FormularioCadastroCliente from './formularioCadastroCliente';
import { Cliente } from '../tipos/cliente'; 


const Roteador: React.FC = () => {
    const [tela, setTela] = useState<'Clientes' | 'Cadastrar'>('Clientes');
    const [clientes, setClientes] = useState<Cliente[]>([]); 

    const adicionarCliente = (cliente: Omit<Cliente, 'id'>) => {
        const novoCliente: Cliente = { id: Date.now(), ...cliente };
        setClientes((prev) => [...prev, novoCliente]);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900">
            <div className="flex space-x-4 mb-4">
                <button onClick={() => setTela('Clientes')} className="p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300">
                    Clientes
                </button>
                <button onClick={() => setTela('Cadastrar')} className="p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300">
                    Cadastrar Cliente
                </button>
            </div>

            <div className="w-full max-w-3xl bg-[#151515] rounded-lg shadow-lg p-6 mt-4">
                {tela === 'Clientes' ? (
                    <ListaCliente clientes={clientes} tema="text-gray-800" />
                ) : (
                    <FormularioCadastroCliente adicionarCliente={adicionarCliente} tema="text-gray-800" />
                )}
            </div>
        </div>
    );
};

export default Roteador;
