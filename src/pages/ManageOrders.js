import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import DataTable from '../components/DataTable';

const OrdersPage = ({ orders }) => {
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [openModalStatus, setOpenModalStatus] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState(null);

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
        <>
            <DataTable columns={columns} data={orders} />
            {selectedOrder && (
                <>
                    <div>

                    </div>
                    {/* <ModalInfo
                        open={openModalInfo}
                        handleClose={handleCloseModalInfo}
                        order={selectedOrder}
                    />
                    <ModalStatus
                        open={openModalStatus}
                        handleClose={handleCloseModalStatus}
                        order={selectedOrder}
                    /> */}
                </>
            )}
        </>
    );
};

export default OrdersPage;
