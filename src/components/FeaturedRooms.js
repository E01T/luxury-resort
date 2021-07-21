import { useContext } from 'react'
import Title from './Title'
import { RoomContext } from '../context'
import Room from './Room'
import Loading from './Loading'

const map = fn => array => array.map(fn)
const filter = fn => array => array.filter(fn)

const isRoomFeatured = room => room.featured === true
const getFeaturedRooms = filter(isRoomFeatured)

const FeaturedRooms = () => {
  const { loading, rooms } = useContext(RoomContext)
  const featuredRooms = getFeaturedRooms(rooms)

  const featured_rooms = map(room => <Room key={room.id} room={room} />)(featuredRooms)

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : featured_rooms}
      </div>
    </section>
  )
}

export default FeaturedRooms
