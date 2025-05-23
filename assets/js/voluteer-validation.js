// volunteer-validation.js

document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".volunteer-card-form");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const fullName = document.getElementById("fullName");
		const dob = document.getElementById("dob");
		const email = document.getElementById("email");
		const phone = document.getElementById("phone");
		const location = document.getElementById("location");
		const interest = document.getElementById("interest");
		const availability = document.getElementById("availability");
		const privacyPolicy = document.getElementById("privacyPolicy");

		let isValid = true;

		clearErrors();

		if (!fullName.value.trim()) {
			showError(fullName, "Vui lòng nhập họ và tên.");
			isValid = false;
		}

		if (!isValidDate(dob.value.trim(), dob.type)) {
			showError(dob, "Vui lòng nhập ngày sinh hợp lệ (DD-MM-YYYY hoặc dùng lịch).");
			isValid = false;
		}

		if (!validateEmail(email.value)) {
			showError(email, "Email không hợp lệ.");
			isValid = false;
		}

		if (!/^[0-9]{10}$/.test(phone.value.trim())) {
			showError(phone, "Số điện thoại phải gồm 10-11 chữ số.");
			isValid = false;
		}

		if (!location.value) {
			showError(location, "Vui lòng chọn khu vực.");
			isValid = false;
		}

		if (!interest.value) {
			showError(interest, "Vui lòng chọn lĩnh vực.");
			isValid = false;
		}

		if (!availability.value.trim()) {
			showError(availability, "Vui lòng nhập thời gian/kỹ năng tham gia.");
			isValid = false;
		}

		if (!privacyPolicy.checked) {
			showError(privacyPolicy, "Bạn cần đồng ý với chính sách bảo mật.");
			isValid = false;
		}

		if (isValid) {
			form.submit();
		}
	});

	function validateEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email.toLowerCase());
	}

	function isValidDate(dateStr, type = "") {
		if (type === "date") return true; // native HTML5 date input

		// Format: DD-MM-YYYY
		const regex = /^\d{2}-\d{2}-\d{4}$/;
		if (!regex.test(dateStr)) return false;

		const [day, month, year] = dateStr.split("-").map(Number);
		const date = new Date(year, month - 1, day);
		return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
	}

	function showError(input, message) {
		const parent = input.closest(".col-6, .col-12") || input.parentElement;
		let error = parent.querySelector(".error-message");

		if (!error) {
			error = document.createElement("div");
			error.className = "error-message";
			error.style.color = "#ffc107";
			error.style.fontSize = "0.9rem";
			error.style.marginTop = "4px";
			error.setAttribute("role", "alert");
			parent.appendChild(error);
		}

		error.textContent = message;
		input.classList.add("is-invalid");
		input.setAttribute("aria-describedby", "error-" + input.id);
		error.id = "error-" + input.id;
	}

	function clearErrors() {
		document.querySelectorAll(".error-message").forEach((el) => el.remove());
		document.querySelectorAll(".is-invalid").forEach((el) => {
			el.classList.remove("is-invalid");
			el.removeAttribute("aria-describedby");
		});
	}
});
