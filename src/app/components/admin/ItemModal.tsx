import { useState, useEffect, useRef } from "react";
import { Shirt, Upload, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: any;
  triggerRefresh: () => void;
}

export default function ItemModal({ isOpen, onClose, editingItem, triggerRefresh }: ItemModalProps) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Ternos");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingItem) {
      setNombre(editingItem.nombre || "");
      if (editingItem.categoria_id === 2) setCategoria("Vestidos");
      else if (editingItem.categoria_id === 3) setCategoria("Calzados");
      else setCategoria("Ternos");
      
      setPrecio(editingItem.precio_alquiler?.toString() || ""); 
      setDescripcion(editingItem.descripcion || "");
      setImagenUrl(editingItem.imagen_url || "");
    } else {
      setNombre("");
      setCategoria("Ternos");
      setPrecio("");
      setDescripcion("");
      setImagenUrl("");
    }
  }, [editingItem, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSubiendoImagen(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("productos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("productos").getPublicUrl(filePath);
      setImagenUrl(data.publicUrl);
    } catch (error: any) {
      console.error("Error al subir imagen:", error);
      alert("No se pudo subir la foto: " + error.message);
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    try {
      setGuardando(true);

      let catId = 1; 
      if (categoria === "Vestidos") catId = 2;
      if (categoria === "Calzados") catId = 3;

      // Estructura limpia adaptada a tus columnas reales
      const itemData = {
        nombre,
        categoria_id: catId,             
        precio_alquiler: Number(precio), 
        descripcion: descripcion || null,
        imagen_url: imagenUrl || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from("productos_catalogo")
          .update(itemData)
          .eq("id", editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("productos_catalogo")
          .insert([itemData]);
        if (error) throw error;
      }

      triggerRefresh();
      onClose();
    } catch (error: any) {
      console.error("Error al guardar prenda:", error);
      alert("Error al guardar: " + (error.message || "Verifica la relación de categorías"));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl text-slate-900">
        
        <DialogHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
          <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
            <Shirt className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-lg font-bold text-slate-900 tracking-tight">
              {editingItem ? "Editar Prenda Exclusiva" : "Añadir Prenda al Catálogo"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400 font-light mt-0.5">
              Completa los detalles comerciales de la prenda para actualizar el stock.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-5 pt-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre de la Prenda</label>
            <Input
              required
              placeholder="Ej. Terno Slim Fit Azul Noche"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-slate-50 border-slate-200 focus-visible:ring-amber-500 rounded-xl py-5 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="Ternos">Ternos</option>
                <option value="Vestidos">Vestidos</option>
                <option value="Calzados">Calzados</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Precio Alquiler (S/)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">S/</span>
                <Input
                  required
                  type="number"
                  placeholder="150.00"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="bg-slate-50 border-slate-200 focus-visible:ring-amber-500 rounded-xl py-5 pl-8 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fotografía de la Prenda</label>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
            
            {imagenUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[16/7] group">
                <img src={imagenUrl} alt="Vista previa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl font-medium text-xs gap-1"
                  >
                    Cambiar foto
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={subiendoImagen}
                className="w-full border-2 border-dashed border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/20 transition-all rounded-2xl py-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                {subiendoImagen ? (
                  <>
                    <Loader2 className="h-5 w-5 text-amber-600 animate-spin" />
                    <span className="text-xs font-semibold text-amber-700">Subiendo archivo...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-bold text-slate-700">Cargar foto desde tu PC</span>
                    <span className="text-[10px] text-slate-400 font-light">JPG, PNG o WEBP</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Descripción / Detalles</label>
            <textarea
              placeholder="Material, especificaciones..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={guardando || subiendoImagen}
              className="w-1/3 border-slate-200 text-slate-600 rounded-xl py-5"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={guardando || subiendoImagen || !imagenUrl}
              className="w-2/3 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl py-5 shadow-md"
            >
              {guardando ? "Guardando..." : "Guardar Prenda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}