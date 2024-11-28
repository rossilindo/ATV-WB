import { Component } from "react";
import SideBar from "../components/sidebar/sidebar";
import { Link } from "react-router-dom";

function EditarProduto() {
    return (
        <>
            <SideBar />
            <div className="bg-gray-800 text-white min-h-screen p-6">
                <h2 className="text-3xl font-semibold mb-6 text-center">Editar Produto</h2>

                <form className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-md">
                    <Link
                        to="/produtos"
                        className="flex mb-5 items-center text-blue-600 hover:text-blue-800 text-lg p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-300">
                        <i className="material-icons mr-2">arrow_back</i>
                        Voltar
                    </Link>
                    <div className="mb-6">
                        <label htmlFor="product_name" className="block text-lg font-medium text-gray-300">Nome do Produto</label>
                        <input
                            id="product_name"
                            type="text"
                            className="w-full p-3 mt-2 text-white rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Nome do Produto"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="product_description" className="block text-lg font-medium text-gray-300">Descrição do Produto</label>
                        <input
                            id="product_description"
                            type="text"
                            className="w-full p-3 mt-2 text-white rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Descrição do Produto"
                        />
                    </div>


                    <div className="mb-6">
                        <label htmlFor="product_price" className="block text-lg font-medium text-gray-300">Preço do Produto</label>
                        <input
                            id="product_price"
                            type="number"
                            className="w-full p-3 mt-2 text-white rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Preço do Produto"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-300">
                            Salvar
                            <i className="material-icons right ml-2">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditarProduto;