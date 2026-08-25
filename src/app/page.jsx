'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const BASE_PROGRAMAS = {
  software: {
    nombre: "Tecnólogo en Desarrollo de Software y Aplicativos Móviles",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Desarrollarás competencias para diseñar, programar, dar soporte y mantener soluciones de software, páginas web y aplicativos móviles (Android/iOS).",
    cargos: ["Desarrollador Móvil", "Programador Frontend/Backend", "Analista de Calidad de Software (QA)", "Coordinador de Soporte Informático"],
    certificaciones: "Ofimática (P1), Algoritmia y Pruebas QA",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  ia: {
    nombre: "Tecnólogo en Solución de Datos con Inteligencia Artificial (IA)",
    duracion: "Casi 3 años (9 períodos / 112 créditos)",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero en este mundo digital?",
    perfil: "Serás pionero en la aplicación de modelos inteligentes. Estarás capacitado para estructurar soluciones de datos complejas integrando herramientas de IA.",
    cargos: ["Analista de Datos con IA", "Desarrollador de Modelos Predictivos", "Consultor de Automatización de Procesos con IA"],
    certificaciones: "Ofimática (P1), Diseño de Algoritmos y Modelos Predictivos",
    precioContado: "$752.224",
    ahorro: "$849.788",
    cuotaInicialDirecta: "$268.964",
    cuotasSaldoDirecta: "$268.964"
  },
  sst: {
    nombre: "Tecnólogo en Gestión de la Seguridad y Salud en el Trabajo",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Ya trabajas en el área de seguridad y salud, o te llama la atención liderar la prevención y bienestar en las empresas?",
    perfil: "Te capacitarás para implementar, diseñar, ejecutar y evaluar el SG-SST (Res. 0312/2019). Incluye trámite de Licencia en SST para atender empresas de 10 a 49 empleados.",
    cargos: ["Coordinador de SG-SST", "Inspector de Higiene y Seguridad", "Analista de Riesgos Laborales"],
    certificaciones: "Ofimática (P1), Inspección de Higiene y Licencia SST",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  bigdata: {
    nombre: "Tecnólogo en Gestión de Analítica y Big Data",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Tienes experiencia previa trabajando con tecnología, bases de datos o programación, o estás buscando iniciar de cero?",
    perfil: "Extraerás, prepararás y organizarás datos de múltiples fuentes para encontrar patrones y apoyar la ciencia de datos e inteligencia de negocios.",
    cargos: ["Analista de Datos", "Data Scientist", "Data Visualization Developer"],
    certificaciones: "Ofimática (P1), Excel Avanzado (P2), Visualización de Datos",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  comercio: {
    nombre: "Tecnólogo en Comercio Exterior y Negocios Internacionales",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Tienes algún emprendimiento o experiencia en áreas comerciales, administrativas o logísticas?",
    perfil: "Gestionarás procesos de importación, exportación y logística internacional dominando planeación aduanera y medios de pago.",
    cargos: ["Gestor de Importaciones y Exportaciones", "Analista Aduanero", "Coordinador de Logística Internacional"],
    certificaciones: "Trámite Documentos Aduaneros (P2), Negociador Internacional (P7)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  administracion: {
    nombre: "Tecnólogo en Gestión Administrativa",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Tienes experiencia en áreas administrativas o deseas adquirir estas habilidades para incorporarte al sector corporativo?",
    perfil: "Aprenderás a planear, organizar y controlar procesos tácticos de administración, contabilidad, compras y talento humano.",
    cargos: ["Supervisor Administrativo", "Coordinador de Compras y Almacén", "Analista de Selección"],
    certificaciones: "Procesamiento de Requerimientos (P3), Evaluación de Desempeño (P4)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  mercadeo: {
    nombre: "Tecnólogo en Gestión de Mercadeo y Estrategias Comerciales",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Te consideras una persona creativa y comercial, interesada en aprender a vender de manera digital y posicionar marcas?",
    perfil: "Diseñarás estrategias de posicionamiento de marca, publicidad digital, comportamiento del consumidor y ventas.",
    cargos: ["Coordinador de Mercadeo Digital", "Diseñador de Campañas Publicitarias", "Director de Ventas"],
    certificaciones: "Atención a Clientes (P1), Construcción de Perfiles (P2), Planes de Mercadeo (P7)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  financiera: {
    nombre: "Tecnólogo en Gestión Financiera y Contable",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Tienes experiencia en contabilidad o administración, o te atrae el manejo de presupuestos y finanzas?",
    perfil: "Codificarás, causarás e interpretarás información contable bajo NIIF. Prepararás estados financieros y declaraciones tributarias.",
    cargos: ["Coordinador de Tesorería", "Analista Contable", "Liquidador de Nómina"],
    certificaciones: "MOS Excel (P2), Manejo de Sistemas Contables (P5), Generación de Nómina (P7)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  logistica: {
    nombre: "Tecnólogo en Logística Internacional",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Te interesa la distribución de mercancías, cadena de suministro y gestión de inventarios a gran escala?",
    perfil: "Coordinarás almacenamiento, transporte de carga, aprovisionamiento y distribución física internacional (DFI).",
    cargos: ["Coordinador de Almacenamiento", "Programador de Tráfico", "Supervisor DFI"],
    certificaciones: "Costeo Logístico (P3), Gestión de Inventarios (P4), Plan de Transporte (P8)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  video: {
    nombre: "Tecnólogo en Producción de Video y Animación Gráfica",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Te apasiona la creación de contenidos visuales, contar historias o la edición de video y animación digital?",
    perfil: "Crearás historias visuales de alto impacto produciendo contenido audiovisual y aplicando herramientas de animación digital.",
    cargos: ["Productor Audiovisual", "Animador Digital", "Realizador Multimedia", "Editor de Video"],
    certificaciones: "Diseño Básico y Etapas de Producción (P1)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  capitalhumano: {
    nombre: "Tecnólogo en Gestión de Capital Humano",
    duracion: "2 años y medio (8 períodos / 100 créditos)",
    preguntaFiltro: "¿Te apasiona liderar el bienestar de los trabajadores, la selección de talentos y el crecimiento organizacional?",
    perfil: "Liderarás selección, contratación, nómina, planes de inducción y bienestar laboral bajo normatividad legal.",
    cargos: ["Coordinador de Selección", "Analista de Nómina", "Supervisor de Bienestar Laboral"],
    certificaciones: "Liquidación de Nómina (P6), Perfiles de Cargos (P7), Reclutamiento (P8)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  },
  ciberseguridad: {
    nombre: "Especialización Tecnológica en Ciberseguridad",
    duracion: "1 año (3 cuatrimestres)",
    preguntaFiltro: "¿Tienes experiencia en redes o sistemas y buscas especializarte en hacking ético y protección de datos?",
    perfil: "Protegerás sistemas informáticos, realizarás auditorías de hacking ético y mitigarás ciberataques corporativos.",
    cargos: ["Consultor Hacking Ético", "Auditor de Ciberseguridad", "Administrador de Seguridad de Redes"],
    certificaciones: "Hacking Ético y Ciberseguridad de Sistemas (P1)",
    precioContado: "$765.202",
    ahorro: "$862.766",
    cuotaInicialDirecta: "$269.418",
    cuotasSaldoDirecta: "$256.883"
  }
};

export default function GuionComercial() {
  const [cliente, setCliente] = useState({
    nombre: '',
    documento: '',
    celular: '',
    correo: '',
    programaKey: 'software'
  });

  const [pasoVisual, setPasoVisual] = useState('paso8');
  const [enviando, setEnviando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  const programaActual = BASE_PROGRAMAS[cliente.programaKey];

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleGuardarOrden = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setNotificacion(null);

    const dataToSave = {
      nombre_cliente: cliente.nombre,
      documento: cliente.documento,
      celular: cliente.celular,
      correo: cliente.correo,
      programa_interes: programaActual.nombre,
      fecha_registro: new Date()
    };

    const { error } = await supabase.from('prospectos').insert([dataToSave]);

    setEnviando(false);
    if (error) {
      setNotificacion({ tipo: 'error', text: 'Error en Supabase: ' + error.message });
    } else {
      setNotificacion({ tipo: 'success', text: '¡Orden registrada con éxito para ' + cliente.nombre + '!' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* HEADER DINÁMICO CON PROSPECTO */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-blue-400">Politécnico Internacional</h1>
            <p className="text-xs text-slate-400">Asistente Interactivo de Ventas Virtuales V8</p>
          </div>

          {/* SELECTOR DE PROGRAMA DE INTERÉS */}
          <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700 w-full md:w-auto">
            <span className="text-xs font-bold text-amber-400 whitespace-nowrap"> Le interesa:</span>
            <select
              name="programaKey"
              value={cliente.programaKey}
              onChange={handleChangeCliente}
              className="bg-slate-900 text-white font-medium text-sm p-1.5 rounded-lg border border-slate-700 focus:ring-2 focus:ring-blue-500 w-full"
            >
              {Object.keys(BASE_PROGRAMAS).map((key) => (
                <option key={key} value={key}>
                  {BASE_PROGRAMAS[key].nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* DASHBOARD PRINCIPAL */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* COLUMNA IZQUIERDA: INFORMACIÓN PERSONALIZADA SEGÚN EL PROGRAMA SELECCIONADO */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* BANNER DINÁMICO DEL PROGRAMA */}
          <div className="bg-gradient-to-r from-blue-900/60 to-slate-900 border border-blue-500/30 p-5 rounded-2xl shadow-xl">
            <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold">Ficha Comercial Activa</span>
            <h2 className="text-xl font-black text-white mt-1">{programaActual.nombre}</h2>
            <p className="text-sm text-slate-300 mt-1">⏳ <strong>Duración:</strong> {programaActual.duracion}</p>
          </div>

          {/* BOTONES DE NAVEGACIÓN RÁPIDA POR PASOS */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            <button 
              onClick={() => setPasoVisual('paso8')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${pasoVisual === 'paso8' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              1. Pregunta Filtro
            </button>
            <button 
              onClick={() => setPasoVisual('paso9')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${pasoVisual === 'paso9' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              2. Perfil y Cargos
            </button>
            <button 
              onClick={() => setPasoVisual('paso10')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${pasoVisual === 'paso10' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              3. Certificaciones
            </button>
            <button 
              onClick={() => setPasoVisual('paso12')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${pasoVisual === 'paso12' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              4. Cierre & Precios
            </button>
          </div>

          {/* TARJETA DINÁMICA CON INFORMACIÓN ADAPTADA AL CLIENTE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 min-h-[300px]">
            
            {pasoVisual === 'paso8' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">Paso 8: Pregunta Filtro sugerida</h3>
                <p className="text-base italic bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
                  "{programaActual.preguntaFiltro}"
                </p>
                <p className="text-xs text-slate-400">Escucha activamente la respuesta del aspirante y valida su motivación antes de pasar al perfil profesional.</p>
              </div>
            )}

            {pasoVisual === 'paso9' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide">Paso 9: Perfil Profesional & Empleabilidad</h3>
                <p className="text-sm text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">{programaActual.perfil}</p>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-2">Cargos donde se desempeñará:</h4>
                  <div className="flex flex-wrap gap-2">
                    {programaActual.cargos.map((cargo, idx) => (
                      <span key={idx} className="bg-blue-950 text-blue-300 text-xs px-3 py-1.5 rounded-lg border border-blue-800/50">
                        💼 {cargo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {pasoVisual === 'paso10' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wide">Paso 10: Certificaciones Parciales (Sin costo)</h3>
                <p className="text-xs text-slate-300">Explícale al aspirante que obtendrá títulos intermedios a medida que aprueba materias para actualizar su hoja de vida:</p>
                <div className="bg-purple-950/40 border border-purple-800/40 p-4 rounded-xl text-purple-200 text-sm font-medium">
                  📜 {programaActual.certificaciones}
                </div>
              </div>
            )}

            {pasoVisual === 'paso12' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">Paso 12: Inversión con Descuento del 50%</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Opción Contado */}
                  <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-emerald-400 block">Opción Contado</span>
                    <span className="text-2xl font-black text-white">{programaActual.precioContado}</span>
                    <span className="text-xs text-emerald-300 block">¡Ahorras {programaActual.ahorro} en la pensión!</span>
                  </div>

                  {/* Opción Financiación Directa 0% */}
                  <div className="bg-slate-950 border border-blue-500/30 p-4 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-blue-400 block">Financiación Directa (0% Interés)</span>
                    <span className="text-2xl font-black text-white">Hoy {programaActual.cuotaInicialDirecta}</span>
                    <span className="text-xs text-slate-400 block">Saldo en 2 cuotas de {programaActual.cuotasSaldoDirecta} (Sep 16 y Oct 19).</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* COLUMNA DERECHA: REGISTRO DEL CLIENTE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl h-fit">
          <h2 className="text-base font-bold text-white mb-1">Datos del Cliente</h2>
          <p className="text-xs text-slate-400 mb-4">Ingresa la información durante la llamada para generar la orden.</p>

          {notificacion && (
            <div className={`p-3 rounded-lg text-xs mb-4 ${notificacion.tipo === 'success' ? 'bg-emerald-950 text-emerald-200 border border-emerald-800' : 'bg-red-950 text-red-200 border border-red-800'}`}>
              {notificacion.text}
            </div>
          )}

          <form onSubmit={handleGuardarOrden} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Nombre Completo *</label>
              <input 
                required 
                type="text" 
                name="nombre" 
                value={cliente.nombre} 
                onChange={handleChangeCliente} 
                placeholder="Ej. Juan Pérez" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Cédula / Documento *</label>
              <input 
                required 
                type="text" 
                name="documento" 
                value={cliente.documento} 
                onChange={handleChangeCliente} 
                placeholder="10203040" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Celular *</label>
                <input 
                  required 
                  type="tel" 
                  name="celular" 
                  value={cliente.celular} 
                  onChange={handleChangeCliente} 
                  placeholder="3001234567" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Correo *</label>
                <input 
                  required 
                  type="email" 
                  name="correo" 
                  value={cliente.correo} 
                  onChange={handleChangeCliente} 
                  placeholder="juan@email.com" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={enviando}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-emerald-900/30 text-sm flex justify-center items-center"
            >
              {enviando ? 'Guardando...' : 'Generar Orden de Matrícula'}
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}