document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('searchResults');

    // Dữ liệu tìm kiếm
    const searchData = [
        {
            title: "Học bổng cho trẻ em vùng cao",
            description: "Hỗ trợ học bổng cho 300 trẻ em tại Lào Cai, giúp các em có cơ hội đến trường.",
            image: "./assets/img/hocbongvungcao.jpg",
            tags: ["trẻ em", "học bổng", "vùng cao"]
        },
        {
            title: "Xây trường học tại Điện Biên",
            description: "Dự án xây dựng trường học mới cho trẻ em tại Điện Biên, hoàn thành năm 2024.",
            image: "./assets/img/slide-2.webp",
            tags: ["trẻ em", "trường học", "xây dựng"]
        },
        {
            title: "Tình nguyện dạy học hè",
            description: "Chương trình tình nguyện dạy học hè cho trẻ em tại Yên Bái, thu hút 50 tình nguyện viên.",
            image: "./assets/img/slide-3.webp",
            tags: ["trẻ em", "tình nguyện", "dạy học"]
        },
        {
            title: "Quyên góp sách vở cho trẻ em nghèo",
            description: "Thu thập và phân phát 1.000 bộ sách vở cho trẻ em nghèo tại Hà Giang.",
            image: "./assets/img/section-welcome.jpeg",
            tags: ["trẻ em", "quyên góp", "sách vở"]
        }
    ];

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
                    <img src="${result.image}" alt="${result.title}" onerror="this.src='./assets/img/section-welcome.jpeg'" />
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