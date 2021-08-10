import { useContext, FunctionComponent } from 'react'
import Title from './Title'
import { RoomContext } from '../context'
import Room from './Room'
import Loading from './Loading'
import { map, filter } from '../utils'
import { room_T } from '../types'

// const map = fn => array => array.map(fn)
// const filter = fn => array => array.filter(fn)

const isRoomFeatured = (room: room_T): boolean => room.featured === true
const getFeaturedRooms = filter(isRoomFeatured)

const FeaturedRooms: FunctionComponent = (): JSX.Element => {
  const { isLoading, rooms } = useContext(RoomContext)
  const featured_rooms = getFeaturedRooms(rooms)

  const featured_room_components = map((room: room_T) => <Room key={room.id} room={room} />)(
    featured_rooms
  )

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {isLoading ? <Loading /> : featured_room_components}
      </div>
    </section>
  )
}

export default FeaturedRooms
