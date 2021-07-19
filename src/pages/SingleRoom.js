import { useContext } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'

const getRoom = rooms => slug => rooms.find(room => room.slug === slug)

const SingleRoom = props => {
  const { rooms } = useContext(RoomContext)
  console.log('rooms -> ', rooms)
  const slug = props.match.params.slug

  const room = getRoom(rooms)(slug)

  const noRoom = (
    <div className='error'>
      <h3> no such room could be found...</h3>
      <Link to='/rooms' className='btn-primary'>
        back to rooms
      </Link>
    </div>
  )

  if (!room) return noRoom
  else {
    const { name, description, capacity, size, price, extras, breakfast, pets, images } =
      room
    const [...defaultImages] = images

    return (
      <>
        <StyledHero img={images[0] || defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className='btn-primary'>
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className='single-room'>
          <div className='single-room-images'>
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className='single-room-info'>
            <article className='desc'>
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQMT</h6>
              <h6>
                max capacity :{capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast included'}</h6>
            </article>
          </div>
        </section>
        <section className='room-extras'>
          <h6>extras </h6>
          <ul className='extras'>
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>
      </>
    )
  }
}

export default SingleRoom
