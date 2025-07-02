import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  TrendingUp,
  Globe,
  ShieldCheck,
  DollarSign,
  Layers,
} from "lucide-react";

const stats = [
  { label: "Clientes satisfechos", value: "3.200+" },
  { label: "Unidades vendidas", value: "7,8M" },
  { label: "Países servidos", value: "18" },
];

const reasons = [
  {
    icon: <Package className="h-8 w-8" />,
    title: "Catálogo Diverso",
    desc: "Miles de referencias asiáticas y americanas cuidadosamente seleccionadas para tu negocio.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Logística Just‑In‑Time",
    desc: "Centros de distribución en Europa que aseguran entregas en 24‑72 h y disponibilidad constante de stock.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Cumplimiento Normativo UE",
    desc: "Etiquetado multilingüe, trazabilidad y estándares de seguridad alimentaria certificados.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Precios Competitivos",
    desc: "Escalamos descuentos por volumen y acuerdos anuales a medida para maximizar tu margen.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Calidad Garantizada",
    desc: "Auditorías de proveedores y controles de calidad internos que aseguran consistencia en cada lote.",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Integraciones Digitales",
    desc: "Conéctate vía EDI o API para reposiciones automáticas y seguimiento de pedidos en tiempo real.",
  },
];

export default function BecomeCustomerPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-900 to-blue-600 text-white">
      {/* Hero */}
      <section className="container mx-auto flex flex-col items-center justify-center py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
          Tu puente directo a los sabores asiáticos y americanos en Europa
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Somos mayoristas especializados en importar, almacenar y distribuir productos
          icónicos de Estados Unidos, Japón, Corea, México y más, llevando la excelencia
          directamente a tu estantería.
        </p>
        <Button size="lg" className="rounded-2xl px-10 py-6 text-lg font-semibold shadow-lg">
          Quiero ser cliente
        </Button>
      </section>

      {/* Stats */}
      <section className="container mx-auto grid gap-8 md:grid-cols-3 px-4 pb-20">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-8 backdrop-blur-sm shadow-md"
          >
            <span className="text-4xl md:text-5xl font-extrabold mb-2">
              {s.value}
            </span>
            <span className="text-base md:text-lg font-medium uppercase tracking-wide">
              {s.label}
            </span>
          </div>
        ))}
      </section>

      {/* Reasons */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          ¿Por qué elegirnos como tu proveedor?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <Card
              key={r.title}
              className="bg-white/10 backdrop-blur-sm text-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
            >
              <CardContent className="flex flex-col items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3 inline-flex">
                  {r.icon}
                </div>
                <h3 className="text-xl font-semibold mt-2">{r.title}</h3>
                <p className="text-sm leading-relaxed opacity-90 flex-1">
                  {r.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-blue-900 py-20">
        <div className="container mx-auto text-center px-4 max-w-3xl flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Listo para crecer con productos irresistibles
            <span className="text-blue-600">?</span>
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Nuestro equipo de expertos está disponible para asesorarte, personalizar tu
            catálogo y asegurarte la mejor experiencia de abastecimiento.
          </p>
          <Button size="lg" className="rounded-2xl px-10 py-6 text-lg font-semibold shadow-lg bg-blue-600 text-white hover:bg-blue-700">
            Contactar al equipo de ventas
          </Button>
        </div>
      </section>
    </div>
  );
}
