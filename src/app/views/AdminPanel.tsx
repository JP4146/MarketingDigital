import { useState } from "react";
import AdminNav from "../components/admin/AdminNav";
import DashboardTab from "../components/admin/DashboardTab";
import InventoryTab from "../components/admin/InventoryTab";
import LeadsTab from "../components/admin/LeadsTab";
import ItemModal from "../components/admin/ItemModal";

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  // Estado para saber qué pestaña ver (Por defecto inicia en el Dashboard)
  const [activeTab, setActiveTab] = useState("dashboard");

  // Estados para controlar el Modal de agregar/editar prendas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Estado disparador de refresco (Para mantener todos los botones y tablas sincronizados)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Función para abrir el modal (Si se le pasa un item es para EDITAR, si es null es para CREAR NUEVO)
  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* 1. Menú superior del Administrador */}
      <AdminNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
      />

      {/* 2. Contenedor de la pestaña activa */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && <DashboardTab />}
        
        {activeTab === "inventario" && (
          <InventoryTab 
            onOpenModal={handleOpenModal} 
            refreshTrigger={refreshTrigger}
            triggerRefresh={triggerRefresh}
          />
        )}
        
        {activeTab === "leads" && (
          <LeadsTab 
            refreshTrigger={refreshTrigger}
            triggerRefresh={triggerRefresh}
          />
        )}
      </main>

      {/* 3. Modal Compartido Inteligente (Formulario Crear/Editar) */}
      <ItemModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingItem={editingItem}
        triggerRefresh={triggerRefresh}
      />
    </div>
  );
}