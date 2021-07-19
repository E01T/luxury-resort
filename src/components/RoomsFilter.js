import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

const map = fn => array => array.map(fn)
// get all unique values
const getUnique = items => value => [...new Set(items.map(item => item[value]))]

const createOptionItem = (item, index) => (
  <option key={index} value={item}>
    {item}
  </option>
)

const handleChange = evt => {
  const target = evt.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = target.name

  this.setState(
    {
      [name]: value // return this and pass it to filterRooms
    },
    this.filterRooms // callback function that will be executed once setState is completed
  )
}

const RoomsFilter = () => {
  // react hooks
  const context = useContext(RoomContext)
  const {
    rooms,
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    size,
    maxSize,
    minSize,
    breakfast,
    pets
  } = context

  // bind rooms to getUnique fn
  const getRoomsBy = getUnique(rooms)

  const createOptionList = map(createOptionItem)

  const fromTypes = ['all', ...getRoomsBy('type').sort()]
  // get unique types, add 'all' in front of the array and create jsx options list from it
  const types = createOptionList(fromTypes)

  const fromCapacity = getRoomsBy('capacity').sort((a, b) => a - b)
  // get unique capacity -> [] and create jsx options list from it
  const people = createOptionList(fromCapacity)

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
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input type='checkbox' name='pets' checked={pets} onChange={handleChange} />
            <label htmlFor='breakfast'>pets</label>
          </div>
        </div>
        {/* end of extras type */}
      </form>
    </section>
  )
}

export default RoomsFilter
