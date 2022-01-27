import { useEffect, useState, useRef } from "react";


export const useFetch = (url) => {
  
    const [state, setState] = useState({data: null, loading: true, error: null});

    // Resolviendo el problema del desmonte de un compoente miesntras cambia de estado
    const isUp = useRef(true);
    //cuando se ejecute un error cuadno el estado de un componente no se valla a ejecutar pero dicho componente ya no esta
    useEffect(() => {
      return () => {
        isUp.current = false
      };
    }, []);


    useEffect(() => {

        setState({data: null, loading:true, error: null})
        //Promesa
        fetch(url)
        //Promesa
        .then(resp => resp.json())
        //Promesa
        .then(data => {

            setTimeout(() => {
                if (isUp.current){

                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                    
                } else {
                    console.log('Componente Desmontado');
                }
            }, 3000);
        })
        .catch(() => {
            setState({
                data: null,
                loading: false,
                error: 'no se pudo cargar la info'
            })
        })

    }, [url]);

    return state;
    
};
