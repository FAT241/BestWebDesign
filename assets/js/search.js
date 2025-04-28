document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('searchResults');

    // Kiểm tra các phần tử DOM
    if (!searchInput || !searchButton || !resultsDiv) {
        console.error("Error: One or more DOM elements (searchInput, searchButton, resultsDiv) not found.");
        return;
    }

    // Sử dụng dữ liệu từ window.sharedData
    const searchData = window.sharedData;

    // Hàm xử lý tìm kiếm
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = '<p class="p-3">Vui lòng nhập từ khóa tìm kiếm!</p>';
            return;
        }

        // Lọc dữ liệu dựa trên từ khóa
        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some(tag => tag.toLowerCase().includes(query))
        );

        // Hiển thị kết quả
        if (results.length > 0) {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = results.map(result => `
                <div class="result-item">
                    <img src="${result.image}" alt="${result.title}" onerror="this.src='../assets/img/welcome-section.jpeg'" />
                    <div>
                        <a href="stories.html">${result.title}</a>
                        <p>${result.description}</p>
                    </div>
                </div>
            `).join('');
        } else {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = '<p class="p-3">Không tìm thấy kết quả phù hợp!</p>';
        }

        searchInput.value = '';
    }

    // Xử lý khi nhấn nút tìm kiếm
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Xử lý khi nhấn Enter trong ô input
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Ngăn hành vi mặc định (refresh trang)
                performSearch();
            }
        });
    }

    // Ẩn kết quả khi click ra ngoài
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.input-group') && !event.target.closest('#searchResults')) {
            if (resultsDiv) {
                resultsDiv.style.display = 'none';
            }
        }
    });
});