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

// Status variable
var usernameAvailable, checkingUsername

$username.keyup(function(evt) {
  usernameAvailable = false
  checkingUsername = true
  setButtonState()
  setIndicator()
  $.ajax({
    url: "/check",
    data: {
      username: $username.val(),
    },
    success: function(res) {
      checkingUsername = false
      usernameAvailable = res.available
      setButtonState()
      setIndicator()
      showResult(res.available)
    },
  })
})

$password.keyup(function(evt) {
  setButtonState()
})

function setButtonState() {
  var enabled = $username.val().length > 0 &&
    $password.val().length > 0 &&
    usernameAvailable
  $btn.prop("disabled", !enabled)
}

function setIndicator() {
  $("#result-ok").hide()
  $("#result-bad").hide()
  if(checkingUsername) {
    $("#indicator").show()
  } else {
    $("#indicator").hide()
  }
}

function showResult(available) {
  available ? $("#result-ok").show() : $("#result-bad").show()
}

setButtonState()
