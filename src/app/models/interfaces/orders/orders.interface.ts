export interface OrderRequest {
  product_name: string
  quantity: number
  size: string
  weight: string
  tracking_code: string
  to_delivery: boolean
  package_receiver: PackageReceiver
  address: Address
  observation: string
}

export interface OrderData {
  _id: string
  product_name: string
  quantity: number
  size: string
  weight: string
  paid: boolean
  tracking_code: string
  to_delivery: boolean
  reversed: boolean
  canceled: boolean
  received: boolean
  package_receiver: PackageReceiver
  address: Address
  observation: string
  user_id: UserId
  done: boolean
}

export interface PackageReceiver {
  name: string
  cpf: string
  phone: string
}

export interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  postal_code: string
}


export interface UserId {
  id: string
  collection: string
}
