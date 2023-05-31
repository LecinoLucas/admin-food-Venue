// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from "react";
import { base64ToImageUrl } from "../utils/Base64ToImageUrl";
import ImageUploader from "./ImageUploader";

function FormDish({ onChange, dish }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [imagem, setImagem] = useState(null);
    useEffect(() => {
        if (dish) {
            setNome(dish.nome);
            setPreco(dish.preco);
            setDescricao(dish.descricao);
            setTipo(dish.tipo);
            setImagem(dish.imagem);
            onChange({
                nome: dish.nome,
                preco: dish.preco,
                descricao: dish.descricao,
                imagem: dish.imagem,
            })
        }
    }, [dish]);


    const handleNomeChange = (e) => {
        setNome(e.target.value);
        onChange({ nome: e.target.value, preco, descricao, tipo, imagem });
    };

    const handlePrecoChange = (e) => {
        setPreco(e.target.value);
        onChange({ nome, preco: e.target.value, descricao, tipo, imagem });
    };

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
        onChange({ nome, preco, descricao: e.target.value, tipo, imagem });
    };


    const handleImagemChange = (imagem) => {
        setImagem(imagem);
        onChange({ nome, preco, descricao, tipo, imagem }); // Chame a função onChange com o objeto atualizado
    };
    return (
        <form className="bg-app p-4 rounded-md">
            <div className="mb-4">
                <label className="text-secondary block mb-2" htmlFor="nome">
                    Nome
                </label>
                <input
                    id="nome"
                    className="bg-card text-primary py-2 px-3 rounded-md w-full"
                    type="text"
                    value={nome}
                    onChange={handleNomeChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="text-secondary block mb-2" htmlFor="preco">
                    Preço
                </label>
                <input
                    id="preco"
                    className="bg-card text-primary py-2 px-3 rounded-md w-full"
                    type="number"
                    step="0.01"
                    value={preco}
                    onChange={handlePrecoChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="text-secondary block mb-2" htmlFor="descricao">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    className="bg-card text-primary py-2 px-3 rounded-md w-full"
                    value={descricao}
                    onChange={handleDescricaoChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="text-secondary block mb-2">Imagem</label>
                <ImageUploader
                    initialImage={base64ToImageUrl(dish?.imagemBytes)}
                    onChange={handleImagemChange}
                />
            </div>
        </form>
    );
}

export default FormDish;
