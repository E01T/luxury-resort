import React, { Component, useState, useEffect } from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext()

const map = fn => array => array.map(fn)
const getImages = map(img => img.fields.file.url)

// returns an array of room objects
const formatData = items =>
  map(item => ({
    ...item.fields,
    images: getImages(item.fields.images),
    id: item.sys.id
  }))(items)

const RoomProvider = props => {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log('RomProvider rooms', rooms)

  useEffect(() => {
    async function getData() {
      try {
        const response = await Client.getEntries({
          content_type: 'beachResortRoom'
        })

        setRooms(formatData(response.items))
        setIsLoading(isLoading => !isLoading)
      } catch (error) {
        console.log('failed to get data from db. Error:', error)
      }
    }
    getData()
  }, [])

  return (
    <RoomContext.Provider value={{ rooms, isLoading }}>
      {props.children}
    </RoomContext.Provider>
  )
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
export default RoomProvider
