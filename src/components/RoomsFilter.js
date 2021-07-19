import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'
// get all unique values
const getUnique = items => value => [...new Set(items.map(item => item[value]))]

const RoomsFilter = ({ rooms }) => {
  // react hooks
  const context = useContext(RoomContext)
  const {
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

  // get unique types
  let types = getRoomsBy('type').sort()

  // add all
  types = ['all', ...types]
  // map to jsx
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))
  // get unique capacity
  let people = getRoomsBy('capacity').sort((a, b) => a - b)

  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ))
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
