import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { SurfboardT, CartItemT } from "../types"
// const useCart = () => {
//
// }


export function useCart(){


    const initialCart = () : CartItemT[]  => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState (db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 6

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : SurfboardT) {

        const itemExist = cart.findIndex(surfboard => surfboard.id === item.id )
        if(itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)

        } else {
        const newItem : CartItemT = { ...item, quantity : 1}
        setCart([...cart, newItem])
    }

    }

    function removeFromCart(id : SurfboardT['id']) {
        setCart(prevCart => prevCart.filter(surfboard => surfboard.id !== id))
    }

    function increaseQuantity(id : SurfboardT['id']){
        const updatedCart = cart.map( item => {
            if ( item.id === id && item.quantity < MAX_ITEMS ) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
        return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id : SurfboardT['id']){
        const updatedCart = cart.map( item => {
            if ( item.id === id && item.quantity > 1 ) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
        return item
        })
        setCart(updatedCart)
    }


    function resetCart() {
        setCart([])
    }

    const isEmpty = useMemo( () => cart.length === 0, [cart] )
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] )


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
        isEmpty,
        cartTotal
    }

}






// export default useCart