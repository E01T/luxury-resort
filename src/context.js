import React, { Component, useState, useEffect } from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext()

const formatData = items => {
  let tempItems = items.map(item => {
    let id = item.sys.id
    let images = item.fields.images.map(image => image.fields.file.url)

    let room = { ...item.fields, images, id }
    return room
  })
  return tempItems
}

const getData = async () => {
  try {
    const response = await Client.getEntries({
      content_type: 'beachResortRoom'
    })

    return formatData(response.items)
  } catch (error) {
    console.log('failed to get data from db. Error:', error)
  }
}

const RomProvider = props => {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const _rooms = getData()
    setRooms(_rooms)
    setIsLoading(!isLoading)
  }, [rooms, isLoading])

  return <RoomContext.Provider value={{ rooms }}>{props.children}</RoomContext.Provider>
}

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    size: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  map = fn => array => array.map(fn)
  filter = fn => array => array.filter(fn)
  sort = fn => array => array.sort(fn)

  getPricesFrom = this.map(item => item.price)
  getSizesFrom = this.map(item => item.size)

  compareObjByName = (objA, objB) => {
    if (objA.name < objB.name) {
      return -1
    }
    if (objA.name > objB.name) {
      return 1
    }
    return 0
  }

  sortByName = this.sort(this.compareObjByName)

  // TODO improve it
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id
      let images = item.fields.images.map(image => image.fields.file.url)

      let room = { ...item.fields, images, id }
      return room
    })
    return tempItems
  }

  getData = async () => {
    try {
      const response = await Client.getEntries({
        content_type: 'beachResortRoom'
      })

      const rooms = this.formatData(response.items)

      const isRoomFeatured = room => room.featured === true
      const getFeaturedRooms = this.filter(isRoomFeatured)
      const featuredRooms = getFeaturedRooms(rooms)

      const prices = this.getPricesFrom(rooms)
      const maxPrice = Math.max(...prices)
      const minPrice = Math.min(...prices)

      const sizes = this.getSizesFrom(rooms)
      const maxSize = Math.max(...sizes)
      const minSize = Math.min(...sizes)

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: this.sortByName(rooms),
        loading: false,
        price: maxPrice,
        minPrice,
        maxPrice,
        size: maxSize,
        maxSize,
        minSize
      })
      console.log('this.state', this.state)
    } catch (error) {
      console.log(error)
    }
  }

  // TODO useEffect
  componentDidMount() {
    this.getData()

    // NOTE: for testing purposes
    // uncomment this below to get data from local json file
    // and comment this.getData() above
    /*
    let rooms = this.formatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true)
    //
    let maxPrice = Math.max(...rooms.map(item => item.price))
    let maxSize = Math.max(...rooms.map(item => item.size))
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize
    })
    */
  }

  handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    // console.log('handleChange in context.js', name, value)
    // console.log('this.state.rooms', this.state.rooms)
    // console.log('this.state.sortedRooms', this.state.sortedRooms)
    this.setState(
      {
        [name]: value
      },
      this.filterRooms // callback function that will be executed once setState is completed
    )
  }

  filterRooms = () => {
    let { rooms, type, capacity, price, size, breakfast, pets } = this.state

    let tempRooms = [...rooms]
    // console.log('1) tempRooms', tempRooms)
    // transform values
    // get capacity
    capacity = parseInt(capacity)
    price = parseInt(price)
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type)
      // console.log('2) tempRooms', tempRooms)
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity)
      // console.log('3) tempRooms', tempRooms)
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price)
    // console.log('4) tempRooms', tempRooms)

    //filter by size
    tempRooms = tempRooms.filter(room => room.size <= size)
    // console.log('5) tempRooms', tempRooms)

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
      // console.log('6) tempRooms', tempRooms)
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
      // console.log('7) tempRooms', tempRooms)
    }
    // console.log('8) tempRooms', tempRooms)

    this.setState({
      sortedRooms: tempRooms
    })
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

export { RoomProvider, RoomConsumer, RoomContext }

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>{value => <Component {...props} context={value} />}</RoomConsumer>
    )
  }
}
