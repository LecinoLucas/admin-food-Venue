import React from 'react';

const statuses = [
    'AGUARDANDO_APROVACAO',
    'PREPARANDO',
    'A_CAMINHO',
    'ENTREGUE',
    'CANCELADO',
];

const statusLabels = {
    AGUARDANDO_APROVACAO: 'Pendente',
    PREPARANDO: 'Preparando',
    A_CAMINHO: 'A caminho',
    ENTREGUE: 'Entregue',
    CANCELADO: 'Cancelado',
};

const OrderStatusStepper = ({ currentStatus }) => {
    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="flex items-center justify-center p-4 bg-app rounded-lg">
            {statuses.map((status, index) => {
                const isCompleted = index <= currentIndex;
                const isCanceled = currentStatus === 'CANCELADO';
                const isActive = index === currentIndex;

                return (
                    <div key={status} className="flex flex-col items-center">
                        <div
                            className={`h-8 w-8 rounded-full mb-2 flex items-center justify-center ${isCompleted && !isCanceled ? 'bg-success text-white' : 'bg-warning text-white'
                                } ${isActive && isCanceled ? 'bg-error text-white' : ''}`}
                        >
                            {index + 1}
                        </div>
                        <div className="text-center w-full">
                            {statusLabels[status]}
                        </div>
                        {index < statuses.length && (
                            <div
                                className={`w-28 h-1 mt-2 ${isCompleted && !isCanceled ? 'bg-success' : 'bg-warning'
                                    } ${isActive && isCanceled ? 'bg-error' : ''}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OrderStatusStepper;
