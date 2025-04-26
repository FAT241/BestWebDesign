const storiesData = [
	{
		title: "Học bổng cho trẻ em vùng cao",
		description: "Hỗ trợ học bổng cho 300 trẻ em tại Lào Cai, giúp các em có cơ hội đến trường.",
		image: "./assets/img/hocbongvungcao.jpg",
		tags: ["trẻ em", "học bổng", "vùng cao"],
	},
	{
		title: "Xây trường học tại Điện Biên",
		description: "Dự án xây dựng trường học mới cho trẻ em tại Điện Biên, hoàn thành năm 2024.",
		image: "./assets/img/slide-2.webp",
		tags: ["trẻ em", "trường học", "xây dựng"],
	},
	{
		title: "Tình nguyện dạy học hè",
		description: "Chương trình tình nguyện dạy học hè cho trẻ em tại Yên Bái, thu hút 50 tình nguyện viên.",
		image: "./assets/img/slide-3.webp",
		tags: ["trẻ em", "tình nguyện", "dạy học"],
	},
	{
		title: "Quyên góp sách vở cho trẻ em nghèo",
		description: "Thu thập và phân phát 1.000 bộ sách vở cho trẻ em nghèo tại Hà Giang.",
		image: "./assets/img/section-welcome.jpeg",
		tags: ["trẻ em", "quyên góp", "sách vở"],
	},
];

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
