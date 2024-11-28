import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Delete from "../delete";

export default class DeleteCliente extends Delete {
    private clientes: Cliente[];
    private entrada: Entrada;

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public delete(): void {
        console.log("\nLista de todos os clientes:");
        this.clientes.forEach((cliente) => {
            console.log(`Nome: ${cliente.nome}`);
        });

        const nomeCliente = this.entrada.receberTexto("Escolha o cliente pelo nome: ");
        const clienteEncontrado = this.clientes.find((cliente) => cliente.nome === nomeCliente);

        if (!clienteEncontrado) {
            console.log(`Cliente ${nomeCliente} não existe.`);
            return;
        }

        console.log();
        console.log("Tem certeza que deseja deletar o cliente?");
        console.log("1 - Sim");
        console.log("2 - Não");

        const opcao = this.entrada.receberNumero("Digite a opção: ");

        if (opcao === 1) {
            const index = this.clientes.indexOf(clienteEncontrado);
            this.clientes.splice(index, 1);
            console.log("O cliente foi deletado.");
        } else {
            console.log("Operação de exclusão cancelada.");
        }
    }
}
