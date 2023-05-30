import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/CustomButton';
import { RestaurantContext } from '../context/RestauranteContext';
import foodVenueLogo from '../images/foodVenueLogo.jpg';
import useAxiosInstance from '../utils/axiosInstance';

const ReportPage = () => {
    const axiosInstance = useAxiosInstance();
    const [reportData, setReportData] = useState(null);
    const { data } = useContext(RestaurantContext);

    useEffect(() => {
        axiosInstance
            .get(`/api/restaurantes/${data?.restaurante?.id}/relatorio`)
            .then((response) => {
                setReportData(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter relatório:', error);
            });
    }, [axiosInstance]);

    const handleDownloadPDF = () => {
        if (!reportData) {
            return;
        }

        const doc = new jsPDF();

        // Header
        doc.setFontSize(12);
        doc.addImage(foodVenueLogo, 'JPEG', 165, 10, 30, 30);
        doc.text('Data do Relatório: ' + new Date().toLocaleDateString(), 15, 20);
        doc.text('Hora do Relatório: ' + new Date().toLocaleTimeString(), 15, 30);
        doc.setFontSize(18);
        doc.text("Nome do restaurante: " + reportData?.restauranteNome || '', 15, 45);

        // Informações Gerais
        doc.setFontSize(18);
        doc.text('Informações Gerais', 15, 60);
        doc.autoTable({
            startY: 70,
            head: [['Faturamento Diário', 'Faturamento Mensal', 'Ticket Médio', 'Total de Pratos Vendidos']],
            body: [[
                'R$ ' + (reportData?.faturamentoDiario?.toFixed(2) || ''),
                'R$ ' + (reportData?.faturamentoMensal?.toFixed(2) || ''),
                'R$ ' + (reportData?.ticketMedio?.toFixed(2) || ''),
                reportData?.totalPratosVendidos || ''
            ]],
            headStyles: {
                fillColor: '#FF7F50',
                textColor: '#FFFFFF',
                halign: 'center'
            },
            bodyStyles: {
                fillColor: '#F3F4F6',
                halign: 'center'
            },
        });

        // Clientes
        doc.setFontSize(18);
        doc.text('Clientes', 15, doc.autoTable.previous.finalY + 20);
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 30,
            head: [['Nome do Cliente', 'Quantidade de Pedidos']],
            body: reportData?.todosClientes?.map(cliente => [cliente?.nomeCliente, cliente?.quantidadePedidos]) || [],
            headStyles: {
                fillColor: '#FF7F50',
                textColor: '#FFFFFF',
                halign: 'center'
            },
            bodyStyles: {
                fillColor: '#F3F4F6',
                halign: 'center'
            },
        });

        doc.save('relatorio.pdf');
    };


    const handleDownloadCSV = () => {
        if (!reportData) {
            return;
        }

        const csvData = [
            [
                'restauranteId',
                'restauranteNome',
                'faturamentoDiario',
                'faturamentoMensal',
                'ticketMedio',
                'totalPedidos',
                'totalPratosVendidos',
                'nomeCliente',
                'quantidadePedidos'
            ],
            [
                reportData.restauranteId,
                reportData.restauranteNome,
                reportData.faturamentoDiario.toFixed(2).replace('.', ','),
                reportData.faturamentoMensal.toFixed(2).replace('.', ','),
                reportData.ticketMedio.toFixed(2).replace('.', ','),
                reportData.totalPedidos,
                reportData.totalPratosVendidos,
                '',
                ''
            ]
        ];

        reportData.todosClientes.forEach(cliente => {
            csvData.push([
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                cliente.nomeCliente,
                cliente.quantidadePedidos
            ]);
        });

        const csvRows = csvData.map(row => row.join(';')).join('\n');

        // Download do arquivo CSV
        const blob = new Blob(['\ufeff' + csvRows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (!reportData) {
        return (
            <div className="container mx-auto p-4">
                <p>Nenhum relatório disponível.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{reportData?.restauranteNome}</h1>

            <div className="bg-card p-4 rounded-md">
                <div className="flex justify-end">
                    <Button onClick={handleDownloadPDF} color="primary" className="mr-2">
                        Baixar PDF
                    </Button>
                    <Button onClick={handleDownloadCSV} color="primary">
                        Baixar CSV
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-bold">Faturamento Diário</p>
                        <p className="text-3xl mt-2">R$ {reportData?.faturamentoDiario?.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-bold">Faturamento Mensal</p>
                        <p className="text-3xl mt-2">R$ {reportData?.faturamentoMensal?.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-bold">Ticket Médio</p>
                        <p className="text-3xl mt-2">R$ {reportData?.ticketMedio?.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-lg font-bold">Total de Pratos vendidos</p>
                        <p className="text-3xl mt-2">{reportData?.totalPratosVendidos}</p>
                    </div>
                </div>

                <h3 className="font-bold mt-6">Clientes</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full mt-2">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-primary text-white">Nome do Cliente</th>
                                <th className="py-2 px-4 bg-primary text-white">Quantidade de Pedidos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData?.todosClientes?.map(cliente => (
                                <tr key={cliente?.nomeCliente}>
                                    <td className="py-2 px-4">{cliente?.nomeCliente}</td>
                                    <td className="py-2 px-4">{cliente?.quantidadePedidos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
