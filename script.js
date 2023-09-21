// Profil management
class Profil {
    constructor(avatar, description) {
      this.avatar = avatar;
      this.description = description;
    }
}

let profiles = []
let form = document.querySelector("#addProfilForm")
let profilCloseIcons = document.querySelectorAll(".profil-close")


function manageDashboardUI() {
  let dashboardEmpty = document.querySelector("#dashboardEmpty")
  let dashboardContent = document.querySelector("#dashboardContent")
   
  dashboardContent.style.display = profiles.length ? 'block' : 'none'
  dashboardEmpty.style.display = !profiles.length ? 'block' : 'none'
}

manageDashboardUI()

// Validate the inputs
function addProfil() {
    // Trim of value
    document.querySelector("#descriptionInput").value = document.querySelector("#descriptionInput").value.trim()

    if(!validatedInputs()) return

    profiles.push(new Profil(document.querySelector("#imageInput").files[0], document.querySelector("#descriptionInput").value))

    form.reset()
  
    $('#addGridModal').modal('hide');

    // Update the UI
    manageDashboardUI()
    addProfilUI(profiles[profiles.length-1], profiles.length-1)
}

function deleteProfil(index) {
    // Confirm if the deletion
    if(!confirm("Etes-vous sûr de supprimer le profil ?")) return

    profiles.splice(index, 1)
    deleteProfilUI(index);
}

function validatedInputs() {
    let description = document.querySelector("#descriptionInput")
    let descriptionError = document.querySelector("#descriptionError")
    let image = document.querySelector("#imageInput")
    let imageError = document.querySelector("#imageError")

    descriptionError.style.display = !description.value.length?  'block': 'none'
    imageError.style.display = !image.files.length ? 'block' : 'none'

    return description.value.length && image.files.length
}

function addProfilUI(profil, index) {

  // Make the src of avatar if we have file else show the default one
  avatarSrc = profil.avatar? URL.createObjectURL(profil.avatar) :'avatar.png'

  let render = ''

  render += "<div class='profil resizable m-3 p-3 draggable' draggable='true' id='profil_" + index + "' data-id='" + index + "'>"
  render += "<div class='profil-avatar'>"
  render += "<img src='" + avatarSrc + "' alt='' class='profil-avatar-img'>"
  render += "</div>"
  render += "<p class='profil-description my-3'>"
  render += profil.description
  render += "</p>"
  render += "<i class='profil-close fa fa-solid fa-square-xmark' id='profilClose_" + index + "' data-id='" + index + "' onclick='deleteProfil(" + index + ")'></i></div>"

  // Add the profil to the DOM
  dashboardContent.insertAdjacentHTML('beforeend', render)
}

function deleteProfilUI(index) {
  document.querySelector("#profil_" + index).remove()
  manageDashboardUI()
}