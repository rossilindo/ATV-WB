import { Component } from "react";

type props = {
    tema: string
}

export default class FormularioCadastroCliente extends Component<props> {
    render() {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-slate-50">NOME</label>
                        <input id="first_name" type="text" className="mt-1 block w-full bg-[#232325] rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-slate-50">SOBRENOME</label>
                        <input id="last_name" type="text" className="mt-1 block w-full bg-[#232325] rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-slate-50">TELEFONE</label>
                        <input id="telefone" type="text" className="mt-1 block w-full bg-[#232325] rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-50">E-MAIL</label>
                        <input id="email" type="email" className="mt-1 block w-full bg-[#232325] rounded-md shadow-sm" />
                    </div>
                    <div className="col-span-2">
                        <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">ENVIAR</button>
                    </div>
                </form>
            </div>
        )
    }
}
