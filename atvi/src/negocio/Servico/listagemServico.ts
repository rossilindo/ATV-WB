import Servico from "../../modelo/servico";
import Listagem from "../listagem";

export default class ListagemServico extends Listagem {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
    }

    public listar(): void {
        console.log("\nListagem de Serviços\n");
        this.exibirServicos();
    }

    private exibirServicos(): void {
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.nome}`);
            console.log(`R$${servico.preco}`);
            this.exibirSeparador();
        });
    }

    private exibirSeparador(): void {
        console.log("===================");
    }
}
