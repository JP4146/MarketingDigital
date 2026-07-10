import { useState, useEffect } from "react";
import { DollarSign, ShieldAlert, ShoppingBag, TrendingUp, RefreshCw, Shirt } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";

export default function DashboardTab() {
  const [metrics, setMetrics] = useState({
    ingresosRecaudados: 0,
    garantiasRetenidas: 0,
    prendasAlquiladas: 0,
    totalPrendasCatalogo: 0 // <-- Nueva métrica añadida para el stock real
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardMetrics = async () => {
    try {
      setLoading(true);
      
      // 1. Consultamos los alquileres usando estrictamente las columnas existentes en tu BD
      const { data: alquileres, error: alquileresError } = await supabase
        .from("alquileres")
        .select("total_pago, garantia_dejada, estado");

      if (alquileresError) throw alquileresError;

      // 2. Consultamos el conteo total de prendas registradas en el catálogo
      const { count: totalPrendas, error: catalogoError } = await supabase
        .from("productos_catalogo")
        .select("*", { count: "exact", head: true });

      if (catalogoError) throw catalogoError;

      let recaudado = 0;
      let garantias = 0;
      let alquiladasActivas = 0;

      if (alquileres) {
        alquileres.forEach((alq) => {
          // Si el alquiler no está cancelado, sumamos el ingreso
          if (alq.estado !== "cancelado") {
            recaudado += alq.total_pago || 0;
          }
          
          // Sumamos el total de garantías dejadas en tienda
          garantias += alq.garantia_dejada || 0;
          
          // Consideramos prendas activas aquellas con estado "entregado", "en_uso" o "reservado"
          if (alq.estado === "entregado" || alq.estado === "en_uso" || alq.estado === "reservado") {
            alquiladasActivas++;
          }
        });
      }

      setMetrics({
        ingresosRecaudados: recaudado,
        garantiasRetenidas: garantias,
        prendasAlquiladas: alquiladasActivas,
        totalPrendasCatalogo: totalPrendas || 0 // <-- Asignamos el valor real de la base de datos
      });

    } catch (err) {
      console.error("Error calculando métricas del panel:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Título de la pestaña y botón de refresco */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Panel General de Control</h2>
          <p className="text-sm text-slate-500">Métricas clave financieras y operativas del negocio en tiempo real.</p>
        </div>
        <button
          onClick={fetchDashboardMetrics}
          disabled={loading}
          className="flex items-center gap-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors font-medium border border-slate-200"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Actualizando..." : "Refrescar datos"}
        </button>
      </div>

      {/* Tarjetas de Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Tarjeta 1: Ingresos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dinero en Caja</span>
            <h3 className="text-2xl font-black text-slate-800">S/ {metrics.ingresosRecaudados.toFixed(2)}</h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Total por alquileres activos
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Tarjeta 2: Garantías */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Garantías en Tienda</span>
            <h3 className="text-2xl font-black text-amber-700">S/ {metrics.garantiasRetenidas.toFixed(2)}</h3>
            <p className="text-xs text-amber-600 font-medium">Monto en depósito prendario</p>
          </div>
          <div className="bg-amber-50 text-amber-700 p-4 rounded-xl">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>

        {/* Tarjeta 3: Prendas Alquiladas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Flujo de Prendas</span>
            <h3 className="text-2xl font-black text-blue-800">{metrics.prendasAlquiladas} prendas</h3>
            <p className="text-xs text-blue-600 font-medium">Reservadas / En uso / Entregadas</p>
          </div>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        {/* Tarjeta 4: Total Prendas Catálogo (¡ACTUALIZADO!) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Prenda Stock</span>
            <h3 className="text-2xl font-black text-slate-800">{metrics.totalPrendasCatalogo} diseños</h3>
            <p className="text-xs text-slate-500 font-medium">Prendas registradas en catálogo</p>
          </div>
          <div className="bg-amber-50 text-amber-600 p-4 rounded-xl">
            <Shirt className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Análisis Proporcional Visual */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-800 mb-4">Análisis Proporcional Financiero</h4>
        {loading ? (
          <div className="h-24 flex items-center justify-center text-slate-400 text-xs">Cargando gráfico...</div>
        ) : metrics.ingresosRecaudados + metrics.garantiasRetenidas === 0 ? (
          <div className="h-24 flex items-center justify-center text-slate-400 text-xs">Sin transacciones económicas registradas.</div>
        ) : (
          <div className="space-y-4">
            <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${(metrics.ingresosRecaudados / (metrics.ingresosRecaudados + metrics.garantiasRetenidas)) * 100}%` }} 
                className="bg-emerald-500 h-full transition-all" 
                title="Caja Alquileres"
              />
              <div 
                style={{ width: `${(metrics.garantiasRetenidas / (metrics.ingresosRecaudados + metrics.garantiasRetenidas)) * 100}%` }} 
                className="bg-amber-500 h-full transition-all" 
                title="Fondos de Garantía"
              />
            </div>
            <div className="flex gap-6 justify-center text-xs font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-slate-600">Alquileres ({((metrics.ingresosRecaudados / (metrics.ingresosRecaudados + metrics.garantiasRetenidas)) * 100).toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-slate-600">Garantías Retenidas ({((metrics.garantiasRetenidas / (metrics.ingresosRecaudados + metrics.garantiasRetenidas)) * 100).toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}