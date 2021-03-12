const grid = new Muuri('.grid', {
    rounding: false
});

/* esto se va a ejecutar una vez que la pagina cargue. carga completamente y ejecuta tal funcion */
window.addEventListener('load', () => {
    /* este es un metodo de muuri que esta en la documentacion de github que refresca el layout 
    cuando se tengan que reposicionar o cargar las imagenes nuevamente */
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // AGREGAMOS LOS LISTENER DE LOS ENLACES PARA FILTRAR POR CATEGORIA 
    /* enlaces de filtrado */
    const enlaces = document.querySelectorAll('#categorias a');
    /* va a iterar en cada elemento a */
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {

            /* remueve la clase activo y se la coloca a la clickeada */
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');
            
            /* coloca cada imagen en su categoria correspondiente */
            const categoria = evento.target.innerHTML.toLowerCase();

            /* '?' este es un operador ternario, es como el if pero como es uno solo se puede simplificar asi. 
                ':' este indica que en caso contrario ejecute el codigo a continuacion */
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);

            
        })
    })
    // AGREGAMOS LOS LISTENER PARA LA BARRA DE BUSQUEDA
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
// grid.filter va a mostrar solo los elementos que cumplan con las caracteristicas que lleva dentro de el 
// parentesis. 
// dentro hay una funcion, el item son las imagenes, por cada una de las imagenes va a ejecutar el siguiente
// codigo. va a ingresar a la imagen, va a obtener el elemento de la imagen, despues va a obtener el dataset
// de etiquetas, y si las etiquetas incluyen la "busqueda" va a mostrar el elemento.
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    })

    // AGREMOS LOS LISTENER PARA LAS IMAGENES

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (elemento) => {
        
        elemento.addEventListener('click', () => {

            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;

        })
    })

    // EVENTLISTENER DEL BOTON CERRAR

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // EVENTLISTENER DEL OVERLAY

    overlay.addEventListener('click', (evento) => {
    // '?' este significa 'si es true hace lo siguiente', ':' este significa 'sino no hagas esto' que
    // en este caso seria nada.
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
});

