import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Update from "../update";

export default class UpdateServico extends Update {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public update(): void {
        console.log("\nLista de todos os Serviços");
        this.exibirServicos();

        const nomeServico = this.entrada.receberTexto("Escolha qual serviço escrevendo o nome: ");
        const indexServico = this.encontrarIndexServico(nomeServico);

        if (indexServico === -1) {
            console.log(`Serviço ${nomeServico} não existe.`);
        } else {
            const novoNome = this.entrada.receberTexto("Digite o novo nome do Serviço: ");
            const novoPreco = this.entrada.receberNumero("Digite o novo preço do Serviço: R$");

            this.servicos[indexServico].nome = novoNome;
            this.servicos[indexServico].preco = novoPreco;

            console.log("Serviço alterado com sucesso.");
        }
    }

    private exibirServicos(): void {
        this.servicos.forEach((servico) => {
            console.log(`Serviço: ${servico.nome}`);
        });
    }

    private encontrarIndexServico(nome: string): number {
        return this.servicos.findIndex((servico) => servico.nome === nome);
    }
}
