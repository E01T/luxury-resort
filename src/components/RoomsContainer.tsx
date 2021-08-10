import { withRoomConsumer } from '../context'
import { useState, useEffect, FunctionComponent } from 'react'
import Loading from './Loading'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { context_T } from '../types'

const RoomContainer: FunctionComponent<{ context: context_T }> = ({ context }) => {
  const { rooms, isLoading } = context
  const [filteredRooms, setFilteredRooms] = useState(rooms)

  useEffect(() => setFilteredRooms(rooms), [rooms])

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
