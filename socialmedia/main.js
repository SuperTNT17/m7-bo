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
        
        infoBar.appendChild(comments);
        infoBar.appendChild(likes);
        infoBar.appendChild(reposts);
        
        post.appendChild(userDate);
        post.appendChild(content);
        post.appendChild(infoBar);
        
        postsList.appendChild(post);
    }
}
getData();