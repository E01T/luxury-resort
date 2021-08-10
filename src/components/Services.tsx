import { FunctionComponent } from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
import Title from './Title'

type service_type = {
  icon: JSX.Element,
  title: string,
  info: string
}

type services_type = service_type []

const services: services_type = [
  {
    icon: <FaCocktail />,
    title: 'Free Cocktails',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free Shuttle',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  },
  {
    icon: <FaBeer />,
    title: 'Strongest Beer',
    info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?'
  }
]

const Services: FunctionComponent = (): JSX.Element => {
  return (
    <section className='services'>
      <Title title='services' />
      <div className='services-center'>
        {services.map(item => {
          return (
            <article key={`item-${item.title}`} className='service'>
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Services
