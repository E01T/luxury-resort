import {FunctionComponent} from 'react'
import { rooms_T } from '../types'
import Room from './Room'

let count = 0

const RoomsList: FunctionComponent<{filteredRooms: rooms_T}> = ({ filteredRooms }): JSX.Element => {
  if (filteredRooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    )
  }
  console.log('RoomsList count', count++);
   
  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {filteredRooms.map(item => {
          return <Room key={item.id} room={item} />
        })}
      </div>
    </section>
  )
}

export default RoomsList
