export interface ElementoReglamento {
  texto: string | string[]; // Puede ser un texto único o un array de elementos si es una lista con viñetas
  tipo: 'parrafo' | 'punto' | 'lista';
  subnumero?: string; // Para poner "3.1", "3.2", etc., si es un punto
}

export interface SeccionReglamento {
  id: string;
  numero: number;
  titulo: string;
  contenido: ElementoReglamento[];
}

export const TEXTO_REGLAMENTO: SeccionReglamento[] = [
  {
    id: "sec-1",
    numero: 1,
    titulo: "Finalidad",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "El presente reglamento tiene como finalidad mantener la integridad, el juego limpio y la competitividad justa entre los participantes de la Liga Fantasy PALOS FC. Toda acción contraria a estos principios será evaluada y, si procede, sancionada conforme a esta normativa."
      }
    ]
  },
  {
    id: "sec-2",
    numero: 2,
    titulo: "Autoridad disciplinaria",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "La comisión organizadora de la liga será la encargada de vigilar el cumplimiento del reglamento y de aplicar las sanciones pertinentes. Su criterio será inapelable salvo error manifiesto."
      }
    ]
  },
  {
    id: "sec-3",
    numero: 3,
    titulo: "La Vicepresidencia y el Comité de Competición",
    contenido: [
        {
        tipo: 'punto',
        subnumero: "3.1",
        texto: "Se crea la figura del Vicepresidente de la Liga PALOS FC, la cual será ocupada por un miembro de la competición elegido mediante sufragio universal, democrático y secreto (o a través de una encuesta directa en el grupo oficial) antes del inicio de la primera jornada de la temporada 2026/27. El Presidente no podrá postularse a este cargo ni ejercer el derecho al voto en dicha elección."
        },
        {
        tipo: 'punto',
        subnumero: "3.2",
        texto: "El Vicepresidente tendrá encomendadas las siguientes tareas:"
        },
        {
        tipo: 'lista',
        texto: [
          "Asistir al Presidente en la vigilancia, cumplimiento e interpretación del presente reglamento.",
          "Co-redactar y firmar las resoluciones oficiales ante las reclamaciones presentadas por los participantes.",
          "Asumir de forma interina las funciones totales de administración, moderación y ejecución de la liga en caso de ausencia prolongada, vacaciones o fuerza mayor del Presidente."
        ]
        },
        {
        tipo: 'punto',
        subnumero: "3.3",
        texto: "Si el Presidente o el Vicepresidente se ven implicados de forma directa en una disputa por negociaciones (Art. 5) o están bajo investigación por una presunta infracción (Art. 3), quedarán automáticamente recusados de su función arbitral para ese caso concreto. El miembro no implicado asumirá la resolución en solitario para garantizar la total neutralidad e imparcialidad del proceso."
        },
        {
        tipo: 'punto',
        subnumero: "3.4",
        texto: "En el supuesto de que la recusación del apartado anterior se deba a una presunta infracción tipificada en el Artículo 3, se abrirá un expediente informativo de oficio para dilucidar si el investigado es digno de seguir ostentando su cargo. Los mecanismos de destitución serán los siguientes:"
        },
        {
        tipo: 'lista',
        texto: [
          "Destitución del Vicepresidente: Si el 75% de los participantes de la liga vota a favor de su cese por considerar que ha quebrado los principios de neutralidad o transparencia, será destituido de forma inmediata. Se convocará una votación extraordinaria en un plazo máximo de 48 horas para elegir a un nuevo representante.",
          "Destitución del Presidente: Al ser el fundador/administrador principal, el listón se eleva. Se requerirá la unanimidad absoluta del resto de los participantes de la liga (100% de los votos emitidos, excluyendo al Presidente) para proceder a su destitución forzosa y al traspaso definitivo de los poderes de administración al Vicepresidente electo."
        ]
        },
    ]
  },
  {
    id: "sec-4",
    numero: 4,
    titulo: "Tipificación de las infracciones y sanciones",
    contenido: [
        {
        tipo: 'punto',
        subnumero: "4.1",
        texto: "Ley Cabrera: Venta de un jugador recién comprado"
        },
        {
        tipo: 'parrafo',
        texto: "Queda prohibido vender, traspasar o devolver un jugador recién incorporado a un equipo de vuelta a su club de origen antes de que haya transcurrido una jornada de liga (salvo las excepciones autorizadas por parón de selecciones recogidas en el Art. 7.1)." 
        },
        {
        tipo: 'parrafo',
        texto: "Sanción:" 
        },

        {
        tipo: 'punto',
        subnumero: "4.2",
        texto: "Primera Ley Mayordomo: Intercambio irregular de jugadores para inflar cláusulas:"
        },
        {
        tipo: 'parrafo',
        texto: "Los intercambios de jugadores entre presidentes deben realizarse obligatoriamente a precio de mercado actual o fijando un precio que refleje de forma real y justificada la diferencia de valor o la revalorización de los futbolistas implicados. Queda prohibido realizar intercambios artificiales con el único fin de inflar de forma fraudulenta las cláusulas de rescisión de los jugadores." 
        },
        {
        tipo: 'parrafo',
        texto: "Sanción:" 
        },
        
        {
        tipo: 'punto',
        subnumero: "4.3",
        texto: "Segunda Ley Mayordomo: Intercambio reiterado de jugadores para reiniciar cláusulas:"
        },
        {
        tipo: 'parrafo',
        texto: "Queda estrictamente prohibido que dos presidentes se intercambien jugadores de manera constante o reiterada con el único propósito de reiniciar sus cláusulas de rescisión para retener a un jugador durante más días y evitar que el resto de la liga pueda ficharlo." 
        },
        {
        tipo: 'parrafo',
        texto: "Sanción:" 
        },

        {
        tipo: 'punto',
        subnumero: "4.4",
        texto: "Ley Parrales-Viladrich: Confabulación y Complot entre presidentes"
        },
        {
        tipo: 'parrafo',
        texto: "Queda prohibido cualquier tipo de pacto secreto, alianza o confabulación entre dos o más presidentes que tenga como finalidad perjudicar deliberadamente a otro miembro de la liga, adulterar la competición, alterar el mercado de fichajes de forma maliciosa o realizar cualquier acción coordinada en contra de un tercero." 
        },
        {
        tipo: 'parrafo',
        texto: "Sanción:" 
        },

        {
        tipo: 'punto',
        subnumero: "4.5",
        texto: "Incumplimineto del Estatus de Inactividad"
        },
        {
        tipo: 'parrafo',
        texto: "Queda prohibido ejecutar fichajes o pagar cláusulas de rescisión de la plantilla de un presidente que haya activado formalmente el Estatus de Inactividad (según lo establecido en el Art. 7.4)." 
        },
        {
        tipo: 'parrafo',
        texto: "Sanción:" 
        },
    ]
    },
    {
    id: "sec-5",
    numero: 5,
    titulo: "Reincidencias",
    contenido: [
      {
        tipo: 'parrafo',
        texto: ""
      }
    ]
    },
    {
    id: "sec-6",
    numero: 6,
    titulo: "Negociaciones",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "Todas las negociaciones realizadas por mensaje, ya sea a través del grupo oficial de la liga o por mensaje privado entre participantes, deberán realizarse con claridad y buena fe."
      },
      {
        tipo: 'parrafo',
        texto: 'Una vez se lance una propuesta de fichaje, si una de las partes la acepta de manera clara y expresa mediante alguno de los siguientes mensajes: "trato", "🤝", "hecho", o cualquier término similar que indique conformidad con la propuesta recibida, el acuerdo será considerado vinculante y obligatorio.'
      },
      {
        tipo: 'parrafo',
        texto: "El traspaso deberá ejecutarse en el menor plazo posible tras dicha aceptación."
      },
      {
        tipo: 'parrafo',
        texto: "En caso de que una de las partes se niegue a completar el traspaso después de que este sea considerado aceptado y vinculante, la organización evaluará el caso y podrá imponer una sanción por determinar."
      },
      {
        tipo: 'parrafo',
        texto: "Asimismo, en caso de que un participante esté negociando simultáneamente por más de un jugador con la misma parte, y se acepte una de las ofertas mediante cualquiera de los términos válidos mencionados, se entenderá que ambas operaciones forman parte del mismo acuerdo global, salvo que se haya indicado expresamente lo contrario por mensaje, de forma clara y explícita, antes de la aceptación. En consecuencia, deberán ejecutarse todas las operaciones vinculadas conforme a lo acordado."
      },
      {
        tipo: 'parrafo',
        texto: "En caso de que un participante ofrezca el mismo jugador a varias personas y reciba más de una aceptación válida, el acuerdo vinculante será el primero en el que quede registrada la aceptación clara y comprobable en orden cronológico. Cualquier aceptación posterior carecerá de validez, y el jugador deberá ser traspasado al primer comprador legítimo."
      },
      {
        tipo: 'parrafo',
        texto: "Continuar ofreciendo al jugador tras haber recibido una aceptación válida se considerará una falta de buena fe, pudiendo conllevar sanción o advertencia por parte de la organización."
      },
    ]
    },
    {
    id: "sec-7",
    numero: 7,
    titulo: "Casos Concretos",
    contenido: [
        {
        tipo: 'punto',
        subnumero: "7.1",
        texto: "Venta de un jugador recién comprado durante el parón:"
        },
        {
        tipo: 'parrafo',
        texto: "Durante los parones de selecciones, y siempre que hayan transcurrido al menos 10 días desde la compra inicial del jugador, podrá autorizarse el retorno de un jugador a su equipo de origen sin necesidad de esperar a que pase una jornada completa. Para que esta excepción sea válida, el trato deberá ser previamente consultado con el presidente, quien evaluará los motivos aportados y decidirá si concede o no la aprobación. En caso de que la operación se realice sin haber solicitado dicha autorización, el traspaso será considerado ilegal y se aplicarán las sanciones correspondientes." 
        },

        {
        tipo: 'punto',
        subnumero: "7.2",
        texto: "Tratos antes del inicio de una jornada:"
        },
        {
        tipo: 'parrafo',
        texto: "Todos los tratos que se realicen antes del inicio de una jornada deberán completarse también antes de su comienzo, dejando un margen mínimo de 5 minutos previos al inicio oficial para que los jugadores puedan alinear correctamente al futbolista implicado en la operación." 
        },

        
        {
        tipo: 'punto',
        subnumero: "7.3",
        texto: "Transparencia en ventas rápidas:"
        },
        {
        tipo: 'parrafo',
        texto: "Todo presidente que desee vender a un jugador por un precio sensiblemente inferior a su cláusula, o quiera deshacerse rápidamente de un jugador sin sacar un claro beneficio de su venta, deberá ofrecer dicho jugador previamente al resto de presidentes, excepto en el caso en que la venta sea a LaLiga, en cuyo caso sí que podrá realizar la venta sin necesidad de consulta." 
        },
        {
        tipo: 'parrafo',
        texto: "Esta comunicación podrá hacerse a través del grupo oficial de la liga, indicando el nombre del jugador, precio de venta y el motivo de la operación. Solo si ningún otro presidente manifiesta interés, podrá cerrarse la venta con el comprador inicial." 
        },


        {
        tipo: 'punto',
        subnumero: "7.4",
        texto: "Estatus de Inactividad:"
        },
        {
        tipo: 'parrafo',
        texto: "Si un participante no va a poder entrar al juego debido a vacaciones, viajes o motivos personales de fuerza mayor durante un periodo determinado, podrá solicitar formalmente al Comité de Competición la activación del Estatus de Inactividad. Para que sea válido, deberá notificarse en el grupo oficial con un mínimo de 24 horas de antelación a su desconexión."
        },


        {
        tipo: 'punto',
        subnumero: "7.5",
        texto: "Incumplimineto del Estatus de Inactividad"
        },
        {
        tipo: 'parrafo',
        texto: "Queda prohibido ejecutar fichajes o pagar cláusulas de rescisión de la plantilla de un presidente que haya activado formalmente el Estatus de Inactividad (según lo establecido en el Art. 7.4)." 
        },
        {
        tipo: 'lista',
        texto: [
          '7.4.1 Durante el periodo en el que un miembro esté bajo el Estatus de Inactividad, queda estrictamente prohibido iniciar cualquier intento de fichaje o pago de cláusula de rescisión por parte del resto de presidentes de la liga. La plantilla del presidente ausente se considerará "congelada" a efectos de mercado.',
          "7.4.2 Si el presidente que se encuentra en Estatus de Inactividad decidiese descongelar su plantilla, se considerará que su estatus queda revocado y los demás presidentes podrán operar con total normalidad."
        ]
        },

        {
        tipo: 'parrafo',
        texto: "La presente lista de casos concretos no es cerrada ni limitativa. La organización de la liga se reserva el derecho de añadir nuevos casos específicos en cualquier momento de la temporada, con el fin de proteger la equidad y el buen funcionamiento de la competición."
        },

    ]
    },
    {
    id: "sec-8",
    numero: 8,
    titulo: "Interpretación de Casos Dudosos",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "En caso de que surjan situaciones no descritas explícitamente en este reglamento, la organización podrá interpretar la normativa aplicando analogías con los casos concretos ya establecidos o con base en los principios de equidad, juego limpio y competitividad."
      },
      {
        tipo: 'parrafo',
        texto: "Siempre que sea posible, se documentará la decisión tomada y se añadirá como caso concreto al reglamento para futuras ediciones y con carácter retroactivo cuando sea considerado oportuno."
      }
    ]
    },
    {
    id: "sec-9",
    numero: 9,
    titulo: "Obligación de Colaboración",
    contenido: [
        {
        tipo: 'parrafo',
        texto: "Siempre que el Presidente abra una investigación de oficio o a raíz de una reclamación, todos los usuarios investigados e involucrados estarán estrictamente obligados a obedecer cualquier requerimiento de información o pruebas solicitado por la organización. Esto incluye, pero no se limita a: el envío inmediato de capturas de pantalla de chats privados, grabaciones de pantalla del historial de la app o registros de conversaciones de WhatsApp."
        },
        {
        tipo: 'punto',
        subnumero: "9.1",
        texto: "Adulteración, Borrado de Mensajes u Obstrucción: "
        },
        {
        tipo: 'parrafo',
        texto: "En el supuesto de que el Comité de Competición sospeche de forma fundada o detecte que las pruebas aportadas han sido manipuladas, editadas, recortadas, o que se han borrado mensajes con el fin de alterar el orden cronológico o el sentido de una negociación:" 
        },
        {
        tipo: 'lista',
        texto: [
          'El derecho de los acusados a defenderse quedará automáticamente revocado.',
          "La organización procederá a resolver el caso de forma inmediata utilizando únicamente las pruebas legítimas disponibles y las conclusiones o suposiciones lógicas a las que lleguen conjuntamente el Presidente y el Vicepresidente."
        ]
        },

        {
        tipo: 'punto',
        subnumero: "9.1",
        texto: "Efectos sobre el Afectado y Protección de la Liga: "
        },
        {
        tipo: 'parrafo',
        texto: "Si se demuestra que quien ha adulterado, borrado o falseado las pruebas es el propio participante que se declaraba perjudicado, el caso se cerrará de forma fulminante y dicho usuario perderá cualquier derecho a indemnización, devolución de jugadores o compensación económica. No obstante, el Comité de Competición tomará las medidas oportunas para garantizar que el resto de la liga y los usuarios inocentes no se vean perjudicados por la falta de resolución justa del caso, aislando el daño únicamente en el infractor." 
        },
    ]
    },
    {
    id: "sec-10",
    numero: 10,
    titulo: "Jurisprudencia",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "Toda resolución dictada de forma conjunta por el Presidente y el Vicepresidente sentará jurisprudencia y tendrá fuerza de ley para el resto de la temporada 2026/27. La organización estará obligada a aplicar exactamente el mismo criterio en todos los casos idénticos que ocurran en el futuro, garantizando así la igualdad de trato y la predictibilidad de las decisiones."
      }
    ]
    },
    {
    id: "sec-11",
    numero: 11,
    titulo: "Cláusula de Exoneración",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "La organización no se hace responsable por errores técnicos, fallos en la plataforma oficial, caídas de servidor o problemas ajenos que puedan afectar el desarrollo de la liga. En caso de incidencias, se informará a los participantes y se tomarán medidas para garantizar la equidad."
      }
    ]
    },
    {
    id: "sec-12",
    numero: 12,
    titulo: "Vigencia del Reglamento",
    contenido: [
      {
        tipo: 'parrafo',
        texto: "El presente reglamento estará vigente durante toda la temporada 2026/27, entrando en vigor desde la publicación oficial y permaneciendo vigente hasta la finalización y cierre oficial de la competición, incluyendo posibles fases de apelación y sanción."
      }
    ]
    },
];