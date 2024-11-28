import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownCadastroOpen, setDropdownCadastroOpen] = useState(false);
  const [dropdownListagemOpen, setDropdownListagemOpen] = useState(false);

  // Função para alternar entre os dropdowns
  const toggleDropdown = (dropdown: string) => {
    if (dropdown === "cadastro") {
      setDropdownCadastroOpen(!dropdownCadastroOpen);
      setDropdownListagemOpen(false); // Fecha o listagem ao abrir cadastro
    } else if (dropdown === "listagem") {
      setDropdownListagemOpen(!dropdownListagemOpen);
      setDropdownCadastroOpen(false); // Fecha o cadastro ao abrir listagem
    }
  };

  return (
    <nav className="bg-gray-950 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition">
          Sistema de Consumo
        </Link>

        <div className="relative flex gap-2">
          {/* Botão Dropdown de Cadastro */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("cadastro")}
              className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
            >
              Cadastrar
              <span className={`transform transition-transform ${dropdownCadastroOpen ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>
            {dropdownCadastroOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px] p-2">
                <Link
                  to="/clientes/cadastrar"
                  onClick={() => setDropdownCadastroOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cadastrar Cliente
                </Link>
                <Link
                  to="/produtos/cadastrar"
                  onClick={() => setDropdownCadastroOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cadastrar Produto
                </Link>
                <Link
                  to="/servicos/cadastrar"
                  onClick={() => setDropdownCadastroOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cadastrar Serviço
                </Link>
                <Link
                  to="/consumo/cadastrar"
                  onClick={() => setDropdownCadastroOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cadastrar Consumo
                </Link>
              </div>
            )}
          </div>

          {/* Botão Dropdown de Listagem */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("listagem")}
              className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
            >
              Listagem
              <span className={`transform transition-transform ${dropdownListagemOpen ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>
            {dropdownListagemOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[300px] p-2">
                <Link
                  to="/listagens/clientes-mais-consumiram-quantidade"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Clientes que mais consumiram em quantidade
                </Link>
                <Link
                  to="/listagens/clientes-por-genero"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Clientes por gênero
                </Link>
                <Link
                  to="/listagens/servicos-produtos-mais-consumidos"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Serviços ou produtos mais consumidos
                </Link>
                <Link
                  to="/listagens/servicos-produtos-mais-consumidos-por-genero"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Serviços ou produtos mais consumidos por gênero
                </Link>
                <Link
                  to="/listagens/clientes-menos-consumiram"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Clientes que menos consumiram
                </Link>
                <Link
                  to="/listagens/clientes-mais-consumiram-valor"
                  onClick={() => setDropdownListagemOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Clientes que mais consumiram em valor
                </Link>
              </div>
            )}
          </div>

          {/* Botões de Navegação Direta */}
          <Link 
            to="/clientes" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition text-center"
          >
            Clientes
          </Link>
          <Link 
            to="/produtos" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition text-center"
          >
            Produtos
          </Link>
          <Link 
            to="/servicos" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition text-center"
          >
            Serviços
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
