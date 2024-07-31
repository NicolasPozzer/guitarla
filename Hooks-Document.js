  // Hooks - siempre deben estar primero antes de la logica que le
  //implementemos al componente

  // Hook - State
  // Sirve para el manejo de estados y modificaciones
  const [auth, setAuth] = useState(false)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])


  // Hook - useEffect
  // Este hook es para actualizar todo el tiempo que se modifique algo que este dentro del hook.
  // Esto es genial para el uso con apis, ya que espera la consulta y cuando este listo
  //recien se carga el contenido de useEffect
  useEffect(() => {
    
    if(auth){
      console.log("autenticado")
    }else{
      console.log("NO autenticado")
    }
  }, [auth])

  setTimeout(() => {
    setAuth(true)
  }, 3000);


  // Hook - Props
  // Via Props permite pasar Objetos, String y tambien funciones.
  export default function Guitar({guitar}) {

    // Extraer los atributos del props guitar, con Destructuring
    const {id, name, image, description, price } = guitar
  }