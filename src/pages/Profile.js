import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import ImageUploader from "../components/ImageUploader";
import Input from "../components/Input";
import Toast from "../components/Toast";
import { RestaurantContext } from '../context/RestauranteContext';
import { base64ToImageUrl } from "../utils/Base64ToImageUrl";
import useAxiosInstance from "../utils/axiosInstance";

const RestaurantProfilePage = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        imagem: '',
    });
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");
    const [toastTitle, setToastTitle] = useState("");
    const [initialImage, setInitialImage] = useState(null);
    const { data, setRestaurante } = useContext(RestaurantContext);
    const axiosInstance = useAxiosInstance();


    useEffect(() => {
        if (data?.restaurante?.id) {
            axiosInstance.get(`/api/restaurantes/${data?.restaurante?.id}`).then(resp => {
                const restaurantData = resp.data;
                const imageBlobUrl = base64ToImageUrl(restaurantData?.imagem);
                setFormData({
                    nome: restaurantData?.nome,
                    descricao: restaurantData?.descricao,
                    imagem: imageBlobUrl || "" // Atualizando com o valor da imagem ou uma string vazia
                });
                setInitialImage(imageBlobUrl);

            }).catch(() => {
                setToastMessage("Houve um erro ao carregar os dados do restaurante.");
                setToastType("error");
                setToastTitle("Erro");
                setToastVisible(true);
            });
        }

    }, [data?.restaurante?.id, axiosInstance]);

    const handleFormSubmit = async () => {
        const bodyData = {
            nome: formData?.nome,
            descricao: formData?.descricao,
            imagem: formData?.imagem,
            aberto: data?.restaurante?.aberto
        };
        if (data?.restaurante?.id === null ||
            formData?.nome === null ||
            formData?.descricao === null ||
            formData?.imagem === null ||
            formData?.aberto === null
        ) {
            setToastMessage(
                "Não podem haver campos vazios"
            );
            setToastType('error');
            setToastTitle('Preencha todos os campos!');
            setToastVisible(true);
            return;
        }
        axiosInstance
            .put(`/api/restaurantes/${data.restaurante.id}`, bodyData)
            .then((resp) => {
                if (resp.data) {
                    setToastMessage("Perfil atualizado com sucesso!");
                    setToastType("success");
                    setToastTitle("Atualizado com sucesso");
                    setToastVisible(true);
                    setRestaurante(resp.data)
                }
            })
            .catch(() => {
                setToastMessage(
                    "Houve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType("error");
                setToastTitle("Erro interno");
                setToastVisible(true);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                    <Input
                        type="text"
                        id="nome"
                        label="Nome"
                        value={formData?.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                    <Input
                        type="text"
                        id="descricao"
                        label="Descrição"
                        value={formData?.descricao}
                        onChange={(e) =>
                            setFormData({ ...formData, descricao: e.target.value })
                        }
                    />
                    <CustomButton color="primary" onClick={handleFormSubmit}>
                        Salvar
                    </CustomButton>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <ImageUploader
                        initialImage={initialImage || null}
                        onChange={(base64Image) =>
                            setFormData({ ...formData, imagem: base64Image })
                        }
                    />
                </div>
            </div>

            <Toast
                isVisible={toastVisible}
                type={toastType}
                title={toastTitle}
                message={toastMessage}
                duration={3000}
                onDismiss={() => setToastVisible(false)}
            />
        </div>
    );
};

export default RestaurantProfilePage;
