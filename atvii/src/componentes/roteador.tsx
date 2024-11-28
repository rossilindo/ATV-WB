import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";

type State = {
    tela: string;
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: "Clientes",
        };
        this.selecionarView = this.selecionarView.bind(this);
    }

    selecionarView(novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) {
        evento.preventDefault();
        this.setState({ tela: novaTela });
    }

    render() {
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="bg-blue-600 text-white"
                botoes={["Clientes", "Cadastros"]}
            />
        );

        return (
            <div className="min-h-screen bg-[#232325] flex flex-col items-center p-4">
                {barraNavegacao}
                <div className="w-full max-w-3xl bg-[#121212] rounded-lg shadow-lg p-6 mt-4">
                    {this.state.tela === "Clientes" ? (
                        <ListaCliente tema="text-gray-800" />
                    ) : (
                        <FormularioCadastroCliente tema="text-gray-800" />
                    )}
                </div>
            </div>
        );
    }
}
