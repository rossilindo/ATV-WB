import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Cadastro from "../cadastro";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>;
    private entrada: Entrada;
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos;
        this.entrada = new Entrada();
    }
    public cadastrar(): void {
        let nome = this.entrada.receberTexto("Digite o nome do serviço: ");
        let nomes = this.servicos.map(i => (i.nome))
        if (nomes.includes(nome)) {
            console.log(`${nome} já existe dentro do sistema`);
            console.log();
        } else {
            let preco = this.entrada.receberNumero(`Qual é o preço do serviço? R$`)
            let cadastrar = new Servico(nome, Number(preco));
            this.servicos.push(cadastrar);
            console.log();
        }
    }
    public geracao(): void {
        let servicos = [
            "Corte de cabelo",
            "Hidratação",
            "Corte de barba",
            "Pintura",
            "Manicure",
            "Pedicure",
            "Micropigmentação",
            "Tratamento para rugas",
            "Sombrancelha"
        ]
        let preco = [
            40.00,
            50.0,
            30.00,
            150.00,
            30.00,
            25.00,
            200.00,
            400.00,
            35.00
        ]
        let sliceServico = servicos.slice();
        let sliceServicoPreco = preco.slice()
        for (let index = 0; index < sliceServico.length; index++) {
            let adicionarServico = new Servico(sliceServico[index], Number(sliceServicoPreco[index]))
            this.servicos.push(adicionarServico)
        }
    }
}