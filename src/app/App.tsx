import { useState } from "react";
import { Menu, X, Star, ChevronRight, MapPin, Phone, Instagram, Facebook, Download, CheckCircle, Clock, Truck, ArrowRight, MessageCircle, Shirt } from "lucide-react";

const WHATSAPP_NUMBER = "51987654321";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

function whatsappLink(msg: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}

const NAV_LINKS = [
  { label: "Ternos", href: "#ternos" },
  { label: "Vestidos", href: "#vestidos" },
  { label: "Calzados", href: "#calzados" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
];

const CATEGORIES = [
  {
    id: "ternos",
    label: "Ternos",
    desc: "Trajes completos para caballero: clásicos, slim fit y modernos. Incluye saco, pantalón, camisa y corbata para bodas, graduaciones y eventos corporativos.",
    count: "28 ternos disponibles",
    img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=600&fit=crop&auto=format",
    alt: "Terno negro elegante para caballero",
    tag: "MÁS SOLICITADO",
  },
  {
    id: "vestidos",
    label: "Vestidos",
    desc: "Vestidos de gala, de novia, de quinceañero y de madrina. Colecciones actualizadas para lucir impecable en tu día especial.",
    count: "35 vestidos disponibles",
    img: "https://images.unsplash.com/photo-1775871299393-2cce027efaa9?w=800&h=600&fit=crop&auto=format",
    alt: "Vestido de quinceañero azul cielo con tiara",
    tag: "TEMPORADA ALTA",
  },
  {
    id: "calzados",
    label: "Calzados",
    desc: "Zapatos de tacón, stilettos y zapatos de vestir para caballero. Complemento ideal para completar tu look de etiqueta.",
    count: "40 pares disponibles",
    img: "https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?w=800&h=600&fit=crop&auto=format",
    alt: "Zapatos de tacón elegantes para dama",
    tag: "GRAN VARIEDAD",
  },
];

const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Terno Negro Clásico",
    category: "ternos",
    desc: "Saco + pantalón + camisa blanca + corbata",
    price: "S/. 60",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1522968439036-e6338d0ed84f?w=600&h=750&fit=crop&auto=format",
    alt: "Terno negro clásico para caballero",
    available: true,
    sizes: "S · M · L · XL",
  },
  {
    id: 2,
    name: "Terno Azul Marino",
    category: "ternos",
    desc: "Corte slim fit · Incluye corbata y camisa",
    price: "S/. 65",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&h=750&fit=crop&auto=format",
    alt: "Terno azul marino slim fit",
    available: true,
    sizes: "M · L · XL",
  },
  {
    id: 3,
    name: "Vestido de Novia",
    category: "vestidos",
    desc: "Blanco marfil · Bordado floral · Cola larga",
    price: "S/. 120",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1543290556-86c013a17574?w=600&h=750&fit=crop&auto=format",
    alt: "Vestido de novia blanco con cola",
    available: true,
    sizes: "S · M · L",
  },
  {
    id: 4,
    name: "Vestido de Quinceañero",
    category: "vestidos",
    desc: "Azul cielo · Incluye tiara y guantes",
    price: "S/. 90",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1775871299393-2cce027efaa9?w=600&h=750&fit=crop&auto=format",
    alt: "Vestido de quinceañero azul con tiara",
    available: true,
    sizes: "XS · S · M",
  },
  {
    id: 5,
    name: "Stilettos Negros",
    category: "calzados",
    desc: "Tacón 9 cm · Punta fina · Material sintético",
    price: "S/. 20",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1524553879936-2ff074ae5816?w=600&h=750&fit=crop&auto=format",
    alt: "Stilettos negros de tacón alto",
    available: true,
    sizes: "35 · 36 · 37 · 38 · 39",
  },
  {
    id: 6,
    name: "Vestido de Gala Rojo",
    category: "vestidos",
    desc: "Escote en V · Corte sirena · Madrina y gala",
    price: "S/. 80",
    duration: "por día",
    img: "https://images.unsplash.com/photo-1776946356256-5076b5ef4799?w=600&h=750&fit=crop&auto=format",
    alt: "Vestido de gala largo para madrina",
    available: true,
    sizes: "S · M · L",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Elige tu prenda",
    desc: "Navega por ternos, vestidos o calzados. Filtra por categoría y encuentra tu talla disponible.",
    icon: <Shirt size={22} />,
  },
  {
    num: "02",
    title: "Reserva por WhatsApp",
    desc: "Escríbenos con la fecha del evento y la prenda que elegiste. Confirmamos disponibilidad en menos de 2 horas.",
    icon: <MessageCircle size={22} />,
  },
  {
    num: "03",
    title: "Recibe o recoge",
    desc: "Delivery a domicilio en Andahuaylas o recojo en tienda. Llegamos con todo listo y bien planchado.",
    icon: <Truck size={22} />,
  },
  {
    num: "04",
    title: "Devuelve sin estrés",
    desc: "Al terminar tu evento, devuelve la prenda. Sin costos ocultos. Sin complicaciones.",
    icon: <CheckCircle size={22} />,
  },
];

const TESTIMONIALS = [
  {
    name: "Milagros Ccahuana",
    role: "Novia · Andahuaylas",
    text: "El vestido de novia era exactamente como lo imaginé. Llegó impecable, bien guardado y a tiempo. No tuve que gastar una fortuna para lucir hermosa en mi día.",
    rating: 5,
  },
  {
    name: "Carlos Quispe",
    role: "Graduando · Apurímac",
    text: "Alquilé el terno negro para mi graduación. Me quedó perfecto, el precio fue justo y el delivery fue puntual. Definitivamente volvería a alquilar aquí.",
    rating: 5,
  },
  {
    name: "Paola Huamán",
    role: "Madrina de matrimonio",
    text: "Conseguí vestido y calzados en el mismo lugar. Me ahorraron tiempo y dinero. El servicio fue muy atento y resolvieron mis dudas rápido por WhatsApp.",
    rating: 5,
  },
];

const KEYWORDS = [
  { kw: "alquiler de ternos Andahuaylas", vol: "Alta" },
  { kw: "alquiler de vestidos de novia Apurímac", vol: "Alta" },
  { kw: "alquiler vestido quinceañero Andahuaylas", vol: "Media" },
  { kw: "traje de gala alquiler Andahuaylas", vol: "Media" },
  { kw: "zapatos de tacón alquiler Apurímac", vol: "Media" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [activeSection, setActiveSection] = useState("stack");
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", event: "" });
  const [leadSent, setLeadSent] = useState(false);

  const filtered =
    activeFilter === "todos"
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((i) => i.category === activeFilter);

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadSent(true);
  }

  const display: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
  const body: React.CSSProperties = { fontFamily: "'Nunito', sans-serif" };
  const mono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

  return (
    <div style={body} className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span style={{ ...display, fontStyle: "italic" }} className="text-primary-foreground font-bold text-sm">AJ</span>
            </div>
            <div>
              <p style={display} className="text-foreground font-bold text-base leading-tight">Angel Jashiel</p>
              <p style={mono} className="text-accent text-[10px] tracking-widest uppercase leading-none">Ternos · Vestidos · Calzados</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-muted-foreground hover:text-accent text-sm font-medium transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink("Hola, quiero reservar una prenda")}
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle size={14} />
              Reservar
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-foreground" aria-label="Menú">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-foreground hover:text-accent font-medium py-1 transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink("Hola, quiero reservar una prenda")}
              target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded font-semibold"
            >
              <MessageCircle size={16} />
              Reservar por WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1619533394727-57d522857f89?w=1400&h=900&fit=crop&auto=format"
            alt="Terno negro elegante de etiqueta"
            className="w-full h-full object-cover object-top opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 px-3 py-1 rounded mb-6">
              <MapPin size={12} className="text-accent" />
              <span style={mono} className="text-accent text-xs tracking-widest uppercase">Andahuaylas, Apurímac</span>
            </div>

            <h1 style={display} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
              Luce
              <br />
              <em className="text-primary not-italic">elegante</em>
              <br />
              <span className="text-accent">sin pagar de más.</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Alquila ternos, vestidos y calzados de alta calidad para bodas, quinceañeros, graduaciones y todo evento especial. Delivery a domicilio en Andahuaylas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#catalogo"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded font-bold text-base hover:bg-primary/90 transition-all duration-200 hover:gap-3"
              >
                Ver Catálogo
                <ArrowRight size={18} />
              </a>
              <a
                href={whatsappLink("Hola! Quiero consultar disponibilidad de una prenda para mi evento")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-accent text-accent px-6 py-4 rounded font-bold text-base hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <MessageCircle size={18} />
                Consulta Gratis
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[
                { val: "+100", label: "prendas disponibles" },
                { val: "4.9★", label: "calificación" },
                { val: "2h", label: "respuesta garantizada" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={display} className="text-2xl font-bold text-accent">{s.val}</p>
                  <p style={mono} className="text-muted-foreground text-xs uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-secondary" id="ternos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Lo que ofrecemos</p>
            <h2 style={display} className="text-4xl sm:text-5xl font-bold">
              Tres categorías,
              <br />
              <em className="text-primary">un solo lugar</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#catalogo`}
                onClick={() => setActiveFilter(cat.id)}
                className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 block"
              >
                <div className="relative h-72 bg-muted overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span style={mono} className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                      {cat.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 style={display} className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{cat.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={mono} className="text-accent text-xs">{cat.count}</span>
                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalogo" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Catálogo</p>
              <h2 style={display} className="text-4xl font-bold">
                Prendas <em className="text-primary">disponibles</em>
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "todos", label: "Todos" },
                { key: "ternos", label: "Ternos" },
                { key: "vestidos", label: "Vestidos" },
                { key: "calzados", label: "Calzados" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={mono}
                  className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-medium transition-all duration-200 border ${
                    activeFilter === f.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent/40 transition-all duration-300">
                <div className="relative h-80 bg-muted overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span style={mono} className="bg-green-800/80 text-green-300 text-[10px] px-2 py-1 rounded-full">
                      Disponible
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-foreground text-base">{item.name}</h3>
                    <div className="text-right shrink-0 ml-3">
                      <p style={display} className="text-accent text-xl font-bold">{item.price}</p>
                      <p style={mono} className="text-muted-foreground text-[10px]">{item.duration}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs mb-1">{item.desc}</p>
                  <p style={mono} className="text-muted-foreground text-[10px] mb-4">Tallas: {item.sizes}</p>
                  <a
                    href={whatsappLink(`Hola! Me interesa alquilar: "${item.name}" (${item.price}/día). ¿Está disponible en mi talla?`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                  >
                    <MessageCircle size={14} />
                    Reservar esta prenda
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={whatsappLink("Hola! Quiero ver el catálogo completo de ternos, vestidos y calzados")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent/50 text-accent px-8 py-3 rounded font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              Ver todas las prendas disponibles
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ESTRATEGIA DIGITAL */}
      <section className="py-24 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14 text-center">
            <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Ecosistema Digital</p>
            <h2 style={display} className="text-4xl sm:text-5xl font-bold mb-4">
              Estrategia de <em className="text-primary">marketing digital</em>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cómo nos hacemos visibles en Andahuaylas y convertimos visitas en reservas confirmadas.
            </p>
          </div>

          <div className="flex gap-2 justify-center mb-12 flex-wrap">
            {[
              { id: "stack", label: "Stack Tecnológico" },
              { id: "tofu", label: "Atracción (TOFU)" },
              { id: "mofu", label: "Lead Magnet (MOFU)" },
              { id: "bofu", label: "Cierre (BOFU)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                style={mono}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-medium transition-all duration-200 border ${
                  activeSection === tab.id
                    ? "bg-accent text-accent-foreground border-accent"
                    : "text-muted-foreground border-border hover:border-accent/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeSection === "stack" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Opción A — Para empezar",
                  badge: "Recomendada · S/. 50–80/mes",
                  badgeColor: "accent",
                  items: [
                    { tool: "Framer", detail: "Catálogo visual con animaciones suaves, CMS propio para actualizar prendas sin código y dominio personalizado." },
                    { tool: "WhatsApp Business", detail: "Botón directo de reserva en cada prenda. Catálogo digital, respuestas rápidas y horario de atención automático." },
                    { tool: "Google My Business", detail: "Ficha local para aparecer en búsquedas como 'alquiler de ternos Andahuaylas' en Google Maps." },
                  ],
                },
                {
                  title: "Opción B — Mayor escala",
                  badge: "Crecimiento · S/. 120–180/mes",
                  badgeColor: "primary",
                  items: [
                    { tool: "Webflow + CMS", detail: "Control total de diseño, SEO avanzado, colecciones para ternos/vestidos/calzados con filtros y búsqueda." },
                    { tool: "Tidio Chat", detail: "Chat en vivo integrado en la web para atender consultas de talla y disponibilidad en tiempo real." },
                    { tool: "Cloudflare CDN + SSL", detail: "Certificado de seguridad gratuito, imágenes de prendas optimizadas automáticamente, carga rápida en zonas rurales." },
                  ],
                },
              ].map((opt) => (
                <div key={opt.title} className="bg-card rounded-lg border border-border p-8">
                  <h3 style={display} className="text-2xl font-bold mb-2">{opt.title}</h3>
                  <div className={`inline-block px-3 py-1 rounded mb-6 border ${opt.badgeColor === "accent" ? "bg-accent/10 border-accent/30" : "bg-primary/10 border-primary/30"}`}>
                    <span style={mono} className={`text-xs tracking-widest uppercase ${opt.badgeColor === "accent" ? "text-accent" : "text-primary"}`}>{opt.badge}</span>
                  </div>
                  <div className="space-y-4">
                    {opt.items.map((r) => (
                      <div key={r.tool} className="flex gap-3">
                        <CheckCircle size={17} className={`shrink-0 mt-0.5 ${opt.badgeColor === "accent" ? "text-accent" : "text-primary"}`} />
                        <div>
                          <p className="font-bold text-foreground text-sm">{r.tool}</p>
                          <p className="text-muted-foreground text-sm">{r.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="lg:col-span-2 bg-card rounded-lg border border-border p-8">
                <h3 style={display} className="text-xl font-bold mb-6">Navegación en menos de 3 clics</h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { nivel: "Inicio", items: ["Hero con CTA", "3 categorías", "Botón WhatsApp fijo"], c: "accent" },
                    { nivel: "Categoría", items: ["Ternos / Vestidos / Calzados", "Filtro por evento", "Cards de prenda"], c: "primary" },
                    { nivel: "Detalle", items: ["Foto de la prenda", "Tallas y precio", "Botón Reservar"], c: "accent" },
                    { nivel: "Reserva", items: ["WhatsApp directo", "Datos del evento", "Confirmación en 2h"], c: "primary" },
                  ].map((n, i) => (
                    <div key={n.nivel}>
                      <div className={`text-center p-3 rounded border ${n.c === "accent" ? "border-accent/40 bg-accent/5" : "border-primary/40 bg-primary/5"}`}>
                        <p style={mono} className={`text-xs uppercase tracking-widest mb-1 ${n.c === "accent" ? "text-accent" : "text-primary"}`}>Clic {i + 1}</p>
                        <p className="font-bold text-sm">{n.nivel}</p>
                      </div>
                      <div className="mt-2 space-y-1">
                        {n.items.map((it) => (
                          <p key={it} className="text-muted-foreground text-xs">· {it}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "tofu" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg border border-border p-8">
                <h3 style={display} className="text-2xl font-bold mb-6">5 Keywords para Andahuaylas</h3>
                <div className="space-y-2">
                  {KEYWORDS.map((k, i) => (
                    <div key={k.kw} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <span style={mono} className="text-muted-foreground text-xs w-5">0{i + 1}</span>
                        <span className="text-foreground text-sm font-medium">{k.kw}</span>
                      </div>
                      <span style={mono} className={`text-xs px-2 py-1 rounded border ${k.vol === "Alta" ? "bg-accent/10 text-accent border-accent/20" : "bg-primary/10 text-primary border-primary/20"}`}>
                        {k.vol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-8">
                <h3 style={display} className="text-2xl font-bold mb-6">Plan de Contenido Visual</h3>
                <div className="space-y-4">
                  {[
                    { plat: "TikTok / Reels", frec: "3x/semana", tipo: "Videos de transformación: 'antes y después' de vestir el terno o vestido. Prueba de tallas en tienda." },
                    { plat: "Instagram", frec: "Diario", tipo: "Fotos de prendas sobre fondo blanco con precio visible. Stories de 'stock del día'. Reels de eventos reales." },
                    { plat: "Facebook Local", frec: "2x/semana", tipo: "Posts de disponibilidad para la semana, precios y promociones de temporada de bodas y graduaciones." },
                    { plat: "Google My Business", frec: "1x/semana", tipo: "Fotos nuevas de ternos y vestidos, actualizaciones de horario y reseñas de clientes satisfechos." },
                  ].map((c) => (
                    <div key={c.plat} className="flex gap-4 p-4 bg-secondary rounded-lg border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-foreground text-sm">{c.plat}</p>
                          <span style={mono} className="text-accent text-[10px] bg-accent/10 px-2 py-0.5 rounded">{c.frec}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">{c.tipo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "mofu" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-lg border border-accent/30 overflow-hidden">
                <div className="bg-accent/10 border-b border-accent/20 p-8 text-center">
                  <Download size={32} className="text-accent mx-auto mb-3" />
                  <h3 style={display} className="text-3xl font-bold mb-2">Guía de Tallas + Catálogo PDF</h3>
                  <p className="text-muted-foreground">
                    Descarga gratis nuestra guía de combinaciones y el catálogo completo con precios, tallas y disponibilidad actualizada.
                  </p>
                </div>

                {!leadSent ? (
                  <form onSubmit={handleLeadSubmit} className="p-8">
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-foreground text-sm font-semibold mb-2">Tu nombre completo</label>
                        <input
                          type="text" required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="Ej: Milagros Ccahuana Flores"
                          className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-semibold mb-2">WhatsApp / Celular</label>
                        <input
                          type="tel" required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="Ej: 987 654 321"
                          className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground text-sm font-semibold mb-2">¿Para qué evento necesitas la prenda?</label>
                        <select
                          required
                          value={leadForm.event}
                          onChange={(e) => setLeadForm({ ...leadForm, event: e.target.value })}
                          className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="boda">Boda / Matrimonio</option>
                          <option value="quince">Quinceañero</option>
                          <option value="graduacion">Graduación</option>
                          <option value="gala">Evento de gala / Corporativo</option>
                          <option value="otro">Otro evento</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 rounded font-bold text-base hover:bg-accent/90 transition-colors"
                    >
                      <Download size={18} />
                      Descargar Guía + Catálogo Gratis
                    </button>
                    <p className="text-center text-muted-foreground text-xs mt-3">
                      Sin spam. Solo te contactamos para ayudarte con tu reserva.
                    </p>
                  </form>
                ) : (
                  <div className="p-8 text-center">
                    <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                    <h4 style={display} className="text-2xl font-bold mb-3">
                      ¡Listo, {leadForm.name.split(" ")[0]}!
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Te enviamos el catálogo y la guía de tallas a tu WhatsApp en minutos.
                    </p>
                    <a
                      href={whatsappLink(`Hola! Acabo de solicitar el catálogo (evento: ${leadForm.event}). Quedo a la espera.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-bold hover:bg-primary/90 transition-colors"
                    >
                      <MessageCircle size={18} />
                      Confirmar por WhatsApp
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { title: "Guía de Tallas", desc: "Medidas exactas para elegir el terno o vestido que se ajuste perfecto a tu cuerpo." },
                  { title: "Combinaciones sugeridas", desc: "PDF con sugerencias de colores y estilos según el tipo de evento y temporada." },
                  { title: "Calendario de disponibilidad", desc: "Consulta qué prendas están libres para la fecha exacta de tu evento." },
                ].map((b) => (
                  <div key={b.title} className="bg-card border border-border rounded-lg p-5 text-center">
                    <CheckCircle size={20} className="text-accent mx-auto mb-3" />
                    <p className="font-bold text-foreground text-sm mb-1">{b.title}</p>
                    <p className="text-muted-foreground text-xs">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "bofu" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg border border-primary/30 overflow-hidden mb-8">
                <div className="bg-primary/10 border-b border-primary/20 p-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <Clock size={14} />
                    Oferta válida hasta agotar stock
                  </div>
                  <h3 style={display} className="text-4xl font-black mb-3">
                    Reserva hoy y el
                    <br />
                    <em className="text-primary">delivery es gratis</em>
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Confirma tu reserva esta semana y llevamos el terno, vestido o calzado hasta tu puerta — sin costo adicional en toda la ciudad de Andahuaylas.
                  </p>
                </div>
                <div className="p-8">
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: <Truck size={22} />, title: "Delivery gratis", desc: "A cualquier dirección de Andahuaylas" },
                      { icon: <CheckCircle size={22} />, title: "Sin adelanto", desc: "Paga al recibir la prenda" },
                      { icon: <Star size={22} />, title: "Prenda garantizada", desc: "Limpia, planchada y lista para usar" },
                    ].map((b) => (
                      <div key={b.title} className="text-center">
                        <div className="text-accent flex justify-center mb-3">{b.icon}</div>
                        <p className="font-bold">{b.title}</p>
                        <p className="text-muted-foreground text-sm">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <a
                      href={whatsappLink("¡Hola Angel Jashiel! Quiero reservar una prenda y aprovechar el DELIVERY GRATIS 👔👗")}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded font-black text-xl hover:bg-primary/90 transition-all hover:gap-4"
                    >
                      <MessageCircle size={24} />
                      Reservar ahora — Delivery Gratis
                      <ArrowRight size={20} />
                    </a>
                    <p className="text-muted-foreground text-sm mt-4">
                      Respuesta en menos de 2 horas · Sin compromiso de pago hasta confirmar talla
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h4 style={display} className="text-2xl font-bold mb-4">Por qué este CTA convierte</h4>
                <div className="space-y-3">
                  {[
                    { elem: "Urgencia", guion: '"Oferta válida hasta agotar stock"', razon: "Genera acción inmediata sin fecha inventada. El stock sí es real y limitado." },
                    { elem: "Beneficio tangible", guion: '"El delivery es gratis"', razon: "Elimina el costo de traslado, que es una barrera real en zonas periféricas de Andahuaylas." },
                    { elem: "Cero riesgo", guion: '"Sin adelanto · Paga al recibir"', razon: "Reduce la desconfianza del cliente nuevo que no conoce el negocio." },
                    { elem: "Verbo imperativo", guion: '"¡Reservar ahora!"', razon: "Claro, directo. No dice 'contáctanos' ni 'más información'. Pide la acción exacta." },
                  ].map((c) => (
                    <div key={c.elem} className="flex gap-4 p-4 bg-secondary rounded border border-border">
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                      <div>
                        <p style={mono} className="text-accent text-xs uppercase tracking-widest mb-1">{c.elem}</p>
                        <p className="text-foreground font-bold text-sm mb-1">{c.guion}</p>
                        <p className="text-muted-foreground text-sm">{c.razon}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Proceso de Reserva</p>
            <h2 style={display} className="text-4xl sm:text-5xl font-bold">
              Tu prenda lista en
              <br />
              <em className="text-primary">4 pasos simples</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {STEPS.map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border border-accent/30 text-accent mb-6 mx-auto">
                  {step.icon}
                  <span style={mono} className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Journey del Cliente</p>
                <h3 style={display} className="text-3xl font-bold mb-4">
                  Del primer clic
                  <br />
                  <em className="text-primary">a la reserva confirmada</em>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  El flujo está diseñado para que cualquier persona en Andahuaylas — desde un celular con señal moderada — llegue a WhatsApp con el nombre de su prenda ya escrito, en menos de 3 clics.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { paso: "Llega a la web", detalle: "Busca en Google · Ve un Reel · Enlace en bio de Instagram", icon: "🔍" },
                  { paso: "Elige la categoría", detalle: "Ternos · Vestidos · Calzados", icon: "👔" },
                  { paso: "Selecciona su prenda", detalle: "Foto + talla + precio por día disponible", icon: "✨" },
                  { paso: "Reserva por WhatsApp", detalle: "Mensaje pre-escrito → confirmación en 2 horas", icon: "✅" },
                ].map((s) => (
                  <div key={s.paso} className="flex items-center gap-4 p-4 bg-secondary rounded-lg border border-border">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="font-bold text-sm">{s.paso}</p>
                      <p className="text-muted-foreground text-xs">{s.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-3">Testimonios</p>
            <h2 style={display} className="text-4xl font-bold">
              Clientes que <em className="text-primary">brillaron</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-lg p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-sm">{t.name}</p>
                  <p style={mono} className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1400&h=600&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p style={mono} className="text-primary-foreground/70 text-xs tracking-widest uppercase mb-4">¿Tienes un evento próximo?</p>
          <h2 style={display} className="text-4xl sm:text-6xl font-black text-primary-foreground mb-6">
            Reserva tu prenda
            <br />
            <em>esta semana</em>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Delivery gratis en Andahuaylas · Pago al recibir · Terno, vestido o calzado listo para tu evento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink("¡Hola Angel Jashiel! Quiero reservar una prenda. ¿Pueden ayudarme?")}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded font-black text-lg hover:bg-primary-foreground/90 transition-all"
            >
              <MessageCircle size={20} />
              Reservar por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded font-bold text-lg hover:bg-primary-foreground/10 transition-all"
            >
              Ver catálogo completo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="bg-background border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span style={{ ...display, fontStyle: "italic" }} className="text-primary-foreground font-bold">AJ</span>
                </div>
                <div>
                  <p style={display} className="font-bold text-lg leading-tight">Angel Jashiel</p>
                  <p style={mono} className="text-accent text-[10px] tracking-widest uppercase">Ternos · Vestidos · Calzados</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-5">
                Alquiler de ternos, vestidos y calzados de alta calidad en Andahuaylas. La mejor opción para lucir elegante en cada evento especial de Apurímac.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: MessageCircle, label: "WhatsApp", href: whatsappLink("Hola!") },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href ?? "#"} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} aria-label={label}
                    className="w-9 h-9 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-4">Categorías</p>
              <div className="space-y-2">
                {["Ternos de Caballero", "Vestidos de Novia", "Vestidos de Quinceañero", "Vestidos de Madrina", "Calzados de Dama"].map((l) => (
                  <a key={l} href="#catalogo" className="block text-muted-foreground hover:text-foreground text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>

            <div>
              <p style={mono} className="text-accent text-xs tracking-widest uppercase mb-4">Contacto</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-muted-foreground text-sm">Jr. Andahuaylas 245, Andahuaylas, Apurímac</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-accent shrink-0" />
                  <a href="tel:+51987654321" className="text-muted-foreground hover:text-foreground text-sm transition-colors">+51 987 654 321</a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">Lun – Sáb: 9am – 7pm</p>
                    <p className="text-muted-foreground text-sm">Dom: 10am – 2pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={mono} className="text-muted-foreground text-xs">© 2025 Angel Jashiel · Ternos, Vestidos y Calzados · Andahuaylas, Apurímac</p>
            <p className="text-muted-foreground text-xs">Ecosistema digital para MYPEs regionales</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP STICKY */}
      <a
        href={whatsappLink("Hola! Quiero consultar sobre una prenda para alquilar")}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl font-bold text-sm hover:bg-green-500 transition-all duration-200 hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
