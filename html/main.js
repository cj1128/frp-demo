var $username = $("[name=username]")
var $password = $("[name=password]")
var $btn = $("button")


$btn.click(function(evt) {
  evt.preventDefault()

  $.ajax({
    type: "POST",
    url: "/register",
    data: {
      username: $username.val(),
      password: $password.val(),
    },
    success: function() {
      alert("Success!")
    },
  })
})
