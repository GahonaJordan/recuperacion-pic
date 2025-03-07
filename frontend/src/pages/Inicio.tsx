import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const mockServices = [
    {
        title: "Mantenimiento de Autos",
        description: "Revisión completa, cambio de aceite, alineación y balanceo.",
        image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6B34/production/_94244472_9.jpg.webp",
    },
    {
        title: "Reparación de Camiones",
        description: "Diagnóstico avanzado y reparación de motores diésel.",
        image: "https://media.istockphoto.com/id/1445074332/es/foto/semirremolques-de-plataformas-grandes-y-coloridos-brillantes-con-semirremolques-parados-en-la.jpg?s=612x612&w=0&k=20&c=8H_zXHhDJ9CqXj_xGJ83n7hDmR5wXIQ54q6D2PDNwu4=",
    },
    {
        title: "Servicio de Motos",
        description: "Afinación, reparación de frenos y revisión general.",
        image: "https://images.unsplash.com/photo-1506424482693-1f123321fa53?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JiaWtlfGVufDB8fDB8fHww",
    },
];

interface Service {
    title: string;
    description: string;
    image: string;
}

const serviceTemplate = (service: Service) => {
    return (
        <div className="p-3">
            <Card
                title={service.title}
                style={{ width: "300px" }}
                header={<img alt={service.title} src={service.image} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
            >
                <p>{service.description}</p>
                <Button label="Más información" className="p-button-outlined p-button-primary" />
            </Card>
        </div>
    );
};

export const Inicio: React.FC = () => {
    return (
        <div className="p-5">
            <div className="text-center mb-5">
                <h1 className="text-4xl font-bold mb-3">Bienvenido a Taller AutoPro</h1>
                <p className="text-lg text-gray-300 bg-black bg-opacity-50 p-3 rounded-lg">
                    Ofrecemos servicios de mantenimiento y reparación para autos, camiones y motos. Garantizamos calidad
                    y satisfacción.
                </p>
                <Button label="Contáctanos" icon="pi pi-envelope" className="p-button-lg mt-3" />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Nuestros Servicios</h2>
                <Carousel
                    value={mockServices}
                    itemTemplate={serviceTemplate}
                    numVisible={3}
                    numScroll={1}
                    autoplayInterval={3000}
                />
            </div>

            <footer className="text-center mt-8 py-5 border-t">
                <p className="text-gray-500">&copy; 2025 Taller AutoPro. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};
