$(function() {
    //Vamos a capturar el input con el id search
    $('#task-result').hide();
    fetch_task();

    //Boton de busqueda
    $('#search').keyup(function() {
        if($('#search').val()){
            //Aqui se guarda el contenido del input cada vez que se teclea
            let search = $('#search').val();
        
            $.ajax({
                url: 'task-search.php', //Lugar donde se recaudaran los datos php,
                type: 'POST', //Forma en la que se enviaran los datos,
                data: { search }, //Enviar el valor del input al sv,
                success: function(response){ //En caso de que el proceso funcione
                    let task = JSON.parse(response);
                    let template = '';
                    console.log(task);

                    //Recorrer el arreglo
                    task.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`;
                    });

                    //Llenar el elemento con id container con el contenido de template
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });

    //Submit para las tareas
    $('#task-form').submit(function(e){
        //Crear un objeto que almacene los valores de los inputs del form
        const postData = {
            name: $('#name').val(),
            descripcion: $('#descripcion').val()
        };

        $.post('task-add.php', postData, function(response) {
            console.log(response);
            fetch_task();
            //resetear el form
            $('#task-form').trigger('reset');
        });
        //cancelar el efecto por defecto de un formulario
        e.preventDefault();
    });

 

    //Mostrar la lista
    function fetch_task(){ //Obtener tareas en tiempo real
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                console.log(tasks);
                let template = '';
                tasks.forEach(tasks => {
                    template += `
                    <tr taskId="${tasks.id}">
                        <td>${tasks.id}</td>
                        <td>${tasks.name}</td>
                        <td>${tasks.descripcion}</td>
                        <td><button class="btn btn-danger w-100 task-delete">delete</button></td>
                    </tr>
                    `;
                });
                $('#tasks').html(template);
            }
        });
    }

    //task-delete
    $(document).on('click', '.task-delete', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');

        $.post('task-delete.php', {id}, function(response) {
            console.log(response);
            fetch_task();
        })
    });

});