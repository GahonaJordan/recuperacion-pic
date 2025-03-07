import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Notificacion, Registros_Servicio, Taller, Vehiculo } from "../types/types";
import { getNotificaciones, getServicios, getTalleres, getVehiculos } from "../services/api";

export const Dashboard: React.FC = () => {
    const [talleres, setTalleres] = useState<Taller[]>([]);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [servicios, setServicios] = useState<Registros_Servicio[]>([]);
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const talleresData = await getTalleres();
                const vehiculosData = await getVehiculos();
                const serviciosData = await getServicios();
                const notificacionesData = await getNotificaciones();
                setTalleres(talleresData);
                setVehiculos(vehiculosData);
                setServicios(serviciosData);
                setNotificaciones(notificacionesData);
            } catch (error) {
                console.log("Error al obtener los datos", error);
            }
        };
        fetchData();
    }, []);

    // Prepara datos para gráficos
    const barChartData = {
        labels: ["Servicios", "Talleres", "Vehículos", "Notificaciones"],
        datasets: [
            {
                label: "Cantidad",
                backgroundColor: "#42A5F5",
                borderColor: "#1E88E5",
                borderWidth: 1,
                hoverBackgroundColor: "#64B5F6",
                hoverBorderColor: "#42A5F5",
                data: [
                    servicios.length,
                    talleres.length,
                    vehiculos.length,
                    notificaciones.length,
                ],
            },
        ],
    };

    const pieChartData = {
        labels: ["Servicios", "Talleres", "Vehículos", "Notificaciones"],
        datasets: [
            {
                data: [
                    servicios.length,
                    talleres.length,
                    vehiculos.length,
                    notificaciones.length,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FFA726"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FFA726"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "right",
                labels: {
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                        color: "#4A5568",
                    },
                },
            },
            title: {
                display: true,
                text: "Distribución Porcentual de Entidades",
                font: {
                    size: 18,
                    family: "Arial, sans-serif",
                    weight: "bold",
                    color: "#2D3748",
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#4A5568",
                titleFont: {
                    size: 16,
                    family: "Arial, sans-serif",
                },
                bodyFont: {
                    size: 14,
                    family: "Arial, sans-serif",
                },
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                        color: "#4A5568",
                    },
                },
            },
            title: {
                display: true,
                text: "Cantidad de Entidades por Categoría",
                font: {
                    size: 18,
                    family: "Arial, sans-serif",
                    weight: "bold",
                    color: "#2D3748",
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#4A5568",
                titleFont: {
                    size: 16,
                    family: "Arial, sans-serif",
                },
                bodyFont: {
                    size: 14,
                    family: "Arial, sans-serif",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        family: "Arial, sans-serif",
                        color: "#4A5568",
                    },
                },
            },
            y: {
                grid: {
                    color: "#e0e0e0",
                },
                ticks: {
                    font: {
                        size: 12,
                        family: "Arial, sans-serif",
                        color: "#4A5568",
                    },
                    beginAtZero: true,
                },
            },
        },
        animation: {
            duration: 1000,
            easing: "easeInOutQuart",
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Gráfico de Barras */}
                <div className="bg-white p-6 shadow-2xl rounded-2xl transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700">Estadísticas Generales</h2>
                    <div style={{ height: "450px" }}>
                        <Chart type="bar" data={barChartData} options={barChartOptions} />
                    </div>
                </div>

                {/* Gráfico Circular */}
                <div className="bg-white p-6 shadow-2xl rounded-2xl transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700">Distribución Porcentual</h2>
                    <div style={{ height: "450px" }}>
                        <Chart type="pie" data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};