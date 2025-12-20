import { HiOutlineTrophy } from 'react-icons/hi2'
import { SiTripadvisor } from 'react-icons/si'
import { TbCalendarCheck, TbHomeHeart } from 'react-icons/tb'

const stats = [
  {
    value: '28+',
    label: 'años de experiencia',
    Icon: TbCalendarCheck,
  },
  {
    value: 'Dueños',
    label: 'atención personalizada',
    Icon: TbHomeHeart,
  },
  {
    value: '4.6',
    label: 'en TripAdvisor',
    Icon: SiTripadvisor,
  },
  {
    value: '#1',
    label: 'en Tanti',
    Icon: HiOutlineTrophy,
  },
]

export default function TrustSignals() {
  return (
    <section className="bg-forest-dark py-5 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-x-12 lg:gap-x-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <stat.Icon className="w-5 h-5 text-amber" />
              <span className="font-bold text-white">{stat.value}</span>
              <span className="text-white/70 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
