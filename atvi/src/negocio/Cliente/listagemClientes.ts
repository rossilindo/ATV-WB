import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Cliente[];

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log("\nLista de todos os clientes:");

        this.clientes.forEach((cliente) => {
            console.log("Data de cadastro:", cliente.getDataCadastro.toLocaleDateString());
            console.log("Nome:", cliente.nome);
            console.log("Nome social:", cliente.nomeSocial);
            console.log("Gênero:", cliente.genero);
            console.log("CPF:", cliente.getCpf.getValor);
            console.log("CPF emissão:", cliente.getCpf.getDataEmissao.toLocaleDateString());

            cliente.getRgs.forEach((rg, index) => {
                console.log(`RG ${index + 1}:`, rg.getValor, "emissão em", rg.getDataEmissao.toLocaleDateString());
            });

            cliente.getTelefones.forEach((telefone, index) => {
                console.log(`Telefone ${index + 1}:`, telefone.getDdd, telefone.getNumero);
            });

            console.log("==============================");
            console.log("Listagem de Produtos consumidos:");

            cliente.getProdutosConsumidos.forEach((produto) => {
                console.log(produto.nome);
                console.log("R$", produto.preco);
            });

            console.log("==============================");
            console.log("Listagem de Serviços Consumidos:");

            cliente.getServicosConsumidos.forEach((servico) => {
                console.log(servico.nome);
                console.log("R$", servico.preco);
            });

            console.log("===============================\n");
        });

        console.log("\n");
    }
}
