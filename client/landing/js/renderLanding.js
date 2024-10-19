/* eslint-disable */

const mainUrlPage = "/"
const app = document.querySelector("#root")
const linkAuth = document.querySelector(".link")
const wrapperLanding = document.querySelector(".landing-wrapper")

linkAuth.addEventListener("click", e => {
	e.preventDefault()
	window.location.assign("/auth")
})

if (window.location.pathname !== mainUrlPage) {
	document.querySelectorAll(".wrapper-landing-style").forEach(link => {
		link.remove()
	})
	wrapperLanding.parentNode.removeChild(wrapperLanding)
}

if (window.location.pathname === mainUrlPage) app.parentNode.removeChild(app)
