import { stats } from '@/lib/data/stats';

export function StatsSection() {
  return (
    <section className="bg-seafoam py-16">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-1">
                {stat.value}
              </p>
              <p className="text-white/80 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
