const menu_click = document.querySelector('.icon-container')
const mobile_links =  document.querySelector('.mobile-links')
const type_close_button = document.querySelector('.type-close')
const lang_close_button = document.querySelector('.languages-close')
const type_menu_button =document.querySelector('.type-menu-button')
const lang_menu_button =document.querySelector('.lang-menu-button')
const type_div = document.querySelector('.type')
const lang_div = document.querySelector('.language')
const float_img = document.getElementById('col-1-float')
const repsitory_links = document.querySelector('.repo-links')
const repository_details_menu = document.querySelector('.details-menu')

let toggle = false
let type_open = false
let language_open = false
let repository_toggle = false
mobile_links.style.display = "none"

const encodedToken = "YWY5M2FmNzk1ZWQ3NTc5ZjE5ZTg1YmNhYjExYzdjZDZkNzI5ZTBmNg=="
const user = "samoffem"
const base_url = "https://api.github.com/graphql"
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${atob(encodedToken)}`

}

document.addEventListener('scroll', ()=>{
    if(window.scrollY >=375){
        float_img.style.display = "flex"
    }else{
        float_img.style.display = "none"
    }
})

menu_click.addEventListener('click', ()=>{
    toggle = !toggle
    if(toggle === true){
        console.log("i displayed")
        mobile_links.style.display = "block"
    }else{
        mobile_links.style.display = "none"
    }
})

type_menu_button.addEventListener('click', ()=>{
    type_open = !type_open
    if(type_open === true){
        type_div.style.display = "block"
    }else{
        type_div.style.display = "none"
    }
})
lang_menu_button.addEventListener('click', ()=>{
    language_open = !language_open
    if(language_open === true){
        lang_div.style.display = "block"
    }else{
        lang_div.style.display = "none"
    }
})

type_close_button.addEventListener('click', ()=>{
    type_div.style.display = "none"
    type_open = false
})
lang_close_button.addEventListener('click', ()=>{
    lang_div.style.display = "none"
    language_open = false
})

repsitory_links.addEventListener('click', ()=>{
    repository_toggle = !repository_toggle
    if(repository_toggle){
        repository_details_menu.style.display = "block"
    }else{
        repository_details_menu.style.display = "none"
    }
})

const formatDate = (date)=>{

    let received_date = new Date(date)
    let now_date = new Date()
    let formatted_date = ""
    
    let r_date_year = received_date.getFullYear(),
    r_date_month = received_date.getMonth(), 
    r_date_day = received_date.getDate();

    let n_date_year = now_date.getFullYear(), 
    n_date_month= now_date.getMonth(), 
    n_date_day = now_date.getDay();

    if(r_date_year !== n_date_year){
        //get year, month and day
        formatted_date = `on ${received_date.toLocaleString('default', {month: 'short'})} ${r_date_day}, ${r_date_year}`

    }else if(r_date_year === n_date_year && n_date_month > r_date_month){
        //get month and day
        formatted_date = `on ${received_date.toLocaleString('default', {month: 'short'})} ${r_date_day}`

    }else if(r_date_year === n_date_year && n_date_month === r_date_month && ((Math.abs(now_date - received_date)/ 36e5)>=24)){
        //get days
        let diff_in_time = now_date.getTime() - received_date.getTime()
        let diff_in_days = Math.floor(diff_in_time / (1000*3600*24))
        formatted_date = `${diff_in_days} days ago`

    }else if(r_date_year === n_date_year && n_date_month === r_date_month && ((Math.abs(now_date - received_date)/ 36e5)<24)){
        // get hours
        let hours = Math.floor(Math.abs(now_date - received_date)/ 36e5); //36e5 is scientific notation for 60 * 60 * 1000 i.e 3600000
        formatted_date = `${hours} hours ago`
    }
    return formatted_date

}

const colorPicker = (lang_name)=>{
    color = ""
    switch (lang_name) {
        case "JavaScript":
            color = "#f1e05a"
            break;
        case "Python":
            color = "#3572a5"
            break;
        case "HTML":
            color = "#e34c26"
        default:
            break;
    }
    return color
}

const updateRepositories = (user)=>{
    let wrapper = document.querySelector('.repositories')
    for(let i = user.repositories.totalCount-1; i >= 0; i--){
        const lanuage_color = colorPicker(user.repositories.nodes[i].primaryLanguage.name)
        let time = formatDate(user.repositories.nodes[i].updatedAt)
        
        let repository = `<li class="repository">
        <div class="repository-details">
            <div class="repository-name">
                <h3 id="repo-name">${user.repositories.nodes[i].name}</h3>
            </div>
            <div class="repository-description">
                <p id="repo-description">
                ${user.repositories.nodes[i].description}
                </p>
            </div>
            <div class="dev-details">
                <div class="name-color">
                    <span style="background-color: ${lanuage_color};" class="language-color"></span>
                    <span id="repo-language" class="language-name">${user.repositories.nodes[i].primaryLanguage.name}</span>
                </div>
                <div class="star">
                    <p class="center-items">
                        <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" 
                        width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 
                        01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 
                        01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 
                        01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 
                        01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 
                        01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 
                        01-.564-.41L8 2.694v.001z"></path>
                        </svg><span class="star-count">${user.repositories.nodes[i].stargazerCount}</span>
                    </p>
                </div>
                <div class="mit-license">
                    <span class="center-items">
                        <svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" 
                        aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 
                        0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 
                        00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 
                        00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 
                        00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 
                        00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 
                        01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 
                        01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 
                        00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 
                        00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 
                        00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 
                        00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 
                        0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305
                        2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
                        MIT License
                    </span>
                </div>
                <div class="time-updated">
                    <span>Updated <span class="dynamic-time">${time}</span>
                </div>
            </div>

        </div>

        <div class="star-button">
            <button>
                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" 
                aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 
                4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 
                1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 
                0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 
                3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 
                0 01-.564-.41L8 2.694v.001z"></path></svg>
                Star
            </button>

        </div>
    </li>`
    wrapper.innerHTML +=repository

    }   
}

const updateUI = (user)=>{
    document.getElementById('nav-img').src = user.avatarUrl
    document.getElementById('floating-img').src = user.avatarUrl
    document.querySelector('.repo-number').textContent = user.repositories.totalCount
    document.querySelector('.avatar').src = user.avatarUrl
    document.getElementById('mobile-nav-pic').src = user.avatarUrl
    document.querySelector('.full-name').textContent = user.name
    document.getElementById('about-content').textContent = user.bio
    document.getElementById('followers-count').textContent = user.followers.totalCount
    document.getElementById('following-count').textContent = user.following.totalCount
    document.getElementById('location').textContent = user.location
    document.getElementById('twitter-id').textContent ='@'+ user.twitterUsername
    updateRepositories(user)


}


const body = {
    query: `query { 
        user(login: "samoffem") { 
         bio,
          avatarUrl,
          name,
          followers{
            totalCount
          },
          following{
            totalCount
          },
          location,
          twitterUsername,
          repositories(first:20){
            totalCount,
            nodes{
              name,
              description,
              stargazerCount,
              primaryLanguage{
                name
              },
              updatedAt
            }
          }
        }
      }`
}
fetch(base_url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
})
.then(res=>res.json())
.then(body=> body.data)
.then(data=>data.user)
.then(user=>{
    updateUI(user)
})
.catch(err=>{
    console.log(err)
})