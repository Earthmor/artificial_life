import {AnimateWorld} from './animation/animate_world.js';
import LifelikeWorld from './worlds/lifelike_world.js';
import Wall from './entity/wall.js';
import Plant from './entity/plant.js';
import SmartPlantEater from './entity/smart_plant_eater.js';
import MeatEater from './entity/meat_eater.js';

window.animateWorld = function(world) {
    new AnimateWorld(world);
};

// # - walls and stones
// O - plantEater
// @ - meatEater
// * - plant
let valley = new LifelikeWorld(
    ["####################################################",
        "#                 ####         ****              ###",
        "#   *  @  ##                 ########       OO    ##",
        "#   *    ##        O O                 ****       *#",
        "#       ##*                        ##########     *#",
        "#      ##***  *         ****                     **#",
        "#* **  #  *  ***      #########                  **#",
        "#* **  #      *               #   *              **#",
        "#     ##              #   O   #  ***          ######",
        "#*            @       #       #   *        O  #    #",
        "#*                    #  ######                 ** #",
        "###          ****          ***                  ** #",
        "#       O                        @         O       #",
        "#   *     ##  ##  ##  ##               ###      *  #",
        "#   **         #              *       #####  O     #",
        "##  **  O   O  #  #    ***  ***        ###      ** #",
        "###               #   *****                    ****#",
        "####################################################"],
    {"#": Wall,
        "@": MeatEater,
        "O": SmartPlantEater,
        "*": Plant}
);

animateWorld(valley);