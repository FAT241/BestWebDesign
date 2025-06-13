const toggle = document.getElementById("searchToggle");
const container = document.querySelector(".search");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let storiesData = window.sharedData || [];

toggle.addEventListener("click", function (e) {
	e.preventDefault();
	container.classList.toggle("active");

	const input = container.querySelector("input");
	if (container.classList.contains("active")) {
		setTimeout(() => input.focus(), 100);
	}
});

// Đóng dropdown khi click ra ngoài
document.addEventListener("click", function (e) {
	if (!container.contains(e.target)) {
		container.classList.remove("active");
		searchResults.innerHTML = ""; // Xóa kết quả khi đóng
	}
});

// Hàm cuộn đến câu chuyện tương ứng
function scrollToStory(title) {
	const storyElement = document.querySelector(`#storiesList [data-title="${title}"]`);
	if (storyElement) {
		storyElement.scrollIntoView({ behavior: "smooth" });
		// Đóng dropdown sau khi cuộn
		container.classList.remove("active");
		searchResults.innerHTML = "";
	} else {
		console.warn(`Không tìm thấy phần tử cho tiêu đề: ${title}`);
	}
}

// Theo dõi thay đổi dữ liệu khi có thêm câu chuyện
function updateStoriesData() {
	storiesData = window.sharedData || [];
	performSearch(searchInput.value);
}

// Tìm kiếm theo tiêu đề và tags
function performSearch(query) {
	const searchQuery = query.toLowerCase().trim();
	searchResults.innerHTML = "";

	if (searchQuery.length > 0) {
		const filteredStories = storiesData.filter((story) => story.title.toLowerCase().includes(searchQuery) || (story.tags && story.tags.some((tag) => tag.toLowerCase().includes(searchQuery))));

		if (filteredStories.length > 0) {
			filteredStories.forEach((story) => {
				const resultItem = document.createElement("div");
				resultItem.className = "search-result-item";
				const storyId = story.title.replace(/\s+/g, "-").toLowerCase();
				resultItem.innerHTML = `<a href="#${storyId}" onclick="scrollToStory('${story.title.replace(/'/g, "\\'")}')">${story.title}</a>`;
				searchResults.appendChild(resultItem);
			});
		} else {
			searchResults.innerHTML = "<div class='search-result-item'>Không tìm thấy kết quả</div>";
		}
	}
}

searchInput.addEventListener("input", function () {
	performSearch(this.value);
});

// Theo dõi thay đổi trong window.sharedData
Object.defineProperty(window, "sharedData", {
	set: function (newValue) {
		storiesData = newValue || [];
		performSearch(searchInput.value);
	},
	get: function () {
		return storiesData;
	},
});

// Gọi lại tìm kiếm khi dữ liệu thay đổi
window.addEventListener("sharedDataUpdated", updateStoriesData);

// Khởi tạo lần đầu
performSearch("");
