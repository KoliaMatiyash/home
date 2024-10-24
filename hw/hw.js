function createMedia(medias) {
  const socialMedia = document.createElement("div");
  socialMedia.classList.add("social_media");
  medias.forEach((contact) => {
    // Перевіряємо, яка соціальна мережа представлена в URL і додаємо відповідну іконку
    if (contact.includes("facebook")) {
      const link = document.createElement("a");
      link.classList.add("media");
      link.setAttribute("href", contact);
      const mediaPhoto = document.createElement("img");
      mediaPhoto.classList.add("img_media");
      mediaPhoto.setAttribute("src", "./icon/Facebook Circled.png");
      link.append(mediaPhoto);
      socialMedia.append(link);
    }
    if (contact.includes("twitter")) {
      const link = document.createElement("a");
      link.classList.add("media");
      link.setAttribute("href", contact);

      const mediaPhoto = document.createElement("img");
      mediaPhoto.classList.add("img_media");
      mediaPhoto.setAttribute("src", "./icon/Twitter Circled.png");
      link.append(mediaPhoto);
      socialMedia.append(link);
    }
    if (contact.includes("instagram")) {
      const link = document.createElement("a");
      link.classList.add("media");
      link.setAttribute("href", contact);
      const mediaPhoto = document.createElement("img");
      mediaPhoto.classList.add("img_media");
      mediaPhoto.setAttribute("src", "./icon/Instagram Circle.png");
      link.append(mediaPhoto);
      socialMedia.append(link);
    }
  });

  return socialMedia;
}
function creatCard(actor) {
  const card = document.createElement("div");
  card.setAttribute("id", `card${actor.id}`);
  card.classList.add("card");
  const actorPhoto = document.createElement("img");

  actorPhoto.classList.add("img_actor");
  actorPhoto.setAttribute("src", actor.profilePicture);
  actorPhoto.setAttribute("alt", `${actor.firstName} ${actor.lastName}`);
  actorPhoto.onerror = () => {
    const initials = document.createElement("div");
    initials.classList.add("intial_card");
    initials.textContent = createInitials(
      `${actor.firstName} ${actor.lastName}`
    );
    const newfullName = document.createElement("p");
    newfullName.classList.add("name_actor");
    newfullName.textContent = `${actor.firstName} ${actor.lastName}`;

    const media = card.querySelector(".social_media");
    media.remove();
    actorPhoto.remove();
    fullName.remove();
    card.append(initials, newfullName, createMedia(actor.contacts));
  };
  const fullName = document.createElement("p");

  fullName.classList.add("name_actor");

  fullName.textContent = `${actor.firstName} ${actor.lastName}`;
  card.append(actorPhoto, fullName, createMedia(actor.contacts));
  // card.onclick = addName(actor);
  addName(actor, card);
  // const listItems = document.querySelectorAll(".list_item");
  // listItems.forEach((item) => {
  //   if (item !== "") {
  //     deleteListItem(listItems);
  //   }
  // });

  // deleteListItem(listItems);
  return card;
}

function createInitials(name) {
  if (name && name.trim() !== "") {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  return "unknown";
}
function addName(actor, card) {
  const name = `${actor.firstName} ${actor.lastName}`;
  card.addEventListener("click", () => {
    const list = document.getElementById("choosedList");
    const listItem = document.createElement("li");
    listItem.classList.add("list_item");
    listItem.textContent = name;
    list.append(listItem);
  });
}

// function deleteListItem(items) {
//   const deleteBtn = document.getElementById("deleteBtn");
//   items.forEach((item) => {
//     item.addEventListener("click", () => {
//       item.classList.toggle("delete");
//     });
//   });
//   deleteBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     items.forEach((item) => {
//       if (item.classList.contains("delete") === true) {
//         item.remove();
//       }
//     });
//   });
// }
const addBtn = document.getElementById("addActor");
const actorForm = document.getElementById("form");
addBtn.addEventListener("click", () => {
  actorForm.classList.remove("unvisible");
  actorForm.classList.add("visible");
});
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  actorForm.classList.remove("visible");
  actorForm.classList.add("unvisible");
});
function NewActor(
  id,
  firstName,
  lastName,
  profilePicture,
  [instagram, facebook, twitter]
) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.profilePicture = profilePicture;
  this.contacts = [instagram, facebook, twitter];
}
function addActor() {
  const fullName = document.getElementById("fullName").value;
  const photoActor = document.getElementById("actorPhotoForm").value;
  const instLink = document.getElementById("instUrl").value;
  const faceLink = document.getElementById("faceUrl").value;
  const twitLink = document.getElementById("twitUrl").value;
  const fullNameArr = fullName.split(" ");
  const firstName = fullNameArr[0];
  const lastName = fullNameArr[1];
  let lastId;
  if (actors.length > 0) {
    lastId = Math.max(...actors.map((actor) => actor.id));
  } else {
    lastId = 0;
  }
  actors.length > 0 ? Math.max(...actors.map((actor) => actor.id)) : 0;
  const newId = lastId + 1;

  const newActor = new NewActor(newId, firstName, lastName, photoActor, [
    instLink,
    faceLink,
    twitLink,
  ]);
  actors.push(newActor);
  const newCard = creatCard(newActor);
  const cards = document.getElementById("cards");
  cards.append(newCard);
}
const addBtnFrm = document.getElementById("addBtnFrm");
addBtnFrm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(actors);

  addActor();
  actorForm.reset();
});
const HTMLCards = actors.map((actor) => creatCard(actor));

const cards = document.getElementById("cards");
cards.append(...HTMLCards);
