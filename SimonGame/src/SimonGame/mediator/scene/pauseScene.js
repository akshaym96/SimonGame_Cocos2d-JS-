SimonGame.mediator.scene.pauseScene = cc.Scene.extend({

    ctor:function(){
        this._super();


        this.cover = flax.assetsManager.createDisplay(res.shared.scene_nav, "PauseCover");
        this.cover.setScaleX(cc.winSize.width / this.cover.getContentSize().width);
        this.cover.setScaleY(cc.winSize.height / this.cover.getContentSize().height);
        this.addChild(this.cover, 100);
        helper.EventHelper.addMouseTouchEvent(this._resumeGame.bind(this),this.cover);

    },

    _resumeGame: function (state) {
        if(state==helper.EventHelper.ON_CLICK) {
            //Destroy the cover
            // this.cover.destroy();

          //  helper.GameHelper.resumeScene();
            this.removeChild(this.cover);
           cc.director.popScene();
            //Recover the state of the pauseBtn
            this.pauseBtn.selected = true;

        }
        return true;





    }


});