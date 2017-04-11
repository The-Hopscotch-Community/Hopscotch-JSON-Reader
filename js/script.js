// Table variables
var scenesTable = document.getElementById("scenes");
var abilitiesTable = document.getElementById("abilities");
var objectsTable = document.getElementById("objects");
var customObjectsTable = document.getElementById("customObjects");
var variablesTable = document.getElementById("variables");
var rulesTable = document.getElementById("rules");
var codeTable = document.getElementById("code");

// Cell variables
var cell;
var cell2;

// Local storedProjectJSON for manipulation
var storedProjectJSON = {};

// Retrieves data from imported JSON file and send it to HTML file
function getHopscotchData(json)
{
    // Prints JSON data to the console.
    console.log(json);

    // Stage size
    document.getElementById("width").innerHTML = document.getElementById("width").innerHTML + json.stageSize.width;
    document.getElementById("height").innerHTML = document.getElementById("height").innerHTML +  json.stageSize.height;

    // Original user
    //document.getElementById("originalUser").innerHTML = document.getElementById("originalUser").innerHTML + json.original_user.nickname;

    storedProjectJSON.abilities = {}
    // Loops through abilites.
    for (var i = 0; i < json.abilities.length; i++)
    {
        // If the ability has a name index,
        if (json.abilities[i].name !== undefined)
        {
            // create new row in abilitesTable,
            var row = abilitiesTable.insertRow(0);
            // insert new cell,
            cell = row.insertCell(0);
            // and set text to cell to the name of the ability.
            cell.innerHTML = json.abilities[i].name;
        } // end if

        // Add ability to storedProjectJSON.abilities
        var currAbilityID = json.abilities[i].abilityID;
        storedProjectJSON.abilities[currAbilityID] = json.abilities[i];

    } // end for

    storedProjectJSON.scenes = []
    // Loops through scenes.
    for (var i = 0; i < json.scenes.length; i++)
    {
        // Create new row in scenesTable,
        var row = scenesTable.insertRow(0);
        // insert new cell,
        cell = row.insertCell(0);
        // and set text to cell to the name of the scene
        cell.innerHTML = json.scenes[i].name;

        storedProjectJSON.scenes.push(json.scenes[i]);
    } // end for

    storedProjectJSON.objects = {}
    // Loops through objects.
    for (var i = 0; i < json.objects.length; i++)
    {
        // Create new row in objectsTable,
        var row = objectsTable.insertRow(i+1);
        // insert new cells, for name, type, x position and y position,
        var nameCell = row.insertCell(0);
        var typeCell = row.insertCell(1);
        var xCell = row.insertCell(2);
        var yCell = row.insertCell(3);

        // and set text of cells to the corresponding data.
        nameCell.innerHTML = json.objects[i].name;
        typeCell.innerHTML = hopscotchObjects(json.objects[i].filename);
        xCell.innerHTML = json.objects[i].xPosition;
        yCell.innerHTML = json.objects[i].yPosition;

        // Add object to storedProjectJSON
        var currObjectID = json.objects[i].objectID;
        storedProjectJSON.objects[currObjectID] = json.objects[i];
    }

    // Loops through variables if there are any

    if (json.variables != null) {
      for (var i = 0; i < json.variables.length; i++)
      {
          // Create new row in variablesTable,
          var row = variablesTable.insertRow(0);
          // insert new cell,
          cell = row.insertCell(0);
          // and set text of the cell to the name of the variable
          cell.innerHTML = json.variables[i].name;
      }
    }

    // Loops through custom objects (images) if there are any

    if (json.customObjects != null) {
      for (var i = 0; i < json.customObjects.length; i++)
      {
          // Create new row in customObjectsTable,
          var row = customObjectsTable.insertRow(0);
          // insert new cell,
          cell = row.insertCell(0);
          // and set text of the cll to the name of the variable.
          cell.innerHTML = json.customObjects[i].name;

          var currObjectID = json.customObjects[i].objectID;
          storedProjectJSON.objects[currObjectID] = json.customObjects[i];
      }
    }

    storedProjectJSON.rules = {}
    // Loop through rules
    for (var i = 0; i < json.rules.length; i++)
    {
        var row = rulesTable.insertRow(i+1);
        var objectCell = row.insertCell(0);
        var ruleDescCell = row.insertCell(1);

        var currObjectID = json.rules[i].objectID;
        storedProjectJSON.rules[currObjectID] = json.rules[i];

        objectCell.innerHTML = storedProjectJSON.objects[currObjectID].name;
        ruleDescCell.innerHTML = json.rules[i].parameters[0].datum.description; // this is really dodgy and just for game starts

    }

    // Displaying code

    for (var i = 0; i < storedProjectJSON.objects.length; i++)
    {
        var row = codeTable.insertRow(i+1);
        var object = storedProjectJSON.objects[i];

        //row.innerHTML = object.name;

        var objectID = object.objectID;
        var rules = storedProjectJSON.rules[objectID];

        for (var ruleIdx = 0; ruleIdx < rules.length; ruleIdx++)
        {
            var rule = rules[ruleIdx];
            // loop through the rules for each object

            // loop through the blocks for each rule and parse
            var ability = storedProjectJSON.abilities[rule.abilityID]
            try {
              var blocks = ability.blocks;
            } catch (e) { //TODO: find more about catching exceptions. no key exception

              // blocks do not exist for this ability
              break;
            }


            for (var blockIdx = 0; blockIdx < blocks.length; blockIdx++) {

              var block = blocks[blockIdx];
              // this will contain a lot of things... control flow, datums etc

              parse(block);


            }


        }


        //objectCell.innerHTML = storedProjectJSON.objects[currObjectID].name;
        //ruleDescCell.innerHTML = json.rules[i].parameters[0].datum.description; // this is reallsy dodgy and just for game starts

    }


}

// hopscotchObjects() takes one parameter, filename
// and depending on the filename of the object,
// return the correct object type.
function hopscotchObjects(filename){

    // New variable to store object type (string)
    var result = "";
    switch(filename) {
        case "text-object.png": result = "Text"; break;
        // Shapes
        case "heart.png": result = "Heart"; break;
        case "arch.png": result = "Arch"; break;
        case "squiggle.png": result = "Squiggle"; break;
        case "star.png": result = "Star"; break;
        case "parallelogram.png": result = "Parallelogram"; break;
        case "donut.png": result = "Donut"; break;
        case "threeProngedBoomerang.png": result = "Fan Blade"; break;
        case "circle.png": result = "Circle"; break;
        case "square.png": result = "Square"; break;
        case "hexagon.png": result = "Hexagon"; break;
        case "triangle.png": result = "Triangle"; break;
        case "rightTriangle.png": result = "Right Triangle"; break;
        case "rectangle.png": result = "Rectangle"; break;
        case "tetrisZ.png": result = "Z"; break;
        case "tetrisT.png": result = "T"; break;
        case "tetrisL.png": result = "L"; break;
        case "corner.png": result = "Corner"; break;
        case "flower.png": result = "Flower"; break;
        case "squishedBox.png": result = "Squished Box"; break;
        case "bead.png": result = "Bead"; break;
        case "chevron.png": result = "Chevron"; break;
        case "xShape.png": result = "X"; break;
        case "tetrisLine.png": result = "Platform"; break;
        // Characters
        case "chillanna.png": result = "Chillanna"; break;
        case "astro.png": result = "Cosmic Cody"; break;
        case "robo.png": result = "Robo"; break;
        case "stargirl.png": result = "Star Girl"; break;
        case "monkey.png": result = "Monkey"; break;
        case "octopus.png": result = "Octopus"; break;
        case "gorilla.png": result = "Gorilla"; break;
        case "cupcake.png": result = "Cupcake"; break;
        case "bear.png": result = "Bear"; break;
        case "dino.png": result = "Dino"; break;
        case "frog.png": result = "Frog"; break;
        case "greenman.png": result = "Jody"; break;
        case "mustache.png": result = "Mr. Mustache"; break;
        case "spacepod.png": result = "Space Pod"; break;
        case "raccoon.png": result = "Raccoon"; break;
        case "bird.png": result = "Bird"; break;
        case "crocodile.png": result = "Crocodile"; break;
        // Jungle
        case "banyan.png": result = "Banyan"; break;
        case "parrot-flying-object.png": result = "Parrot"; break;
        case "mandrill.png": result = "Mandrill"; break;
        case "miss-chief.png": result = "Miss Chief"; break;
        case "mosquito.png": result = "Mosquito"; break;
        case "jeepers.png": result = "Jeepers"; break;
        case "venus.png": result = "Venus"; break;
        case "toucan.png": result = "Toucan"; break;
        case "anteater.png": result = "Anteater"; break;
        case "iguana.png": result = "Iguana"; break;
        case "sloth.png": result = "Sloth"; break;
        case "hut.png": result = "Hut"; break
        default: result = ""
    }

    return result;
}

function parse(block){

  // deal with each block depending on its type

  //TODO: terminate at integers, but continue parsing for other values
  // this will parse blocks and datums
  // how will it distinguish an integer and so on

  // will this return a string? formatting?
}
