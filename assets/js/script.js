
var drinks = []
var drink1 = {abv: 0.05, ounces: 12}
var drink2 = {abv: 0.05, ounces: 12}
var weightInPounds = 127
var totalTimeInHours = 2
var gender = "male"
var metabolism = 0.012

drinks.push(drink1)
drinks.push(drink2)
var timestamp = Date.now()
function calculateBAC() {
    if (gender == "male"){
        var alcoholGrams = convertDrinkToGrams(drinks)
        bac = ((alcoholGrams/((weightInPounds * 454) * .68)) * 100) - (totalTimeInHours * .015) 
    } else {
        convertDrinkToGrams(drinks)
        bac = ((alcoholGrams/((weightInPounds * 454) * .55)) * 100) - (totalTimeInHours * .015) 
    }
    roundedBac = Math.round(bac * 1000) / 1000
    console.log(roundedBac)
}

function convertDrinkToGrams(drinks) {
    var totalGramsOfAlcohol = 0
    for (i = 0; i < drinks.length; i++) {
        var gramsOfAlcohol = (drinks[i].ounces) * (drinks[i].abv) * .789 * 29.5735
        totalGramsOfAlcohol = totalGramsOfAlcohol + gramsOfAlcohol
    }
    return totalGramsOfAlcohol
}

calculateBAC()