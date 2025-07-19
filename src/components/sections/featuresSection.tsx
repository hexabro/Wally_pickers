import {
  TrendingUp,
  Globe,
  Truck,
  DollarSign,
  Search
} from 'lucide-react'

import MagnifyingSection from './magnifyingSection';

const features = [
{
    title: 'Análisis de tendencias',
    Icon: TrendingUp,
},
{
    title: 'Red global de proveedores',
    Icon: Globe,
},
{
    title: 'Logística rápida y segura',
    Icon: Truck,
},
{
    title: 'Precios competitivos',
    Icon: DollarSign,
},
]

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 mb-0 pb-20">
      <div className="max-w-4xl mx-auto px-4 text-center s">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-20   ">
          Descubre lo que nos hace únicos <Search className = " ml-2 inline scale-150"></Search>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-0 ">
          {features.map(({ title, Icon }) => (
            <div key={title} className="flex flex-col items-center space-y-4">
              <Icon className="w-12 h-12 text-green-400" />
              <MagnifyingSection  description = {title} titleColor='black' descColor='black' magnifyColor="[#0e344f]" textCentered={true}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
