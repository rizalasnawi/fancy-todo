$(document).ready( function() {
    checkLogin()
    listmenu()
})

function checkLogin() {
    let token = localStorage.getItem('token')
    if(!token) {
        window.location = '/authentication.html'
    }
}

function logout() {
    localStorage.removeItem('token')
    window.location = '/authentication.html'
}


function listmenu() {
    $("#listMenu").text("")
    $("#listMenu").append(`
        <a href="#" class="list-group-item bg-danger text-white text-center"> Todo Manger </a>
        <a href="#" class="list-group-item" onclick="addTodo()"> Add New Todo</a>
    `)
}

function addTodo() {
    $("#contentNow").text("")
    $("#contentNow").append(`
        <div class="card">
            <div class="card-header bg-danger">Add New Todo</div>
            <div class="card-body">
                <input type="text" placeholder="Title todo..." class="form-control mb-3" autofocus required id="name" />
                <textarea class="form-control mb-3" placeholder="Description" id="description"></textarea>
                <input type='datetime-local' placeholder="Date Time" class="form-control mb-3" min="${new Date()}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" id="dueDate" required/>
                <input type='submit' class="btn btn-block btn-outline-danger mb-3" onclick="createOne()" value="Save Todo"/>
            </div> 
        </div>
    `)
}