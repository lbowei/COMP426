/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Qintian Wu
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
  // TODO: Copy your code from a04 to render the hero card
  let firstseen_innerText =
    "First Appearance: " +
    hero.firstSeen.getMonth() +
    "/" +
    hero.firstSeen.getDate() +
    "/" +
    hero.firstSeen.getFullYear();

  let templateString = `<div id = "${hero.id}">
        <div style = "border:2px solid blue">
            
            <div style = "background: ${hero.backgroundColor}">
                <h1> <strong>${hero.name}</strong> </h1>
                
                <p><span><strong>${hero.first}</strong></span>
                <span><strong>${hero.last}</strong></span></p >
                <div style = "background: ${hero.color}; border:2px solid black">
                <img src = ${hero.img}></img>
                </div>
            </div>
          
            <div style = "background: pink">
                <p>${firstseen_innerText}</p >
                <span>${hero.description} </span>
  
            </div>
                <form>
                <button class="editButton" data="${hero.id}">
                Edit
                </button>
                </form>
            </div>
            
            <p></p>
        </div>`;
    
  return templateString;
//   <button id = "${hero.id}" type='button'>Edit</button>
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
  // TODO: Copy your code from a04 to render the hero edit form
  var box = `
    <div id = "${hero.id}">
    <form>
    <form><input type = "text" name = '${hero.name}'</form>
   
    <form><input type = "text" name = '${hero.first}'</form>
    <form><input type = "text" name = '${hero.last}'</form>
  
    <ul><textarea id = "name">${hero.name}</textarea></ul>
    <ul><textarea id = "first">${hero.first}</textarea></ul>
    <ul><textarea id = "last">${hero.last}</textarea></ul>
    <ul><textarea id ="description">${hero.description}</textarea></ul>
    <ul><textarea id ="time">${hero.firstSeen}</textarea></ul>
    <button class="cancelButton" type = 'cancel' data="${hero.id}">
                Cancel
    </button>
    <button class="submitButton" type = 'submit' data="${hero.id}">
                Save
    </button>
    </form>
    </div>
    
    `;

    return box;
};

/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
  // TODO: Render the hero edit form for the clicked hero and replace the
  //       hero's card in the DOM with their edit form instead

  event.preventDefault();

  var id = $(event.currentTarget).attr("data");
  let hero = {}
  for(let i = 0; i < heroicData.length; i++){
    if (heroicData[i].id == id) {
      hero = heroicData[i]
      //alert("find it")
    }
  }
  
  $(`#${id}`).replaceWith(renderHeroEditForm(hero))


  // const heroid = heroicData.findIndex(h => h.id == $(event.currentTarget).attr("data"));
  // alert(heroid)
  // $("heroicData[heroid]").replaceWith(renderHeroEditForm(heroid));
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
  // TODO: Render the hero card for the clicked hero and replace the
  //       hero's edit form in the DOM with their card instead
  event.preventDefault();
  var id = $(event.currentTarget).attr("data");
  //alert($(event.currentTarget).attr("type"))
  let hero = {}
  for(let i = 0; i < heroicData.length; i++){
    if (heroicData[i].id == id) {
      hero = heroicData[i]
    }
  }
  $(`#${id}`).replaceWith(renderHeroCard(hero))
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
  // TODO: Render the hero card using the updated field values from the
  //       submitted form and replace the hero's edit form in the DOM with
  //       their updated card instead
  event.preventDefault();
  let id = $(event.currentTarget).attr("data");
  let hero = {}
  for(let i = 0; i < heroicData.length; i++){
    if (heroicData[i].id == id) {
      hero = heroicData[i]
    }
  }

  let time = $('#time').val();
  hero.name = $('#name').val();
  hero.first = $('#first').val();
  hero.last = $('#last').val();
  hero.description = $('#description').val();
  // hero.firstSeen = new Date((new Date(time)).getTime() + Math.abs((new Date(time)).getTimezoneOffset()*60000));
  $(`#${id}`).replaceWith(renderHeroCard(hero))

};

/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
  // Grab a jQuery reference to the root HTML element
  const $root = $("#root");

  // TODO: Generate the heroes using renderHeroCard()
  //       NOTE: Copy your code from a04 for this part

  // TODO: Append the hero cards to the $root element
  //       NOTE: Copy your code from a04 for this part
  let heroarr = [];
  for (let i = 0; i < heroes.length; i++) {
    heroarr[i] = renderHeroCard(heroes[i]);
    //$(".editButton").on("click", null, heroes[i].id, handleEditButtonPress);
  }
  $root.append(heroarr);

  // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
  //       clicking the edit button
  
  // $().on("click", null, hero, handleEditButtonPress);
  
  $("#root").on("click", ".editButton", handleEditButtonPress);
  $("#root").on("click", ".cancelButton", handleCancelButtonPress);
  $("#root").on("click", ".submitButton", handleEditFormSubmit);
  
  

  // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
  //       submitting the form

  // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
  //       clicking the cancel button
  return $root;
};

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
  loadHeroesIntoDOM(heroicData);
});