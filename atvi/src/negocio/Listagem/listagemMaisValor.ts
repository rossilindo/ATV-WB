import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemClienteValor extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        let valorConsumido: Array<any> = [];
        this.clientes.forEach((cliente) => {
            let nomeCliente = cliente.nome;
            let precosProdutos = cliente.getProdutosConsumidos.reduce(
                (soma, produto) => soma + produto.preco,
                0
            );
            let precosServicos = cliente.getServicosConsumidos.reduce(
                (soma, servico) => soma + servico.preco,
                0
            );
            valorConsumido.push({
                nome: nomeCliente,
                precosProdutos,
                precosServicos,
            });
        });

        let ordenacaoProdutos = valorConsumido.sort(
            (a: { precosProdutos: number }, b: { precosProdutos: number }) => {
                return b.precosProdutos - a.precosProdutos;
            }
        );
        let restricaoProdutos = ordenacaoProdutos.slice(0, 5);

        console.log();
        console.log("Os clientes que mais consumiram em valor de produto");
        restricaoProdutos.forEach((consumidos: { nome: string; precosProdutos: number }) => {
            console.log(`Nome: ${consumidos.nome}`);
            console.log(`Produtos R$${consumidos.precosProdutos}`);
            console.log();
        });

        let ordenacaoServicos = valorConsumido.sort(
            (a: { precosServicos: number }, b: { precosServicos: number }) => {
                return b.precosServicos - a.precosServicos;
            }
        );
        let restricaoServicos = ordenacaoServicos.slice(0, 5);

        console.log("Os clientes que mais consumiram em valor de serviço");
        restricaoServicos.forEach((consumidos: { nome: string; precosServicos: number }) => {
            console.log(`Nome: ${consumidos.nome}`);
            console.log(`Serviços R$${consumidos.precosServicos}`);
            console.log();
        });
    }
}
