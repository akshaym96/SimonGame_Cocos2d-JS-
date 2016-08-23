/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */




SimonGame.mediator.layer.StartLayer = cc.Layer.extend({

    ctor:function(){
        this._super();

       // Making a start button.
     /*   var nodeSize= cc.size(400,100);
        this.continueBtn = flax.assetsManager.createDisplay(res.shared.score_plist, "continueBtn");
        this.continueBtn.setContentSize(nodeSize);
       this.continueBtn.anchorX = 0.5;


        this.continueBtn.x= AppConstants.DEVICE_WIDTH/2 ;
        this.continueBtn.y= AppConstants.DEVICE_HEIGHT/2;
         this.addChild(this.continueBtn);


        var answerText = helper.GameHelper.makeTTFFont("Start Game",helper.GameHelper.hexToRgb("#FFFFFFFF"),30,cc.TEXT_ALIGNMENT_CENTER);
        this.continueBtn.addChild(answerText);

        answerText.x=130;
        answerText.y=30;

      helper.EventHelper.addMouseTouchEvent(this.__startClicked.bind(this),this.continueBtn);





    },


    __startClicked:function(event,touch,state){

        if(state==helper.EventHelper.ON_CLICK){
            cc.audioEngine.playEffect(SimonGame.res.ButtonClick,false);
            this.gameScreenView=new SimonGame.mediator.scene.SimonGameScene();
            cc.director.runScene(this.gameScreenView);

        }
        return true;*/



    }
});