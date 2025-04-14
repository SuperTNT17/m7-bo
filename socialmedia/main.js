// Deze observer zorgt er voor dat er iets gebeurt wanneer een element zichtbaar is in de viewport
const setupObserver = () => {
    const options = {
        root: null, // Observe the viewport
        rootMargin: "0px",
        threshold: 0, // Trigger when any part of the element is visible
    };

    this.observer = new IntersectionObserver(handleIntersect, options);

    // Observe the element
    const target = document.getElementById('infiniteScroll');
    if (target) {
        this.observer.observe(target);
    }
};

// De code voor wat er gebeurt als de observer het object ziet
// In dit geval roep ik mijn getData() function aan
const handleIntersect = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            getData();
        }
    })
}

// De data van de posts ophalen uit het json bestand
// Dit kan ook een api call zijn of iets uit een database als ik dat zou hebben
async function getData() {
    const url = "posts.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        makeposts(json);
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

// Maakt HTML elementen aan en zet er data in dat uit de json komt
// Ik heb het op deze manier gemaakt zodat het eindeloos posts aan kan maken (wel de hele tijd dezelfde inhoud)
function makeposts(data) {
    let postsList = document.getElementById("posts");

    for (let i = 0; i < data.length; i++) {
        let post = document.createElement("li");
        post.classList.add("post");

        let userDate = document.createElement("div");
        userDate.classList.add("userDate");

        let user = document.createElement("p");
        user.classList.add("user");
        user.innerHTML = data[i].user;

        let date = document.createElement("p");
        date.classList.add("date");
        date.innerHTML = data[i].date;

        userDate.appendChild(user);
        userDate.appendChild(date);

        let content = document.createElement("p");
        content.classList.add("content");
        content.innerHTML = data[i].content;

        let infoBar = document.createElement("div");
        infoBar.classList.add("infoBar");

        let comments = document.createElement("p");
        comments.innerHTML = `<i class="fa-solid fa-comment"></i> ${data[i].comments}`;

        let likes = document.createElement("p");
        likes.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${data[i].likes}`;

        let reposts = document.createElement("p");
        reposts.innerHTML = `<i class="fa-solid fa-repeat"></i> ${data[i].reposts}`;

        let share = document.createElement("p");
        share.innerHTML = `<i class="fa-solid fa-arrow-up-from-bracket"></i>`;

        infoBar.appendChild(comments);
        infoBar.appendChild(reposts);
        infoBar.appendChild(likes);

        post.appendChild(userDate);
        post.appendChild(content);
        post.appendChild(infoBar);

        postsList.appendChild(post);
    }
}

setupObserver();