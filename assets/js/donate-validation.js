document.addEventListener('DOMContentLoaded', () => {
    console.log('donate-validation.js loaded');

    // Select form elements for each step
    const step1Form = document.querySelector('#step1');
    const step2Form = document.querySelector('#step2');
    const step3Form = document.querySelector('#step3');
    const donationAmountInput = document.getElementById('donationAmount');

    // 👉 SỬA Ở ĐÂY: dùng class "donate-input-with-icon-1" thay vì "form-control"
    const countrySelect = document.querySelector('#step1 select.donate-input-with-icon-1');
    const projectSelect = document.querySelector('#step1 select.donate-input-with-icon-2');
    const dateInput = document.querySelector('#step1 input[placeholder="Ngày muốn quyên góp"]');
    const nameInput = document.querySelector('#step2 input[placeholder="Họ và tên"]');
    const emailInput = document.querySelector('#step2 input[placeholder="Email"]');
    const phoneInput = document.querySelector('#step2 input[placeholder="Số điện thoại"]');
    const addressInput = document.querySelector('#step2 input[placeholder="Địa chỉ"]');
    const paymentOptions = document.querySelectorAll('#payment-methods .payment-option');
    const termsCheckbox = document.querySelector('#step3 .form-check-input');
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');

    // QR Toggle
    function showQRInfo() {
        document.querySelector("#contact-info .contact-box").style.display = "none";
        document.getElementById("qr-info").style.display = "block";
    }

    function hideQRInfo() {
        document.querySelector("#contact-info .contact-box").style.display = "block";
        document.getElementById("qr-info").style.display = "none";
    }

    // Validation helpers
    function isValidDate(dateString) {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(dateString)) return false;
        const [day, month, year] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }

    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    function isValidAmount(amount) {
        const num = parseInt(amount.replace(/[^0-9]/g, ''), 10);
        return !isNaN(num) && num > 1000;
    }

    function showError(input, message) {
        const parent = input?.parentElement;
        if (!parent) return;
        let error = parent.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.fontSize = '12px';
            error.style.marginTop = '5px';
            parent.appendChild(error);
        }
        error.textContent = message;
    }

    function clearError(input) {
        const parent = input?.parentElement;
        const error = parent?.querySelector('.error-message');
        if (error) error.remove();
    }

    // Step 1 validation
    function validateStep1() {
        let isValid = true;

        if (!countrySelect || !countrySelect.value) {
            showError(countrySelect, 'Vui lòng chọn quốc gia.');
            isValid = false;
        } else {
            clearError(countrySelect);
        }

        if (!projectSelect || !projectSelect.value) {
            showError(projectSelect, 'Vui lòng chọn dự án.');
            isValid = false;
        } else {
            clearError(projectSelect);
        }

        if (!dateInput || !isValidDate(dateInput.value)) {
            showError(dateInput, 'Vui lòng nhập ngày đúng định dạng DD-MM-YYYY.');
            isValid = false;
        } else {
            clearError(dateInput);
        }

        const isCustomAmount = document.getElementById('customAmountInput')?.style.display !== 'none';
        const amountInput = isCustomAmount ? document.querySelector('#customAmountInput input') : donationAmountInput;

        if (!amountInput || !amountInput.value || !isValidAmount(amountInput.value)) {
            showError(amountInput, 'Vui lòng nhập số tiền hợp lệ (> 1.000 VND).');
            isValid = false;
        } else {
            clearError(amountInput);
        }

        return isValid;
    }

    // Step 2 validation
    function validateStep2() {
        let isValid = true;

        if (!nameInput?.value.trim()) {
            showError(nameInput, 'Vui lòng nhập họ và tên.');
            isValid = false;
        } else clearError(nameInput);

        if (!emailInput?.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showError(emailInput, 'Vui lòng nhập email hợp lệ.');
            isValid = false;
        } else clearError(emailInput);

        if (!phoneInput?.value.trim() || !isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Số điện thoại phải có đúng 10 chữ số.');
            isValid = false;
        } else clearError(phoneInput);

        if (!addressInput?.value.trim()) {
            showError(addressInput, 'Vui lòng nhập địa chỉ.');
            isValid = false;
        } else clearError(addressInput);

        return isValid;
    }

    // Step 3 validation
    function validateStep3() {
        let isValid = true;

        const selected = Array.from(paymentOptions).some(el => el.classList.contains('active'));
        if (!selected) {
            showError(document.querySelector('#payment-methods'), 'Vui lòng chọn phương thức thanh toán.');
            isValid = false;
        } else {
            clearError(document.querySelector('#payment-methods'));
        }

        if (!termsCheckbox?.checked) {
            showError(termsCheckbox, 'Vui lòng đồng ý với các điều khoản.');
            isValid = false;
        } else clearError(termsCheckbox);

        return isValid;
    }

    // Step Navigation
    function goToStep(stepNumber) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`step${i}`).classList.add('hidden');
            document.getElementById(`circle${i}`).classList.remove('active');
            document.getElementById(`label${i}`).classList.remove('active');
        }
        document.getElementById(`step${stepNumber}`).classList.remove('hidden');
        document.getElementById(`circle${stepNumber}`).classList.add('active');
        document.getElementById(`label${stepNumber}`).classList.add('active');
    }

    nextButtons.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let isValid = false;
            if (idx === 0) isValid = validateStep1();
            if (idx === 1) isValid = validateStep2();
            if (idx === 2) isValid = validateStep3();
            if (idx === 3) {
                goToStep(1);
                hideQRInfo();
                return;
            }
            if (isValid) {
                goToStep(idx + 2);
                if (idx === 1 || idx === 2) showQRInfo();
            }
        });
    });

    backButtons.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            goToStep(idx + 1);
            hideQRInfo();
        });
    });

    // Country log
    countrySelect?.addEventListener('change', () => {
        console.log('Country selected:', countrySelect.value);
    });
});
