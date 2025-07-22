import CountUp from "../ui/CountUp";
/* =============== 3 · MÉTRICAS DESTACADAS ==================== */
const metrics = [
  { label: "productos internacionales", value: "300" },
  { label: "Países abastecidos", value: "27" },
  { label: "Marcas exclusivas", value: "45" },
  { label: "+Clientes B2B", value: "600" },
];
export default function StatsStrip() {
  return (
    <section className="bg-gray-600 py-12 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold">
              <CountUp
              from= {0}
              to = {parseInt(m.value.replace(/[^0-9]/g, ""))}
              separator=","
              duration = {1}
              ></CountUp>
            </div>
            <div className="text-sm md:text-base opacity-80">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
