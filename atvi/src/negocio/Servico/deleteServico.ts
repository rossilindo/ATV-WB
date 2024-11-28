import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Delete from "../delete";

export default class DeleteServico extends Delete {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public delete(): void {
        console.log("Lista de todos os Serviços");
        this.exibirServicos();

        const nomeServico = this.entrada.receberTexto("Nome do serviço que deseja deletar: ");

        const indexServico = this.encontrarIndexServico(nomeServico);
        if (indexServico === -1) {
            console.log(`Serviço ${nomeServico} não encontrado.`);
        } else {
            let execucao = true;
            while (execucao) {
                console.log();
                console.log("Tem certeza que deseja deletar o serviço?");
                console.log("1 - Sim");
                console.log("2 - Não");
                const opcao = this.entrada.receberNumero("Digite a opção: ");
                switch (opcao) {
                    case 1:
                        this.servicos.splice(indexServico, 1);
                        console.log("Serviço deletado com sucesso.");
                        execucao = false;
                        break;
                    case 2:
                        execucao = false;
                        break;
                    default:
                        console.log("Opção não existente.");
                        break;
                }
            }
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
