
export type SurfboardT = {
    id : number,
    name: string,
    image: string,
    description: string,
    price: number
}

export type CartItemT = SurfboardT & {
    quantity: number
}


