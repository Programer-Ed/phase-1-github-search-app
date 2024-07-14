const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const search = document.getElementById("search");
const Form = document.getElementById("github-form");

const getUser = async (username) => {
    try {
        const response = await fetch(API_URL + username);
        const data = await response.json();
        const card = `
        <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="image" class="avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers}<strong> Followers</strong></li>
                    <li>${data.following}<strong> Following</strong></li>
                    <li>${data.public_repos}<strong> Repos</strong></li>
                </ul>
                <div id="repo"></div>
            </div>
        </div>`;
        main.innerHTML = card;
        getRepos(username);
    } catch (error) {
        if (error.status == 404) {
            createErrorCard('No profile with this Username');
        }
    }
}

const getRepos = async (username) => {
    try {
        const repos = document.getElementById("repo");
        const response = await fetch(API_URL + username + "/repos");
        const data = await response.json();
        data.map((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        })
    } catch (error) {
        createErrorCard('No profile with this Username');
    }
}

const formSubmit = (e) => {
    e.preventDefault();
    if (search.value !== "") {
        getUser(search.value);
        search.value = "";
    }
}

Form.addEventListener("submit", formSubmit);

const createErrorCard = (msg) => {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>`;
    main.innerHTML = cardHTML;
}

getUser("Programer-Ed");