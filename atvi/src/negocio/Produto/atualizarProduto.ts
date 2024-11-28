import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Update from "../update";

export default class UpdateProduto extends Update {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }
    
    public update(): void {
        console.log();
        console.log("Todos os produtos");
        this.listarProdutos();
        console.log();
        
        const nomeProduto = this.entrada.receberTexto("Nome do produto que deseja alterar: ");
        const indexProduto = this.encontrarProduto(nomeProduto);
        
        if (indexProduto === -1) {
            console.log(`Produto ${nomeProduto} não encontrado`);
        } else {
            const novoNome = this.entrada.receberTexto("Digite o novo nome do Produto: ");
            const novoPreco = this.entrada.receberNumero("Digite o novo preço do Produto: R$");
            
            this.atualizarProduto(indexProduto, novoNome, novoPreco);
            console.log("Produto alterado com sucesso");
        }
    }
    
    private listarProdutos(): void {
        this.produtos.forEach((produto) => {
            console.log(`Produto: ${produto.nome}`);
        });
    }
    
    private encontrarProduto(nome: string): number {
        return this.produtos.findIndex((produto) => produto.nome === nome);
    }
    
    private atualizarProduto(index: number, novoNome: string, novoPreco: number): void {
        this.produtos[index].nome = novoNome;
        this.produtos[index].preco = novoPreco;
    }
}
