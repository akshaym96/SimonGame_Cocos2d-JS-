/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */




SimonGame.mediator.scene.SimonGameScene = cc.Scene.extend({
    layer:null,
    bgLayer:null,
    onEnter:function () {
        this._super();
        this.bgLayer = new SimonGame.mediator.layer.BgLayer();
        this.addChild(this.bgLayer);
        
        if(SimonGame.data.tutorial == 1){
            this.TutorialLayer = new SimonGame.mediator.layer.TutorialLayer();
            this.addChild(this.TutorialLayer);
        }else{
            this.startGame();
        }
    },
    startGame: function () {
        this.removeChild(this.layer);
        this.layer = new SimonGame.mediator.layer.SimonGameLayer();
        this.addChild(this.layer);
    },
    gameOver: function () {
        this.removeChild(this.layer);
        this.scoreLayer = new SimonGame.mediator.layer.ScoreLayer();
        this.addChild(this.scoreLayer);
    },
    onBack: function () {
        helper.PlatformBridge.back(SimonGame.data);
    },
        onExit: function () {
        if(SimonGame.data.name=="back" || SimonGame.data.name=="completed"){
            cc.log("SimonGame: Disposing Resources");
            this._super();
            puremvc.Facade.removeCore(SimonGame.ApplicationFacade.NAME);
            //flax.assetsManager.removeAssets(SimonGame.res.assets_plist);
            helper.AudioHelper.stopMusic(true);
            _.each(SimonGame.g_resources, function(item) {
                cc.loader.release(item);
                cc.textureCache.removeTextureForKey(item);
            });

            if(cc.sys.isNative){
                _.each(SimonGame.jsList, function(item) {
                    cc.sys.cleanScript(item);
                });
            }
        }
    }
});

