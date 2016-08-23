/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */




SimonGame.mediator.layer.TutorialLayer = cc.Layer.extend({
    ctor: function (nodeArray) {
        cc.log("Inside the constructor");
        this._super();


        this.movie1= flax.assetsManager.createDisplay(res.shared.simon_plist, "tutMobile1MainGame");
        this.movie1.anchorX=0.5;
        this.movie1.anchorY=0.5;
        this.movie1.scaleX=1.5;
        this.movie1.scaleY=1.5;
        this.movie1.setRotation(315);
        this.movie1.x=AppConstants.DEVICE_WIDTH/2;
        this.movie1.y=AppConstants.DEVICE_HEIGHT/2;
        this.addChild(this.movie1);
        this.movie1.play();


        var nodeSize= cc.size(400,100);
        this.skipBtn = flax.assetsManager.createDisplay(res.shared.score_plist, "continueBtn");
        this.skipBtn.setContentSize(nodeSize);
        this.skipBtn.anchorX = 0.5;


        this.skipBtn.x= AppConstants.DEVICE_WIDTH/2 ;
        this.skipBtn.y= AppConstants.DEVICE_HEIGHT/2-150;
        this.addChild(this.skipBtn);


        this.skipText = helper.GameHelper.makeTTFFont("Skip",helper.GameHelper.hexToRgb("#FFFFFFFF"),30,cc.TEXT_ALIGNMENT_CENTER);
        this.skipBtn.addChild(this.skipText);

        this.skipText.x=125;
        this.skipText.y=30;

        helper.EventHelper.addMouseTouchEvent(this.__clickSkip.bind(this),this.skipBtn);


        this.pattern = helper.GameHelper.makeTTFFont("Follow The Pattern!!!!",helper.GameHelper.hexToRgb("#FFFFFFFF"),40,cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.pattern,6);
        this.pattern.x= AppConstants.DEVICE_WIDTH/2;
        this.pattern.y= AppConstants.DEVICE_HEIGHT/2-300;
     },


    __clickSkip:function(event,touch,state){

        if(state==helper.EventHelper.ON_CLICK){
            cc.audioEngine.playEffect(SimonGame.res.ButtonClick,false);
            this.removeChild(this.movie1);
            this.removeChild(this.skipBtn);
            this.removeChild(this.pattern);

            this.generate = helper.GameHelper.makeTTFFont("Generate The Same Pattern!!!!",helper.GameHelper.hexToRgb("#FFFFFFFF"),40,cc.TEXT_ALIGNMENT_CENTER);
            this.addChild(this.generate,6);
            this.generate.x= AppConstants.DEVICE_WIDTH/2;
            this.generate.y= AppConstants.DEVICE_HEIGHT/2-300;



            this.movie2= flax.assetsManager.createDisplay(res.shared.simon_plist, "tutMobile2MainGame");
            this.movie2.anchorX=0.5;
            this.movie2.anchorY=0.5;
            this.movie2.scaleX=1.5;
            this.movie2.scaleY=1.5;
            this.movie2.setRotation(315);
            this.movie2.x=AppConstants.DEVICE_WIDTH/2+10;
            this.movie2.y=AppConstants.DEVICE_HEIGHT/2+10;
            this.addChild(this.movie2);
            this.movie2.play();

            var nodeSize= cc.size(400,100);
            this.startBtn = flax.assetsManager.createDisplay(res.shared.score_plist, "continueBtn");
            this.startBtn.setContentSize(nodeSize);
            this.startBtn.anchorX = 0.5;


            this.startBtn.x= AppConstants.DEVICE_WIDTH/2 ;
            this.startBtn.y= AppConstants.DEVICE_HEIGHT/2-150;
            this.addChild(this.startBtn);


            this.startText = helper.GameHelper.makeTTFFont("Start Game",helper.GameHelper.hexToRgb("#FFFFFFFF"),30,cc.TEXT_ALIGNMENT_CENTER);
            this.startBtn.addChild(this.startText);
            this.startText.x=130;
            this.startText.y=35;

            helper.EventHelper.addMouseTouchEvent(this.__clickStartGame.bind(this),this.startBtn);
    }
        return true;
    },
    __clickStartGame:function(event,touch,state)
    {
        if(state==helper.EventHelper.ON_CLICK){
            this.removeChild(this.generate);
            cc.audioEngine.playEffect(SimonGame.res.ButtonClick,false);
            this.removeChild(this.startBtn);
            this.removeChild(this.movie2);
            var startlayer = new SimonGame.mediator.layer.SimonGameLayer();
            this.addChild(startlayer);
        }
        return true;
    }

});