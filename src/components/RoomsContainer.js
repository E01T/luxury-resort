import { withRoomConsumer } from '../context'
import { useState, useEffect } from 'react'
import Loading from './Loading'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'

function RoomContainer({ context }) {
  const { rooms, isLoading } = context
  const [filteredRooms, setFilteredRooms] = useState([])

  useEffect(() => setFilteredRooms(rooms), [rooms])

  // console.log('rooms', rooms)
  // console.log('filteredRooms', filteredRooms)

  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <RoomsFilter setFilteredRooms={setFilteredRooms} />
      <RoomsList filteredRooms={filteredRooms} />
    </>
  )
}

export default withRoomConsumer(RoomContainer)
