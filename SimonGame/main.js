var helper = helper || {};
var res = res || {};
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));


    var frameSize = cc.view.getFrameSize();
    AppConstants.SCREEN_WIDTH = frameSize.width;
    AppConstants.SCREEN_HEIGHT = frameSize.height;
    AppConstants.OS = cc.sys.os;
    //set the content scale factor
    if (AppConstants.SCREEN_WIDTH <= 1024) {
        AppConstants.CONTENT_SCALE_FACTOR = 1;
        AppConstants.RESOURCE_FOLDER = "ldpi";
    } else if (AppConstants.SCREEN_WIDTH <= 1024 * 2) {
        AppConstants.CONTENT_SCALE_FACTOR = 2;
        AppConstants.RESOURCE_FOLDER = "mdpi";
    } else {
        AppConstants.CONTENT_SCALE_FACTOR = 3;
        AppConstants.RESOURCE_FOLDER = "hdpi";
    }

    AppConstants.DEVICE_TYPE = AppConstants.MOBILE_VERSION;
    //getting the system language
    AppConstants.APP_LANGUAGE = cc.sys.language;

    //code for changing the content scale factor according to the frame width
    cc.director.setContentScaleFactor(AppConstants.CONTENT_SCALE_FACTOR);

    //ratio for setting the design resolution
    var screenRatio = AppConstants.SCREEN_WIDTH / AppConstants.SCREEN_HEIGHT;
    var originalDesignRatio = AppConstants.ORIGINAL_DEVICE_HEIGHT / AppConstants.ORIGINAL_DEVICE_HEIGHT;

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    var resolutionPolicy;
    if(screenRatio > originalDesignRatio) {
        resolutionPolicy = cc.ResolutionPolicy.FIXED_HEIGHT;
        cc.view.setDesignResolutionSize(AppConstants.ORIGINAL_DEVICE_WIDTH, AppConstants.ORIGINAL_DEVICE_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
    }else{
        resolutionPolicy = cc.ResolutionPolicy.FIXED_WIDTH;
        cc.view.setDesignResolutionSize(AppConstants.ORIGINAL_DEVICE_WIDTH, AppConstants.ORIGINAL_DEVICE_HEIGHT, cc.ResolutionPolicy.FIXED_WIDTH);
    }
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    var windowSize = cc.director.getWinSize();

    //storing the window size
    AppConstants.DEVICE_WIDTH = windowSize.width;
    AppConstants.DEVICE_HEIGHT = windowSize.height;

    //Init Flax
    flax.init(resolutionPolicy);
    flax.registerFont("AvenirNext", "res/shared/fonts/AvenirNext.ttf");


    //Load Global Resource
    res.shared = {
        score_png: "res/shared/" + AppConstants.RESOURCE_FOLDER + "/score.png",
        score_plist: "res/shared/" + AppConstants.RESOURCE_FOLDER + "/score.plist",
        simon_png: "res/SimonGame.png",
        simon_plist: "res/SimonGame.plist",
        effect_plist:"res/effect.plist",
        effect_png:"res/effect.png",
        Final: "res/Final.plist",
        Final_png: "res/Final.png",
        scene_nav:"res/sceneNav.plist",
        scene_png:"res/sceneNav.png",
        gamefruit_plist:"res/gameFruitsLink.plist",
        gamefruit_png:"res/gameFruitsLink.png"

    };

    res.g_sharedResource = [];

    for (var i in res.shared){
        res.g_sharedResource.push(res.shared[i]);
    }

    AppConstants.ANDROID_FONT_MULTIPLIER = 1.3;
    if(cc.sys.os === cc.sys.OS_ANDROID){
        AppConstants.FONT_LARGE *= AppConstants.ANDROID_FONT_MULTIPLIER;
        AppConstants.FONT_NORMAL *= AppConstants.ANDROID_FONT_MULTIPLIER;
        AppConstants.FONT_SMALL *= AppConstants.ANDROID_FONT_MULTIPLIER;
    }


    cc.loader.load(res.g_sharedResource, function () {
        cc.loader.loadJs(["src/SimonGame/main.js"], function(){
            window["SimonGame"].setPath("src/SimonGame/");
            window["SimonGame"].setData({
                //imageFolderPath: 'src/SimonGame/res/temp/',
                callbackEventName: 'callbackEventName',
                tutorial: 0
            });
            window["SimonGame"].preload();
        });
    });


    helper.EventHelper.addCustomEvent(function (event) {
        var userData = event.getUserData();
        if(userData.name === helper.PlatformBridge.LOADED_EVENT){
            window["SimonGame"].start();
        }
        cc.log('Event Received from SimonGame: '+ userData.name);
    },'callbackEventName');
};

cc.game.run();
