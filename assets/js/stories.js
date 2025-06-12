console.log("stories.js loaded");

function waitForData(callback) {
	if (window.sharedData) {
		console.log("window.sharedData loaded:", window.sharedData);
		callback();
	} else {
		console.log("Waiting for window.sharedData...");
		setTimeout(() => waitForData(callback), 100);
	}
}

function showStories() {
	const storiesSection = document.getElementById("storiesSection");
	const storiesList = document.getElementById("storiesList");

	if (!storiesSection || !storiesList) {
		console.error("Không tìm thấy storiesSection hoặc storiesList");
		return;
	}

	if (!window.sharedData || window.sharedData.length === 0) {
		console.error("window.sharedData không tồn tại hoặc rỗng");
		storiesList.innerHTML = '<p class="text-center">Không có dự án nào để hiển thị.</p>';
		return;
	}

	const ITEMS_PER_LOAD = 6;
	let displayedCount = 0;

	// Hàm hiển thị dự án (thêm vào danh sách)
	function displayStories(startIndex, count) {
		const endIndex = Math.min(startIndex + count, window.sharedData.length);
		const storiesToShow = window.sharedData.slice(startIndex, endIndex);

		const htmlToAppend = storiesToShow
			.map((story, index) => {
				return `
					<div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(startIndex + index) * 100}">
						<div class="story-card">
							<img src="${story.image}" alt="${story.title}" onerror="this.src='../assets/img/welcome-section.jpeg'" loading="lazy" />
							<div class="card-body">
								<div class="card-text">
									<h3>${story.title}</h3>
									<p>${story.description}</p>
								</div>
								<a href="donate.html#donate" class="common-btn">Quyên góp ngay</a>
							</div>
						</div>
					</div>
				`;
			})
			.join("");

		storiesList.insertAdjacentHTML("beforeend", htmlToAppend);
		displayedCount = endIndex;
		updateLoadMoreButton();
	}

	// Tạo và cập nhật nút "Xem thêm"
	function updateLoadMoreButton() {
		let loadMoreBtn = document.getElementById("loadMoreBtn");
		if (!loadMoreBtn) {
			loadMoreBtn = document.createElement("button");
			loadMoreBtn.id = "loadMoreBtn";
			loadMoreBtn.className = "load-more-btn";
			loadMoreBtn.textContent = "Xem thêm";
			storiesSection.appendChild(loadMoreBtn);

			loadMoreBtn.addEventListener("click", () => {
				const remaining = window.sharedData.length - displayedCount;
				displayStories(displayedCount, remaining); // Hiển thị tất cả còn lại
			});
		}

		if (displayedCount >= window.sharedData.length) {
			loadMoreBtn.style.display = "none";
		} else {
			loadMoreBtn.style.display = "block";
		}
	}

	// Hiển thị dự án ban đầu
	storiesList.innerHTML = ""; // Xóa trước để tránh lặp
	displayStories(0, ITEMS_PER_LOAD);
}

waitForData(showStories);
