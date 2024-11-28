import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import Produto from "../../modelo/produto";
import RG from "../../modelo/rg";
import Servico from "../../modelo/servico";
import Telefone from "../../modelo/telefone";
import Gerar from "../gerar";

export default class GeracaoDeCliente extends Gerar {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super();
        this.clientes = clientes;

        this.produtos = [
            new Produto("Bronzeador", 30.50),
            new Produto("Lenços Umedecidos", 15.90),
            new Produto("Descolorante", 25.00),
            new Produto("Matizador", 40.00),
            new Produto("Shampoo", 20.00),
            new Produto("Hidratante", 35.50),
            new Produto("Sabonete", 5.00),
            new Produto("Desodorante", 10.50),
            new Produto("Creme para as mãos", 25.00),
            new Produto("Gel de cabelo", 15.00),
            new Produto("Perfume", 150.00),
            new Produto("Creme de hidratação", 40.00),
            new Produto("Máscara de cílios", 30.00),
            new Produto("Batom", 20.00),
            new Produto("Cera para cabelo", 12.50),
            new Produto("Esfoliante", 22.50),
            new Produto("Creme anti-idade", 120.00),
            new Produto("Condicionador", 18.00),
            new Produto("Base", 35.00),
            new Produto("Corretivo", 25.00),
            new Produto("Loção pós-barba", 20.00),
            new Produto("Protetor solar", 45.00),
            new Produto("Óleo de cabelo", 50.00),
            new Produto("Sabonete líquido", 8.00),
            new Produto("Creme para o corpo", 60.00),
            new Produto("Cremes faciais", 80.00),
            new Produto("Sérum", 100.00),
            new Produto("Perfume", 180.00)
        ];

        this.servicos = [
            new Servico("Corte de cabelo", 50.00),
            new Servico("Pintura de cabelo", 120.00),
            new Servico("Corte de barba", 30.00),
            new Servico("Manicure", 40.00),
            new Servico("Maquiagem", 100.00),
            new Servico("Limpeza de pele", 150.00),
            new Servico("Barba", 25.00)
        ];
    }

    public geracao(): void {

        this.adicionarCliente("Lucyna Kushinada", "Lucy", "Feminino", 
            "060.720.049-19", "37.777.331-9", "12", "991853211",
            ["Bronzeador", "Lenços Umedecidos", "Descolorante", "Matizador", "Shampoo"],
            ["Corte de cabelo", "Pintura de cabelo"]
        );
        
        this.adicionarCliente("David Martinez", "David", "Masculino", 
            "123.456.789-42", "83.349.411-9", "12", "99183273245",
            ["Hidratante", "Sabonete"], ["Corte de barba"]
        );

        this.adicionarCliente("Rebecca", "Rebecca", "Feminino", 
            "111.222.333-44", "11.222.333-4", "21", "988776655",
            ["Desodorante", "Creme para as mãos"], ["Manicure"]
        );
        this.adicionarCliente("Johnny Silverhand", "V", "Masculino", 
            "222.333.444-55", "22.333.444-5", "21", "977665544",
            ["Gel de cabelo", "Perfume", "Desodorante"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Carla Dias", "Carla", "Feminino", 
            "333.444.555-66", "33.444.555-6", "21", "966554433",
            ["Creme de hidratação", "Shampoo"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Diego Santos", "Diego", "Masculino", 
            "444.555.666-77", "44.555.666-7", "21", "955443322",
            ["Sabonete", "Desodorante"], ["Barba"]
        );
        this.adicionarCliente("Eliane Costa", "Liane", "Feminino", 
            "555.666.777-88", "55.666.777-8", "21", "944332211",
            ["Máscara de cílios", "Batom"], ["Maquiagem"]
        );
        this.adicionarCliente("Fernando Oliveira", "Fer", "Masculino", 
            "666.777.888-99", "66.777.888-9", "21", "933221100",
            ["Cera para cabelo", "Gel de banho"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Gabriela Martins", "Gabi", "Feminino", 
            "777.888.999-00", "77.888.999-0", "21", "922110099",
            ["Esfoliante", "Creme anti-idade"], ["Limpeza de pele"]
        );
        this.adicionarCliente("Hugo Almeida", "Hugo", "Masculino", 
            "888.999.000-11", "88.999.000-1", "21", "911099889",
            ["Xampu", "Condicionador"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Isabela Ferreira", "Isa", "Feminino", 
            "999.000.111-22", "99.000.111-2", "21", "900889778",
            ["Base", "Corretivo"], ["Maquiagem"]
        );
        this.adicionarCliente("Jorge Pinto", "Jor", "Masculino", 
            "000.111.222-33", "00.111.222-3", "21", "889778666",
            ["Loção pós-barba", "Shampoo"], ["Barba"]
        );
        this.adicionarCliente("Karina Sousa", "Ká", "Feminino", 
            "111.222.333-44", "11.222.333-4", "21", "878667555",
            ["Protetor solar", "Óleo de cabelo"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Lucas Rocha", "Luc", "Masculino", 
            "222.333.444-55", "22.333.444-5", "21", "867556444",
            ["Desodorante", "Sabonete líquido"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Marta Lima", "Martinha", "Feminino", 
            "333.444.555-66", "33.444.555-6", "21", "856445333",
            ["Shampoo", "Condicionador"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Nicolas Ferreira", "Nico", "Masculino", 
            "444.555.666-77", "44.555.666-7", "21", "845334222",
            ["Gel de cabelo", "Perfume"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Olivia Mendes", "Oli", "Feminino", 
            "555.666.777-88", "55.666.777-8", "21", "834223111",
            ["Cremes para o rosto", "Máscara facial"], ["Limpeza de pele"]
        );
        this.adicionarCliente("Pedro Henrique", "Pedrão", "Masculino", 
            "666.777.888-99", "66.777.888-9", "21", "823112000",
            ["Shampoo", "Condicionador"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Quésia Andrade", "Késia", "Feminino", 
            "777.888.999-00", "77.888.999-0", "21", "812001999",
            ["Perfume", "Sabonete"], ["Maquiagem"]
        );
        this.adicionarCliente("Rafael Costa", "Rafa", "Masculino", 
            "888.999.000-11", "88.999.000-1", "21", "800889888",
            ["Cera para cabelo", "Desodorante"], ["Barba"]
        );
        this.adicionarCliente("Sabrina Vieira", "Sá", "Feminino", 
            "999.000.111-22", "99.000.111-2", "21", "789778777",
            ["Batom", "Base"], ["Maquiagem"]
        );
        this.adicionarCliente("Thiago Neves", "Thi", "Masculino", 
            "000.111.222-33", "00.111.222-3", "21", "778667666",
            ["Shampoo", "Loção pós-barba"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Úrsula Campos", "Ursinha", "Feminino", 
            "111.222.333-44", "11.222.333-4", "21", "767556555",
            ["Creme para as mãos", "Esfoliante"], ["Manicure"]
        );
        this.adicionarCliente("Vinícius Matos", "Vini", "Masculino", 
            "222.333.444-55", "22.333.444-5", "21", "756445444",
            ["Shampoo", "Condicionador"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Wesley Souza", "Wes", "Masculino", 
            "333.444.555-66", "33.444.555-6", "21", "745334333",
            ["Desodorante", "Perfume"], ["Barba"]
        );
        this.adicionarCliente("Xavier Fernandes", "Xavi", "Masculino", 
            "444.555.666-77", "44.555.666-7", "21", "734223222",
            ["Shampoo", "Condicionador"], ["Corte de cabelo"]
        );
        this.adicionarCliente("Yara Gomes", "Yá", "Feminino", 
            "555.666.777-88", "55.666.777-8", "21", "723112111",
            ["Máscara facial", "Perfume"], ["Limpeza de pele"]
        );
        this.adicionarCliente("Zeca Marques", "Zeca", "Masculino", 
            "666.777.888-99", "66.777.888-9", "21", "712001000",
            ["Shampoo", "Sabonete"], ["Corte de cabelo"]
        );

        this.exibirConsumidos();
    }

    private adicionarCliente(nome: string, nomeSocial: string, genero: string, 
                             valorCpf: string, valorRg: string, ddd: string, numero: string,
                             produtosConsumidos: string[], servicosConsumidos: string[]): void {
        let date = new Date();
        let cpf = new CPF(valorCpf, date);
        let cliente = new Cliente(nome, nomeSocial, cpf, genero);
        let rg = new RG(valorRg, date);
        let telefone = new Telefone(ddd, numero);

        produtosConsumidos.forEach(produtoNome => {
            let pegarPreco = this.produtos.find(produto => produto.nome === produtoNome)?.preco || 0;
            let produtoNovo = new Produto(produtoNome, pegarPreco);
            cliente.getProdutosConsumidos.push(produtoNovo);
        });

        servicosConsumidos.forEach(servicoNome => {
            let pegarPreco = this.servicos.find(servico => servico.nome === servicoNome)?.preco || 0;
            let servicoNovo = new Servico(servicoNome, pegarPreco);
            cliente.getServicosConsumidos.push(servicoNovo);
        });

        cliente.getRgs.push(rg);
        cliente.getTelefones.push(telefone);
        this.clientes.push(cliente);
    }

    private exibirConsumidos(): void {
        this.clientes.forEach(cliente => {
            console.log(`Cliente: ${cliente.nome}`);
            console.log(`Produtos Consumidos:`);
            cliente.getProdutosConsumidos.forEach(produto => {
                console.log(`- ${produto.nome}: R$ ${produto.preco.toFixed(2)}`);
            });
            console.log(`Serviços Consumidos:`);
            cliente.getServicosConsumidos.forEach(servico => {
                console.log(`- ${servico.nome}: R$ ${servico.preco.toFixed(2)}`);
            });
            console.log('--------------------------------------');
        });
    }
}
