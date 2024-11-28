import Entrada from '../../io/entrada';
import Cliente from '../../modelo/cliente';
import CPF from '../../modelo/cpf';
import Produto from '../../modelo/produto';
import RG from '../../modelo/rg';
import Servico from '../../modelo/servico';
import Telefone from '../../modelo/telefone';
import Cadastro from '../cadastro';

class CadastroCliente extends Cadastro {
  private clientes: Cliente[];
  private servicos: Servico[];
  private produtos: Produto[];
  private entrada: Entrada;

  constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]) {
    super();
    this.clientes = clientes;
    this.servicos = servicos;
    this.produtos = produtos;
    this.entrada = new Entrada();
  }

  cadastrar(): Cliente {
    console.log("\nInício do cadastro do cliente");
    const nome = this.entrada.receberTexto("Informe o nome do cliente: ");
    const nomeSocial = this.entrada.receberTexto("Informe o nome social do cliente: ");
    const genero = this.entrada.receberTexto("Qual é o gênero? Masculino ou Feminino: ");

    const cpf = this.obterCPF();

    const cliente = new Cliente(nome, nomeSocial, cpf, genero);

    this.obterRGs(cliente);
    this.obterTelefones(cliente);
    cliente.getDataCadastro.getDay();

    this.obterProdutosConsumidos(cliente);
    this.obterServicosConsumidos(cliente);

    this.clientes.push(cliente);

    console.log("\nCadastro concluído :)\n");

    return cliente;
  }

  private obterCPF(): CPF {
    const valor = this.entrada.receberTexto("Informe o número do CPF: ");
    const data = this.entrada.receberTexto("Informe a data de emissão do CPF, no padrão dd/mm/yyyy: ");
    const partesData = data.split('/');
    const ano = Number(partesData[2]);
    const mes = Number(partesData[1]);
    const dia = Number(partesData[0]);
    const dataEmissao = new Date(ano, mes, dia);

    return new CPF(valor, dataEmissao);
  }

  private obterRGs(cliente: Cliente): void {

    let novo = "Sim";

    while (novo.toLowerCase() === 'sim') {
      const valor = this.entrada.receberTexto("Informe o número do RG: ");
      const data = this.entrada.receberTexto("Informe a data de emissão do RG, no padrão dd/mm/yyyy: ");
      const partesData = data.split('/');
      const ano = Number(partesData[2]);
      const mes = Number(partesData[1]);
      const dia = Number(partesData[0]);
      const dataEmissao = new Date(ano, mes, dia);

      const rg = new RG(valor, dataEmissao);
      cliente.getRgs.push(rg);

      novo = this.entrada.receberTexto("Digitar outro RG? Sim / Não ? ");
    }
  }

  private obterTelefones(cliente: Cliente): void {
    console.log("Digite os telefones do cliente no padrão: DDD / Número");
    let novo = "Sim";

    while (novo.toLowerCase() === 'sim') {
      const tell = this.entrada.receberTexto("Por favor, digite o número do telefone no padrão DDD / Número: ");
      const partesTell = tell.split(' ');
      const ddd = partesTell[0];
      const numero = partesTell[1];

      const telefone = new Telefone(ddd, numero);
      cliente.getTelefones.push(telefone);

      novo = this.entrada.receberTexto("Digitar outro telefone? Sim/Não ? ");
    }
  }

  private obterProdutosConsumidos(cliente: Cliente): void {
    console.log("Digite os produtos consumidos no padrão: Produto A, Produto B, Produto C");
    const nome = this.entrada.receberTexto("Nome dos produtos: ");
    const sliceProdutos = nome.split(', ');

    for (const nomeProduto of sliceProdutos) {
      const nomes = this.produtos.map(produto => produto.nome);

      if (nomes.includes(nomeProduto)) {
        const pegarPreco = this.produtos
          .filter(produto => produto.nome === nomeProduto)
          .map(produto => produto.preco.toString());

        const produtoNovo = new Produto(nomeProduto, Number(pegarPreco));
        cliente.getProdutosConsumidos.push(produtoNovo);
      } else {
        const preco = this.entrada.receberNumero(`Defina o preço para "${nomeProduto}" R$`);
        const sliceProdutosPreco = preco.toString().split(', ');
        const produtoNovo = new Produto(nomeProduto, Number(sliceProdutosPreco));
        this.produtos.push(produtoNovo);
        cliente.getProdutosConsumidos.push(produtoNovo);
      }
    }
  }

  private obterServicosConsumidos(cliente: Cliente): void {
    console.log("Digite os serviços consumidos no padrão: Serviço A, Serviço B, Serviço C");
    const nome = this.entrada.receberTexto("Nome dos serviços: ");
    const sliceServico = nome.split(', ');

    for (const nomeServico of sliceServico) {
      const nomes = this.servicos.map(servico => servico.nome);

      if (nomes.includes(nomeServico)) {
        const pegarPreco = this.servicos
          .filter(servico => servico.nome === nomeServico)
          .map(servico => servico.preco.toString());

        const servicoNovo = new Servico(nomeServico, Number(pegarPreco));
        cliente.getServicosConsumidos.push(servicoNovo);
      } else {
        const preco = this.entrada.receberNumero(`Defina o preço para "${nomeServico}" R$`);
        const sliceServicoPreco = preco.toString().split(', ');
        const servicoNovo = new Servico(nomeServico, Number(sliceServicoPreco));
        this.servicos.push(servicoNovo);
        cliente.getServicosConsumidos.push(servicoNovo);
      }
    }
  }
}

export default CadastroCliente;
