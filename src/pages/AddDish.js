import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import DataTable from '../components/DataTable';
import FormDish from '../components/FormDish';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { RestaurantContext } from '../context/RestauranteContext';
import useAxiosInstance from '../utils/axiosInstance';

const AddDish = () => {
    const [dishs, setDishs] = useState(null);
    const { data } = useContext(RestaurantContext);
    const [openModalAddDish, setOpenModalAddDish] = useState(false);
    const [openModalEditDish, setOpenModalEditDish] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedDish, setSelectedDish] = useState({});
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('error');
    const [toastTitle, setToastTitle] = useState('');

    const axiosInstance = useAxiosInstance();

    const getDishs = useCallback(() => {
        if (data?.restaurante?.id) {
            axiosInstance
                .get(`/api/pratos/restaurante/${data?.restaurante?.id}`)
                .then((resp) => {
                    if (resp.data) {
                        setDishs(resp.data);
                    }
                })
                .catch((err) => {
                    setToastMessage(
                        "Ouve um erro no servidor, aguarde algum tempo e tente novamente"
                    );
                    setToastType('error');
                    setToastTitle('Erro interno');
                    setToastVisible(true);
                });
        }
    }, [data, axiosInstance]);

    useEffect(() => {
        getDishs();
    }, [data, getDishs]);

    const handleFormSubmit = async () => {

        const bodyData = {
            restaurante: {
                id: data?.restaurante?.id
            },
            nome: formData?.nome,
            preco: formData?.preco,
            descricao: formData?.descricao,
            imagem: formData?.imagem,
        }
        axiosInstance
            .post(`/api/pratos/`, bodyData)
            .then((resp) => {
                if (resp.data) {
                    getDishs();
                    setToastMessage(
                        "Prato criado com sucesso!"
                    );
                    setToastType('success');
                    setToastTitle('Criado com sucesso');
                    setToastVisible(true);
                    setOpenModalAddDish(false);

                }
            })
            .catch((err) => {
                setToastMessage(
                    "Ouve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType('error');
                setToastTitle('Erro interno');
                setToastVisible(true);
                setOpenModalAddDish(false);
            });


    };

    const handleEditSubmit = async () => {

        const bodyData = {
            restaurante: {
                id: data?.restaurante?.id
            },
            nome: formData?.nome,
            preco: formData?.preco,
            descricao: formData?.descricao,
            imagem: formData?.imagem,
        }
        axiosInstance
            .put(`/api/pratos/${selectedDish.id}`, bodyData)
            .then((resp) => {
                if (resp.data) {
                    getDishs();
                    setToastMessage(
                        "Prato criado com sucesso!"
                    );
                    setToastType('success');
                    setToastTitle('Editado com sucesso');
                    setToastVisible(true);
                    setOpenModalEditDish(false);
                }
            })
            .catch((err) => {
                setToastMessage(
                    "Ouve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType('error');
                setToastTitle('Erro interno');
                setToastVisible(true);
                setOpenModalEditDish(false);
            });


    };
    const columns = [
        {
            header: 'Nome',
            render: (order) => order?.nome,
        },
        {
            header: 'Descrição',
            render: (order) => order.descricao,
        },
        {
            header: 'Preço',
            render: (order) => order.preco,
        },
        {
            header: 'Ações',
            render: (dish) => (
                <>
                    <button onClick={() => console.log(dish)}>
                        <InfoIcon />
                    </button>
                    <button className="ml-1" onClick={() => handleModalEdit(dish)}>
                        <EditIcon />
                    </button>
                </>
            ),
        },
    ];

    const handleModalEdit = (data) => {
        setSelectedDish(data);
        setOpenModalEditDish(true)

    }

    const handleCloseModalEdit = () => {
        setOpenModalEditDish(false)
    }
    const handleFormChange = (data) => {
        setFormData(data)
    };
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="w-1/2 text-end justify-items-end">
                    <h1 className="text-2xl font-bold">Pratos</h1>
                </div>
                <CustomButton
                    color="primary"
                    width="1/4"
                    onClick={() => setOpenModalAddDish(true)}
                >
                    Adicionar prato
                </CustomButton>
            </div>
            <Modal
                isOpen={openModalAddDish}
                title="Adicionar prato"
                onCancel={() => setOpenModalAddDish(false)}
                onSave={handleFormSubmit}
                labelButtonSave="Criar prato"
                labelButtonCancel="Cancelar"
            >
                <FormDish onChange={handleFormChange} />
            </Modal>

            <Modal
                isOpen={openModalEditDish}
                title="Editar prato"
                onCancel={() => handleCloseModalEdit()}
                onSave={handleEditSubmit}
                labelButtonSave="Editar prato"
                labelButtonCancel="Cancelar"
            >
                <FormDish onChange={handleFormChange} dish={selectedDish} />
            </Modal>
            <Toast
                isVisible={toastVisible}
                type={toastType}
                title={toastTitle}
                message={toastMessage}
                duration={3000}
                onDismiss={() => setToastVisible(false)}
            />
            <DataTable columns={columns} data={dishs} />
        </div>
    );
};

export default AddDish;
