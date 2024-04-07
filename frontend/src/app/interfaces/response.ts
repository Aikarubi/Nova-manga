export interface Response {
    isbn: string;
    nombre: string;
    precio: number;
    descripcion: string;
    tamanyo: string;
    paginas: number;
    portada: string;
    fecha_venta: FechaVenta;
}

export interface FechaVenta {
    date: Date;
    timezone_type: number;
    timezone: string;
}