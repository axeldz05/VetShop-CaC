const endpoint = `https://my-json-server.typicode.com/nitsugasos1/JSON-VET/post`

async function blogApi(endpoint, selector, template){
        try {
            const response = await fetch(endpoint)
            if(!response.ok){
                throw new Error("No funciono")
            }
            const data = await response.json()

          
            const posts = data
            
            const processedPost = posts.map(post => {
                 let truncatedContent = post.content;
                
                if(truncatedContent.length > 140){
                    truncatedContent = truncatedContent.substring(0, 140) + "..."
                    
                }
             
            return{
                ...post,
                content: truncatedContent
            }
        })
            
            const etiqueta = document.querySelector(selector)

            if(etiqueta){
                etiqueta.innerHTML = template(processedPost)
               
            }

        } catch (e) {
            console.error(e)
        }
}



function cardBlog(posts){
    let card = ``
    posts.forEach(post => {
        card += `<div class="card">
        <img src="${post.image}" alt="Card Image">
        <div class="card-content">
            <p class="date">${post.date} • ${post.tag}</p>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p class="author">Por ${post.author}</p>
        </div>
        </div>`
        console.log(card)
    })
   return card
}



blogApi(endpoint, ".cards-container", cardBlog)

function cardBlogMostVoted(posts){
    let card = ``;
    posts.forEach(post => {
        if (post.vote > 50){
        card += `<div class="card">
        <img src="${post.image}" alt="Card Image">
        <div class="card-content">
            <p class="date">${post.date} • ${post.tag}</p>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p class="author">Por ${post.author}</p>
        </div>
        </div>`
        console.log(card)
        }
    })
   return card
}

blogApi(endpoint, ".image-list", cardBlogMostVoted)
