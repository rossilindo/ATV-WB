import React, { useState } from "react";
import BarraNavegacao from "./componentes/barraNavegacao";
import FormularioCadastroCliente from "./componentes/formularioCadastroCliente";
import ListaCliente from "./componentes/listaCliente";

const App: React.FC = () => {
    const [tela, setTela] = useState<string>("Clientes");
    const [clientes, setClientes] = useState<any[]>([]); // Inicializando com array vazio

    const seletorView = (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => {
        evento.preventDefault();
        setTela(novaTela);
    };

    const adicionarCliente = (cliente: { nome: string; sobrenome: string; telefone: string; email: string; }) => {
        setClientes([...clientes, cliente]);
        setTela("Clientes");
    };

    return (
        <div className="min-h-screen bg-[#252524] flex flex-col items-center p-6">
            <BarraNavegacao
                seletorView={seletorView}
                tema="bg-blue-500 text-white"
                botoes={["Clientes", "Cadastros"]}
            />
            <div className="w-full max-w-2xl bg-[#151515] rounded-lg p-6 mt-4">
                {tela === "Clientes" ? (
                    <ListaCliente tema="text-gray-300" clientes={clientes} />
                ) : (
                    <FormularioCadastroCliente tema="text-gray-300" adicionarCliente={adicionarCliente} />
                )}
            </div>
        </div>
    );
};

export default App;
