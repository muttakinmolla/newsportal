
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
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
        .catch((error) => {
            console.log(error)
        });

}

const displayCategoryNews = (categoryNews) => {
    console.log(categoryNews)

    const categoryNewsContainer = document.getElementById('category-news-container');
    categoryNewsContainer.innerHTML = ``;
    categoryNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row', 'g-0', 'mb-3', 'border', 'rounded');
        newsDiv.innerHTML = `
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid" alt="...">
            </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <div class="row">
                            <div class="col-sm-3 d-flex align-items-center">
                                <div class="w-25 rounded-circle">
                                    <img src="./other/tree-736885__480.jpg"
                                        class="img-fluid  rounded-circle" alt="">
                                </div>
                                <div class="ps-2">
                                    <span class="author-name">this is name</span>
                                    <br>
                                    <span class="blog-publish-date">23-2435-235</span>
                                </div>
                            </div>
                            <div class="col-sm-3 d-flex justify-content-center align-items-center">
                                <i class="fa-regular fa-eye"></i> <span class="ps-2">1.5M</span>
                            </div>
                            <div class="col-sm-3 d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                    class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <div class="col-sm-3 d-flex justify-content-end align-items-center">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `
        categoryNewsContainer.appendChild(newsDiv);
    })

}


category()