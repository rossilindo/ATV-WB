import { Component } from 'react';
import SideBar from '../components/sidebar/sidebar';
import Combobox from "react-widgets/Combobox";
import NumberPicker from 'react-widgets/NumberPicker';


function Vendas() {
    return (
        <>
            <SideBar />
            <div className='bg-gray-800 text-white min-h-screen p-6'>
                <h4 className='text-3xl font-semibold mb-6 text-center'>Processo de Venda</h4>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                    <div>
                        <Combobox
                            placeholder='Cliente'
                            data={["Claudia", "Mateus", "Alicea", "Gerson"]}
                            className='combobox-style-vendas'
                        />
                        <button className='mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
                            Selecionar
                        </button>
                    </div>
                    <div>
                        <Combobox
                            placeholder='Serviços'
                            data={["Depilação", "Massagem", "Limpeza de Pele", "Manicure"]}
                            className='combobox-style'
                        />
                        <button className='mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
                            Adicionar
                        </button>
                    </div>
                    <div>
                        <Combobox
                            placeholder='Produtos'
                            data={["Hidratante", "Condicionador", "Shampoo", ""]}
                            className='combobox-style'
                        />
                        <button className='mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
                            Adicionar
                        </button>
                    </div>
                </div>

                <div className='content-venda'>
                    <h5 className='text-xl font-semibold mb-4'>Produtos/Serviços</h5>
                    <table className='min-w-full bg-gray-700 rounded-lg shadow-lg'>
                        <thead>
                            <tr className='bg-blue-600'>
                                <th className='px-4 py-2 text-left text-white'>Nome do Produto/Serviço</th>
                                <th className='px-4 py-2 text-left text-white'>Quantidade</th>
                                <th className='px-4 py-2 text-left text-white'>Preço</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-300'>
                            <tr className='hover:bg-gray-600'>
                                <td className='px-4 py-2'>Massagem</td>
                                <td className='px-4 py-2'>
                                    <NumberPicker defaultValue={1} className='w-16 bg-gray-600 rounded-md' />
                                </td>
                                <td className='px-4 py-2'>$90.87</td>
                            </tr>
                            <tr className='hover:bg-gray-600'>
                                <td className='px-4 py-2'>Creme de Barbear</td>
                                <td className='px-4 py-2'>
                                    <NumberPicker defaultValue={1} className='w-16 bg-gray-600 rounded-md' />
                                </td>
                                <td className='px-4 py-2'>$15.45</td>
                            </tr>
                            <tr className='hover:bg-gray-600'>
                                <td className='px-4 py-2'>Shampoo</td>
                                <td className='px-4 py-2'>
                                    <NumberPicker defaultValue={1} className='w-16 bg-gray-600 rounded-md' />
                                </td>
                                <td className='px-4 py-2'>$8.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='finalizar mt-6 flex justify-between items-center'>
                    <div className='preco-total text-xl'>
                        <h5>Preço Total: <span className='font-semibold'>$xxx.xx</span></h5>
                    </div>

                    <button onClick={() => alert('Venda realizada')} className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                        Finalizar Venda
                    </button>
                </div>
            </div>
        </>
    );
}

export default Vendas;
