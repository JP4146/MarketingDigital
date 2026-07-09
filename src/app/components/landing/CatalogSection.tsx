import { useState, useEffect } from "react";
import { Shirt, ShoppingBag, Send, Calendar, User, Phone, Search } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function CatalogSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros de búsqueda en tiempo real
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Estados para el Modal de Alquiler/WhatsApp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Formulario del Cliente
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");
  const [sending, setSending] = useState(false);

  // Número de WhatsApp de la Boutique (Angel Jashiel)
  const WHATSAPP_BOUTIQUE = "51931814674"; 

  useEffect(() => {
    const fetchVisibleProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("productos_catalogo")
          .select("*")
          .order("fecha_creacion", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error al cargar catálogo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisibleProducts();
  }, []);

  // LÓGICA DE FILTRADO COMBINADO (Categorías + Buscador por Nombre)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "todos" ||
      (selectedCategory === "ternos" && product.categoria_id === 1) ||
      (selectedCategory === "vestidos" && product.categoria_id === 2) ||
      (selectedCategory === "calzados" && product.categoria_id === 3);

    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenRentalModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseRentalModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setNombre("");
    setTelefono("");
    setFechaEvento("");
  };

  const handleConfirmRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono || !fechaEvento || !selectedProduct) return;

    try {
      setSending(true);

      let nombreCategoria = "Prenda";
      if (selectedProduct.categoria_id === 1) nombreCategoria = "Terno";
      if (selectedProduct.categoria_id === 2) nombreCategoria = "Vestido";
      if (selectedProduct.categoria_id === 3) nombreCategoria = "Calzado";

      const { error } = await supabase
        .from("alquileres")
        .insert([
          {
            cliente_nombre: nombre,
            cliente_telefono: telefono,
            fecha_salida: fechaEvento,
            total_pago: selectedProduct.precio_alquiler || 0,
            estado: "reservado",
            observaciones: `WEB - Reserva online de prenda: ${selectedProduct.nombre} (${nombreCategoria})` 
          }
        ]);

      if (error) throw error;

      const textoMensaje = `¡Hola Angel Jashiel! Mi nombre es *${nombre}* y acabo de solicitar el alquiler de la prenda *${selectedProduct.nombre}* a través de la web.\n\n📅 *Fecha del evento:* ${fechaEvento}\n📱 *Mi teléfono:* ${telefono}\n\nQuedo a la espera de su confirmación. ¡Muchas gracias!`;
      
      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${WHATSAPP_BOUTIQUE}&text=${encodeURIComponent(textoMensaje)}`;
      
      window.open(urlWhatsApp, "_blank");

      handleCloseRentalModal();
      alert("¡Solicitud registrada con éxito! Te estamos redirigiendo a WhatsApp para coordinar tu entrega.");
    } catch (err) {
      console.error("Error al procesar el alquiler en base de datos:", err);
      alert("Hubo un error al registrar tu pedido. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="catalogo" className="py-20 bg-slate-50/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Colección Exclusiva
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Alquila Trajes de Alta Costura
          </h2>
          <p className="text-slate-500 font-light text-base">
            Explora nuestro catálogo virtual. Separa tu prenda en línea y recógela lista para tu evento especial.
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS INTERACTIVOS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-100 rounded-2xl shadow-sm mb-12 max-w-5xl mx-auto">
          
          {/* Selector de categorías */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: "todos", label: "✨ Todos" },
              { id: "ternos", label: "👔 Ternos" },
              { id: "vestidos", label: "👗 Vestidos" },
              { id: "calzados", label: "👠 Calzados" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Input Buscador */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre de prenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500 text-slate-900 transition-colors placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Estado de Carga */}
        {loading ? (
          <div className="text-center py-20 text-sm text-slate-400 font-mono">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-2" />
            SINCRO: ACTUALIZANDO CATÁLOGO...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm max-w-md mx-auto">
            <Shirt className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No se encontraron prendas</p>
            <p className="text-xs text-slate-400 mt-1 font-light">Prueba modificando los filtros de búsqueda.</p>
          </div>
        ) : (
          /* Grid de Productos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              // DETECCIÓN DINÁMICA DEL ESTADO DESDE TU COLUMNA DE BASE DE DATOS
              // (Soporta si tu columna se llama 'visible' o 'disponible_web')
              const isDisponible = product.visible !== false && product.disponible_web !== false;

              return (
                <div 
                  key={product.id} 
                  className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[4/5] w-full bg-slate-100 overflow-hidden relative">
                    {product.imagen_url ? (
                      <img 
                        src={product.imagen_url} 
                        alt={product.nombre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                        <Shirt className="h-12 w-12 stroke-[1]" />
                        <span className="text-xs font-mono mt-1">FOTO EXCLUSIVA</span>
                      </div>
                    )}
                    
                    {/* Badge de Categoría */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm capitalize">
                      {product.categoria_id === 1 ? "Terno" : product.categoria_id === 2 ? "Vestido" : "Calzado"}
                    </span>

                    {/* NUEVA ETIQUETA: DISPONIBLE / ALQUILADO */}
                    <span className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm ${
                      isDisponible 
                        ? "bg-emerald-500/90 text-white" 
                        : "bg-rose-600/90 text-white"
                    }`}>
                      {isDisponible ? "Disponible" : "Alquilado"}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.nombre}
                      </h3>
                      <p className="text-sm text-slate-500 font-light line-clamp-2 leading-relaxed">
                        {product.descripcion || "Sin descripción adicional proporcionada."}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Precio Alquiler</p>
                        <p className="text-2xl font-black text-slate-900">S/ {(product.precio_alquiler || 0).toFixed(2)}</p>
                      </div>

                      {/* BOTÓN DINÁMICO SEGÚN DISPONIBILIDAD */}
                      {isDisponible ? (
                        <Button 
                          onClick={() => handleOpenRentalModal(product)}
                          className="bg-slate-950 hover:bg-amber-600 text-white font-semibold rounded-2xl px-4 py-5 shadow-md transition-all duration-300 gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Alquilar
                        </Button>
                      ) : (
                        <Button 
                          disabled
                          className="bg-slate-100 text-slate-400 font-bold rounded-2xl px-4 py-5 border border-slate-200 cursor-not-allowed gap-2 shadow-none"
                        >
                          🚫 Alquilado
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Reservas */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseRentalModal}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white p-6 text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-600" />
              Reservar Prenda en Línea
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <form onSubmit={handleConfirmRental} className="space-y-4 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                  <img src={selectedProduct.imagen_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedProduct.nombre}</h4>
                  <p className="text-xs text-amber-600 font-bold">Total Base: S/ {(selectedProduct.precio_alquiler || 0).toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> Tu Nombre Completo
                </label>
                <Input
                  required
                  placeholder="Ej. Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="focus-visible:ring-amber-500 bg-slate-50 rounded-xl"
                  disabled={sending}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> Número de celular
                </label>
                <Input
                  required
                  type="tel"
                  placeholder="Ej. 912345678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="focus-visible:ring-amber-500 bg-slate-50 rounded-xl"
                  disabled={sending}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> ¿Para qué fecha lo necesitas?
                </label>
                <Input
                  required
                  type="date"
                  value={fechaEvento}
                  onChange={(e) => setFechaEvento(e.target.value)}
                  className="focus-visible:ring-amber-500 bg-slate-50 rounded-xl"
                  disabled={sending}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseRentalModal}
                  disabled={sending}
                  className="w-1/3 border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-semibold shadow-sm transition-colors"
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Registrando..." : "Enviar a WhatsApp"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}