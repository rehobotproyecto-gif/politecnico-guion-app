'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const PROGRAMAS_DATOS = {
  software: {
    nombre: "TG DESARROLLO DE SOFTWARE Y APLICATIVOS MÓVILES",
    nombreLargo: "Tecnología Virtual en Desarrollo de Software y Aplicativos Móviles",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Desarrollarás competencias para diseñar, programar, dar soporte y mantener soluciones de software, páginas web y aplicativos móviles (Android/iOS), garantizando estándares de calidad internacional en el control de la información.",
    cargos: "Desarrollador Móvil, Programador Frontend/Backend, Analista de Calidad de Software (QA), Coordinador de Soporte Informático, Administrador de Bases de Datos.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  ia: {
    nombre: "TG GESTIÓN DE SOLUCIONES DE DATOS CON IA",
    nombreLargo: "Tecnología en Gestión de Soluciones de Datos con Inteligencia Artificial",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Serás pionero en la aplicación de modelos inteligentes. Estarás capacitado para estructurar soluciones de datos complejas integrando herramientas de IA para optimizar procesos comerciales, financieros y tecnológicos.",
    cargos: "Analista de Datos con IA, Desarrollador de Modelos Predictivos, Consultor de Automatización de Procesos con IA, Gestor de Soluciones Tecnológicas Inteligentes.",
    precioLista: "$1.602.012",
    desgloseLista: "Pensión de $1.401.576 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.453.012",
    tipoPlan: "ia",
    pensionDescuento: "$1.121.261",
    ahorroDescuento: "$280.315",
    porcentajeDescuento: "20%",
    valorContado: "$1.172.697",
    cuota1_desc: "$415.285",
    cuota2_desc: "$448.504",
    cuota3_desc: "$336.378",
    cuota1_std: "$506.247",
    cuota2_std: "$560.630",
    cuota3_std: "$420.473"
  },
  sst: {
    nombre: "TG SEGURIDAD Y SALUD EN EL TRABAJO",
    nombreLargo: "Tecnología en Gestión de la Seguridad y Salud en el Trabajo",
    preguntaFiltro: "¿Ya trabajas en el área de seguridad y salud, o te llama la atención liderar la prevención y bienestar en las empresas para proteger la vida de los trabajadores?",
    perfil: "Te capacitarás para implementar, diseñar, ejecutar y evaluar el SG-SST bajo las normativas vigentes (Res 0312/2019 y 0908/2025). Al graduarte recibirás tu LICENCIA EN SST para atender empresas de 10 a 49 empleados en riesgos I, II y III.",
    cargos: "Coordinador de SG-SST, Inspector de Higiene y Seguridad Industrial, Analista de Riesgos Laborales, Capacitador en Prevención.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "sst",
    pensionDescuento: "$999.272",
    ahorroDescuento: "$428.260",
    porcentajeDescuento: "30%",
    valorContado: "$1.050.708",
    cuota1_desc: "$375.700",
    cuota2_desc: "$399.709",
    cuota3_desc: "$299.782",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  bigdata: {
    nombre: "TG GESTIÓN DE ANALÍTICA Y BIG DATA",
    nombreLargo: "Tecnólogo en Gestión de Analítica y Big Data",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Aprenderás a extraer, preparar y organizar datos provenientes de múltiples fuentes, encontrando patrones, tendencias y comportamientos para apoyar la ciencia de datos, BI o procesamiento de información.",
    cargos: "Arquitecto de Datos, Administrador de Datos, Desarrollador de Datos, Ingeniero de Datos, Analista de Datos, Data Scientist, Data Visualization Developer.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  comercio: {
    nombre: "TG COMERCIO Y NEGOCIOS INTERNACIONALES",
    nombreLargo: "Tecnología Virtual en Comercio Exterior y Negocios Internacionales",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Serás capaz de gestionar procesos de importación, exportación y logística de mercancías a nivel nacional e internacional, dominando la planeación aduanera, documentos, costos y medios de pago.",
    cargos: "Gestor de Importaciones y Exportaciones, Analista aduanero, Coordinador de Logística Internacional, Diseñador de Proyectos Transfronterizos.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  logistica: {
    nombre: "TG GESTIÓN LOGÍSTICA INTERNACIONAL",
    nombreLargo: "Tecnología en Gestión Logística Internacional",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Coordinarás y supervisarás procesos clave de almacenamiento, planeación de transporte de carga, aprovisionamiento y la Distribución Física Internacional (DFI).",
    cargos: "Coordinador de Almacenamiento y Bodegas, Programador de Tráfico y Transporte, Supervisor de DFI, Analista de Aprovisionamiento.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  admin: {
    nombre: "TG GESTIÓN ADMINISTRATIVA",
    nombreLargo: "Tecnología en Gestión Administrativa",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Aprenderás a planear, organizar, direccionar y controlar procesos tácticos de las áreas administrativa, contable, cadena de abastecimiento y gestión del talento humano.",
    cargos: "Supervisor Administrativo, Coordinador de Compras, Analista de Selección, Coordinador de Gestión Documental.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  financiera: {
    nombre: "TG GESTIÓN FINANCIERA Y CONTABLE",
    nombreLargo: "Tecnología en Gestión Financiera y Contable",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas, o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Te prepararás para registrar, causar, interpretar y auditar información contable bajo NIIF. Elaboración de estados financieros, nóminas, flujos de caja e impuestos (IVA, Renta, ICA).",
    cargos: "Coordinador de Tesorería, Analista Contable, Analista Financiero, Liquidador de Nómina, Gestor de Impuestos.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  },
  mercadeo: {
    nombre: "TG GESTIÓN DE MERCADEO Y ESTRATEGIAS COMERCIALES",
    nombreLargo: "Tecnología en Gestión de Mercadeo y Estrategias Comerciales",
    preguntaFiltro: "¿Te consideras una persona creativa y comercial, interesada en aprender a vender de manera digital y posicionar marcas en redes sociales?",
    perfil: "Aprenderás a coordinar y controlar procesos de mercadeo digital y offline. Diseñarás estrategias de posicionamiento de marca, publicidad, comportamiento del consumidor y fidelización.",
    cargos: "Coordinador de Mercadeo Digital, Diseñador de Campañas Publicitarias, Analista Social Media, Director de Ventas.",
    precioLista: "$1.627.968",
    desgloseLista: "Pensión de $1.427.532 + inscripción de $149.000 + carnet de $38.200 + seguro de $13.236",
    precioSinFormulario: "$1.478.968",
    tipoPlan: "general",
    pensionDescuento: "$1.142.026",
    ahorroDescuento: "$285.506",
    porcentajeDescuento: "20%",
    valorContado: "$1.193.462",
    cuota1_desc: "$422.023",
    cuota2_desc: "$456.810",
    cuota3_desc: "$342.608",
    cuota1_std: "$514.670",
    cuota2_std: "$571.013",
    cuota3_std: "$428.260"
  }
};

export default function Home() {
  const [progKey, setProgKey] = useState('software');
  const [loading, setLoading] = useState(false);
  const [asesor, setAsesor] = useState('');
  const [campaña, setCampaña] = useState('');

  const prog = PROGRAMAS_DATOS[progKey];

  // Formulario extendido con todos los campos solicitados para el segundo formulario / base de datos
  const [formData, setFormData] = useState({
    // Datos Personales
    nombres: '',
    fechaNacimiento: '',
    tipoDoc: 'Cédula de Ciudadanía',
    documento: '',
    fechaExpedicion: '',
    lugarExpedicion: '',
    eps: '',
    estadoCivil: '',
    
    // Ubicación
    ciudad: '',
    departamento: '',
    direccion: '',
    estrato: '',
    
    // Información de Contacto (mapeadas también al proceso cantado)
    celular: '',
    correo: '',
    
    // Estudios
    anioBachillerato: '',
    pruebasIcfes: 'Sí',
    
    // Acudiente o Emergencia
    acudienteNombre: '',
    acudienteParentesco: '',
    acudienteTelefono: '',
    
    // Datos operacionales de pago / matrícula (para el proceso cantado)
    sede: 'Virtual',
    jornada: 'Virtual',
    valorPagar: '',
    fechaPago: '',
    medioPago: 'PSE',
    electiva: '',
    obsequio: '',
    menciones: ''
  });

  const construirTextoProceso = () => {
    const infoAsesorCampaña = [asesor || '---', campaña ? `${campaña}` : '']
      .filter(Boolean)
      .join(' - ');

    return `PROCESO DE MATRICULA - ${infoAsesorCampaña}
Nombre:    ${formData.nombres || '---'}
Cédula:   ${formData.documento || '---'}
Celular:  ${formData.celular || '---'}
Correo: ${formData.correo || '---'}
Ciudad:  ${formData.ciudad || '---'}
Sede:  ${formData.sede}
Programa:    ${prog.nombre}
Jornada:  ${formData.jornada}
Valor a pagar Matricula:    ${formData.valorPagar || '---'}
Fecha de pago:  ${formData.fechaPago || '---'}
Medio de pago: ${formData.medioPago}
Electiva:  ${formData.electiva || '---'}
Obsequio ${formData.obsequio || '---'}

Buenos dias Me ayudas corriendo el proceso por favor, muchas gracias

${formData.menciones}`;
  };

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(construirTextoProceso());
    alert('¡Proceso cantado copiado al portapapeles!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      programa_interes: prog.nombreLargo,
      asesor: asesor,
      campaña: campaña,
      proceso_cantado_texto: construirTextoProceso(),
      fecha_registro: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from('prospectos').insert([payload]);
      if (error) throw error;
      copiarAlPortapapeles();
      alert('¡Guardado en Supabase y copiado al portapapeles!');
    } catch (err) {
      console.error(err);
      copiarAlPortapapeles();
      alert('Copiado al portapapeles.');
    } finally {
      setLoading(false);
    }
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
              placeholder="Ej: Jhojan Torres"
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

      {/* Estructura Principal en 3 Columnas */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA 1: Guión Comercial y Módulo de Planes de Inversión (5/12) */}
        <section className="lg:col-span-5 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 text-xs overflow-y-auto max-h-[850px] pr-2">
          <h2 className="text-base font-bold text-blue-400 flex items-center gap-2 border-b border-slate-700 pb-2">
            ℹ️ Guión & Módulo de Planes de Inversión
          </h2>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-blue-400 font-bold block text-[11px] uppercase">1. Saludo Inicial & Enfoque</span>
            <p className="text-slate-200">"¡Hola! Muy buenos días/tardes. Te saluda <strong className="text-white">{asesor || '[Tu Nombre]'}</strong>, asesor de admisiones del <strong>Politécnico Internacional</strong>. Es un gusto saludarte hoy."</p>
            <p className="text-slate-300 italic">"¿Tengo el gusto de hablar con <strong>{formData.nombres || '[Nombre Aspirante]'}</strong>?"</p>
            <p className="text-slate-200">"Te contacto porque recibimos tus datos para información sobre el programa <strong className="text-blue-300">{prog.nombreLargo}</strong>, ¿correcto? Primero quiero contarte que en el Politécnico impulsamos el plan de vida de cada estudiante enfocado hacia el <strong>emprendimiento y la empleabilidad independiente</strong>."</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-emerald-400 font-bold block text-[11px] uppercase">2. Requisitos de Ingreso</span>
            <p className="text-slate-200">"Para formalizar tu ingreso los requisitos son sumamente sencillos: <strong>Fotocopia de tu documento</strong>, <strong>Acta o Diploma de bachiller</strong> y tus pruebas <strong>ICFES (Saber 11)</strong>. ¿Cuentas con ellos?"</p>
            <div className="bg-slate-800 p-2 rounded text-[11px] text-amber-300 border border-amber-500/30 mt-1">
              💡 <strong>Tip de Venta:</strong> Si no tiene ICFES a la mano, firmamos un compromiso digital para presentarlo el próximo corte y arranca a estudiar de una vez.
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-purple-400 font-bold block text-[11px] uppercase">3. Pregunta Filtro (Escucha Activa)</span>
            <p className="text-slate-200 italic font-medium">"{prog.preguntaFiltro}"</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-cyan-400 font-bold block text-[11px] uppercase">4. Perfil Profesional & Campo Laboral</span>
            <p className="text-slate-300 leading-relaxed"><strong className="text-white">Perfil:</strong> {prog.perfil}</p>
            <p className="text-slate-300"><strong className="text-white">Cargos donde te desempeñarás:</strong> {prog.cargos}</p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-indigo-400 font-bold block text-[11px] uppercase">5. Modalidad 100% Virtual</span>
            <p className="text-slate-200">"Plataforma Moodle 24/7. Le dedicas de 1 a 2 horas diarias a tu acomodo. Tenemos encuentros sincrónicos una vez por semana (6:00 pm al cierre), pero si no puedes conectarte en vivo <strong>NO afecta tus notas</strong>; quedan 100% grabadas."</p>
          </div>

          {/* MÓDULO DE PLANES DE INVERSIÓN */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-3">
            <span className="text-emerald-400 font-bold block text-[11px] uppercase border-b border-slate-800 pb-1">
              💰 Módulo Planes de Inversión y Cierre
            </span>

            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50 space-y-1">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Paso A: Valor Total de Lista (Sin Beneficios)</span>
              <p className="text-slate-300 text-[11px]">"La inversión regular por periodo con todos los conceptos ({prog.desgloseLista}) es de <strong className="text-white">{prog.precioLista}</strong>."</p>
            </div>

            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50 space-y-1">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Paso B: Descontando la Inscripción</span>
              <p className="text-slate-300 text-[11px]">"Pero, como estamos en proceso de cierre inmediato y quiero apoyarte para que inicies ya, el día de hoy <strong>te voy a obsequiar el 100% del formulario de inscripción</strong> (te ahorras $149.000)."</p>
              <p className="text-emerald-300 font-semibold text-[11px]">Valor con inscripción obsequiada: {prog.precioSinFormulario}</p>
            </div>

            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 space-y-1">
              <span className="font-bold text-slate-300 block text-[11px]">📌 Opción Estándar (Sin Descuento en Pensión)</span>
              <ul className="list-disc list-inside text-slate-200 text-[10px]">
                <li><strong>Pago Inicial:</strong> {prog.cuota1_std}</li>
                <li><strong>Segunda Cuota (4 Nov):</strong> {prog.cuota2_std}</li>
                <li><strong>Tercera Cuota (3 Dic):</strong> {prog.cuota3_std}</li>
              </ul>
            </div>

            <div className="bg-slate-800 p-2.5 rounded-lg border border-emerald-500/40 space-y-1">
              <span className="font-bold text-emerald-400 block text-[11px]">
                🔥 Plan Especial con {prog.porcentajeDescuento} de Descuento
              </span>
              <p className="text-slate-300 text-[10px]">Pensión con Descuento: <strong className="text-white">{prog.pensionDescuento}</strong> (Ahorro de {prog.ahorroDescuento})</p>
              <p className="text-emerald-300 text-[10px] font-semibold">Valor de Contado: {prog.valorContado}</p>
              <ul className="list-disc list-inside text-slate-200 text-[10px] mt-1">
                <li><strong>Pago Inicial:</strong> {prog.cuota1_desc}</li>
                <li><strong>Segunda Cuota (4 Nov):</strong> {prog.cuota2_desc}</li>
                <li><strong>Tercera Cuota (3 Dic):</strong> {prog.cuota3_desc}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COLUMNA 2: Formulario Completo de Datos del Aspirante (Centro 4/12) */}
        <section className="lg:col-span-4 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 overflow-y-auto max-h-[850px]">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
            📝 Datos del Aspirante
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* DATOS PERSONALES */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-blue-400 font-bold uppercase text-[10px] block">DATOS PERSONALES ✅</span>
              
              <div>
                <label className="block text-slate-400 mb-1">Nombre completo: *</label>
                <input required type="text" placeholder="Ej: Ana María Gómez" value={formData.nombres} onChange={e => setFormData({...formData, nombres: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Fecha de nacimiento:</label>
                <input type="date" value={formData.fechaNacimiento} onChange={e => setFormData({...formData, fechaNacimiento: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Tipo Doc</label>
                  <input type="text" value={formData.tipoDoc} onChange={e => setFormData({...formData, tipoDoc: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Número de documento: *</label>
                  <input required type="text" placeholder="Ej: 10203040" value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Fecha de expedición:</label>
                  <input type="date" value={formData.fechaExpedicion} onChange={e => setFormData({...formData, fechaExpedicion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Lugar de expedición:</label>
                  <input type="text" placeholder="Ej: Bogotá" value={formData.lugarExpedicion} onChange={e => setFormData({...formData, lugarExpedicion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">EPS a la que estas afiliado:</label>
                  <input type="text" placeholder="Ej: Sura, Sanitas" value={formData.eps} onChange={e => setFormData({...formData, eps: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Estado civil:</label>
                  <input type="text" placeholder="Ej: Soltero/a" value={formData.estadoCivil} onChange={e => setFormData({...formData, estadoCivil: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            </div>

            {/* UBICACIÓN */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-emerald-400 font-bold uppercase text-[10px] block">UBICACIÓN 📍</span>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Ciudad de residencia: *</label>
                  <input required type="text" placeholder="Ej: Bogotá D.C." value={formData.ciudad} onChange={e => setFormData({...formData, ciudad: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Departamento:</label>
                  <input type="text" placeholder="Ej: Cundinamarca" value={formData.departamento} onChange={e => setFormData({...formData, departamento: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Dirección de residencia:</label>
                <input type="text" placeholder="Ej: Calle 100 # 15-20" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Estrato social:</label>
                <input type="text" placeholder="Ej: 3" value={formData.estrato} onChange={e => setFormData({...formData, estrato: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* INFORMACIÓN */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-purple-400 font-bold uppercase text-[10px] block">INFORMACIÓN 📄</span>
              
              <div>
                <label className="block text-slate-400 mb-1">Correo: *</label>
                <input required type="email" placeholder="correo@ejemplo.com" value={formData.correo} onChange={e => setFormData({...formData, correo: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Teléfono celular: *</label>
                <input required type="text" placeholder="Ej: 3001234567" value={formData.celular} onChange={e => setFormData({...formData, celular: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* ESTUDIOS */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-cyan-400 font-bold uppercase text-[10px] block">ESTUDIOS 📚</span>
              
              <div>
                <label className="block text-slate-400 mb-1">Año que finalizaste el bachillerato:</label>
                <input type="text" placeholder="Ej: 2020" value={formData.anioBachillerato} onChange={e => setFormData({...formData, anioBachillerato: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Presentaste pruebas icfes:</label>
                <input type="text" placeholder="Ej: Sí / No" value={formData.pruebasIcfes} onChange={e => setFormData({...formData, pruebasIcfes: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* ACUDIENTE O CONTACTO DE EMERGENCIA */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-amber-400 font-bold uppercase text-[10px] block">ACUDIENTE O CONTACTO DE EMERGENCIA 👩‍👦</span>
              
              <div>
                <label className="block text-slate-400 mb-1">Nombre:</label>
                <input type="text" placeholder="Ej: María Pérez" value={formData.acudienteNombre} onChange={e => setFormData({...formData, acudienteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Parentesco:</label>
                <input type="text" placeholder="Ej: Madre / Hermano" value={formData.acudienteParentesco} onChange={e => setFormData({...formData, acudienteParentesco: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Teléfono:</label>
                <input type="text" placeholder="Ej: 3109876543" value={formData.acudienteTelefono} onChange={e => setFormData({...formData, acudienteTelefono: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>
            </div>

            {/* DATOS DE MATRÍCULA Y PAGO (Operativos) */}
            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-indigo-400 font-bold uppercase text-[10px] block">DATOS DE PAGO Y MATRÍCULA 💳</span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Valor a Pagar</label>
                  <input type="text" placeholder="Ej: 422.023" value={formData.valorPagar} onChange={e => setFormData({...formData, valorPagar: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-emerald-400 font-bold" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Fecha de Pago</label>
                  <input type="text" placeholder="Ej: 05/09/2026" value={formData.fechaPago} onChange={e => setFormData({...formData, fechaPago: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Medio de Pago</label>
                  <select value={formData.medioPago} onChange={e => setFormData({...formData, medioPago: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white">
                    <option>PSE</option>
                    <option>Tarjeta de Crédito</option>
                    <option>Financiación Directa (30-40-30)</option>
                    <option>Finky</option>
                    <option>Valcredit</option>
                    <option>Cesantías</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Electiva Elegida</label>
                  <input type="text" placeholder="Ej: Marketing" value={formData.electiva} onChange={e => setFormData({...formData, electiva: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Obsequios / Beneficios</label>
                <input type="text" placeholder="Ej: Formulario + Beca 20%" value={formData.obsequio} onChange={e => setFormData({...formData, obsequio: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Menciones / Copias</label>
                <input type="text" placeholder="Ej: @~Usuario" value={formData.menciones} onChange={e => setFormData({...formData, menciones: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-400" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-xs uppercase tracking-wider mt-2"
            >
              {loading ? 'Procesando...' : '🚀 Guardar y Copiar Proceso Cantado'}
            </button>
          </form>
        </section>

        {/* COLUMNA 3: Vista Previa Proceso Cantado (Derecha 3/12) - Intacto */}
        <section className="lg:col-span-3 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
              <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>📋</span> Proceso Cantado
              </h2>
              <button 
                onClick={copiarAlPortapapeles}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition flex items-center gap-1"
              >
                📋 Copiar
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-emerald-300 leading-relaxed whitespace-pre-wrap select-all max-h-[640px] overflow-y-auto">
              {construirTextoProceso()}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 text-center">
            ✅ Plantilla optimizada para canal de WhatsApp / Teams.
          </div>
        </section>

      </main>
    </div>
  );
}