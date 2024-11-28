import React, { useState } from "react";
import SideBar from "../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

interface Telefone {
  ddd: string;
  numero: string;
}

function CadastroCliente() {
  const [nome, setNome] = useState<string>();
  const [sobrenome, setSobrenome] = useState<string>();
  const [estado, setEstado] = useState<string>();
  const [cidade, setCidade] = useState<string>();
  const [bairro, setBairro] = useState<string>();
  const [rua, setRua] = useState<string>();
  const [numero, setNumero] = useState<number>();
  const [codigoPostal, setCodigoPostal] = useState<string>();
  const [informacoesAdicionais, setInformacoesAdicionais] = useState<string>();
  const [telefoneDTO, setTelefoneDTO] = useState<Telefone[]>([]);
  const [telefoneDDD, setTelefoneDDD] = useState<string>();
  const [telefoneNum, setTelefoneNum] = useState<string>();
  const [emailCliente, setEmailCliente] = useState<string>();

  const handleSend = () => {
    const clienteDTO = {
      nome: nome,
      sobreNome: sobrenome,
      endereco: {
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        codigoPostal: codigoPostal,
        informacoesAdicionais: informacoesAdicionais,
      },
      telefones: telefoneDTO,
    };
    axios
      .post("http://localhost:32832/cliente/cadastrar", clienteDTO)
      .then((resp) => {
        console.log("resposta do servidor: " + resp.data);
      })
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
      });
  };

  const handleAddPhone = () => {
    if (telefoneDDD && telefoneNum) {
      setTelefoneDTO([
        ...telefoneDTO,
        { ddd: telefoneDDD, numero: telefoneNum },
      ]);
      alert("Número adicionado");
      setTelefoneDDD(""); // Limpar o campo DDD após adicionar
      setTelefoneNum(""); // Limpar o campo número após adicionar
    } else {
      alert("Por favor, preencha DDD e Número.");
    }
  };

  return (
    <>
      <SideBar />
      <div className="p-6 bg-gray-800">
        <h2 className="text-3xl font-semibold text-white mb-6">Cadastro de Cliente</h2>
        <div className="flex justify-start mb-4">
          <Link
            to={"/clientes"}
            className="text-white flex items-center space-x-2 hover:text-blue-400"
          >
            <i className="material-icons">arrow_back</i>
            <span>Voltar</span>
          </Link>
        </div>

        <form>
          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="input-field">
              <input
                onChange={(e) => setNome(e.target.value)}
                type="text"
                id="nome"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="nome" className="text-gray-400">Nome do Cliente</label>
            </div>
            <div className="input-field">
              <input
                onChange={(e) => setSobrenome(e.target.value)}
                type="text"
                id="sobrenome"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="sobrenome" className="text-gray-400">Sobrenome</label>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <div className="input-field">
              <input
                onChange={(e) => setEmailCliente(e.target.value)}
                type="email"
                id="email"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="email" className="text-gray-400">Email</label>
            </div>
          </div>

          {/* Endereço */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-field">
                <input
                  onChange={(e) => setEstado(e.target.value)}
                  type="text"
                  id="estado"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="estado" className="text-gray-400">Estado</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setCidade(e.target.value)}
                  type="text"
                  id="cidade"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="cidade" className="text-gray-400">Cidade</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setBairro(e.target.value)}
                  type="text"
                  id="bairro"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="bairro" className="text-gray-400">Bairro</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setRua(e.target.value)}
                  type="text"
                  id="rua"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="rua" className="text-gray-400">Rua</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setNumero(e.target.valueAsNumber)}
                  type="text"
                  id="numero"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="numero" className="text-gray-400">Número</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  type="text"
                  id="codigoPostal"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="codigoPostal" className="text-gray-400">CEP</label>
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setInformacoesAdicionais(e.target.value)}
                  type="text"
                  id="informacoesAdicionais"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="informacoesAdicionais" className="text-gray-400">Informações Adicionais</label>
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="input-field">
              <input
                value={telefoneDDD}
                onChange={(e) => setTelefoneDDD(e.target.value)}
                type="text"
                id="telefoneDDD"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="telefoneDDD" className="text-gray-400">DDD</label>
            </div>
            <div className="input-field">
              <input
                value={telefoneNum}
                onChange={(e) => setTelefoneNum(e.target.value)}
                type="text"
                id="telefoneNum"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="telefoneNum" className="text-gray-400">Telefone</label>
            </div>
          </div>

          <div className="mb-6 flex justify-between">
            <button
              type="button"
              onClick={handleAddPhone}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Adicionar Telefone
            </button>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleSend}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CadastroCliente;
