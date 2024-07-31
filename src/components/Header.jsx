import { useMemo } from "react"
//import { Fragment } from "react" // Sirve para no repetir muchos div

export default function Header({ cart, removeFromCart, decreaseQuantity, increaseQuantity, vaciarCarrito }) {

    // State Derivado - use memo se ejecuta cada vez que el carrito cambia, por eso va cart a lo ultimo.
    const estaVacioElCarrito = useMemo( () => cart.length === 0, [cart])// Esto devuelve true o false

    // El array method .reduce toma dos valores, el primero es el acumulado, y el
    //segundo es el item osea el elemento actual. y el 0 al final, es el valor inicial.
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    


    //El return debe estar siempre, y es el que se va a mostrar en pantalla
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {estaVacioElCarrito ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(guitar => (
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>SRV</td>
                                                    <td className="fw-bold">
                                                        ${guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                        {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            // Se agrega el callBack -> "() =>" porque la funcion toma un parametro
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                
                                
                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                <button 
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={vaciarCarrito}
                                >Vaciar Carrito</button>
                                </>
                            )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}