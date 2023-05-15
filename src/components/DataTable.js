import React from 'react';

const DataTable = ({ columns, data }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {columns?.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, index) => (
                            <td key={index}>{column.render(row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
