async function updateLikeCount(id,part){
    console.log(id)
    let url;
    if(part==='main'){
        url = '/blog/view/like/'+id
    }
    else{
        url = '/blog/view/like/'+id
    }
    console.log(url)
    const response = await fetch(url, {
        method:'post',
        headers:{
            'Content-Type': 'application/json'},
        credentials: 'include'
    })
    if(response.ok){
        const data = await response.json()
        document.getElementById('like_count_'+id).innerText = data.liked_count
        const like_button = document.getElementById('like_button_'+id)
        if(data.liked){
            like_button.style.opacity = 1
            like_button.style.color = '#3d85e3'
        }
        else{
            like_button.style.opacity = .5
            like_button.style.color = 'gray'
        }
    }
}

async function checkLikeCount(id){
    const response = await fetch('/blog/view/like/check/'+id,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'},
        credentials: 'include'
    })
    if(response.ok){
        const data = await response.json()
        const like_button = document.getElementById('like_button_'+id)
        if(data.liked){
            like_button.style.opacity = 1
            like_button.style.color = '#3d85e3'
        }
        else{
            like_button.style.opacity = .5
            like_button.style.color = 'gray'
        }
    }
}
