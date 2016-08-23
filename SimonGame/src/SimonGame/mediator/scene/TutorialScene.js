/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */



SimonGame.mediator.scene.TutorialScene = cc.Scene.extend({

    ctor:function(){
        this._super();

        var bglayer = new SimonGame.mediator.layer.BgLayer();
        this.addChild(bglayer,-3);

     var tutlayer = new SimonGame.mediator.layer.TutorialLayer();
        this.addChild(tutlayer,0);

       /*  var startlayer = new SimonGame.mediator.layer.SimonGameLayer();
         this.addChild(startlayer,0);*/
    }
});



