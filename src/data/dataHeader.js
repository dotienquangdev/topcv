const dataHeader = [
  {
    id: "jobs_a1",
    className: "nav-item",
    title: "Việc làm",
    child: [
      {
        id: "jobs_main",
        className: "nav-child",
        title: "",
        childJobs: [
          {
            className: "nav-sub",
            title: "Việc làm",
            icon: "",
            childText: [
              {
                className: "nav-icon",
                title: "Tìm việc làm",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/search-job.png",
              },
              {
                className: "nav-icon",
                title: "Việc làm đã lưu",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/saved-jobs.png",
              },
              {
                className: "nav-icon",
                title: "Việc làm đã ứng tuyển",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/applied-jobs.png",
              },
              {
                className: "nav-icon",
                title: "Việc làm phù hợp",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/suitable-jobs.png",
              },
            ],
          },
          {
            className: "nav-sub",
            title: "Công ty",
            icon: "",
            childText: [
              {
                className: "nav-icon",
                title: "Danh sách công ty",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/company.png",
              },
              {
                className: "nav-icon",
                title: "Top công ty",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/job-search/top-companies.png",
              },
            ],
          },
        ],
      },
      {
        id: "jobs_location",
        className: "nav-child nav-childs",
        title: "Việc làm theo vị trí",
        childJobs: [
          {
            className: "nav-subs",
            link: "http://localhost:9000/api/categories/getCategories",
          },
        ],
      },
    ],
  },
  {
    id: "cv_a1",
    className: "nav-item",
    title: "Tạo CV",
    child: [
      {
        id: "new_cv",
        className: "nav-child",
        title: "New CV",
        childJobs: [
          {
            className: "nav-sub",
            title: "Mẫu CV theo style",
            childText: [
              { title: "Mẫu CV Đơn giản" },
              { title: "Mẫu CV Ấn tượng" },
              { title: "Mẫu CV Chuyên nghiệp" },
              { title: "Mẫu CV Hiện đại" },
            ],
          },
          {
            className: "nav-sub",
            title: "Mẫu CV theo vị trí ứng tuyển",
            childText: [
              {
                title: "Nhân viên kinh doanh",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/cv-manage/pen-tool.png",
              },
              {
                title: "Nhân viễn kế toán",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/cv-manage/pen-tool.png",
              },
              {
                title: "Chuyên viên marketing",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/cv-manage/pen-tool.png",
              },
              {
                title: "Lập trình viên",
                icon: "https://www.topcv.vn/v4/image/header/navigation/navigation-left/cv-manage/pen-tool.png",
              },
            ],
          },
        ],
      },
      {
        id: "manage_cv",
        className: "nav-child",
        icon: "",
        title: "Quản lý CV",
        childJobs: [
          {
            className: "nav-sub",
            icon: "",
            title: "Quản lý CV",
          },
          {
            className: "nav-sub",
            icon: "",
            title: "Tải CV lên",
          },
          {
            className: "nav-sub",
            icon: "",
            title: "Hướng dẫn viết CV",
          },
          {
            className: "nav-sub",
            icon: "",
            title: "Quản lý Cover Letter",
          },
          {
            className: "nav-sub",
            icon: "",
            title: "Mẫu Cover Letter",
          },
        ],
      },
    ],
  },
  {
    id: "cv_a2",
    className: "nav-item",
    title: "Công cụ",
    child: [],
  },
  {
    id: "cv_a3",
    className: "nav-item",
    title: "Cẩm nang nghề nghiệp",
    child: [],
  },
  {
    id: "cv_a4",
    className: "nav-item",
    title: "Top CV",
    child: [],
  },
];

module.exports = dataHeader;
