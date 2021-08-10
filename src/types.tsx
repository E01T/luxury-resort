export type room_T = {
  breakfast: boolean;
  capacity: number;
  description: string;
  extras: [string];
  featured: boolean;
  id: string;
  images: [string];
  name: string;
  pets: boolean;
  price: number;
  size: number;
  slug: string;
  type: string;
}

export type rooms_T = room_T []

export type context_T = {
    rooms: room_T [];
    isLoading: boolean;
}

export interface rooms_context {
    rooms: room_T [];
    isLoading: boolean;
}

export type withRoomConsumerProps_T = {
  context: context_T;
}

export type filterRoomsState_T = {
  rooms: rooms_T;
  type: string;
  capacity: number;
  price: number;
  size: number;
  breakfastOffered: boolean;
  petsAllowed: boolean;
  setFilteredRooms: (filteredRooms: rooms_T) => void
}

export type setFilteredRooms_T = (a: rooms_T) => void

export type img_type = {
  fields: {
    file: {
      url: string;
    }
  }
}