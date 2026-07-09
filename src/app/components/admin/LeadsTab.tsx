import { useState, useEffect } from "react";
import { Users, RefreshCw, CheckCircle2, Search, UserCheck, DollarSign } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface LeadsTabProps {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export default function LeadsTab({ refreshTrigger, triggerRefresh }: LeadsTabProps) {
  const [alquileres, setAlquileres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para la consulta de RENIEC integrada
  const [dniBusqueda, setDniBusqueda] = useState("");
  const [consultandoDni, setConsultandoDni] = useState(false);
  const [resultadoReniec, setResultadoReniec] = useState<string | null>(null);

  // Cargar registros de alquileres/leads desde Supabase
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("alquileres")
        .select("*")
        .order("fecha_reserva", { ascending: false }); // Usando columna real fecha_reserva

      if (error) throw error;
      setAlquileres(data || []);
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  // 🔍 FUNCIÓN CONSULTAR API RENIEC
  const handleConsultarReniec = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dniBusqueda.length !== 8 || isNaN(Number(dniBusqueda))) {
      alert("Por favor, ingresa un número de DNI válido de 8 dígitos.");
      return;
    }

    try {
      setConsultandoDni(true);
      setResultadoReniec(null);

      const response = await fetch(`https://api.apisperu.net/v1/dni?numero=${dniBusqueda}`);
      
      if (!response.ok) {
        throw new Error("No se pudo conectar con el servicio de RENIEC.");
      }

      const data = await response.json();

      if (data && data.nombres) {
        const nombreCompleto = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        setResultadoReniec(nombreCompleto);
      } else {
        setResultadoReniec("DNI no encontrado o error en el padrón.");
      }
    } catch (err) {
      console.error("Error consultando RENIEC:", err);
      setResultadoReniec("Servicio de RENIEC no disponible temporalmente.");
    } finally {
      setConsultandoDni(false);
    }
  };

  // Actualizar estado del alquiler
  const handleUpdateStatus = async (id: string, nextStatus: string) => {
    try {
      const { error } = await supabase
        .from("alquileres")
        .update({ estado: nextStatus }) // estado_alquiler -> estado
        .eq("id", id);

      if (error) throw error;
      triggerRefresh();
      fetchLeads();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  // Registrar un reajuste o actualización del precio total acordado
  const handleUpdatePayment = async (item: any) => {
    const amountStr = prompt(`Actualizar monto total para ${item.cliente_nombre}.\nMonto actual: S/ ${item.total_pago || 0}\n\nIngresa el nuevo monto total:`);
    if (!amountStr || isNaN(Number(amountStr))) return;

    const newTotal = Number(amountStr);
    if (newTotal < 0) {
      alert("Monto inválido.");
      return;
    }

    try {
      const { error } = await supabase
        .from("alquileres")
        .update({ total_pago: newTotal }) // total -> total_pago
        .eq("id", item.id); // CORREGIDO AQUÍ: id cambiado por item.id

      if (error) throw error;
      triggerRefresh();
      fetchLeads();
    } catch (err) {
      console.error("Error al registrar el monto:", err);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "solicitado": case "reservado": return "bg-blue-50 text-blue-700 border-blue-200";
      case "confirmado": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "entregado": case "en_uso": return "bg-amber-50 text-amber-700 border-amber-200";
      case "devuelto": case "finalizado": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelado": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cabecera */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Solicitudes Web y Alquileres</h2>
          <p className="text-sm text-slate-500">Monitorea los prospectos que entran de la web, gestiona estados y verifica identidades.</p>
        </div>
        <Button variant="outline" onClick={fetchLeads} disabled={loading} className="border-slate-200">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* 🛡️ SECCIÓN: CONSULTA RÁPIDA DE DNI (RENIEC) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-amber-600" />
            Verificador de Identidad RENIEC
          </h3>
          <p className="text-xs text-slate-400 font-light">Consulta el DNI del cliente antes de entregar las prendas.</p>
        </div>
        
        <form onSubmit={handleConsultarReniec} className="flex gap-2 md:col-span-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              maxLength={8}
              placeholder="Digita el DNI del cliente (8 dígitos)..."
              value={dniBusqueda}
              onChange={(e) => setDniBusqueda(e.target.value)}
              className="pl-9 focus-visible:ring-amber-500 rounded-xl"
            />
          </div>
          <Button 
            type="submit" 
            disabled={consultandoDni}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 text-xs font-semibold shrink-0"
          >
            {consultandoDni ? "Buscando..." : "Consultar"}
          </Button>
        </form>

        {resultadoReniec && (
          <div className="md:col-span-3 bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-between animate-fadeIn">
            <span>
              Resultado de la consulta: <strong className="text-slate-900 font-bold uppercase">{resultadoReniec}</strong>
            </span>
            <button 
              onClick={() => setResultadoReniec(null)}
              className="text-slate-400 hover:text-slate-600 font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Listado / Tabla */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Cargando bitácora de clientes...</div>
        ) : alquileres.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center gap-3">
            <Users className="h-10 w-10 text-slate-300" />
            <p className="font-light">Ningún cliente ha solicitado información o prendas por la web todavía.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 pl-6">Cliente</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Fecha Reserva</th>
                  <th className="p-4">Finanzas / Garantía</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 pr-6 text-right">Gestión Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-light text-slate-700">
                {alquileres.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-medium text-slate-900">{item.cliente_nombre || "Cliente Anónimo"}</div>
                      <div className="text-xs text-slate-400 max-w-xs line-clamp-1">{item.observaciones || "Sin observaciones"}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-mono text-xs">
                      <div>📞 {item.cliente_telefono || "No registrado"}</div>
                      <div className="text-[10px] text-slate-400">DNI: {item.cliente_dni || "N/A"}</div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {item.fecha_reserva ? new Date(item.fecha_reserva).toLocaleDateString() : "No especificada"}
                    </td>
                    <td className="p-4">
                      <div className="text-slate-900 font-medium">Pago: S/ {(item.total_pago || 0).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Garantía: S/ {(item.garantia_dejada || 0).toFixed(2)}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadgeClass(item.estado)}`}>
                        {item.estado || "Solicitado"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-1 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleUpdatePayment(item)}
                        className="text-slate-500 hover:text-slate-900 px-2 py-1 h-auto text-xs gap-1"
                        title="Ajustar Precio"
                      >
                        <DollarSign className="h-3.5 w-3.5" />
                        Monto
                      </Button>

                      {(item.estado === "solicitado" || item.estado === "reservado" || item.estado === "confirmado") && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(item.id, "entregado")}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 h-auto text-xs"
                        >
                          Entregar Prendas
                        </Button>
                      )}

                      {item.estado === "entregado" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(item.id, "devuelto")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 h-auto text-xs gap-1"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Devuelto
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}