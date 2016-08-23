/**
 * Created by vivekfitkariwala on 06/07/15.
 */
SimonGame.mediator.GameScreenMediator = SimonGame.mediator.GameScreenMediator || {};

puremvc.define(
    //class info
    {
        name: "SimonGame.mediator.GameScreenMediator",
        parent: puremvc.Mediator
    },

    //instance member
    {
        gameScreenView: null,

        onRegister: function () {

        },

        onRemove: function () {

        },

        startTheGame: function(){
            cc.log("Start the game: SimonGame");
           this.gameScreenView = new SimonGame.mediator.scene.TutorialScene();
            cc.director.pushScene(this.gameScreenView);
        }
    },

    //static member
    {
        NAME: "SimonGame_GameScreenMediator"
    }
)