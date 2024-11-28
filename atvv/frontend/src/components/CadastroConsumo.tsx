import { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroConsumo = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('produto'); // 'produto' ou 'servico'
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [itensSelecionados, setItensSelecionados] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientesResponse = await axios.get('http://localhost:5000/clientes');
      const produtosResponse = await axios.get('http://localhost:5000/produtos');
      const servicosResponse = await axios.get('http://localhost:5000/servicos');
      setClientes(clientesResponse.data);
      setProdutos(produtosResponse.data);
      setServicos(servicosResponse.data);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (selectedItem && quantidade > 0) {
      setItensSelecionados([
        ...itensSelecionados,
        { item: selectedItem, quantidade, tipo: selectedCategoria }, // Adiciona o tipo diretamente no item
      ]);
      setQuantidade(0); // Reseta a quantidade após adicionar
      setSelectedItem(null); // Reseta a seleção do item
    } else {
      alert('Selecione um item e defina a quantidade!');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = itensSelecionados.filter((_, i) => i !== index);
    setItensSelecionados(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const consumoData = {
      clienteId: selectedCliente,
      itens: itensSelecionados.map(({ item, quantidade, tipo }) => ({
        itemId: item.id,
        tipo, // Usa o tipo armazenado no item
        quantidade,
        total: item.preco * quantidade, // Supondo que cada produto ou serviço tenha um preço
      })),
    };

    try {
      await axios.post('http://localhost:5000/consumo', consumoData);
      alert('Consumo registrado com sucesso!');
      setItensSelecionados([]); // Limpa os itens após o sucesso
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar consumo');
    }
  };

  const categorias = selectedCategoria === 'produto' ? produtos : servicos;

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value) || 0); // Garante que o valor nunca seja menor que 0
    setQuantidade(value);
  };

  return (
    <div className="bg-gray-800 flex justify-center" style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-3xl mb-4 text-white text-center">Cadastro de Consumo</h1>
        
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg text-white">Cliente</label>
              <select
                value={selectedCliente || ''}
                onChange={(e) => setSelectedCliente(Number(e.target.value))}
                className="w-full p-2 border rounded bg-gray-600 text-white"
              >
                <option value="">Selecione o Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-lg text-white">Tipo</label>
                <select
                  value={selectedCategoria}
                  onChange={(e) => setSelectedCategoria(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-600 text-white"
                >
                  <option value="produto">Produto</option>
                  <option value="servico">Serviço</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-lg text-white">Selecione {selectedCategoria}</label>
                <select
                  value={selectedItem?.id || ''}
                  onChange={(e) => {
                    const item = categorias.find((item) => item.id === Number(e.target.value));
                    setSelectedItem(item);
                  }}
                  className="w-full p-2 border rounded bg-gray-600 text-white"
                >
                  <option value="">Selecione o {selectedCategoria}</option>
                  {categorias.map((item) => (
                    <option key={item.id} value={item.id}>{item.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-lg text-white">Quantidade</label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={handleQuantidadeChange}
                  className="w-full p-2 border rounded bg-gray-600 text-white"
                  min="0"
                />
              </div>

              <div className="self-center">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="mt-6 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300"
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg mb-2 text-white">Itens Selecionados</h2>
              {itensSelecionados.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2 bg-gray-600 p-2 rounded">
                  <span className="text-white">{item.item.nome} x{item.quantidade}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors duration-300"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Cadastrar Consumo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroConsumo;
