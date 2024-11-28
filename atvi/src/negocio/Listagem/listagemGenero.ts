import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemGenero extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log("\nClientes do sexo Masculino");
        this.listarPorGenero("Masculino");
        console.log("\nClientes do sexo Feminino");
        this.listarPorGenero("Feminino");
        console.log();
    }

    private listarPorGenero(genero: string): void {
        const clientesDoGenero = this.clientes.filter((cliente) => cliente.genero === genero);
        clientesDoGenero.forEach((cliente) => {
            console.log(`Nome: ${cliente.nome}`);
        });
    }
}
