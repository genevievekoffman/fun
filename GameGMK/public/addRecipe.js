function createMeal(e){
    let title = e.target.elements.title.value;
    let image = e.target.elements.url.value;
    let stars = e.target.elements.stars.value;
    let meal = e.target.elements.meal.value; 
     
     
    console.log("title: " + title)
    console.log("image: " + image)
    console.log("stars: " + stars)
    console.log("radio response: " + meal)
}