/* =============== 3 · MÉTRICAS DESTACADAS ==================== */
const metrics = [
  { label: "Toneladas vendidas", value: "12K+" },
  { label: "Países abastecidos", value: "27" },
  { label: "Marcas exclusivas", value: "45" },
  { label: "Clientes B2B", value: "600+" },
];
export default function StatsStrip() {
  return (
    <section className="bg-green-600 py-12 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold">{m.value}</div>
            <div className="text-sm md:text-base opacity-80">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
