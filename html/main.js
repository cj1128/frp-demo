var $username = $("[name=username]")
var $password = $("[name=password]")
var $btn = $("button")

$btn.click(function(evt) {
  evt.preventDefault()
  btnClicked = true
  setButtonState()

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
var usernameAvailable, checkingUsername, prevUsername, timeout, btnClicked, counter = 0

$username.keyup(function(evt) {
  var username = $username.val()
  if(username === prevUsername) return
  usernameAvailable = false
  setButtonState()
  clearAllInfo()

  if(username.length === 0) return

  if(timeout) clearTimeout(timeout)
  prevUsername = username
  timeout = setTimeout(function() {
    checkingUsername = true
    toggleCheckingIndicator()
    var id = ++counter
    $.ajax({
      url: "/check",
      data: {
        username: $username.val(),
      },
      success: function(res) {
        if(id !== counter) return
        checkingUsername = false
        usernameAvailable = res.available
        setButtonState()
        toggleCheckingIndicator()
        showResult()
      },
    })
  }, 500)
})

$password.keyup(function(evt) {
  setButtonState()
})

function setButtonState() {
  var enabled = $username.val().length > 0 &&
    $password.val().length > 0 &&
    usernameAvailable &&
    !btnClicked
  $btn.prop("disabled", !enabled)
}

function toggleCheckingIndicator() {
  $("#result-ok").hide()
  $("#result-bad").hide()
  if(checkingUsername) {
    $("#indicator").show()
  } else {
    $("#indicator").hide()
  }
}

function showResult(available) {
  usernameAvailable ? $("#result-ok").show() : $("#result-bad").show()
}

function clearAllInfo() {
  $("#result-ok").hide()
  $("#result-bad").hide()
  $("#indicator").hide()
}

setButtonState()
