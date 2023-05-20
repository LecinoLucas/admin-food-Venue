import React from 'react';
import { useLoading } from '../context/LoadingContexts';

const DataTable = ({ columns, data }) => {
    const spinnerClasses = `animate-spin -ml-1 mr-3 h-5 w-5 text-primary`;
    const { isLoading } = useLoading();

    if (isLoading) {
        return (
            <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-primary text-white">
                    <tr>
                        {columns?.map((column, index) => (
                            <th key={index} className="px-4 py-2">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-2 text-center">
                            <div className="flex items-center justify-center">
                                <div className={spinnerClasses}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.647 9.3a6 6 0 007.061 7.06 1 1 0 110 2 8 8 0 11-9.193-9.194 6 6 0 002.132 2.134z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="ml-2">Carregando...</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    if (!data || data.length === 0) {
        return (
            <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-primary text-white">
                    <tr>
                        {columns?.map((column, index) => (
                            <th key={index} className="px-4 py-2">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-2 text-center">
                            Nenhum dado disponível.
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-primary text-white">
                <tr>
                    {columns?.map((column, index) => (
                        <th key={index} className="px-4 py-2">
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr key={index} className="hover:bg-secondary hover:text-white">
                        {columns.map((column, index) => (
                            <td key={index} className="px-4 py-2">
                                {column.render(row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
