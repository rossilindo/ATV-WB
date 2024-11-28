import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    nomeSocial: '',
    cpf: '',
    rg: '',
    telefone: '',
    genero: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/clientes/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Cliente atualizado com sucesso!');
      navigate('/clientes');
    } else {
      alert('Erro ao atualizar cliente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funções de formatação
  const formatCpf = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    return v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatTelefone = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 10) {
      return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7, 11)}`;
    } else if (v.length > 5) {
      return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6, 10)}`;
    } else if (v.length > 2) {
      return `(${v.substring(0, 2)}) ${v.substring(2, 5)}`;
    }
    return v;
  };

  const formatRg = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 9) v = v.substring(0, 9);
    return v.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Editar Cliente</h1>

      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm font-medium">Nome</label>
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
            <label htmlFor="nomeSocial" className="text-sm font-medium">Nome Social</label>
            <input
              id="nomeSocial"
              type="text"
              name="nomeSocial"
              value={formData.nomeSocial}
              onChange={handleChange}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="cpf" className="text-sm font-medium">CPF</label>
            <input
              id="cpf"
              type="text"
              name="cpf"
              value={formatCpf(formData.cpf)}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              maxLength={14}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rg" className="text-sm font-medium">RG</label>
            <input
              id="rg"
              type="text"
              name="rg"
              value={formatRg(formData.rg)}
              onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
              maxLength={12}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="telefone" className="text-sm font-medium">Telefone</label>
          <input
            id="telefone"
            type="text"
            name="telefone"
            value={formatTelefone(formData.telefone)}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            maxLength={15}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo de Gênero */}
        <div className="flex flex-col">
          <label htmlFor="genero" className="text-sm font-medium">Gênero</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
