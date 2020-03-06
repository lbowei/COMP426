/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <Longbo Wei>
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
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    // $("#div").append(hero[0].first);
    let firstseen_innerText =
      "First Appearance: " +
      hero.firstSeen.getMonth() +
      "/" +
      hero.firstSeen.getDate() +
      "/" +
      hero.firstSeen.getFullYear();
  
    let templateString = `<div>
        <div style = "border:2px solid blue">
            
            <div style = "background: ${hero.backgroundColor}">
                <h1> <strong>${hero.name}</strong> </h1>
                <p><span><strong>${hero.first}</strong></span>
                <span><strong>${hero.last}</strong></span></p >
                <div style = "background: ${hero.color}; border:2px solid black">
                < img src = ${hero.img}></img>
                </div>
            </div>
          
            <div style = "background: pink">
                <p>${firstseen_innerText}</p >
                <span>${hero.description} </span>
  
            </div>
                <button type='button'>Edit</button>
            </div>
            
            <p></p >
        </div>`;
  
    return templateString;
  };
  
  /**
   * Given a hero object, this function generates a <form> which allows the
   *     user to edit the fields of the hero. The form inputs should be
   *     pre-populated with the initial values of the hero.
   * @param hero  The hero object to edit (see data.js)
   */
  export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    //   var box = `<form> <input type = "text" name = '${hero.name}'
    //   </form>`
    //   `<textarea>${hero.description}</textarea>`
  
    var box = `
    <div>
    <form><input type = "text" name = '${hero.name}'</form>
    <form><input type = "text" name = '${hero.first}'</form>
    <form><input type = "text" name = '${hero.last}'</form>
  
    <ul><textarea>${hero.name}</textarea></ul>
    <ul><textarea>${hero.first}</textarea></ul>
    <ul><textarea>${hero.last}</textarea></ul>
    <ul><textarea>${hero.description}</textarea></ul>
    <ul><textarea>${hero.firstSeen}</textarea></ul>
    <button type='button'>cancel</button>
    <button type='submit'>save</button>
    
  
    
    </div>
    
    
    
    `;
  
    return box;
  };
  
  /**
   * Given an array of hero objects, this function converts the data into HTML and
   *     loads it into the DOM.
   * @param heroes  An array of hero objects to load (see data.js)
   */
  export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $("#root");
    let heroarr = [];
    for (let i = 0; i < heroes.length; i++) {
      heroarr[i] = renderHeroCard(heroes[i]);
    }
    $root.append(heroarr);
  
    //   $root.append(renderHeroCard);
  
    // TODO: Generate the heroes using renderHeroCard()
  
    // TODO: Append the hero cards to the $root element
  
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
  
    // TODO: Generate the hero edit form using renderHeroEditForm()
  
    // TODO: Append the hero edit form to the $root element
    $root.append(renderHeroEditForm(randomHero));
    return $root;
  };
  
  /**
   * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
   */
  $(function() {
    loadHeroesIntoDOM(heroicData);
  });