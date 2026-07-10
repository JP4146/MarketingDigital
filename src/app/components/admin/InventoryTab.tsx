import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Eye, EyeOff, RefreshCw, Shirt, Filter } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "../ui/button";

interface InventoryTabProps {
  onOpenModal: (item?: any) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export default function InventoryTab({ onOpenModal, refreshTrigger, triggerRefresh }: InventoryTabProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos"); // <-- NUEVO: Estado para el filtro

  // Cargar inventario completo de Supabase
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos_catalogo")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error cargando inventario:", err);
    } finally {
      setLoading(false);
    }
  };

  // Se refresca automáticamente cuando se añade o edita un producto
  useEffect(() => {
    fetchInventory();
  }, [refreshTrigger]);

  // Cambiar visibilidad en la web (Botón Ojo)
  const toggleWebVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("productos_catalogo")
        .update({ disponible_web: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      triggerRefresh();
    } catch (err) {
      console.error("Error al cambiar visibilidad:", err);
    }
  };

  // Eliminar una prenda de forma permanente
  const handleDeleteItem = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar permanentemente la prenda "${name}"?`);
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("productos_catalogo")
        .delete()
        .eq("id", id);

      if (error) throw error;
      triggerRefresh();
    } catch (err) {
      console.error("Error al eliminar prenda:", err);
    }
  };

  // <-- NUEVO: Filtrado lógico en memoria para que responda instantáneamente
  const filteredProducts = products.filter((item) => {
    if (selectedCategory === "todos") return true;
    if (selectedCategory === "ternos") return item.categoria_id === 1;
    if (selectedCategory === "vestidos") return item.categoria_id === 2;
    if (selectedCategory === "calzados") return item.categoria_id === 3;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventario de Alta Costura</h2>
          <p className="text-sm text-slate-500">Administra tus prendas, ajusta los precios públicos y oculta o muestra stock.</p>
        </div>
        
        {/* Contenedor de Filtros y Acciones */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* NUEVO: Selector de Filtros por Categoría */}
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600 hover:bg-slate-100/70 transition-colors">
            <Filter className="h-4 w-4 text-slate-400 mr-2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none pr-2 cursor-pointer text-slate-700"
            >
              <option value="todos">Todas las prendas</option>
              <option value="ternos">👔 Ternos</option>
              <option value="vestidos">👗 Vestidos</option>
              <option value="calzados">👠 Calzados</option>
            </select>
          </div>

          <Button
            variant="outline"
            onClick={fetchInventory}
            disabled={loading}
            className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-9 w-9 p-0 flex items-center justify-center"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>

          <Button
            onClick={() => onOpenModal(null)}
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl gap-2 shadow-sm font-medium text-sm h-9 px-4"
          >
            <Plus className="h-4 w-4" />
            Nueva Prenda
          </Button>
        </div>
      </div>

      {/* Tabla de Datos */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Cargando inventario actual de la boutique...</div>
        ) : filteredProducts.length === 0 ? ( // <-- Cambiado de products a filteredProducts
          <div className="p-16 text-center text-slate-500 flex flex-col items-center gap-3">
            <Shirt className="h-10 w-10 text-slate-300" />
            <p className="font-light">No se encontraron prendas para la categoría seleccionada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 pl-6">Prenda</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio Alquiler Base</th>
                  <th className="p-4 text-center">Estado Web</th>
                  <th className="p-4 pr-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-light text-slate-700">
                {filteredProducts.map((item) => ( // <-- Cambiado de products a filteredProducts
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Nombre y Mini Foto */}
                    <td className="p-4 pl-6 font-medium text-slate-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {item.imagen_url ? (
                          <img src={item.imagen_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">AJ</div>
                        )}
                      </div>
                      <span className="line-clamp-1">{item.nombre}</span>
                    </td>

                    {/* Categoría */}
                    <td className="p-4 text-slate-500">
                      {item.categoria_id === 1 ? "👔 Terno" : item.categoria_id === 2 ? "👗 Vestido" : item.categoria_id === 3 ? "👠 Calzado" : "Sin categoría"}
                    </td>

                    {/* Precio */}
                    <td className="p-4 font-semibold text-slate-800">
                      S/ {(item.precio_alquiler || 0).toFixed(2)}
                    </td>

                    {/* Visibilidad Web */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleWebVisibility(item.id, item.disponible_web)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                          item.disponible_web
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-400 border-slate-200"
                        }`}
                        title={item.disponible_web ? "Visible en la Web" : "Oculto en la Web"}
                      >
                        {item.disponible_web ? (
                          <>
                            <Eye className="h-3.5 w-3.5" /> Disponible
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3.5 w-3.5" /> Alquilado
                          </>
                        )}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td className="p-4 pr-6 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenModal(item)}
                        className="text-slate-500 hover:text-amber-600 hover:bg-amber-50 p-2 h-auto"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id, item.nombre)}
                        className="text-slate-500 hover:text-red-600 hover:bg-red-50 p-2 h-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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