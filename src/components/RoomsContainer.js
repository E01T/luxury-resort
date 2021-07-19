import { withRoomConsumer } from '../context'
import Loading from './Loading'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'

function RoomContainer({ context }) {
  const { loading } = context
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <RoomsFilter />
      <RoomsList />
    </>
  )
}

export default withRoomConsumer(RoomContainer)
