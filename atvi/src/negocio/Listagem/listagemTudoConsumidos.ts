import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemProdutosServicosConsumidos extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        const produtosMaisConsumidos = this.obterProdutosMaisConsumidos();
        console.log("Produto mais consumido");
        this.exibirConsumo(produtosMaisConsumidos);

        const servicosMaisConsumidos = this.obterServicosMaisConsumidos();
        console.log("Serviço mais consumido");
        this.exibirConsumo(servicosMaisConsumidos);
    }

    private obterProdutosMaisConsumidos(): any {
        let produtosConsumidos: { [nome: string]: number } = {};
        this.clientes.forEach((cliente) => {
            cliente.getProdutosConsumidos.forEach((produto) => {
                const nome = produto.nome;
                produtosConsumidos[nome] = (produtosConsumidos[nome] || 0) + 1;
            });
        });

        return this.ordenarConsumo(produtosConsumidos);
    }

    private obterServicosMaisConsumidos(): any {
        let servicosConsumidos: { [nome: string]: number } = {};
        this.clientes.forEach((cliente) => {
            cliente.getServicosConsumidos.forEach((servico) => {
                const nome = servico.nome;
                servicosConsumidos[nome] = (servicosConsumidos[nome] || 0) + 1;
            });
        });

        return this.ordenarConsumo(servicosConsumidos);
    }

    private ordenarConsumo(consumo: { [nome: string]: number }): any[] {
        return Object.entries(consumo)
            .sort((a, b) => b[1] - a[1])
            .map(([nome, quantidade]) => ({ nome, quantidade }));
    }

    private exibirConsumo(consumo: any[]): void {
        const restricao = consumo.slice(0, 1);
        restricao.forEach((consumido) => {
            console.log(`Nome: ${consumido.nome}`);
            console.log(`Quantidade consumida: ${consumido.quantidade}`);
            console.log();
        });
    }
}
