import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Delete from "../delete";

export default class DeleteProduto extends Delete {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public delete(): void {
        console.log("\nLista de todos os Produtos");
        this.exibirProdutos();
        console.log();

        const entrada = this.entrada.receberTexto("Nome do produto que deseja deletar: ");
        const indexProduto = this.produtos.findIndex((produto) => produto.nome === entrada);

        if (indexProduto === -1) {
            console.log(`Produto ${entrada} não encontrado`);
        } else {
            console.log();
            console.log("Tem certeza que deseja deletar o produto?");
            console.log("1 - Sim");
            console.log("2 - Não");

            const valor = this.entrada.receberNumero("Digite a opção: ");
            if (valor === 1) {
                this.produtos.splice(indexProduto, 1);
                console.log("Produto deletado com sucesso");
            } else {
                console.log("Operação cancelada");
            }
        }
    }

    private exibirProdutos(): void {
        this.produtos.forEach((produto) => {
            console.log(`Produto: ${produto.nome}`);
        });
    }
}
