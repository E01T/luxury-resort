import { useContext, useState, useEffect } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

const map = fn => array => array.map(fn)
const filter = fn => array => array.filter(fn)

const getRoomPrice = room => room.price
const getPricesFrom = map(getRoomPrice)
const getRoomSize = room => room.size
const getSizesFrom = map(getRoomSize)

// get all unique values
const getUnique = items => value => [...new Set(map(item => item[value])(items))]

const createOptionItem = (item, index) => (
  <option key={index} value={item}>
    {item}
  </option>
)

const createOptionList = map(createOptionItem)

/////////////////////////////////////////////
const sort = fn => array => array.sort(fn)

const compareObjByName = (objA, objB) => {
  if (objA.name < objB.name) {
    return -1
  }
  if (objA.name > objB.name) {
    return 1
  }
  return 0
}

const sortByName = sort(compareObjByName)

const filterRooms = state => {
  let {
    rooms,
    type,
    capacity,
    price,
    size,
    breakfastOffered,
    petsAllowed,
    setFilteredRooms
  } = state

  let tempRooms = [...rooms]
  // console.log('1) tempRooms', tempRooms)

  // transform values
  // get capacity
  capacity = parseInt(capacity)
  price = parseInt(price)

  // filter by type
  if (type !== 'all') {
    tempRooms = filter(room => room.type === type)(tempRooms)
    // console.log('2) tempRooms', tempRooms)
  }
  // filter by capacity
  if (capacity !== 1) {
    tempRooms = filter(room => room.capacity >= capacity)(tempRooms)
    // console.log('3) tempRooms', tempRooms)
  }
  // filter by price
  tempRooms = filter(room => room.price <= price)(tempRooms)
  // console.log('4) tempRooms', tempRooms)

  //filter by size
  tempRooms = filter(room => room.size <= size)(tempRooms)
  // console.log('5) tempRooms', tempRooms)

  //filter by breakfast
  if (breakfastOffered) {
    tempRooms = filter(room => room.breakfast === true)(tempRooms)
    // console.log('6) tempRooms', tempRooms)
  }
  //filter by pets
  if (petsAllowed) {
    tempRooms = filter(room => room.pets === true)(tempRooms)
    // console.log('7) tempRooms', tempRooms)
  }
  // console.log('8) tempRooms', tempRooms)

  // This will cause the filteredRooms state in the component above (RoomsContainer)
  // to update and re-render the compnents that it includes especially the
  // RoomList with the newlly filteredRooms array.
  setFilteredRooms(sortByName(tempRooms))
}

const RoomsFilter = ({ setFilteredRooms }) => {
  const { rooms } = useContext(RoomContext)

  // State for form controls
  const [type, setType] = useState('all')
  const [capacity, setCapacity] = useState(1)
  const [price, setPrice] = useState(() => Math.max(...getPricesFrom(rooms)))
  const [size, setSize] = useState(() => Math.max(...getSizesFrom(rooms)))
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [breakfastOffered, setBreakfastOffered] = useState(false)

  // when control's state changes we filter rooms
  useEffect(
    () =>
      filterRooms({
        rooms,
        type,
        capacity,
        price,
        size,
        breakfastOffered,
        petsAllowed,
        setFilteredRooms
      }),
    [rooms, type, capacity, price, size, breakfastOffered, petsAllowed, setFilteredRooms]
  )

  // Derived state from rooms
  const prices = getPricesFrom(rooms)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)

  const sizes = getSizesFrom(rooms)
  const maxSize = Math.max(...sizes)
  const minSize = Math.min(...sizes)

  // bind rooms to getUnique fn
  const getRoomsBy = getUnique(rooms)

  const fromTypes = ['all', ...getRoomsBy('type').sort()]
  // get unique types, add 'all' in front of the array and create jsx options list from it
  const types = createOptionList(fromTypes)

  const fromCapacity = getRoomsBy('capacity').sort((a, b) => a - b)
  // get unique capacity -> [] and create jsx options list from it
  const people = createOptionList(fromCapacity)

  const handleChange = event => {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    // console.log('handleChange in RoomsFilter.js', name, value)

    // setState will trigger a re-render which will cause useEffect to run and filterRooms
    /**/ if (name === 'type') setType(value)
    else if (name === 'capacity') setCapacity(value)
    else if (name === 'price') setPrice(value)
    else if (name === 'size') setSize(value)
    else if (name === 'breakfast') setBreakfastOffered(value)
    else if (name === 'pets') setPetsAllowed(value)
  }

  return (
    <section className='filter-container'>
      <Title title='search rooms' />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select
            name='type'
            id='type'
            onChange={handleChange}
            className='form-control'
            value={type}
          >
            {types}
          </select>
        </div>
        {/* end of select type */}
        {/* guests  */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guests</label>
          <select
            name='capacity'
            id='capacity'
            onChange={handleChange}
            className='form-control'
            value={capacity}
          >
            {people}
          </select>
        </div>
        {/* end of guests */}
        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>room price ${price}</label>
          <input
            type='range'
            name='price'
            min={minPrice}
            max={maxPrice}
            id='price'
            value={price}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {/* end of room price*/}
        {/* size */}
        <div className='form-group'>
          <label htmlFor='size'>
            room size {size}
            <span id='meter'>
              (m<sup id='sqare'>2</sup>)
            </span>
          </label>
          <input
            type='range'
            name='size'
            min={minSize}
            max={maxSize}
            step='10'
            id='size'
            value={size}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {/* end of size */}
        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfastOffered}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={petsAllowed}
              onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        {/* end of extras type */}
      </form>
    </section>
  )
}

export default RoomsFilter
