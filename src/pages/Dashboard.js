import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import React, { useContext, useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import ToggleButton from '../components/ToggleButton';
import { RestaurantContext } from '../context/RestauranteContext';
import useAxiosInstance from '../utils/axiosInstance';

const OrderPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModalInfo, setOpenModalInfo] = useState(false);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { data, setUsuario, setRestaurante } = useContext(RestaurantContext);
    const orders = []; // Substitua pelos pedidos reais
    const axiosInstance = useAxiosInstance()
    const toggleOpen = () => {
        axiosInstance.put('/api/restaurantes/status', { aberto: !isOpen }).then((resp => {
            setUsuario(resp?.data?.usuario)
            setRestaurante({
                aberto: resp?.data?.aberto,
                descricao: resp?.data?.descricao,
                id: resp?.data?.id,
                imagem: resp?.data?.imagem,
                nome: resp?.data?.nome,
            })
        }))
    }

    useEffect(() => {
        console.log(data?.restaurante?.aberto)
        setIsOpen(data?.restaurante?.aberto);
    }, [data])

    const handleOpenModalInfo = (order) => {
        setSelectedOrder(order);
        setOpenModalInfo(true);
    };

    const handleCloseModalInfo = () => {
        setOpenModalInfo(false);
    };

    const handleOpenModalStatus = (order) => {
        setSelectedOrder(order);
        setOpenModalStatus(true);
    };

    const handleCloseModalStatus = () => {
        setOpenModalStatus(false);
    };

    const columns = [
        {
            header: 'Cliente',
            render: (order) => order.cliente,
        },
        {
            header: 'Prato',
            render: (order) => order.prato,
        },
        {
            header: 'Status',
            render: (order) => order.status,
        },
        {
            header: 'Ações',
            render: (order) => (
                <>
                    <button onClick={() => handleOpenModalInfo(order)}>
                        <InfoIcon />
                    </button>
                    <button onClick={() => handleOpenModalStatus(order)}>
                        <EditIcon />
                    </button>
                </>
            ),
        },
    ];
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

            <div className="mb-4">
                <label className="mr-2">Restaurante está:</label>
                <ToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
            </div>

            <DataTable columns={columns} data={orders} />
        </div>
    );
};

export default OrderPage;
