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
        post.innerHTML = data[i].content;
        postsList.appendChild(post);
    }
}
getData();