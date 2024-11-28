import React from "react";

interface BarraNavegacaoProps {
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void;
    tema: string;
    botoes: string[];
}

const BarraNavegacao: React.FC<BarraNavegacaoProps> = ({ seletorView, tema, botoes }) => {
    return (
        <nav className={`${tema} flex justify-between w-full max-w-3xl rounded-lg shadow-lg p-4 mb-6`}>
            {botoes.map((botao, index) => (
                <button
                    key={index}
                    onClick={(evento) => seletorView(botao, evento)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
                >
                    {botao}
                </button>
            ))}
        </nav>
    );
};

export default BarraNavegacao;
