import { useState } from "react";
import axios from "../axiosConfig";

const CadastroProduto = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      preco: parseFloat(preco), // Certifique-se de que o valor do preço seja um número
    };

    try {
      const response = await axios.post("http://localhost:5000/produtos", novoProduto);
      console.log("Produto cadastrado:", response.data);
      alert("Produto cadastrado com sucesso!");
      setNome(""); // Limpa o campo após o cadastro
      setPreco(""); // Limpa o campo após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <div className="bg-gray-800 flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div className="bg-gray-700 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Cadastrar Produto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Preço</label>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              className="w-full p-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;
