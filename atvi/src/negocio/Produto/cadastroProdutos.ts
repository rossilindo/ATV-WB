import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Cadastro from "../cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }
    
    public cadastrar(): void {
        console.log("\nCadastre seu produto");
        const produto = this.entrada.receberTexto("Qual é o nome do produto: ");
        
        if (this.existeProduto(produto)) {
            console.log(`${produto} já existe no sistema.\n`);
        } else {
            const preco = this.entrada.receberNumero("Qual é o preço do produto? R$");
            const novoProduto = new Produto(produto, preco);
            this.produtos.push(novoProduto);
            console.log();
        }
    }
    
    public geracao(): void {
        const produtos = [
            "Cotonete",
            "Shampoo",
            "Sabonete Líquido",
            "Sabonete",
            "Hidratante",
            "Lixa",
            "Creme Dental",
            "Fio Dental",
            "Escova de Dente",
            "Esmalte",
            "Matizante",
            "Lenços",
            "Prestobarba",
            "Creme de Barbear",
            "Desodorante",
            "Perfume",
            "Base",
            "Batom",
            "Delineador",
            "Cílios"
        ];
        const precos = [
            50.00,
            40.00,
            20.00,
            15.00,
            50.00,
            10.00,
            15.00,
            10.00,
            15.00,
            20.00,
            60.00,
            25.00,
            20.00,
            25.00,
            15.00,
            90.00,
            99.99,
            35.00,
            15.00,
            15.00
        ];

        for (let i = 0; i < produtos.length; i++) {
            const novoProduto = new Produto(produtos[i], precos[i]);
            this.produtos.push(novoProduto);
        }
    }
    
    private existeProduto(nome: string): boolean {
        return this.produtos.some((produto) => produto.nome === nome);
    }
}
