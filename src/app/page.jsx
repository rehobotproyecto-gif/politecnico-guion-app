'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const PROGRAMAS_DATOS = {
  bigdata: {
    nombre: "TG GESTIÓN DE ANALÍTICA Y BIG DATA",
    nombreLargo: "Tecnólogo en Gestión de Analítica y Big Data",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Aprenderás a extraer, preparar y organizar datos provenientes de múltiples fuentes, encontrando patrones, tendencias y comportamientos para apoyar la ciencia de datos, inteligencia de negocios o procesamiento de información.",
    cargos: "Arquitecto de Datos, Administrador de Datos, Desarrollador de Datos, Ingeniero de Datos, Analista de Datos, Data Scientist, Data Visualization Developer.",
    esIA: false,
    esSST: false
  },
  comercio: {
    nombre: "TG COMERCIO Y NEGOCIOS INTERNACIONALES",
    nombreLargo: "Tecnología Virtual en Comercio Exterior y Negocios Internacionales",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Serás capaz de gestionar procesos de importación, exportación y logística de mercancías a nivel nacional e internacional, dominando la planeación aduanera, documentos, costos, medios de pago y requisitos de ley para generar negocios rentables.",
    cargos: "Gestor de Importaciones y Exportaciones, Analista aduanero, Coordinador de Logística Internacional, Diseñador de Proyectos de Comercio Transfronterizo, Asesor de Negociaciones Internacionales.",
    esIA: false,
    esSST: false
  },
  software: {
    nombre: "TG DESARROLLO DE SOFTWARE Y APLICATIVOS MÓVILES",
    nombreLargo: "Tecnología Virtual en Desarrollo de Software y Aplicativos Móviles",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Desarrollarás competencias para diseñar, programar, dar soporte y mantener soluciones de software, páginas web y aplicativos móviles (Android/iOS), garantizando estándares de calidad internacional en el control de la información.",
    cargos: "Desarrollador Móvil, Programador Frontend/Backend, Analista de Calidad de Software (QA), Coordinador de Soporte Informático, Administrador de Bases de Datos.",
    esIA: false,
    esSST: false
  },
  admin: {
    nombre: "TG GESTIÓN ADMINISTRATIVA",
    nombreLargo: "Tecnología en Gestión Administrativa",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Aprenderás a planear, organizar, direccionar y controlar procesos tácticos de las áreas administrativa, de contabilidad y finanzas, cadena de abastecimiento y gestión del talento humano.",
    cargos: "Supervisor Administrativo, Coordinador de Compras y Almacén, Analista de Selección y Reclutamiento, Coordinador de Gestión Documental, Supervisor de Servicio Postventa y Operaciones.",
    esIA: false,
    esSST: false
  },
  sst: {
    nombre: "TG SEGURIDAD Y SALUD EN EL TRABAJO",
    nombreLargo: "Tecnología en Gestión de la Seguridad y Salud en el Trabajo",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Ya trabajas en el área de seguridad y salud, o te llama la atención liderar la prevención y bienestar en las empresas para proteger la vida de los trabajadores?",
    perfil: "Te capacitarás para implementar, diseñar, ejecutar y evaluar el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) bajo las normativas vigentes (Resolución 0312 de 2019 y 0908 de 2025 del Ministerio del Trabajo).",
    licencia: "Al graduarte, recibirás tu Licencia en SST expedida por las Secretarías de Salud, capacitándote legalmente para atender de forma directa a empresas de 10 a 49 empleados en niveles de riesgo I, II y III en actividades de higiene industrial, capacitación e investigación de accidentes de trabajo.",
    cargos: "Coordinador de SG-SST, Inspector de Higiene y Seguridad Industrial, Analista de Riesgos Laborales, Capacitador en Prevención y Salud Laboral.",
    esIA: false,
    esSST: true
  },
  mercadeo: {
    nombre: "TG GESTIÓN DE MERCADEO Y ESTRATEGIAS COMERCIALES",
    nombreLargo: "Tecnología en Gestión de Mercadeo y Estrategias Comerciales",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Te consideras una persona creativa y comercial, interesada en aprender a vender de manera digital y posicionar marcas en redes sociales?",
    perfil: "Aprenderás a coordinar y controlar procesos de mercadeo y ventas digitales y offline. Diseñarás estrategias de posicionamiento de marca, publicidad, comportamiento del consumidor y fidelización de clientes.",
    cargos: "Coordinador de Mercadeo Digital, Diseñador de Campañas Publicitarias, Analista de Canales Digitales y Social Media, Director de Ventas Corporativas, Gestor de Servicio al Cliente.",
    esIA: false,
    esSST: false
  },
  financiera: {
    nombre: "TG GESTIÓN FINANCIERA Y CONTABLE",
    nombreLargo: "Tecnología en Gestión Financiera y Contable",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Te prepararás para codificar, registrar, causar, interpretar y auditar la información contable bajo normas internacionales (NIIF). Estarás en capacidad de elaborar estados financieros, liquidar nóminas, elaborar flujos de caja y preparar declaraciones de impuestos (IVA, Renta e ICA).",
    cargos: "Coordinador de Tesorería, Analista Contable, Analista Financiero, Liquidador de Nómina y Prestaciones, Gestor de Impuestos.",
    esIA: false,
    esSST: false
  },
  logistica: {
    nombre: "TG GESTIÓN LOGÍSTICA INTERNACIONAL",
    nombreLargo: "Tecnología en Gestión Logística Internacional",
    duracion: "2 años y medio (8 períodos académicos) - 100 créditos académicos",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Coordinarás y supervisarás procesos clave de almacenamiento, planeación de transporte de carga, aprovisionamiento y la Distribución Física Internacional (DFI) bajo el marco aduanero legal vigente.",
    cargos: "Coordinador de Almacenamiento y Bodegas, Programador de Tráfico y Transporte, Supervisor de Distribución Física Internacional, Analista de Aprovisionamiento.",
    esIA: false,
    esSST: false
  },
  ia: {
    nombre: "TG GESTIÓN DE SOLUCIONES DE DATOS CON IA",
    nombreLargo: "Tecnología en Gestión de Soluciones de Datos con Inteligencia Artificial",
    duracion: "Casi 3 años (9 períodos académicos) - Aprox. 112 créditos académicos",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Serás pionero en la aplicación de modelos inteligentes. Estarás capacitado para estructurar soluciones de datos complejas integrando herramientas de IA para optimizar procesos comerciales, financieros y tecnológicos.",
    cargos: "Analista de Datos con IA, Desarrollador de Modelos Predictivos, Consultor de Automatización de Procesos con IA, Gestor de Soluciones Tecnológicas Inteligentes.",
    esIA: true,
    esSST: false
  }
};

export default function Home() {
  const [progKey, setProgKey] = useState('software');
  const [loading, setLoading] = useState(false);
  const [asesor, setAsesor] = useState('Carlos Garzon');
  const [campaña, setCampaña] = useState('');
  const [tabInversion, setTabInversion] = useState('lista');

  const prog = PROGRAMAS_DATOS[progKey];

  const [formData, setFormData] = useState({
    nombres: '',
    tipoDoc: 'Cédula de Ciudadanía',
    fechaNacimiento: '',
    documento: '',
    idField: '',
    fechaExpedicion: '',
    lugarExpedicion: '',
    correo: '',
    celular: '',
    direccion: '',
    estrato: '',
    eps: '',
    anioBachillerato: '',
    acudienteNombre: '',
    acudienteTelefono: '',
    electiva: 'Herramientas de Correo Institucional',
    
    // Información para crédito
    ocupacion: '',
    tipoContrato: '',
    empresaTrabajas: '',
    direccionEmpresa: '',
    telefonoEmpresa: '',
    antiguedadEmpresa: '',
    salarioMensual: '',
    otrosIngresos: '',
    gastosMensuales: '',

    ciudad: 'Bogotá D.C.',
    sede: 'Virtual',
    jornada: 'Virtual',
    valorPagar: '',
    fechaPago: '',
    medioPago: 'PSE / Financiación Directa',
    obsequio: 'Inscripción 100% Gratuita'
  });

  const construirTextoProceso = () => {
    const infoAsesorCampaña = [asesor || '---', campaña ? `${campaña}` : ''].filter(Boolean).join(' - ');

    return `PROCESO DE MATRICULA - ${infoAsesorCampaña}
Nombre:    ${formData.nombres || '---'}
Cédula:   ${formData.documento || '---'}
ID:   ${formData.idField || '---'}
Celular:  ${formData.celular || '---'}
Correo: ${formData.correo || '---'}
Ciudad:   ${formData.ciudad || '---'}
Sede:  ${formData.sede}
Programa:    ${prog.nombre}
Jornada:  ${formData.jornada}
Valor a pagar Matricula:    ${formData.valorPagar || '---'}
Fecha de pago:  ${formData.fechaPago || '---'}
Medio de pago: ${formData.medioPago}
Electiva:  ${formData.electiva || '---'}
Obsequio: ${formData.obsequio || '---'}`;
  };

  const construirTextoCompletoBlock = () => {
    const infoAsesorCampaña = [asesor || '---', campaña ? `${campaña}` : ''].filter(Boolean).join(' - ');

    return `========================================
REPORTE COMPLETO DE ASPIRANTE Y PROCESO
Asesor / Campaña: ${infoAsesorCampaña}
Programa de Interés: ${prog.nombreLargo}
========================================

--- DATOS DEL ASPIRANTE ---
1. Nombre Completo: ${formData.nombres || '---'}
2. Tipo de Documento: ${formData.tipoDoc || '---'}
3. Fecha de Nacimiento: ${formData.fechaNacimiento || '---'}
4. Número de Documento: ${formData.documento || '---'}
ID: ${formData.idField || '---'}
5. Fecha de Expedición: ${formData.fechaExpedicion || '---'}
6. Municipio de Expedición: ${formData.lugarExpedicion || '---'}
7. Correo Electrónico: ${formData.correo || '---'}
8. Celular: ${formData.celular || '---'}
9. Dirección y Barrio: ${formData.direccion || '---'}
10. Estrato Social: ${formData.estrato || '---'}
11. EPS: ${formData.eps || '---'}
12. Año del ICFES: ${formData.anioBachillerato || '---'}
13 y 14. Acudiente / Familiar: ${formData.acudienteNombre || '---'}
15. Teléfono Acudiente: ${formData.acudienteTelefono || '---'}
16. Electiva: ${formData.electiva || '---'}

--- INFORMACIÓN PARA CRÉDITO ---
Ocupación: ${formData.ocupacion || '---'}
Tipo de Contrato: ${formData.tipoContrato || '---'}
Empresa donde trabaja: ${formData.empresaTrabajas || '---'}
Dirección de la empresa: ${formData.direccionEmpresa || '---'}
Teléfono de la empresa: ${formData.telefonoEmpresa || '---'}
Antigüedad: ${formData.antiguedadEmpresa || '---'}
Salario Mensual: ${formData.salarioMensual || '---'}
Otros Ingresos: ${formData.otrosIngresos || '---'}
Gastos Mensuales: ${formData.gastosMensuales || '---'}

--- DATOS DE PAGO Y CIERRE (PROCESO CANTADO) ---
Ciudad: ${formData.ciudad || '---'}
Sede / Jornada: ${formData.sede} / ${formData.jornada}
Valor a Pagar Matrícula: ${formData.valorPagar || '---'}
Fecha de Pago: ${formData.fechaPago || '---'}
Medio de Pago: ${formData.medioPago}
Obsequio: ${formData.obsequio}`;
  };

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(construirTextoProceso());
    alert('¡Proceso cantado copiado al portapapeles!');
  };

  const descargarBlockDeNotas = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      programa_interes: prog.nombreLargo,
      asesor: asesor,
      campaña: campaña,
      proceso_cantado_texto: construirTextoCompletoBlock(),
      fecha_registro: new Date().toISOString()
    };

    try {
      await supabase.from('prospectos').insert([payload]);
    } catch (err) {
      console.error('Error al guardar en Supabase:', err);
    } finally {
      setLoading(false);
    }

    const contenidoTxt = construirTextoCompletoBlock();
    const blob = new Blob([contenidoTxt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reporte_Completo_${formData.nombres ? formData.nombres.replace(/\s+/g, '_') : 'Aspirante'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('¡Datos completos del aspirante, crédito y proceso descargados como Block de Notas!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-6">
      {/* Header Comercial */}
      <header className="max-w-[1600px] mx-auto border-b border-slate-800 pb-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-1 inline-block">
            Politécnico Internacional
          </span>
          <h1 className="text-2xl font-extrabold text-white">
            Plataforma Comercial & Guion de Asesoría Telefónica
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700">
            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Asesor Comercial:</label>
            <input 
              type="text" 
              placeholder="Ej: Carlos Garzon"
              value={asesor} 
              onChange={e => setAsesor(e.target.value)} 
              className="bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-700 font-semibold"
            />
          </div>

          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700">
            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Campaña:</label>
            <input 
              type="text" 
              placeholder="Ej: Cierre Septiembre"
              value={campaña} 
              onChange={e => setCampaña(e.target.value)} 
              className="bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-700 font-semibold"
            />
          </div>

          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700">
            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Seleccionar Programa:</label>
            <select 
              value={progKey} 
              onChange={(e) => setProgKey(e.target.value)}
              className="bg-slate-900 text-blue-400 font-bold px-3 py-1 rounded border border-slate-700 text-xs"
            >
              {Object.keys(PROGRAMAS_DATOS).map((key) => (
                <option key={key} value={key}>
                  {PROGRAMAS_DATOS[key].nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Estructura Principal en Columnas */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA 1: Guión Comercial y Módulo de Inversión y Costos */}
        <section className="lg:col-span-5 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 text-xs overflow-y-auto max-h-[850px] pr-2">
          <h2 className="text-base font-bold text-blue-400 flex items-center gap-2 border-b border-slate-700 pb-2">
            ℹ️ Guión & Módulo de Inversión y Costos
          </h2>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-blue-400 font-bold block text-[11px] uppercase">1. Saludo Inicial & Enfoque</span>
            <p className="text-slate-200">"¡Hola! Muy buenos días/tardes. Te saluda <strong className="text-white">{asesor || '[Tu Nombre]'}</strong>, asesor de admisiones del <strong>Politécnico Internacional</strong>. Es un gusto saludarte hoy."</p>
            <p className="text-slate-300 italic">"¿Tengo el gusto de hablar con <strong>{formData.nombres || '[Nombre Aspirante]'}</strong>?"</p>
            <p className="text-slate-200">"Te contacto porque recibimos tus datos para información sobre el programa <strong className="text-blue-300">{prog.nombreLargo}</strong>, ¿correcto? El Politécnico contribuye al plan de vida de cada estudiante a través del emprendimiento y la empleabilidad, desarrollando competencias y viviendo una experiencia práctica."</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-emerald-400 font-bold block text-[11px] uppercase">2. Requisitos de Ingreso</span>
            <p className="text-slate-200">"Para formalizar tu ingreso, los requisitos son sumamente sencillos: <strong>fotocopia de tu documento de identidad</strong>, <strong>acta o diploma de bachiller</strong> y tus resultados de la prueba <strong>ICFES (Saber 11)</strong>. ¿Cuentas con ellos?"</p>
            <div className="bg-slate-800 p-2 rounded text-[11px] text-amber-300 border border-amber-500/30 mt-1">
              💡 <strong>Tip de Venta:</strong> Si no tienes las pruebas ICFES a la mano, firmamos un compromiso digital para que las presentes en el próximo corte y puedes arrancar a estudiar ya mismo.
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-amber-400 font-bold block text-[11px] uppercase">3. Duración del Programa</span>
            <p className="text-slate-200">{prog.duracion}. Cada período dura exactamente 12 semanas de clase, con una semana de receso entre ellos.</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-purple-400 font-bold block text-[11px] uppercase">4. Pregunta Filtro (Escucha Activa)</span>
            <p className="text-slate-200 italic font-medium">"{prog.preguntaFiltro}"</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-cyan-400 font-bold block text-[11px] uppercase">5. Perfil Profesional & Campo Laboral</span>
            <p className="text-slate-300 leading-relaxed"><strong className="text-white">Perfil:</strong> {prog.perfil}</p>
            {prog.licencia && (
              <p className="text-slate-300 leading-relaxed"><strong className="text-white">Licencia Profesional Clave:</strong> {prog.licencia}</p>
            )}
            <p className="text-slate-300"><strong className="text-white">Cargos donde te desempeñarás:</strong> {prog.cargos}</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-indigo-400 font-bold block text-[11px] uppercase">6. Certificaciones Parciales</span>
            <div className="space-y-1 text-slate-200">
              <p>Una certificación parcial es un título oficial intermedio y gratuito que te entregamos durante tu formación académica. En lugar de esperar los 2 años y medio para tener tu título en la hoja de vida, a medida que apruebas materias clave, la institución te expide certificaciones oficiales.</p>
              <p className="text-slate-300 italic">¿Cómo las usas? Las subes a tu LinkedIn o perfil laboral y demuestras que ya tienes competencias técnicas listas para trabajar. ¡Es un retorno de inversión inmediato! Así vas mejorando tus conocimientos en la hoja de vida y podrás ir aplicando a cargos antes de terminar tu carrera.</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-teal-400 font-bold block text-[11px] uppercase">7. Modalidad</span>
            <div className="space-y-1 text-slate-200">
              <p>La modalidad es <strong>100% Virtual</strong> a través de nuestra plataforma profesional Moodle, disponible las 24 horas del día, los 7 días de la semana. Tú manejas tu tiempo a tu acomodo; con que le dediques de 1 a 2 horas diarias es suficiente para tus actividades.</p>
              <p className="text-slate-300 mt-2"><strong>Aclaración de Clases Sincrónicas (Derribar miedos de tiempo):</strong> Tenemos un encuentro virtual sincrónico a la semana por cada asignatura, usualmente en la noche (6:00 p.m. a 9:00 p.m.). Sin embargo, quiero dejarte esto súper claro: <strong>si por razones de trabajo, familia o tiempo no te puedes conectar en vivo a las clases sincrónicas, ¡esto NO afecta en lo absoluto tu proceso académico ni tus notas!</strong> Las sesiones quedan 100% grabadas en la plataforma para que las repases a tu ritmo cuando puedas.</p>
            </div>
          </div>

          {/* MÓDULO DE INVERSIÓN Y COSTOS CON PESTAÑAS */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-3">
            <span className="text-emerald-400 font-bold block text-[11px] uppercase border-b border-slate-800 pb-1">
              💰 Inversión y Costos
            </span>

            {/* Pestañas de Navegación */}
            <div className="flex border-b border-slate-800 pb-2 gap-1 overflow-x-auto">
              <button 
                onClick={() => setTabInversion('lista')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${tabInversion === 'lista' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Paso A & B: Lista y Sin Inscripción
              </button>
              <button 
                onClick={() => setTabInversion('descuento')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${tabInversion === 'descuento' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Planes Estándar (Sin Beca)
              </button>
              <button 
                onClick={() => setTabInversion('plan30')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition whitespace-nowrap ${tabInversion === 'plan30' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                Planes Con Descuento (30-40-30)
              </button>
            </div>

            {/* Contenido Pestaña 1: Paso A y B */}
            {tabInversion === 'lista' && (
              <div className="space-y-3 text-slate-200 text-[11px] animate-fadeIn">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Paso A: Valor Total de Lista (Sin Beneficios)</span>
                  {prog.esIA ? (
                    <p>Para el programa Solución de Datos con IA: La inversión regular por periodo con todos los conceptos (Pensión de $1.401.576 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236) es de <strong className="text-white">$1.602.012</strong>.</p>
                  ) : (
                    <p>Para los otros 8 Programas (Logística, Administrativa, Analítica, Comercio, Desarrollo, Financiera, Mercadeo, SST): La inversión regular por periodo con todos los conceptos (Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236) es de <strong className="text-white">$1.627.968</strong>.</p>
                  )}
                </div>

                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-emerald-500/40 space-y-1">
                  <span className="text-emerald-400 font-bold text-[10px] uppercase block">Paso B: Descontando la Inscripción</span>
                  <p>Pero, como estamos en proceso de cierre inmediato y quiero apoyarte para que inicies ya, el día de hoy <strong>te voy a obsequiar el 100% del formulario de inscripción</strong> (te ahorras $149.000).</p>
                  {prog.esIA ? (
                    <p className="text-white font-bold mt-1">Para el programa Solución de Datos con IA: $1.453.012</p>
                  ) : (
                    <p className="text-white font-bold mt-1">Para los otros 8 Programas: $1.478.968</p>
                  )}
                  <p className="text-slate-300 italic mt-2">"¿Qué te parece este súper beneficio? ¿Cómo te queda mejor realizar el pago de tu matrícula?"</p>
                </div>
              </div>
            )}

            {/* Contenido Pestaña 2: Planes Estándar */}
            {tabInversion === 'descuento' && (
              <div className="space-y-3 text-slate-200 text-[11px] animate-fadeIn">
                {prog.esIA ? (
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-blue-500/40">
                    <span className="text-blue-400 font-bold text-[10px] uppercase block mb-1">Programa Tecnólogo en Solución de Datos con IA</span>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Pensión del Ciclo Regular: $1.401.576.</li>
                      <li>Formulario de Inscripción: $149.000 (Obsequiado al 100%).</li>
                      <li><strong>Pago Inicial (Cuota 1 - 30% + Conceptos de Carné y Seguro + Estudio de Crédito de $34.339):</strong> $506.247 (Pago el día de hoy para formalizar la matrícula).</li>
                      <li><strong>Segunda Cuota (4 de Noviembre de 2026 - 40% de la Pensión):</strong> $560.630.</li>
                      <li><strong>Tercera Cuota (3 de Diciembre de 2026 - 30% de la Pensión):</strong> $420.473.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50">
                    <span className="text-blue-400 font-bold text-[10px] uppercase block mb-1">Programas Virtuales Estándar</span>
                    <p className="text-[10px] text-slate-400 mb-2">(Aplica para: Gestión Administrativa, Analítica y Big Data, Comercio Exterior, Desarrollo de Software, Gestión Financiera, Logística Internacional, Mercadeo, SST, Producción de Video, Animación Gráfica, Ciberseguridad y Capital Humano).</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Pensión del Ciclo Regular: $1.427.532.</li>
                      <li>Formulario de Inscripción: $149.000 (Obsequiado al 100% como incentivo de cierre).</li>
                      <li><strong>Pago Inicial (Cuota 1 - 30% + Conceptos de Carné y Seguro + Estudio de Crédito de $34.975):</strong> $514.670 (Pago el día de hoy para formalizar la matrícula).</li>
                      <li><strong>Segunda Cuota (4 de Noviembre de 2026 - 40% de la Pensión):</strong> $571.013.</li>
                      <li><strong>Tercera Cuota (3 de Diciembre de 2026 - 30% de la Pensión):</strong> $428.260.</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Contenido Pestaña 3: Planes con Descuento (30-40-30) */}
            {tabInversion === 'plan30' && (
              <div className="space-y-3 text-slate-200 text-[11px] animate-fadeIn">
                {prog.esSST && (
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-emerald-500/40 space-y-1">
                    <span className="text-emerald-400 font-bold text-[10px] uppercase block">1. Plan 30-40-30 con el 30% de Descuento (Especial para SST)</span>
                    <p>Aplicado de manera exclusiva para la Tecnología en Gestión de la Seguridad y Salud en el Trabajo (SST).</p>
                    <p><strong>Pensión Regular con Descuento del 30%:</strong> $999.272 (Ahorro de $428.260 sobre la tarifa de lista de $1.427.532).</p>
                    <p><strong>Valor de Contado (Sin Formulario):</strong> $1.050.708 (Pensión con descuento + carné de $38.200 + seguro estudiantil de $13.236; inscripción obsequiada de cortesía).</p>
                    <div className="mt-1 pt-1 border-t border-slate-700">
                      <span className="font-bold text-slate-300 block">Distribución del Plan de Pagos Diferido (0% Interés):</span>
                      <ul className="list-disc list-inside">
                        <li><strong>Pago Inicial (Cuota 1 - 30% de la pensión + Carné + Seguro + Estudio de Crédito de $24.482):</strong> $375.700 (Pago para formalizar e iniciar clases).</li>
                        <li><strong>Segunda Cuota (4 de Noviembre de 2026 - 40% de la pensión):</strong> $399.709.</li>
                        <li><strong>Tercera Cuota (3 de Diciembre de 2026 - 30% de la pensión):</strong> $299.782.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {prog.esIA && (
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-blue-500/40 space-y-1">
                    <span className="text-blue-400 font-bold text-[10px] uppercase block">2. Plan 30-40-30 con el 20% de Descuento (Para Solución de Datos con IA)</span>
                    <p>Aplicado de manera específica para la Tecnología en Solución de Datos con Inteligencia Artificial (IA).</p>
                    <p><strong>Pensión Regular con Descuento del 20%:</strong> $1.121.261 (Ahorro de $280.315 sobre la tarifa de lista de $1.401.576).</p>
                    <p><strong>Valor de Contado (Sin Formulario):</strong> $1.172.697 (Pensión con descuento + carné de $38.200 + seguro estudiantil de $13.236; inscripción obsequiada).</p>
                    <div className="mt-1 pt-1 border-t border-slate-700">
                      <span className="font-bold text-slate-300 block">Distribución del Plan de Pagos Diferido (0% Interés):</span>
                      <ul className="list-disc list-inside">
                        <li><strong>Pago Inicial (Cuota 1 - 30% de la pensión + Carné + Seguro + Estudio de Crédito de $27.471):</strong> $415.285 (Pago para formalizar).</li>
                        <li><strong>Segunda Cuota (4 de Noviembre de 2026 - 40% de la pensión):</strong> $448.504.</li>
                        <li><strong>Tercera Cuota (3 de Diciembre de 2026 - 30% de la pensión):</strong> $336.378.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {!prog.esSST && !prog.esIA && (
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-purple-500/40 space-y-1">
                    <span className="text-purple-400 font-bold text-[10px] uppercase block">3. Plan 30-40-30 con el 20% de Descuento (Para los demás 10 Programas)</span>
                    <p>Aplicado para los programas tradicionales de la institución (Administrativa, Analítica y Big Data, Comercio Exterior, Desarrollo de Software, Gestión Financiera, Logística Internacional, Mercadeo, Producción de Video, Animación Gráfica, Ciberseguridad y Capital Humano).</p>
                    <p><strong>Pensión Regular con Descuento del 20%:</strong> $1.142.026 (Ahorro de $285.506 sobre la tarifa de lista de $1.427.532).</p>
                    <p><strong>Valor de Contado (Sin Formulario):</strong> $1.193.462 (Pensión con descuento + carné de $38.200 + seguro estudiantil de $13.236; inscripción obsequiada).</p>
                    <div className="mt-1 pt-1 border-t border-slate-700">
                      <span className="font-bold text-slate-300 block">Distribución del Plan de Pagos Diferido (0% Interés):</span>
                      <ul className="list-disc list-inside">
                        <li><strong>Pago Inicial (Cuota 1 - 30% de la pensión + Carné + Seguro + Estudio de Crédito de $27.980):</strong> $422.023.</li>
                        <li><strong>Segunda Cuota (4 de Noviembre de 2026 - 40% de la pensión):</strong> $456.810.</li>
                        <li><strong>Tercera Cuota (3 de Diciembre de 2026 - 30% de la pensión):</strong> $342.608.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* COLUMNA 2: Formulario Limpio con el Módulo de Crédito */}
        <section className="lg:col-span-4 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 overflow-y-auto max-h-[850px]">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
            📝 Datos del Aspirante
          </h2>

          <form onSubmit={descargarBlockDeNotas} className="space-y-4 text-xs">
            
            {/* CAMPOS 1 AL 16 */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-blue-400 font-bold uppercase text-[10px] block mb-2">FORMULARIO DE MATRÍCULA 📋</span>

              {/* 1. Nombre Completo */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">1. Nombre Completo: *</label>
                <input required type="text" placeholder="Ingrese nombre completo" value={formData.nombres} onChange={e => setFormData({...formData, nombres: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 2. Tipo: Cedula */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">2. Tipo:</label>
                <input type="text" value={formData.tipoDoc} onChange={e => setFormData({...formData, tipoDoc: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 3. Fecha de nacimiento */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">3. Fecha de nacimiento:</label>
                <input type="date" value={formData.fechaNacimiento} onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 4. Número de Documento */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">4. Número de Documento: *</label>
                <input required type="text" placeholder="Ingrese número de documento" value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* Campo ID adicional */}
              <div className="mb-2">
                <label className="block text-amber-400 mb-1 font-bold">ID:</label>
                <input type="text" placeholder="Ingrese ID" value={formData.idField} onChange={e => setFormData({...formData, idField: e.target.value})} className="w-full bg-slate-900 border border-amber-500/50 rounded-lg p-2 text-white" />
              </div>

              {/* 5. Fecha Expedición cedula */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">5. Fecha Expedición cedula:</label>
                <input type="date" value={formData.fechaExpedicion} onChange={e => setFormData({...formData, fechaExpedicion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 6. Municipio de Expedición */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">6. Municipio de Expedición:</label>
                <input type="text" placeholder="Ej: Bogotá" value={formData.lugarExpedicion} onChange={e => setFormData({...formData, lugarExpedicion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 7. Correo Electrónico */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">7. Correo Electrónico: *</label>
                <input required type="email" placeholder="correo@dominio.com" value={formData.correo} onChange={e => setFormData({...formData, correo: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 8. Celular */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">8. Celular: *</label>
                <input required type="text" placeholder="3000000000" value={formData.celular} onChange={e => setFormData({...formData, celular: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 9. Dirección y Barrio de Residencia */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">9. Dirección y Barrio de Residencia:</label>
                <input type="text" placeholder="Ingrese dirección y barrio" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 10. Estrato Social */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">10. Estrato Social:</label>
                <input type="text" placeholder="Ej: 1, 2, 3..." value={formData.estrato} onChange={e => setFormData({...formData, estrato: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 11. EPS */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">11. EPS:</label>
                <input type="text" placeholder="Nombre de la EPS" value={formData.eps} onChange={e => setFormData({...formData, eps: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 12. Año en que presentaste el ICFES */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">12. Año en que presentaste el ICFES:</label>
                <input type="text" placeholder="Ej: 2012" value={formData.anioBachillerato} onChange={e => setFormData({...formData, anioBachillerato: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 13. Acudiente/Familiar de Referencia */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">13. Acudiente/Familiar de Referencia:</label>
                <input type="text" placeholder="Parentesco o referencia" value={formData.acudienteNombre} onChange={e => setFormData({...formData, acudienteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 14. Nombre (Acudiente) */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">14. Nombre:</label>
                <input type="text" placeholder="Nombre del familiar" value={formData.acudienteNombre} onChange={e => setFormData({...formData, acudienteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 15. Teléfono (Acudiente) */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">15. Teléfono:</label>
                <input type="text" placeholder="Teléfono de referencia" value={formData.acudienteTelefono} onChange={e => setFormData({...formData, acudienteTelefono: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              {/* 16. Electiva */}
              <div className="mb-2">
                <label className="block text-slate-400 mb-1">16. Electiva:</label>
                <input type="text" value={formData.electiva} onChange={e => setFormData({...formData, electiva: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* MÓDULO APARTE: INFORMACIÓN PARA CRÉDITO */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-indigo-500/40">
              <span className="text-indigo-400 font-bold uppercase text-[10px] block mb-2">INFORMACIÓN PARA CRÉDITO 💳</span>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Ocupación:</label>
                <input type="text" placeholder="Ej: Empleado / Independiente" value={formData.ocupacion} onChange={e => setFormData({...formData, ocupacion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Tipo de contrato:</label>
                <input type="text" placeholder="Ej: Indefinido / Prestación de servicios" value={formData.tipoContrato} onChange={e => setFormData({...formData, tipoContrato: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Empresa donde trabajas:</label>
                <input type="text" placeholder="Nombre de la empresa" value={formData.empresaTrabajas} onChange={e => setFormData({...formData, empresaTrabajas: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Dirección de la empresa:</label>
                <input type="text" placeholder="Dirección de la empresa" value={formData.direccionEmpresa} onChange={e => setFormData({...formData, direccionEmpresa: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Teléfono de la empresa:</label>
                <input type="text" placeholder="Teléfono de la empresa" value={formData.telefonoEmpresa} onChange={e => setFormData({...formData, telefonoEmpresa: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Antigüedad en la empresa:</label>
                <input type="text" placeholder="Ej: 1 año" value={formData.antiguedadEmpresa} onChange={e => setFormData({...formData, antiguedadEmpresa: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Salario mensual:</label>
                <input type="text" placeholder="Ej: $1.500.000" value={formData.salarioMensual} onChange={e => setFormData({...formData, salarioMensual: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Otros ingresos (si aplica):</label>
                <input type="text" placeholder="Ej: $0" value={formData.otrosIngresos} onChange={e => setFormData({...formData, otrosIngresos: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="mb-2">
                <label className="block text-slate-400 mb-1">Gastos mensuales:</label>
                <input type="text" placeholder="Ej: $500.000" value={formData.gastosMensuales} onChange={e => setFormData({...formData, gastosMensuales: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* CAMPOS OPERACIONALES ADICIONALES */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-emerald-400 font-bold uppercase text-[10px] block">DATOS DE PAGO Y CIERRE 💳</span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Ciudad:</label>
                  <input type="text" value={formData.ciudad} onChange={e => setFormData({...formData, ciudad: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Sede / Jornada:</label>
                  <input type="text" value={formData.sede} onChange={e => setFormData({...formData, sede: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Valor a pagar Matricula:</label>
                  <input type="text" placeholder="Ej: $375.700" value={formData.valorPagar} onChange={e => setFormData({...formData, valorPagar: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Fecha de pago:</label>
                  <input type="text" placeholder="Ej: Hoy" value={formData.fechaPago} onChange={e => setFormData({...formData, fechaPago: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Medio de pago:</label>
                <input type="text" value={formData.medioPago} onChange={e => setFormData({...formData, medioPago: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Obsequio:</label>
                <input type="text" value={formData.obsequio} onChange={e => setFormData({...formData, obsequio: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg uppercase tracking-wider text-xs"
            >
              {loading ? 'Generando...' : 'Copiar a block de notas'}
            </button>
          </form>
        </section>

        {/* COLUMNA 3: Vista Previa del Proceso Cantado Ajustada */}
        <section className="lg:col-span-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col">
          <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-700 pb-2">
            📋 Proceso Cantado
          </h2>
          <p className="text-[11px] text-slate-400">
            Vista previa exacta del texto del proceso.
          </p>

          <button 
            type="button"
            onClick={copiarAlPortapapeles}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg text-xs uppercase tracking-wider"
          >
            Copiar texto
          </button>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 font-mono text-[11px] text-slate-200 whitespace-pre-wrap h-fit">
            {construirTextoProceso()}
          </div>
        </section>

      </main>
    </div>
  );
}