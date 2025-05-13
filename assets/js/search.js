const toggle = document.getElementById("searchToggle");
const container = document.querySelector(".search");

toggle.addEventListener("click", function (e) {
	e.preventDefault();
	container.classList.toggle("active");

	// Tự động focus vào ô input nếu hiện ra
	const input = container.querySelector("input");
	if (container.classList.contains("active")) {
		setTimeout(() => input.focus(), 100);
	}
});

// Đóng dropdown khi click ra ngoài
document.addEventListener("click", function (e) {
	if (!container.contains(e.target)) {
		container.classList.remove("active");
	}
});
