import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import { memo } from 'react'
import { room_T } from '../types'

const Room: FunctionComponent<{room: room_T}> = memo(({ room }) => {
  const { name, slug, images, price } = room

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0] || defaultImg} alt='single room' />
        <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className='btn-primary room-link'>
          features
        </Link>
      </div>
      <p className='room-info'>{name}</p>
    </article>
  )
})

export default Room
