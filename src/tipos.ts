export interface Participante{
    id: string;
    nombre: string;
}

export interface PuntuacionJornada{
    participanteID: string;
    puntos: number;
}

export interface JornadaLiga {
    numeroJornada: number;
    resultados: PuntuacionJornada[];
}

export interface ParejaCopa {
    miembro1Id: string;
    miembro2Id: string;
}

export interface CompeticionCopa {
    numeroJornadaLiga: number; 
    parejas: ParejaCopa[];
}

export interface GrupoChampions{
    nombre: string;
    miembros: Participante[];
}