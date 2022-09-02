
const category = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch((error) => {
            console.log(error)
        });
}

const displayCategory = (categories) => {
    // console.log(categories)
    const categoryTitle = document.getElementById('category-title');

    categories.forEach(category => {
        const li = document.createElement('div');
        li.classList.add('nav-item');
        li.classList.add('p-2');
        li.innerHTML = `
            <a type="button" onclick="categoryNews('${category.category_id}' )" class="nav-link active" aria-current="page" >${category.category_name}</a>
        `
        categoryTitle.appendChild(li);
    })

}

const categoryNews = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    console.log(id)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
        .catch((error) => {
            console.log(error)
        });

}

const displayCategoryNews = (categoryNews) => {

    const categoryCount = document.getElementById('category-count');
    categoryCount.innerText = categoryNews.length;

    const categoryNewsContainer = document.getElementById('category-news-container');
    categoryNewsContainer.innerHTML = ``;
    categoryNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row', 'g-0', 'mb-3', 'border', 'rounded');
        newsDiv.innerHTML = `
            <div class="col-sm-3 text-center text-lg-start">
                <img src="${news.thumbnail_url}" class="img-fluid" alt="...">
            </div>
                <div class="col-sm-9">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.length > 200 ? news.details.substring(0, 200) + '...' : news.details}</p>
                        <div class="row">
                            <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center">
                                <div class="w-25 rounded-circle">
                                    <img src="${news.author.img ? news.author.img : 'not available'}"
                                        class="img-fluid  rounded-circle" alt="">
                                </div>
                                <div class="ps-2 ">
                                    <span class="author-name">${news.author.name ? news.author.name : 'not available'}</span>
                                    <br>
                                    <span class="blog-publish-date">${news.author.published_date ? news.author.published_date : 'not available'}</span>
                                </div>
                            </div>
                            <div class="col-4 pt-3 col-sm-3 pt-2 d-flex justify-content-center align-items-center">
                                <i class="fa-regular fa-eye"></i> <span class="ps-2">${news.total_view ? news.total_view : 'not available'}</span>
                            </div>
                            <div class="col-4 pt-3 col-sm-3 pt-2 d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                    class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <div class="col-4 pt-3 col-sm-3 d-flex justify-content-end align-items-center">
                            <a type="button" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">
                                 <i class="fa-solid fa-arrow-right"></i>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
        `
        categoryNewsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);

}

const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    console.log(newsId)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch((error) => {
            console.log(error)
        });
}

const displayNewsDetails = (news) => {

    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ``;

    const newsDiv = document.createElement('div');
    newsDiv.classList.add('row');
    newsDiv.classList.add('row', 'g-0', 'mb-3', 'border', 'rounded');
    newsDiv.innerHTML = `
            <div class="col-sm-12 text-center">
                <img src="${news.thumbnail_url}" class="img-fluid" alt="...">
            </div>
                <div class="col-sm-12">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details} </p>
                        <div class="row">
                            <div class="col-12 col-sm-12 d-flex justify-content-center align-items-center">
                                <div class="w-25 rounded-circle">
                                    <img src="${news.author.img ? news.author.img : 'not available'}"
                                        class="img-fluid  rounded-circle" alt="">
                                </div>
                                <div class="ps-2">
                                    <span class="author-name">${news.author.name ? news.author.name : 'not available'}</span>
                                    <br>
                                    <span class="blog-publish-date">${news.author.published_date ? news.author.published_date : 'not available'}</span>
                                </div>
                            </div>
                            <div class="col-6 pt-3 col-sm-6 d-flex justify-content-start align-items-center">
                             <i class="fa-regular fa-eye"></i> <span class="ps-2">${news.total_view ? news.total_view : 'not available'}</span>
                            </div>
                            <div class="col-6 pt-3 col-sm-6 d-flex justify-content-end align-items-center">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                    class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `
    newsDetails.appendChild(newsDiv);
}

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

category()