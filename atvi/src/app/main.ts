import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/Cliente/cadastroCliente";
import AtualizarCliente from "../negocio/Cliente/atualizarCliente";
import DeleteCliente from "../negocio/Cliente/deleteCliente";
import ListagemClientes from "../negocio/Cliente/listagemClientes";
import GeracaoDeCliente from "../negocio/Cliente/definido";
import CadastroProduto from "../negocio/Produto/cadastroProdutos";
import AtualizarProduto from "../negocio/Produto/atualizarProduto";
import DeleteProduto from "../negocio/Produto/deleteProduto";
import ListagemProduto from "../negocio/Produto/listagemProduto";
import CadastroServico from "../negocio/Servico/cadastroServico";
import AtualizarServico from "../negocio/Servico/atualizarServico";
import DeleteServico from "../negocio/Servico/deleteServico";
import ListagemServico from "../negocio/Servico/listagemServico";
import ListagemGenero from "../negocio/Listagem/listagemGenero";
import ListagemMenosQuantidade from "../negocio/Listagem/listagemClienteMenosConsumidor";
import ListagemMaisValor from "../negocio/Listagem/listagemMaisValor";
import ListagemQuantidade from "../negocio/Listagem/listagemClienteMaisConsumidor";
import ListagemConsumidoGenero from "../negocio/Listagem/listagemConsumidoGenero";
import ListagemTudoConsumidos from "../negocio/Listagem/listagemTudoConsumidos";

console.log(`-----------------------------`);
console.log(`Sistema do Grupo World Beauty`);
let empresa = new Empresa();

//Retire o '//' que ele gera clientes assim que o programa inicia!
//let geracaoClientes = new GeracaoDeCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos);
//geracaoClientes.geracao();

let execucao = true;

while (execucao) {
    console.log(`BEM-VINDO A WORLD BEAUTY!`);
    console.log(`Escolha uma das opções:`);
    console.log(`1 - Registrar Clientes`);
    console.log(`2 - Registrar Produtos`);
    console.log(`3 - Registrar Serviços`);
    console.log(`4 - Outros`);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Escolha uma opção: `);

    switch (opcao) {
        case 1:
            console.log(`Opções de Clientes:`);
            console.log(`1 - Cadastrar Clientes`);
            console.log(`2 - Modificar Clientes`);
            console.log(`3 - Deletar Clientes`);
            console.log(`4 - Listar Clientes`);
            console.log(`0 - Voltar`);

            let opcaoCliente = entrada.receberNumero(`Escolha uma opção: `);
            switch (opcaoCliente) {
                case 1:
                    let cadastroCliente = new CadastroCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos);
                    cadastroCliente.cadastrar();
                    break;
                case 2:
                    let atualizarClientes = new AtualizarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos);
                    atualizarClientes.update();
                    break;
                case 3:
                    let deleteClientes = new DeleteCliente(empresa.getClientes);
                    deleteClientes.delete();
                    break;
                case 4:
                    let listagemClientes = new ListagemClientes(empresa.getClientes);
                    listagemClientes.listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Opção inválida`);
            }
            break;

        case 2:
            console.log(`Opções de Produtos:`);
            console.log(`1 - Cadastrar Produto`);
            console.log(`2 - Modificar Produto`);
            console.log(`3 - Deletar Produto`);
            console.log(`4 - Listar Produtos`);
            console.log(`0 - Voltar`);

            let opcaoProduto = entrada.receberNumero(`Escolha uma opção: `);
            switch (opcaoProduto) {
                case 1:
                    let cadastroProduto = new CadastroProduto(empresa.getProdutos);
                    cadastroProduto.cadastrar();
                    break;
                case 2:
                    let atualizarProduto = new AtualizarProduto(empresa.getProdutos);
                    atualizarProduto.update();
                    break;
                case 3:
                    let deleteProduto = new DeleteProduto(empresa.getProdutos);
                    deleteProduto.delete();
                    break;
                case 4:
                    let listagemProduto = new ListagemProduto(empresa.getProdutos);
                    listagemProduto.listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Opção inválida`);
            }
            break;

        case 3:
            console.log(`Opções de Serviços:`);
            console.log(`1 - Cadastrar Serviço`);
            console.log(`2 - Modificar Serviço`);
            console.log(`3 - Deletar Serviço`);
            console.log(`4 - Listar Serviços`);
            console.log(`0 - Voltar`);

            let opcaoServico = entrada.receberNumero(`Escolha uma opção: `);
            switch (opcaoServico) {
                case 1:
                    let cadastroServico = new CadastroServico(empresa.getServicos);
                    cadastroServico.cadastrar();
                    break;
                case 2:
                    let atualizarServico = new AtualizarServico(empresa.getServicos);
                    atualizarServico.update();
                    break;
                case 3:
                    let deleteServico = new DeleteServico(empresa.getServicos);
                    deleteServico.delete();
                    break;
                case 4:
                    let listagemServico = new ListagemServico(empresa.getServicos);
                    listagemServico.listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Opção inválida`);
            }
            break;

        case 4:
            console.log(`Opções de Listagem:`);
            console.log(`1 - Listar produtos ou serviços mais consumidos`);
            console.log(`2 - Listar produtos ou serviços mais consumidos por gênero`);
            console.log(`3 - Listar os 10 clientes que menos consumiram produtos ou serviços`);
            console.log(`4 - Listar os 5 clientes que mais consumiram em valor`);
            console.log(`5 - Listar os 10 clientes que mais consumiram produtos ou serviços`);
            console.log(`6 - Listar todos os clientes por gênero`);
            console.log(`0 - Voltar`);

            let opcaoListagem = entrada.receberNumero(`Escolha uma opção: `);
            switch (opcaoListagem) {
                case 1:
                    let psMaisConsumidos = new ListagemQuantidade(empresa.getClientes);
                    psMaisConsumidos.listar();
                    break;
                case 2:
                    let consumidoGenero = new ListagemConsumidoGenero(empresa.getClientes);
                    consumidoGenero.listar();
                    break;
                case 3:
                    let menosConsumido = new ListagemMenosQuantidade(empresa.getClientes);
                    menosConsumido.listar();
                    break;
                case 4:
                    let maisValorConsumido = new ListagemMaisValor(empresa.getClientes);
                    maisValorConsumido.listar();
                    break;
                case 5:
                    let maisConsumido = new ListagemQuantidade(empresa.getClientes);
                    maisConsumido.listar();
                    break;
                case 6:
                    let listagemGenero = new ListagemGenero(empresa.getClientes);
                    listagemGenero.listar();
                    break;
                case 0:
                    break;
                default:
                    console.log(`Opção inválida`);
            }
            break;

        case 0:
            execucao = false;
            console.log(`Até mais!`);
            break;
        
        default:
            console.log(`Opção inválida`);
    }
}
