const url = 'http://localhost:3000/'

$(document).ready( function() {
    loginForm()
    checkLogin()
})

function checkLogin() {
    let token = localStorage.getItem('token')
    if(token) {
        window.location = '/'
    }
}


function loginForm() {
    $("#formAuth").html("")
    $("#formAuth").append(`
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus>
                <label for="email">Email address</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="password" class="form-control" placeholder="Password" required>
                <label for="password">Password</label>
              </div>

              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onclick="login()">Sign in</button>
              <hr class="my-4">
              <center>Don't have an account ?</center>
              <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit" onclick="registerForm()"> Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    `)
}

function registerForm() {
    $("#formAuth").html("")
    $("#formAuth").append(`
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              <form class="form-signin">
                <div class="form-label-group">
                    <input type="name" id="name" class="form-control" placeholder="Full Name">
                    <label for="name">Full Name</label>
                </div>
                <div class="form-label-group">
                  <input type="email" id="email" class="form-control" placeholder="Email Address">
                  <label for="email">Email Address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="password" class="form-control" placeholder="Password">
                  <label for="password">Password</label>
                </div>

        
                <hr class="my-4">
                <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit" onclick="register()"> Register</button>
            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    `)
}

function login() {
    let email = $("#email").val()
    let password = $("#password").val()
    
    $.ajax({
        url: url + `/signin`,
        method: 'POST',
        data: { 
          email, 
          password 
        }
    })
    .done(function(result) {
        if(result.token) {
            localStorage.setItem('token', result.token)
            window.location = '/'
        }
    })
    .fail(function(error) {})
}

function register() {
    let name = $("#name").val()
    let email = $("#email").val()
    let password = $("#password").val()
    
    $.ajax({
        url: url + `/signup`,
        method: 'POST',
        data: { 
          name, 
          email, 
          password 
        }
    })
    .done(function(result) {
        if(result.token) {
            localStorage.setItem('token', result.token)
            window.location = '/'
        }
    })
    .fail(function(error) {
        fail('Failed to login, please check your account')
    })
}

function success(msg) {
    $("#alert").append(`
        <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Thanks you, ${msg}</p>
        </div>
    `)
    $("#alert").text("")
}

function fail(msg) {
    $("#alert").append(`
        <div class="alert alert-warning" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Sorry, ${msg}</p>
        </div>
    `)
    $("#alert").text("")
}

