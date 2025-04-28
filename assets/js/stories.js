// Sử dụng dữ liệu từ window.sharedData
const storiesData = window.sharedData;

// Hàm hiển thị danh sách dự án
function showStories() {
	const storiesSection = document.getElementById("storiesSection");
	const storiesList = document.getElementById("storiesList");
	if (storiesSection && storiesList) {
		storiesList.innerHTML = storiesData
			.map(
				(story) => `
            <div class="col-md-6 col-lg-3">
                <div class="story-card">
                    <img src="${story.image}" alt="${story.title}" onerror="this.src='./assets/img/section-welcome.jpeg'" />
                    <div class="card-body">
                        <h3>${story.title}</h3>
                        <p>${story.description}</p>
                    </div>
                </div>
            </div>
        `
			)
			.join("");
	} else {
		console.error("Không tìm thấy storiesSection hoặc storiesList");
	}
}