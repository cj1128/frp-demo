var $username = $("[name=username]")
var $password = $("[name=password]")
var $btn = $("button")

function getStream($ele) {
  return Rx.Observable.fromEvent($ele, "keyup").pluck("target", "value").distinctUntilChanged().startWith("")
}

var usernameStream = getStream($username)
var passwordStream = getStream($password)
var btnClickedStream = Rx.Observable.fromEvent($btn, "click")

var enteredStream = usernameStream.combineLatest(passwordStream, function(username, password) {
  return username.length > 0 && password.length > 0
})

var ajaxStream = usernameStream
  .debounce(500)
  .filter(s => s.length > 0)
  .flatMapLatest(s => {
    setIndicator(true)
    return $.getJSON("/check", {username: s})
  })
  .map(res => {
    setIndicator(false)
    setResult(res.available)
    return res.available
  })

var availabilityStream = ajaxStream.merge(usernameStream.map(s => false))
availabilityStream.subscribe(clearResult)

var buttonStateStream = enteredStream.combineLatest(availabilityStream, (a, b) => a && b).merge(btnClickedStream.map(s => false))

buttonStateStream.subscribe(
  function(enabled) {
    $btn.prop("disabled", !enabled)
  }
)

function sendRequest(evt) {
  evt.preventDefault()
  return $.ajax({
    url: "/registerabc",
    method: "POST",
    data: {
      username: $username.val(),
      password: $password.val(),
    },
  })
}


function setIndicator(enabled) {
  clearResult()
  enabled ? $("#indicator").show() : $("#indicator").hide()
}

function clearResult() {
  $("#result-ok,#result-bad").hide()
}

function setResult(ok) {
  ok ? $("#result-ok").show() : $("#result-bad").show()
}
