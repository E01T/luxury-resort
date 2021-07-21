import Room from './Room'
// import { useContext } from 'react'
// import { RoomContext } from '../context'

const RoomsList = ({ filteredRooms: rooms }) => {
  // get sortedRooms as rooms
  // const { rooms } = useContext(RoomContext)
  // console.log('RoomList', rooms)

  if (rooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    )
  }
  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {rooms.map(item => {
          return <Room key={item.id} room={item} />
        })}
      </div>
    </section>
  )
}

export default RoomsList
