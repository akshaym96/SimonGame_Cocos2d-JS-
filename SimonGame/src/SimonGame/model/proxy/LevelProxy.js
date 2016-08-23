/**
 * Created by vivekfitkariwala on 06/07/15.
 */
SimonGame.model.proxy.LevelProxy = SimonGame.model.proxy.LevelProxy || {}

puremvc.define(
    //class info
    {
        name: "SimonGame.model.proxy.LevelProxy",
        parent: puremvc.Proxy
    },

    //instance member
    {
        vo:null,
        callbackFunction: null,

        onRegister: function(){
            cc.log("Level Proxy Registered");
            this.setData(new SimonGame.model.vo.LevelVO());
            this.vo = this.getData();
        },

        updateRound1: function (value) {

      this.vo.round1=value;


        },

        updateScore:function(value){
            this.vo.score=value;
        },

        updateRound2: function (value1) {

            this.vo.round2=value1;
        },

        loadLevel: function (data, callback) {
            callback && callback();
        }
    },

    //static member
    {
        NAME: "SimonGame_LevelProxy"
    }
);