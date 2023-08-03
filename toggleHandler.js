const toggle = document.querySelector(".toggle");
const passw = document.querySelector("#password");
toggle.addEventListener("click", () => {
  toggle.textContent =
    toggle.textContent == "visibility" ? "visibility_off" : "visibility";
  passw.type = passw.type == "text" ? "password" : "text";
});
passw.addEventListener("input", (e) => {
  if (e.target.value == "") toggle.style.visibility = "hidden";
  else toggle.style.visibility = "visible";
});
