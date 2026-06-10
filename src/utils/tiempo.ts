function inicioDelDia(fecha: Date) {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

function formatHora(fecha: Date) {
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const sufijo = horas >= 12 ? "pm" : "am";
    const horas12 = horas % 12 || 12;
    const minutosTxt =
        minutos === 0 ? "" : `:${minutos.toString().padStart(2, "0")}`;
    return `${horas12}${minutosTxt}${sufijo}`;
}

function diasDeDiferencia(fecha: Date) {
    const ahora = new Date();
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.floor(
        (inicioDelDia(ahora).getTime() - inicioDelDia(fecha).getTime()) / msPorDia
    );
}

export function formatTiempoRelativo(fecha: Date): string {
    const dias = diasDeDiferencia(fecha);

    if (dias === 0) {
        const horas = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60));
        return horas < 1 ? "Hace unos minutos" : `Hace ${horas}h`;
    }
    if (dias === 1) {
        return `Ayer ${formatHora(fecha)}`;
    }
    return `Hace ${dias} días`;
}

export function seccionRelativa(fecha: Date): "Hoy" | "Ayer" | "Antes" {
    const dias = diasDeDiferencia(fecha);
    if (dias === 0) return "Hoy";
    if (dias === 1) return "Ayer";
    return "Antes";
}

const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DIAS_SEMANA = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado",
];

export interface MesAnio {
    anio: number;
    mes: number; // 0-11
}

export function mesActual(): MesAnio {
    const hoy = new Date();
    return { anio: hoy.getFullYear(), mes: hoy.getMonth() };
}

export function sumarMeses({ anio, mes }: MesAnio, delta: number): MesAnio {
    const total = anio * 12 + mes + delta;
    return { anio: Math.floor(total / 12), mes: ((total % 12) + 12) % 12 };
}

export function nombreMes({ anio, mes }: MesAnio): string {
    return `${MESES[mes]} ${anio}`;
}

export function mesAbrev(mes: number): string {
    return MESES[mes].slice(0, 3).toLowerCase();
}

export function nombreDiaSemana(fecha: Date): string {
    return DIAS_SEMANA[fecha.getDay()];
}

export function diasHasta(fecha: Date): number {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.round(
        (inicioDelDia(fecha).getTime() - inicioDelDia(new Date()).getTime()) / msPorDia
    );
}

export function formatHoraMensaje(fecha: Date): string {
    const dias = diasDeDiferencia(fecha);
    if (dias === 0) return formatHora(fecha);
    if (dias === 1) return "Ayer";
    const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return `${DIAS[fecha.getDay()]} ${fecha.getDate()}`;
}