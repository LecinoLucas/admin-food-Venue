import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import DataTable from '../components/DataTable';
import FormDish from '../components/FormDish';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { RestaurantContext } from '../context/RestauranteContext';
import useAxiosInstance from '../utils/axiosInstance';

const AddDish = () => {
    const [dishs, setDishs] = useState(null);
    const { data } = useContext(RestaurantContext);
    const [openModalAddDish, setOpenModalAddDish] = useState(false);
    const [openModalEditDish, setOpenModalEditDish] = useState(false);
    const [openModalDeleteDish, setOpenModalDeleteDish] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedDish, setSelectedDish] = useState({});
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('error');
    const [toastTitle, setToastTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDishs, setFilteredDishs] = useState(null);

    const axiosInstance = useAxiosInstance();

    const getDishs = useCallback(() => {
        if (data?.restaurante?.id) {
            axiosInstance
                .get(`/api/pratos/restaurante/${data?.restaurante?.id}`)
                .then((resp) => {
                    if (resp.data) {
                        setDishs(resp.data);
                        setFilteredDishs(resp.data);
                    }
                })
                .catch((err) => {
                    setToastMessage(
                        "Houve um erro no servidor, aguarde algum tempo e tente novamente"
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
        };

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
                    "Houve um erro no servidor, aguarde algum tempo e tente novamente"
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
        };

        axiosInstance
            .put(`/api/pratos/${selectedDish.id}`, bodyData)
            .then((resp) => {
                if (resp.data) {
                    getDishs();
                    setToastMessage(
                        "Prato editado com sucesso!"
                    );
                    setToastType('success');
                    setToastTitle('Editado com sucesso');
                    setToastVisible(true);
                    setOpenModalEditDish(false);
                }
            })
            .catch((err) => {
                setToastMessage(
                    "Houve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType('error');
                setToastTitle('Erro interno');
                setToastVisible(true);
                setOpenModalEditDish(false);
            });
    };

    const handleDeleteDish = async () => {
        axiosInstance
            .delete(`/api/pratos/${selectedDish.id}`)
            .then(() => {
                setToastMessage(
                    "Prato excluído com sucesso!"
                );
                setToastType('success');
                setToastTitle('Excluído com sucesso');
                setToastVisible(true);
                setOpenModalDeleteDish(false);
                getDishs();

            })
            .catch(() => {
                setToastMessage(
                    "Houve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType('error');
                setToastTitle('Erro interno');
                setToastVisible(true);
            });
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredDishs = filterDishs(query);
        setFilteredDishs(filteredDishs);
    };

    useEffect(() => {
        const filteredDishs = filterDishs(searchQuery);
        setFilteredDishs(filteredDishs);
    }, [searchQuery]);

    const filterDishs = (query) => {
        if (!query) {
            return dishs;
        }

        const filteredKeys = ['nome', 'descricao', 'preco']; // Chaves a serem consideradas na filtragem
        const lowercaseQuery = query.toLowerCase();

        const filteredDishs = dishs.filter((dish) =>
            filteredKeys.some((key) => {
                let value = dish[key];
                if (key === 'preco' && typeof value === 'number') {
                    value = value.toString(); // Converter o número para string
                }
                return typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery);
            })
        );

        return filteredDishs;
    };

    const columns = [
        {
            header: 'Nome',
            render: (dish) => dish?.nome,
        },
        {
            header: 'Descrição',
            render: (dish) => dish.descricao,
        },
        {
            header: 'Preço',
            render: (dish) => `R$ ${dish.preco}`,
        },
        {
            header: 'Ações',
            render: (dish) => (
                <>
                    <button onClick={() => handleModalEdit(dish)}>
                        <EditIcon />
                    </button>
                    <button className="ml-1" onClick={() => { setSelectedDish(dish); setOpenModalDeleteDish(true); }}>
                        <DeleteIcon />
                    </button>
                </>
            ),
        },
    ];

    const handleModalEdit = (data) => {
        setSelectedDish(data);
        setOpenModalEditDish(true);
    };

    const handleCloseModalEdit = () => {
        setOpenModalEditDish(false);
    };

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDeleteDish(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pratos</h1>
            <div className="flex items-center justify-between mb-4">
                <div className='w-52'>
                    <Input
                        type="text"
                        id="searchQuery"
                        placeHolder="Nome, descricao ou preco"
                        value={searchQuery}
                        onChange={handleSearch}
                        label="Pesquisar"
                    />
                </div>
                <div>
                    <CustomButton
                        color="primary"
                        onClick={() => setOpenModalAddDish(true)}
                    >
                        Adicionar prato
                    </CustomButton>
                </div>
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
                onCancel={handleCloseModalEdit}
                onSave={handleEditSubmit}
                labelButtonSave="Editar prato"
                labelButtonCancel="Cancelar"
            >
                <FormDish onChange={handleFormChange} dish={selectedDish} />
            </Modal>

            <Modal
                isOpen={openModalDeleteDish}
                title="Excluir prato"
                onCancel={handleCloseModalDelete}
                onSave={handleDeleteDish}
                labelButtonSave="Excluir"
                labelButtonCancel="Cancelar"
            >
                <p>Realmente deseja excluir o prato?</p>
            </Modal>

            <Toast
                isVisible={toastVisible}
                type={toastType}
                title={toastTitle}
                message={toastMessage}
                duration={3000}
                onDismiss={() => setToastVisible(false)}
            />
            <DataTable columns={columns} data={filteredDishs} />
        </div>
    );
};

export default AddDish;
