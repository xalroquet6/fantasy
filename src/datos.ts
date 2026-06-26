import type {Participante, JornadaLiga, CompeticionCopa} from './tipos';

export const PARTICIPANTES: Participante[] = [
    { id: '1', nombre: 'victini77' },
    { id: '2', nombre: 'C.D.georgitos rojos' },
    { id: '3', nombre: 'R.C.D VIVERO' },
    { id: '4', nombre: 'AlonsoRo_6' },
    { id: '5', nombre: 'GuilleZ' },
    { id: '6', nombre: 'PitufosFC' },
    { id: '7', nombre: 'Wakaru' },
    { id: '8', nombre: 'Inquisición FC' },
    { id: '9', nombre: 'UD Cororo' },
    { id: '10', nombre: 'pepMartí' }
];

export const JORNADAS: JornadaLiga[] = [
    {
        numeroJornada: 1,
        resultados: [
            { participanteID: '1', puntos: 45 },
            { participanteID: '2', puntos: 52 },
            { participanteID: '3', puntos: 38 },
            { participanteID: '4', puntos: 33 },
            { participanteID: '5', puntos: 46 },
            { participanteID: '6', puntos: 60 },
            { participanteID: '7', puntos: 107 },
            { participanteID: '8', puntos: 96 },
            { participanteID: '9', puntos: 58 },
            { participanteID: '10', puntos: 77 }            
        ]
    },
    {
        numeroJornada: 2,
        resultados: [
            { participanteID: '1', puntos: 1 },
            { participanteID: '2', puntos: 2 },
            { participanteID: '3', puntos: 3 },
            { participanteID: '4', puntos: 4 },
            { participanteID: '5', puntos: 5 },
            { participanteID: '6', puntos: 6 },
            { participanteID: '7', puntos: 7 },
            { participanteID: '8', puntos: 8 },
            { participanteID: '9', puntos: 9 },
            { participanteID: '10', puntos: 10 }            
        ]
    }
];

// 3. Configuración de vuestra Copa por parejas
export const COPA: CompeticionCopa = {
    numeroJornadaLiga: 12, // Por ejemplo, se juega en la jornada 12
    parejas: [
        { miembro1Id: '1', miembro2Id: '2' }, 
        { miembro1Id: '3', miembro2Id: '4' }  
    ]
};