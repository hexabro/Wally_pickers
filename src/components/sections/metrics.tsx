import CountUp from "../ui/CountUp";
import { useTranslations } from 'next-intl';
/* =============== 3 · MÉTRICAS DESTACADAS ==================== */

export default function StatsStrip() {
  const t = useTranslations('home.statsStrip');
  const metrics = [
  { label: t('productsInternational'), value: "300" },
  { label: t('countries'), value: "27" },
  { label: t('brands'), value: "45" },
  { label: t('b2bClients'), value: "600" },
];
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
