/**
 * Created by vivekfitkariwala on 05/07/15.
 */
//exposing the object
SimonGame.controller.PrepareControllerCommand = SimonGame.controller.PrepareControllerCommand || {};

puremvc.define(
    //class info
    {
        name: "SimonGame.controller.PrepareControllerCommand",
        parent: puremvc.SimpleCommand
    },

    //instance member
    {
        execute: function(note)
        {
            cc.log("Prepare Controller Command:SimonGame");
            //this.facade.registerMediator( new SimonGame.mediator.SplashScreenMediator);
        }
    },

    //static member
    {
        NAME: "SimonGame_PrepareControllerCommand"
    }
)