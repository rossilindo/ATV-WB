import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemQuantidade extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        let consumidores: Array<any> = [];
        this.clientes.forEach((cliente) => {
            let nomeCliente = cliente.getNome;
            let quantidadeConsumo =
                cliente.getProdutosConsumidos.length +
                cliente.getServicosConsumidos.length;
            consumidores.push({ nome: nomeCliente, quantidade: quantidadeConsumo });
        });

        let ordenacao = consumidores.sort(
            (a: { quantidade: number }, b: { quantidade: number }) => {
                return b.quantidade - a.quantidade;
            }
        );

        let restricao = ordenacao.slice(0, 10);

        console.log("===============================");
        console.log("Os 10 clientes que mais consumiram produtos e serviços");
        restricao.forEach((consumidos: { nome: string; quantidade: number }) => {
            console.log(`Nome: ${consumidos.nome}`);
            console.log(`Quantidade total consumida: ${consumidos.quantidade} itens`);
            console.log();
        });
        console.log("==============================");
    }
}
