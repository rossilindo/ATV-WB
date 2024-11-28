import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CadastroCliente from './pages/CadastroCliente';
import CadastroProduto from './pages/CadastroProduto';
import CadastroServico from './pages/CadastroServico';
import CadastroConsumo from './components/CadastroConsumo';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Servicos from './pages/Servicos';
import EditarCliente from './pages/EditarCliente';
import EditarProduto from './pages/EditarProduto';
import EditarServico from './pages/EditarServico';

// Importando as novas páginas
import ClientesMaisConsumiramQuantidade from './pages/ClientesMaisConsumiramQuantidade';
import ClientesPorGenero from './pages/ClientesPorGenero';
import ServicosProdutosMaisConsumidos from './pages/ServicosProdutosMaisConsumidos';
import ServicosProdutosMaisConsumidosPorGenero from './pages/ServicosProdutosMaisConsumidosPorGenero';
import ClientesMenosConsumiram from './pages/ClientesMenosConsumiram';
import ClientesMaisConsumiramValor from './pages/ClientesMaisConsumiramValor';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CadastroConsumo />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/produtos/cadastrar" element={<CadastroProduto />} />
        <Route path="/clientes/cadastrar" element={<CadastroCliente />} />
        <Route path="/servicos/cadastrar" element={<CadastroServico />} />
        <Route path="/consumo/cadastrar" element={<CadastroConsumo />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
        <Route path="/servicos/editar/:id" element={<EditarServico />} />

        {/* Novas rotas para as páginas de listagem */}
        <Route path="/listagens/clientes-mais-consumiram-quantidade" element={<ClientesMaisConsumiramQuantidade />} />
        <Route path="/listagens/clientes-por-genero" element={<ClientesPorGenero />} />
        <Route path="/listagens/servicos-produtos-mais-consumidos" element={<ServicosProdutosMaisConsumidos />} />
        <Route path="/listagens/servicos-produtos-mais-consumidos-por-genero" element={<ServicosProdutosMaisConsumidosPorGenero />} />
        <Route path="/listagens/clientes-menos-consumiram" element={<ClientesMenosConsumiram />} />
        <Route path="/listagens/clientes-mais-consumiram-valor" element={<ClientesMaisConsumiramValor />} />
      </Routes>
    </Router>
  );
};

export default App;
