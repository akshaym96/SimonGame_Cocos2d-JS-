/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */

SimonGame.mediator.layer.BgLayer = cc.Layer.extend({
    bgLayer: null,
    bgColor: null,
    ctor: function () {
        this._super();
        this.init();

        this.levelProxy = SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).retrieveProxy(SimonGame.model.proxy.LevelProxy.NAME);
        this.levelVO = this.levelProxy.getData();


    },
    init: function () {

        //this.bgColor = new cc.LayerColor(new cc.color(144, 192, 248));
        //this.bgColor = new cc.LayerColor(new cc.color(255,0,255));
        this.bgColor = new cc.LayerColor(new cc.color(55,55,55)); // BLACK
       // this.bgColor = new cc.LayerColor(new cc.color(173,255,47));//  GREEN

        this.bgLayer = flax.assetsManager.createDisplay(res.shared.simon_plist, "background");


        this.bgLayer.setScaleX(cc.winSize.width/this.bgLayer.getContentSize().width);
        this.bgLayer.setScaleY(cc.winSize.height/this.bgLayer.getContentSize().height);

        this.bgLayer.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        this.bgLayer.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(this.bgColor);
        this.addChild(this.bgLayer);


    }
});