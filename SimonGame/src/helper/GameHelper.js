/**
 * Created by vivekfitkariwala on 29/09/15.
 */
/*helper.GameHelper = helper.GameHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.GameHelper"
    },

    //instance member
    {

    },

    //static member
    {
        NAME: "GameHelper",
        pausedTimer:null,

        //making bitmap font
        makeBitmapFont: function(str, fntFile, color, width, alignment, imageOffSet){
            var label = new cc.LabelBMFont(str, fntFile, width, alignment, imageOffSet);
            if(color != null)
                label.setColor(color);
            return label;
        },

        makeTTFFont: function (str, fntFile, color, fontSize, hAlignment, vAlignment,dimensions) {
            if(arguments.length === 4){
                hAlignment = fontSize;
                fontSize = color;
                color = fntFile;
                fntFile = AppConstants.MAIN_FONT;
            }
            var label = new cc.LabelTTF(str, fntFile, fontSize, dimensions, hAlignment, vAlignment);
            //change the color
            if (color != null)
                label.setColor(color);
            return label;
        },

        //making the sprite from texture atlas
        makeSprite: function(name){
            var sprite = new cc.Sprite(name);
            return sprite;
        },

        //make spriteBatchNode from texture
        makeSpriteBatchNode: function(name, capacity){
            var spriteBatchNode = new cc.SpriteBatchNode(name, capacity);
            return spriteBatchNode;
        },

        //making animation and adding inside animation cache
        makeAnimation: function(frameName, delay, loop, animationName){
            var animFrames = [];
            var str = "";

            for(var i = 1; i > -1; i++){
                str = frameName + (i < 10 ? ("000" + i) : "00" + i) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                if(frame != null) {
                    animFrames.push(frame);
                }else{
                    break;
                }
            }

            var animation = new cc.Animation(animFrames, delay, loop);
            cc.animationCache.addAnimation(animation, animationName);
        },

        sendRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/add");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");

            var progressProxy = platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).retrieveProxy(platform.model.ProgressProxy.NAME);
            var progressVO = progressProxy.getData();

            var currentUser = progressVO.currentUser;

            var object = {};
            object.contentId = userData.ID;
            object.userId = currentUser;
            object.userAge = userData.kidage;
            object.like = userData.like;
            object.type = userData.type;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        hexToRgb: function (hex) {
            var hex = hex.replace('#', '');
            var r;
            var g;
            var b;
            var a;
            var color;
            if (hex.length == 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
                color = new cc.color(r, g, b);
            } else {
                a = parseInt(hex.substring(0, 2), 16);
                r = parseInt(hex.substring(2, 4), 16);
                g = parseInt(hex.substring(4, 6), 16);
                b = parseInt(hex.substring(6, 8), 16);
                color = new cc.color(r, g, b, a);
            }

            return color;
        },
        deleteRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/delete");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");
            var object = {};
            object.contentId = userData.ID;
            object.userAge = userData.kidage;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        isScenePaused: function () {
            var currentScene = cc.director.getRunningScene();
            return currentScene.paused;
        },
        pauseScene: function () {
            var currentScene = cc.director.getRunningScene();
            currentScene.paused = true;
            currentScene.pause();
            cc.eventManager.pauseTarget(currentScene,true);
            var scheduler = currentScene.getScheduler();
            //FIXME @nilesh Enable Schedular pause for native
            //Need Modification in js-binding tools/tojs/cocos2dx.ini
            //Scheduler::[pause resume ^unschedule$ unscheduleUpdate unscheduleAllForTarget schedule isTargetPaused isScheduled pauseAllTargets],
            //scheduler.pauseAllTargets();
            helper.AudioHelper.pauseMusic();
        },
        resetCurrentScene:function (){
            var currentScene = cc.director.getRunningScene();
            currentScene.resume();
            var scheduler = currentScene.getScheduler();
            //FIXME @nilesh Enable Schedular pause for native
            //var paused = scheduler.pauseAllTargets();
            //currentScene._scheduler.resumeTargets(paused);
            cc.eventManager.resumeTarget(currentScene,true);
            delete currentScene.paused;
        },
        resumeScene: function () {
            helper.GameHelper.resetCurrentScene();
            helper.AudioHelper.resumeMusic();
        }
    }
)*/


/**
 * Created by vivekfitkariwala on 29/09/15.
 */
helper.GameHelper = helper.GameHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.GameHelper"
    },

    //instance member
    {

    },

    //static member
    {
        NAME: "GameHelper",
        pausedActions:null,

        //making bitmap font
        makeBitmapFont: function(str, fntFile, color, width, alignment, imageOffSet){
            var label = new cc.LabelBMFont(str, fntFile, width, alignment, imageOffSet);
            if(color != null)
                label.setColor(color);
            return label;
        },

        makeTTFFont: function (str, fntFile, color, fontSize, hAlignment, vAlignment,dimensions) {
            if(arguments.length === 4){
                hAlignment = fontSize;
                fontSize = color;
                color = fntFile;
                fntFile = AppConstants.MAIN_FONT;
            }
            var label = new cc.LabelTTF(str, fntFile, fontSize, dimensions, hAlignment, vAlignment);
            //change the color
            if (color != null)
                label.setColor(color);
            return label;
        },

        //making the sprite from texture atlas
        makeSprite: function(name){
            var sprite = new cc.Sprite(name);
            return sprite;
        },

        //make spriteBatchNode from texture
        makeSpriteBatchNode: function(name, capacity){
            var spriteBatchNode = new cc.SpriteBatchNode(name, capacity);
            return spriteBatchNode;
        },

        //making animation and adding inside animation cache
        makeAnimation: function(frameName, delay, loop, animationName){
            var animFrames = [];
            var str = "";

            for(var i = 1; i > -1; i++){
                str = frameName + (i < 10 ? ("000" + i) : "00" + i) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                if(frame != null) {
                    animFrames.push(frame);
                }else{
                    break;
                }
            }

            var animation = new cc.Animation(animFrames, delay, loop);
            cc.animationCache.addAnimation(animation, animationName);
        },

        sendRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/add");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");

            var progressProxy = platform.ApplicationFacade.getInstance(platform.ApplicationFacade.NAME).retrieveProxy(platform.model.ProgressProxy.NAME);
            var progressVO = progressProxy.getData();

            var currentUser = progressVO.currentUser;

            var object = {};
            object.contentId = userData.ID;
            object.userId = currentUser;
            object.userAge = userData.kidage;
            object.like = userData.like;
            object.type = userData.type;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        hexToRgb: function (hex) {
            var hex = hex.replace('#', '');
            var r;
            var g;
            var b;
            var a;
            var color;
            if (hex.length == 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
                color = new cc.color(r, g, b);
            } else {
                a = parseInt(hex.substring(0, 2), 16);
                r = parseInt(hex.substring(2, 4), 16);
                g = parseInt(hex.substring(4, 6), 16);
                b = parseInt(hex.substring(6, 8), 16);
                color = new cc.color(r, g, b, a);
            }

            return color;
        },
        deleteRecommendation: function(userData){
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.open("POST", "https://brainbuilder.herokuapp.com/recommendation/delete");
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");
            var object = {};
            object.contentId = userData.ID;
            object.userAge = userData.kidage;

            var args = JSON.stringify(object);
            cc.log("Log arguments " + args);
            xhrRequest.send(args);
        },
        isScenePaused: function () {
            var currentScene = cc.director.getRunningScene();
            return currentScene.paused;
        },
        pauseScene: function () {
            var currentScene = cc.director.getRunningScene();
            currentScene.paused = true;
            currentScene.pause();
            cc.eventManager.pauseTarget(currentScene,true);
            var pausedActions = cc.director.getActionManager().pauseAllRunningActions();
            if(pausedActions.length){
                helper.GameHelper.pausedActions = pausedActions;
            }
            //FIXME @nilesh Enable Scheduler pause for native
            //Use setTimeScale for schedulers
            //Need Modification in js-binding tools/tojs/cocos2dx.ini
            //Scheduler::[pause resume ^unschedule$ unscheduleUpdate unscheduleAllForTarget schedule isTargetPaused isScheduled pauseAllTargets],
            helper.AudioHelper.pauseMusic();
        },
        resetCurrentScene:function (){
            var currentScene = cc.director.getRunningScene();
            currentScene.resume();

            if(helper.GameHelper.pausedActions && helper.GameHelper.pausedActions.length)
                cc.director.getActionManager().resumeTargets(helper.GameHelper.pausedActions);

            delete currentScene.exitingGame;
            //FIXME @nilesh Enable Schedular pause for native
            //Need Modification in js-binding tools/tojs/cocos2dx.ini
            //Scheduler::[pause resume ^unschedule$ unscheduleUpdate unscheduleAllForTarget schedule isTargetPaused isScheduled pauseAllTargets],

            cc.eventManager.resumeTarget(currentScene,true);
            delete currentScene.paused;
        },
        resumeScene: function () {
            helper.GameHelper.resetCurrentScene();
            helper.AudioHelper.resumeMusic();
        },

        showTutorialScreen: function(gameData){
            var currentScene = cc.director.getRunningScene();
            var gameLayer = currentScene.layer;
            var hintButton = gameLayer.hintButton;

            if (!(gameLayer.tutorialScreen && gameLayer.tutorialScreen.parent)) {
                //adding the masking inside the tut1
                gameLayer.tutorialScreen = new cc.LayerColor(helper.GameHelper.hexToRgb("#AA000000"));
                var clipper = new cc.ClippingNode();
                clipper.width = AppConstants.DEVICE_WIDTH;
                clipper.height = AppConstants.DEVICE_HEIGHT;
                clipper.setTag(1);

                var stencil = new cc.DrawNode();
                var rectangle = [cc.p(0, 0), cc.p(clipper.width, 0),
                    cc.p(clipper.width, clipper.height),
                    cc.p(0, clipper.height)];

                var white = cc.color(255, 255, 255, 255);
                stencil.drawPoly(rectangle, white, 1, white);
                clipper.stencil = stencil;

                var tutorialScreen = new window[gameData.zipName].mediator.layer.TutorialLayer(helper.GameHelper.removeTutorial.bind(this));
                tutorialScreen.setContentSize(AppConstants.DEVICE_WIDTH, AppConstants.DEVICE_HEIGHT);
                cc.eventManager.resumeTarget(hintButton, true);

                clipper.addChild(tutorialScreen);
                gameLayer.tutorialScreen.addChild(clipper, 2);

                clipper.scaleX = 0;
                clipper.scaleY = 0;
                clipper.anchorX = 1;
                clipper.anchorY = 0;
                clipper.x = AppConstants.DEVICE_WIDTH - hintButton.width / 2 - 5;
                clipper.y = hintButton.height / 2 + 5;

                var scaleAction = cc.scaleTo(0.1, 0.9, 0.9);
                clipper.runAction(scaleAction);

                //adding tutorial screen
                gameLayer.addChild(gameLayer.tutorialScreen);
            } else {
                //remove the tutorial
                helper.GameHelper.removeTutorial();
            }
        },

        removeTutorial: function () {
            var currentScene = cc.director.getRunningScene();
            var gameLayer = currentScene.layer;

            var scaleAction = cc.scaleTo(0.1, 0, 0);
            var callFunction = cc.callFunc(helper.GameHelper.removeTutorialLayer.bind(this), this);
            gameLayer.tutorialScreen.getChildByTag(1).runAction(cc.sequence(scaleAction, callFunction));
        },

        removeTutorialLayer: function () {
            var currentScene = cc.director.getRunningScene();
            var gameLayer = currentScene.layer;

            helper.GameHelper.resumeScene();
            if (gameLayer.tutorialScreen) {
                gameLayer.removeChild(gameLayer.tutorialScreen);
                gameLayer.tutorialScreen = null;
            }
        },

    }
)




















