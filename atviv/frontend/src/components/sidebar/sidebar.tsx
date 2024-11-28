import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <>
            <nav className="bg-blue-600 py-2">
                <div className="flex justify-between items-center mx-auto h-full">
                    {/* Logo - Alinhado à esquerda e maior */}
                    <a href="/" className="ml-5 text-white text-3xl font-semibold">
                        World Beautiful
                    </a>

                    {/* Menu de Links - Alinhado à direita */}
                    <ul className="flex space-x-4 m-0 p-0 mr-5">
                        <li>
                            <Link
                                to={'/'}
                                className="text-black bg-white px-3 py-1.5 rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-300 h-10 flex items-center justify-center"
                            >
                                Venda
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/servicos'}
                                className="text-black bg-white px-3 py-1.5 rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-300 h-10 flex items-center justify-center"
                            >
                                Serviços
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/produtos'}
                                className="text-black bg-white px-3 py-1.5 rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-300 h-10 flex items-center justify-center"
                            >
                                Produtos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/clientes'}
                                className="text-black bg-white px-3 py-1.5 rounded-md hover:bg-blue-400 hover:text-white transition-colors duration-300 h-10 flex items-center justify-center"
                            >
                                Clientes
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default SideBar;
