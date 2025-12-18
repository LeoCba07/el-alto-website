import Button from './Button'

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-br from-[var(--color-earth-medium)] to-[var(--color-earth-dark)] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            ¿Listo para tu próxima escapada?
          </h2>
          <p className="mb-8 text-xl font-light">
            Consultá disponibilidad y reservá tu cabaña en las sierras de
            Córdoba
          </p>
          <Button href="/contacto" variant="outline" size="lg">
            Consultar disponibilidad
          </Button>
        </div>
      </div>
    </section>
  )
}
