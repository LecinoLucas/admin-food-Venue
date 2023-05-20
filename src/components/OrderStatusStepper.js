import React from 'react';

const statuses = [
    'AGUARDANDO_APROVACAO',
    'PREPARANDO',
    'A_CAMINHO',
    'ENTREGUE',
];

const statusLabels = {
    AGUARDANDO_APROVACAO: 'Pendente',
    PREPARANDO: 'Preparando',
    A_CAMINHO: 'A caminho',
    ENTREGUE: 'Entregue',
};

const OrderStatusStepper = ({ currentStatus }) => {
    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="flex items-center justify-center p-4 bg-app rounded-lg">
            {statuses.map((status, index) => (
                <div key={status} className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full mb-2 flex items-center justify-center ${index <= currentIndex ? 'bg-success text-white' : 'bg-warning text-white'}`}>
                        {index + 1}
                    </div>
                    <div className="text-center w-full">
                        {statusLabels[status]}
                    </div>
                    {index < statuses.length && (
                        <div className={`w-32 h-1 mt-2  ${index <= currentIndex ? 'bg-success' : 'bg-warning'}`} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderStatusStepper;
