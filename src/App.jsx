import { useState, useEffect } from "react"
import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"


function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 10
  const MIN_ITEMS = 1

  // Funcion para agregar al carrito
  function addToCart(item){

    //crear condicional para no duplicar elementos en el carrito
    // findIndex -> retorna el valor en el indice del arreglo,
    //como cart esta vacio, agrega -1 a los que no estan en el
    //carrito de guitarras, pero sino agrega un numero positivo
    //entonces con un condicional mayor a 0 descarto los que ya estan
    //en el carrito.
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

    if(itemExist >= 0){
      //condicional para no pasarse del maximo de itms en el carrito
      if(cart[itemExist].quantity >= MAX_ITEMS) return
      // para crear una acumulacion de un atributo del objeto
      //primero hay que crear una copia del objeto
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }
    
  }

  //Eliminar un producto del carrito
  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  //incrementar cantidad de un producto
  function increaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,//esto retorna los otros atributos de guitar como estan, y solo modifica quantity
          quantity: item.quantity + 1
        }
      }
      return item
    })
    //y guardamos el carrito seteado
    setCart(updatedCart)
  }

  //Decrementar cantidad
  function decreaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity !== MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Vaciar carrito
  function vaciarCarrito(){
    setCart([])
  }
  

//------- HTML -------
  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      vaciarCarrito={vaciarCarrito}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
