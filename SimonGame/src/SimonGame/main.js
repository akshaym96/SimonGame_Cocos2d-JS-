//define the scope of the SimonGame
var SimonGame = SimonGame || {};

SimonGame.init = function(){
    SimonGame.controller = SimonGame.controller || {};
    SimonGame.helper = SimonGame.helper || {};
    SimonGame.mediator = SimonGame.mediator || {};
    SimonGame.mediator.view = SimonGame.mediator.view || {};
    SimonGame.mediator.scene = SimonGame.mediator.scene || {};
    SimonGame.mediator.layer = SimonGame.mediator.layer || {};
    SimonGame.model = SimonGame.model || {};
    SimonGame.model.vo = SimonGame.model.vo || {};
    SimonGame.model.proxy = SimonGame.model.proxy || {};
    SimonGame.ApplicationFacade = SimonGame.ApplicationFacade || {};
    SimonGame.path = SimonGame.path || '';
    SimonGame.data = SimonGame.data || {};

    SimonGame.jsList = [
        "controller/PrepareControllerCommand.js",
        "controller/PrepareModelCommand.js",
        "controller/PrepareViewCommand.js",
        "controller/StartupCommand.js",
        "ApplicationFacade.js",
        "helper/CustomHelper.js",
        "mediator/layer/SimonGameLayer.js",
        "mediator/layer/TutorialLayer.js",
        "mediator/layer/ScoreLayer.js",
        "mediator/layer/BgLayer.js",
        "mediator/layer/StartLayer.js",
        "mediator/scene/pauseScene.js",

        "mediator/scene/SimonGameScene.js",
        "mediator/scene/TutorialScene.js",

        "mediator/GameScreenMediator.js",
        "model/proxy/LevelProxy.js",
        "model/vo/LevelVO.js",
        "resource.js"
    ];
}

SimonGame.init();
SimonGame.setPath = function (path) {
    SimonGame.path = path;
};

SimonGame.getPath = function (asset) {
    if(typeof asset === "undefined")
        return SimonGame.path;
    else
        return SimonGame.path + asset;
};

SimonGame.setData = function (data) {
    DEFAULT_SOUNDS_FOLDER = SimonGame.path + "/res/sound/";
    SimonGame.data = data;
};


SimonGame.preload = function(){
    cc.log("inside SimonGame start");
    SimonGame.init();

    for(var i = 0; i< SimonGame.jsList.length;i++){
        SimonGame.jsList[i] = SimonGame.path + SimonGame.jsList[i];
    }

    //loading the scripts and resources
    cc.loader.loadJs(SimonGame.jsList, function(){
        SimonGame.loadEnglishLanguage();
    }.bind(this));
};

SimonGame.loadEnglishLanguage = function(){
    cc.loader.loadJson(SimonGame.res_locale.en, function (error,data) {
        cc.log('Loaded english');
        SimonGame.locale = data;
        var systemLanguage = AppConstants.APP_LANGUAGE;
        if(systemLanguage !== 'en' && SimonGame.res_locale[systemLanguage]){
            cc.loader.loadJson(SimonGame.res_locale[systemLanguage], SimonGame.loadedSystemLanguage.bind(this));
        }else{
            //adding the shared resource
            SimonGame.loadAssets();
        }
    }.bind(this));
};

SimonGame.loadedSystemLanguage = function(error,data){
    //merging local language
    SimonGame.locale = _.assign(SimonGame.locale,data);
    SimonGame.loadAssets();
};

SimonGame.loadAssets = function(){
    //loading the scripts and resources
    cc.loader.load(SimonGame.g_resources, function(){
        cc.log(SimonGame.ApplicationFacade.NAME);
        SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).startup();
        var levelProxy = SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).retrieveProxy(SimonGame.model.proxy.LevelProxy.NAME);
        levelProxy.loadLevel(SimonGame.data, SimonGame.loaded.bind(this));
    });
};

SimonGame.loaded = function() {
    helper.PlatformBridge.loaded(SimonGame.data);
};

SimonGame.start = function() {
    var gameScreenMediator = SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).retrieveMediator(SimonGame.mediator.GameScreenMediator.NAME);
    gameScreenMediator.startTheGame();
};

