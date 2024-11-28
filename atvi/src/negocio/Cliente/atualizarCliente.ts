import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import Produto from "../../modelo/produto";
import RG from "../../modelo/rg";
import Servico from "../../modelo/servico";
import Telefone from "../../modelo/telefone";
import Update from "../update";

export default class UpdateCliente extends Update {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super();
        this.clientes = clientes;
        this.servicos = servicos;
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public update(): void {
        console.log("\nLista de todos os clientes:");
        this.listarClientes();

        const nomeCliente = this.entrada.receberTexto("Escolha qual cliente escrevendo o nome: ");
        const indexCliente = this.encontrarCliente(nomeCliente);

        if (indexCliente === -1) {
            console.log(`Cliente "${nomeCliente}" não existe`);
        } else {
            this.editarCliente(indexCliente);
        }
    }

    private listarClientes(): void {
        this.clientes.forEach((cliente) => {
            console.log(`Nome: ${cliente.nome}`);
        });
    }

    private encontrarCliente(nome: string): number {
        return this.clientes.findIndex((cliente) => cliente.nome === nome);
    }

    private editarCliente(index: number): void {
        let loop = true;

        while (loop) {
            console.log("1 - Editar nome");
            console.log("2 - Editar nome Social");
            console.log("3 - Editar CPF");
            console.log("4 - Editar RG");
            console.log("5 - Editar Telefone");
            console.log("0 - Sair");
            console.log();

            const entradaOption = this.entrada.receberNumero("Digite o número desejado: ");

            switch (entradaOption) {
                case 1:
                    const novoNome = this.entrada.receberTexto("Digite o novo nome: ");
                    this.clientes[index].nome = novoNome;
                    loop = false;
                    console.log("Nome Atualizado");
                    console.log();
                    break;
                case 2:
                    const novoNomeSocial = this.entrada.receberTexto("Digite o novo nome Social: ");
                    this.clientes[index].nomeSocial = novoNomeSocial;
                    console.log("Nome Social Atualizado");
                    console.log();
                    break;
                case 3:
                    this.editarCPF(index);
                    break;
                case 4:
                    this.editarRG(index);
                    break;
                case 5:
                    this.editarTelefone(index);
                    break;
                case 0:
                    loop = false;
                    break;
                default:
                    console.log("Comando não encontrado");
            }
        }
    }

    private editarCPF(index: number): void {
        let cpfLoop = true;

        while (cpfLoop) {
            console.log("1 - Editar CPF");
            console.log("2 - Editar Data de Emissão do CPF");
            console.log("0 - Sair");

            const receberCPF = this.entrada.receberNumero("Digite a opção: ");

            switch (receberCPF) {
                case 1:
                    const novoCPF = this.entrada.receberTexto("Digite o novo CPF: ");
                    this.clientes[index].getCpf.setValor = novoCPF;
                    break;
                case 2:
                    const novaData = this.entrada.receberTexto("Informe a data de emissão do CPF, no padrão dd/mm/yyyy: ");
                    const partesData = novaData.split("/");
                    const ano = parseInt(partesData[2], 10);
                    const mes = parseInt(partesData[1], 10);
                    const dia = parseInt(partesData[0], 10);
                    const dataEmissao = new Date(ano, mes - 1, dia);
                    this.clientes[index].getCpf.setDataEmissao = dataEmissao;
                    break;
                case 0:
                    cpfLoop = false;
                    break;
                default:
                    console.log("Valor não encontrado");
            }
        }
    }

    private editarRG(index: number): void {
        console.log("RGS existentes: ");
        this.clientes[index].getRgs.forEach((rg, rgIndex) => {
            console.log(`Índice ${rgIndex} - ${rg.getValor} - ${rg.getDataEmissao.toLocaleDateString()}`);
            console.log();
        });

        let rgLoop = true;

        while (rgLoop) {
            console.log("1 - Editar RG");
            console.log("2 - Editar Data de Emissão do RG");
            console.log("0 - Sair");

            const rgEntrada = this.entrada.receberNumero("Escolha a opção: ");

            switch (rgEntrada) {
                case 1:
                    let rgLoopEscolhido = true;

                    while (rgLoopEscolhido) {
                        console.log("-1 - Sair");

                        const rgIndice = this.entrada.receberNumero("Escolha o RG pelo índice: ");

                        if (rgIndice === -1) {
                            rgLoopEscolhido = false;
                            break;
                        }

                        const novoRG = this.entrada.receberTexto("Digite o novo RG: ");
                        this.clientes[index].getRgs[rgIndice].setValor = novoRG;
                    }

                    break;
                case 2:
                    let rgLoopData = true;

                    while (rgLoopData) {
                        console.log("-1 - Sair");

                        const rgIndice = this.entrada.receberNumero("Escolha o RG pelo índice: ");

                        if (rgIndice === -1) {
                            rgLoopData = false;
                            break;
                        }

                        const novaData = this.entrada.receberTexto("Informe a data de emissão do RG, no padrão dd/mm/yyyy: ");
                        const partesData = novaData.split("/");
                        const ano = parseInt(partesData[2], 10);
                        const mes = parseInt(partesData[1], 10);
                        const dia = parseInt(partesData[0], 10);
                        const dataEmissao = new Date(ano, mes - 1, dia);
                        this.clientes[index].getRgs[rgIndice].setDataEmissao = dataEmissao;
                    }

                    break;
                case 0:
                    rgLoop = false;
                    break;
                default:
                    console.log("Valor não encontrado");
            }
        }
    }

    private editarTelefone(index: number): void {
        this.clientes[index].getTelefones.forEach((telefone, telefoneIndex) => {
            console.log(`Índice ${telefoneIndex} - ${telefone.getDdd} ${telefone.getNumero}`);
            console.log();
        });

        let telefoneLoop = true;

        while (telefoneLoop) {
            console.log("-1 - Sair");

            const telefoneIndice = this.entrada.receberNumero("Digite o índice do Telefone: ");

            if (telefoneIndice === -1) {
                telefoneLoop = false;
                break;
            }

            const novoTelefone = this.entrada.receberTexto("Digite o número do telefone no padrão DDD / Númeero:");
            const partesTelefone = novoTelefone.split(" ");
            const ddd = partesTelefone[0];
            const numero = partesTelefone[1];

            this.clientes[index].getTelefones[telefoneIndice].setDDD = ddd;
            this.clientes[index].getTelefones[telefoneIndice].setNumero = numero;
        }
    }
}
