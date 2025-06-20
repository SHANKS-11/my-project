

var bookNameInput = document.getElementById('bookmarkName')
var bookUrlInput = document.getElementById('bookmarkURL')

var Urlcartona = []

// if(localStorage.getItem('all Bookmarks') != null){

//     Urlcartona = JSON.parse(localStorage.getItem('all Bookmarks'))
// Dispaly()
// }

Urlcartona = JSON.parse(localStorage.getItem('all Bookmarks')) || []
Dispaly()




function urlValue(){
    var Url = {
        name: bookNameInput.value,
        url: bookUrlInput.value
    }
    if(validation(bookNameInput.id,bookNameInput.value)==true&&validation(bookUrlInput.id,bookUrlInput.value)==true)
    Urlcartona.push(Url)
    Dispaly()

    localStorage.setItem('all Bookmarks', JSON.stringify(Urlcartona))
}


function Dispaly(){
    var cartona = ``

    for (var i = 0; i < Urlcartona.length; i++) {
        cartona += `
                        <tr>
                  <td>${[i + 1]}</td>
                  <td>${Urlcartona[i].name}</td>              
                  <td>
                    <a href="${Urlcartona[i].url}">
                        <button class="btn btn-visit" data-index="0">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button>
                    </a>
                  </td>
                  <td>
                    <button onclick="deleteUrl(${i})"  class="btn btn-delete pe-2" data-index="0">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                  </td>
              </tr>
        `
    }

document.getElementById('tableContent').innerHTML = cartona
clearInputs()
}


function deleteUrl(index){
    Urlcartona.splice(index, 1)
    localStorage.setItem('all Bookmarks', JSON.stringify(Urlcartona))
    Dispaly()
}

function clearInputs(){
    bookNameInput.value = ''
    bookUrlInput.value = ''
    bookNameInput.classList.remove('is-valid')
    bookUrlInput.classList.remove('is-valid')
}



/////////////////validation/////////////

var selectedinput = document.querySelectorAll('.selectinput')


for(var i=0;selectedinput.length;i++){
    selectedinput[i].addEventListener(('input'),function(e){
        var inputid = e.target.id
        var inputvalue = e.target.value

        // console.log('id', inputid)
        // console.log('val', inputvalue)
        validation(inputid,inputvalue)
})
}

function validation(id,value){
        var regex = {
        bookmarkName:/^[a-z]{4,30}/i,
        bookmarkURL:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    }
    var element = document.getElementById(id)
    var error = document.getElementById(id+'Error')
    if(regex[id].test(value)==true){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        error.innerHTML= ''
        return true;
    }
    else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        error.innerHTML = (id=='bookmarkName')?'Site name must contain at least 3 characters':'Site URL must be a valid one'
        return false;
    }
}