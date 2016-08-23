/**
 * Created by vivekfitkariwala on 06/07/15.
 */

SimonGame.model.vo.LevelVO = SimonGame.model.vo.LevelVO || {};

puremvc.define(
    //class info
    {
        name: "SimonGame.model.vo.LevelVO"
    },

    //instance member
    {
        data:null,
        imageFolderPath:'',
        score:0,
        round1:0,
        round2:0,
        star:0,
        platformCallback:null
    },

    //static member
    {
        NAME: "SimonGame_LevelVO"
    }
);