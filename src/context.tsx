import React, { useState, useEffect, FunctionComponent } from 'react'
// import items from './data'
import Client from './Contentful'
import { map, sortByName } from './utils'
import { rooms_T, rooms_context, img_type, withRoomConsumerProps_T } from './types'

const RoomContext = React.createContext({} as rooms_context) // initial state

const getImages = map((img: img_type): string => img.fields.file.url)

// returns an array of room objects
const formatData = (items: any[]): rooms_T =>
  map(item => ({
    ...item.fields,
    images: getImages(item.fields.images),
    id: item.sys.id
  }))(items)

const RoomProvider: FunctionComponent<{ children: React.ReactChild | React.ReactChild [] }> = ({ children }) => {
  const [rooms, setRooms] = useState <rooms_T>([])
  const [isLoading, setIsLoading] = useState(true)
  // console.log('RomProvider rooms', rooms)
  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const response = await Client.getEntries({
          content_type: 'beachResortRoom'
        })

        // console.log(response.items[0])

        setRooms(sortByName(formatData(response.items)))
        setIsLoading(isLoading => !isLoading)
      } catch (error) {
        console.log('failed to get data from db. Error:', error)
      }
    }
    getData()
  }, [])

  return (
    <RoomContext.Provider value={{ rooms, isLoading }}>{children}</RoomContext.Provider>
  )
}

const RoomConsumer = RoomContext.Consumer
export { RoomProvider, RoomConsumer, RoomContext }

export function withRoomConsumer<T>(Component: React.ComponentType<T>) {
  return(props: Omit<T, keyof withRoomConsumerProps_T>) => {
    return (
      <RoomConsumer>{value => <Component {...(props as T)} context={value} />}</RoomConsumer>
    )
  }
}
export default RoomProvider
