/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
SimonGame.controller.PrepareModelCommand = SimonGame.controller.PrepareModelCommand || {};

puremvc.define(
    //class info
    {
        name: "SimonGame.controller.PrepareModelCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function (note) {
            cc.log("Prepare Model Command:SimonGame");
            //register level proxy
            this.facade.registerProxy(new SimonGame.model.proxy.LevelProxy);
        }
    },

    //static member
    {
        NAME: "SimonGame_PrepareModelCommand"
    }
)