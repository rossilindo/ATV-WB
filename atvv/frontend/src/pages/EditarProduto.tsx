import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Função de formatação para o preço (exibição)
const formatPreco = (preco: string) => {
  return preco
    .replace(/\D/g, '') // Remove tudo o que não for número
    .slice(0, 10) // Limita a 10 caracteres
    .replace(/(\d)(\d{2})$/, '$1,$2'); // Formata como preço (exemplo: 10000 -> 100,00)
};

const EditarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    preco: ''
  });

  useEffect(() => {
    // Carregar dados do produto a partir da API
    fetch(`http://localhost:5000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remover formatação de preço (vírgula para ponto)
    const precoNumerico = formData.preco.replace(',', '.'); // Alterar para ponto decimal

    // Enviar dados para o backend
    const dataToSend = {
      nome: formData.nome,
      preco: precoNumerico, // Enviar preço sem formatação
    };

    const response = await fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
      navigate('/produtos');
    } else {
      // Verificação do erro com mais detalhes
      const error = await response.json();
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Para o campo de preço, formatar para exibição, mas manter o valor sem formatação para envio
    if (name === 'preco') {
      setFormData({
        ...formData,
        preco: formatPreco(value) // Formatar preço para exibição com vírgula
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Editar Produto</h1>

      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex flex-col">
          <label htmlFor="nome" className="text-sm font-medium">Nome do Produto</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="preco" className="text-sm font-medium">Preço</label>
          <input
            id="preco"
            type="text"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition-colors duration-300"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarProduto;
