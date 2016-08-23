/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
SimonGame.controller.PrepareViewCommand = SimonGame.controller.PrepareViewCommand || {};

puremvc.define(
    //class info
    {
        name: "SimonGame.controller.PrepareViewCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function(note)
        {
            cc.log("Prepare View Command:SimonGame");
            this.facade.registerMediator( new SimonGame.mediator.GameScreenMediator);
        }
    },

    //static member
    {
        NAME: "SimonGame_PrepareViewCommand"
    }
)