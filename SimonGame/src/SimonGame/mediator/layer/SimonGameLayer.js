/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */

var boxes=[];
var level=0;
var lives=2;
var count=0;
var gameOver=0;
var j=0;
var refcall=0;
var round1=0;
var round2=0;
var touchEnable=0;
SimonGame.mediator.layer.SimonGameLayer = cc.Layer.extend({
    levelProxy: null,
    levelVO: null,
    ctor: function () {
        this._super();

        //initialize the variable
        this.levelProxy = SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).retrieveProxy(SimonGame.model.proxy.LevelProxy.NAME);
        this.levelVO = this.levelProxy.getData();

        this.init();
    },
    init: function () {


        this.pauseBtn = flax.assetsManager.createDisplay(res.shared.scene_nav, "sprite271");
        this.pauseBtn.x=AppConstants.DEVICE_WIDTH/2-220;
        this.pauseBtn.y=AppConstants.DEVICE_HEIGHT-10;
        this.addChild(this.pauseBtn,4);
        this.pauseBtn.setScale(2);
        this.pauseBtn.selected=true;
        helper.EventHelper.addMouseTouchEvent(this._onPauseChange.bind(this),this.pauseBtn);


        //Creating two lifes.
        this.heart1 = flax.assetsManager.createDisplay(res.shared.simon_plist, "heartContainer");
        this.heart1.x= AppConstants.DEVICE_WIDTH -300 ;
        this.heart1.y= AppConstants.DEVICE_HEIGHT-40;
        this.heart1.setScale(1.5);
        this.addChild(this.heart1,6);

        this.heart2 = flax.assetsManager.createDisplay(res.shared.simon_plist, "heartContainer");
        this.heart2.x= AppConstants.DEVICE_WIDTH -340 ;
        this.heart2.y= AppConstants.DEVICE_HEIGHT-40;
        this.heart2.setScale(1.5);
        this.addChild(this.heart2,6);

        //Grey heart to show after loosing a life;
        greyheart2 = flax.assetsManager.createDisplay(res.shared.simon_plist, "greyHeart");
        greyheart2.x= AppConstants.DEVICE_WIDTH -340 ;
        greyheart2.y= AppConstants.DEVICE_HEIGHT-40;
        greyheart2.setScale(1.25);
        this.addChild(greyheart2,5);

        //Grey heart to show after loosing a life;
        greyheart1 = flax.assetsManager.createDisplay(res.shared.simon_plist, "greyHeart");
        greyheart1.x= AppConstants.DEVICE_WIDTH -300 ;
        greyheart1.y= AppConstants.DEVICE_HEIGHT-40;
        greyheart1.setScale(1.25);
        this.addChild(greyheart1,5);


        //Creating hearts container(small black background).
        this.heartcontainer = flax.assetsManager.createDisplay(res.shared.simon_plist, "scoreContainer");
        this.heartcontainer.x= AppConstants.DEVICE_WIDTH -360 ;
        this.heartcontainer.y= AppConstants.DEVICE_HEIGHT-35;
        this.heartcontainer.setScale(1.5);
        this.addChild(this.heartcontainer,4);

        //Creating small black background
        this.blackbg = flax.assetsManager.createDisplay(res.shared.simon_plist, "simonBG");
        this.blackbg.x= AppConstants.DEVICE_WIDTH/2 -5 ;
        this.blackbg.y= AppConstants.DEVICE_HEIGHT/2+5;
        this.blackbg.setRotation(45);
        this.blackbg.setScale(1.25);
        this.addChild(this.blackbg,0);

        //Creating blackContainer (center of all 4 boxes)
        this.backcontainer = flax.assetsManager.createDisplay(res.shared.simon_plist, "backContainer");
        this.backcontainer.x= AppConstants.DEVICE_WIDTH/2-40 ;
        this.backcontainer.y= AppConstants.DEVICE_HEIGHT/2+40;
        this.addChild(this.backcontainer,5);

        //Creating blue box.
        bluebox = flax.assetsManager.createDisplay(res.shared.simon_plist, "BlueBox");
        bluebox.x= AppConstants.DEVICE_WIDTH/2-140 ;
        bluebox.y= AppConstants.DEVICE_HEIGHT/2-5;
        bluebox.tag=2;
        this.addChild(bluebox,4);
        helper.EventHelper.addMouseTouchEvent(this.__userInput.bind(this),bluebox);

       //Creating red box.
        redbox = flax.assetsManager.createDisplay(res.shared.simon_plist, "RedBox");
        redbox.x= AppConstants.DEVICE_WIDTH/2 ;
        redbox.y= AppConstants.DEVICE_HEIGHT/2+140;
        redbox.tag=1;
        this.addChild(redbox,4);
        helper.EventHelper.addMouseTouchEvent(this.__userInput.bind(this),redbox);

        //Creating green box.
        greenbox = flax.assetsManager.createDisplay(res.shared.simon_plist, "GreenBox");
        greenbox.x= AppConstants.DEVICE_WIDTH/2- 140 ;
        greenbox.y= AppConstants.DEVICE_HEIGHT/2+ 140;
        greenbox.tag=0;
        this.addChild(greenbox,4);
        helper.EventHelper.addMouseTouchEvent(this.__userInput.bind(this),greenbox);

        //Creating yellow box.
        yellowbox = flax.assetsManager.createDisplay(res.shared.simon_plist, "YellowBox");
        yellowbox.x= AppConstants.DEVICE_WIDTH/2 ;
        yellowbox.y= AppConstants.DEVICE_HEIGHT/2;
        yellowbox.tag=3;
        this.addChild(yellowbox,4);
        helper.EventHelper.addMouseTouchEvent(this.__userInput.bind(this),yellowbox);

        //WoodenScoreBoard
        this.scorewood = flax.assetsManager.createDisplay(res.shared.gamefruit_plist, "asset5");
        this.scorewood.x= AppConstants.DEVICE_WIDTH/2;
        this.scorewood.y = AppConstants.DEVICE_HEIGHT-40;
        this.addChild(this.scorewood,3);
        this.scorewood.setScale(2);
        this.scorewood.setScaleX(6);

        this.score = flax.assetsManager.createDisplay(res.shared.gamefruit_plist, "asset3");
        this.score.x= AppConstants.DEVICE_WIDTH/2;
        this.score.y = AppConstants.DEVICE_HEIGHT-40;
        this.addChild(this.score,4);
        this.score.setScale(5);

        this.scorevalue = helper.GameHelper.makeTTFFont(level.toString(), helper.GameHelper.hexToRgb("#FFFFFF"),50, cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.scorevalue, 6);
        this.scorevalue.x = AppConstants.DEVICE_WIDTH / 2+140;
        this.scorevalue.y = AppConstants.DEVICE_HEIGHT-40;


         this.answerText = helper.GameHelper.makeTTFFont(level+1,helper.GameHelper.hexToRgb("#FFFFFF"),30,cc.TEXT_ALIGNMENT_CENTER);
         this.addChild(this.answerText,6);
         this.answerText.x= AppConstants.DEVICE_WIDTH/2-5;
         this.answerText.y=AppConstants.DEVICE_HEIGHT/2+5;

        this.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
            this.generateSequence();

        }.bind(this),this)));

    },

    generateSequence:function()
            {
                if(cc.director.getRunningScene()&&cc.director.getRunningScene().paused)
                {
                    return true;
                }

                cc.log("Generating Sequence");
             boxes.push(this.getRandomInt(0,3));

                           if(level>0) {
                               this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                                   this.removeChild(this.refresh);

                                   this.answerText = helper.GameHelper.makeTTFFont(level, helper.GameHelper.hexToRgb("#FFFFFF"), 30, cc.TEXT_ALIGNMENT_CENTER);
                                   this.addChild(this.answerText, 6);
                                   this.answerText.x = AppConstants.DEVICE_WIDTH / 2 - 5;
                                   this.answerText.y = AppConstants.DEVICE_HEIGHT / 2 + 5;
                                 }.bind(this), this)));
                            }
                this.displayScore(level);
                 this.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                        this.animateSequence(this,0);
                }.bind(this),this)));

                if(level==5)
               {
                   this.changeBackground();
                   this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){
                       this.sparkle();
                   }.bind(this),this)));

               }
                if(level==8)
                {
                    this.changeBackground();
                    this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){
                       this.sparkle();
                    }.bind(this),this)));
                }

                j=0;
                count=0;
                level++;
         },

      displayScore:function(score){
         if(score>0) {
             this.removeChild(this.scorevalue);
             this.scorevalue = helper.GameHelper.makeTTFFont(score, helper.GameHelper.hexToRgb("#FFFFFF"), 50, cc.TEXT_ALIGNMENT_CENTER);
             this.addChild(this.scorevalue, 6);
             this.scorevalue.x = AppConstants.DEVICE_WIDTH / 2 + 140;
             this.scorevalue.y = AppConstants.DEVICE_HEIGHT - 40;
         }
      },

        changeBackground:function(){

           if(level==5)
           {   this.bgColor1 = new cc.LayerColor(new cc.color(144, 192, 248));
               this.bgLayer = flax.assetsManager.createDisplay(res.shared.simon_plist, "background");
               this.bgLayer.setScaleX(cc.winSize.width/this.bgLayer.getContentSize().width);
               this.bgLayer.setScaleY(cc.winSize.height/this.bgLayer.getContentSize().height);
               this.bgLayer.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
               this.bgLayer.setAnchorPoint(cc.p(0.5,0.5));
               this.removeChild(this.bgColor);
               this.addChild(this.bgColor1,-3);
               this.addChild(this.bgLayer,-3);
               this.correctStreak();
           }
           if(level==8)
           {
               this.bgColor2 = new cc.LayerColor(new cc.color(178,34,34));
               this.bgLayer = flax.assetsManager.createDisplay(res.shared.simon_plist, "background");
               this.bgLayer.setScaleX(cc.winSize.width/this.bgLayer.getContentSize().width);
               this.bgLayer.setScaleY(cc.winSize.height/this.bgLayer.getContentSize().height);
               this.bgLayer.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
               this.bgLayer.setAnchorPoint(cc.p(0.5,0.5));
               this.removeChild(this.bgColor1);
               this.addChild(this.bgColor2,-3);
               this.addChild(this.bgLayer,-3);
               this.correctStreak();
            }
           return true;
       },

    correctStreak : function () {


        var text =level.toString() + " in a row";
        var textToDisplay = helper.GameHelper.makeTTFFont(text,helper.GameHelper.hexToRgb("#FFFFFF"), 40, cc.TEXT_ALIGNMENT_CENTER);
        textToDisplay.setAnchorPoint(0.5,0.5);
        textToDisplay.setPosition(cc.winSize.width/2,cc.winSize.height + textToDisplay.getContentSize().height);
        textToDisplay.zIndex = 100;
        this.addChild(textToDisplay);
        textToDisplay.runAction(
            cc.sequence(
                cc.moveTo(0.1,cc.winSize.width/2,cc.winSize.height -150),
                cc.scaleTo(0.3,1.2),
                cc.scaleTo(0.3,1),
                cc.delayTime(0.5),
                cc.moveTo(0.1,cc.winSize.width/2,cc.winSize.height + textToDisplay.getContentSize().height)
            )
        );
    },

       getRandomInt:function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
       },


       //Animation for the generated sequence

      animateSequence:function(obj,j) {
          if (cc.director.getRunningScene() && cc.director.getRunningScene().paused) {
              return true;
          }
          if (j <= level) {
              {
                  if (boxes[j] == 0) {
                      greenbox.autoStopWhenOver = true;
                      greenbox.gotoAndPlay(0);
                      cc.audioEngine.playEffect(SimonGame.res.ButtonClick, false);

                  }
                  if (boxes[j] == 1) {
                      redbox.autoStopWhenOver = true;
                      redbox.gotoAndPlay(0);
                      cc.audioEngine.playEffect(SimonGame.res.ButtonClick, false);

                  }
                  if (boxes[j] == 2) {
                      bluebox.autoStopWhenOver = true;
                      bluebox.gotoAndPlay(0);
                      cc.audioEngine.playEffect(SimonGame.res.ButtonClick, false);
                  }
                  if (boxes[j] == 3) {
                      yellowbox.autoStopWhenOver = true;
                      yellowbox.gotoAndPlay(0);
                      cc.audioEngine.playEffect(SimonGame.res.ButtonClick, false);
                  }
                  j++;

                  if (j == level) {
                      this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                          this.removeChild(this.answerText);
                          this.refresh = flax.assetsManager.createDisplay(res.shared.simon_plist, "asset5");
                          this.refresh.x = AppConstants.DEVICE_WIDTH / 2 - 5;
                          this.refresh.y = AppConstants.DEVICE_HEIGHT / 2 + 5;
                          this.refresh.setScale(1.25);
                          this.refresh.tag = 4;
                          this.addChild(this.refresh, 6);
                          helper.EventHelper.addMouseTouchEvent(this.__userInput.bind(this), this.refresh);
                          touchEnable = 1;
                      }.bind(this), this)));

                  }

                  this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {


                      this.animateSequence(this, j);


                  }.bind(this), this)));
                  return 0;
              }
          }
      },
         //Main working Algorithm
       __userInput:function(event,touch,state){
           if(cc.director.getRunningScene()&&cc.director.getRunningScene().paused)
           {
               return true;
           }
           var clickedBox= event.getCurrentTarget();

           if(state==helper.EventHelper.ON_CLICK&&touchEnable!=0)
           {
               cc.audioEngine.playEffect(SimonGame.res.ButtonClick,false);
                clickedBox.autoStopWhenOver = true;
               clickedBox.gotoAndPlay(0);
                   if (boxes[count] != clickedBox.tag && lives != 0 && clickedBox.tag <= 3) {
                       this.lostLife(1);

                          lives--;
                       if (lives != 0) {
                           this.round1 = level;
                       }
                       //Show user a loosing heart;
                       if (lives == 0) {
                           this.lostLife(2);
                           this.removeChild(this.lifeInfo);
                           this.levelProxy.updateRound1(this.round1);
                           this.round2 = level - this.round1;
                           this.levelProxy.updateRound2(this.round2);
                           cc.log("Round 2" + " " + this.round2);
                           this.levelProxy.updateScore(level);
                           this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                               this.removeAllChildren();
                               this.stopAllActions();
                                this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                                    cc.audioEngine.playEffect(SimonGame.res.Gameover, false);
                                       var scoreLayer = new SimonGame.mediator.layer.ScoreLayer();
                                       this.addChild(scoreLayer);
                               }.bind(this),this)));
                          }.bind(this),this)));
                           cc.log("Game Over");
                           gameOver = 1;
                       }
                       if (lives != 0) {
                           this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                               this.removeChild(this.lifeInfo);
                               touchEnable=0;
                               this.removeChildByTag(4);
                               this.answerText = helper.GameHelper.makeTTFFont(level, helper.GameHelper.hexToRgb("#FFFFFF"), 30, cc.TEXT_ALIGNMENT_CENTER);
                               this.addChild(this.answerText, 6);
                               this.answerText.x = AppConstants.DEVICE_WIDTH / 2 - 5;
                               this.answerText.y = AppConstants.DEVICE_HEIGHT / 2 + 5;
                               this.animateSequence(this, 0);

                           }.bind(this), this)));
                       }

                   }
                   if (boxes[count] == clickedBox.tag) {
                       cc.log(clickedBox.tag);
                       count++;
                   }

                   if (count == level) {
                      this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function(){
                         touchEnable=0;
                          this.generateSequence();

                      }.bind(this), this)));


                        }
               }
           if(state==helper.EventHelper.ON_CLICK){

               if(clickedBox.tag==4)
               {   count=0;
                   touchEnable=0;
                   this.removeChildByTag(4);
                   this.answerText = helper.GameHelper.makeTTFFont(level,helper.GameHelper.hexToRgb("#FFFFFF"),30,cc.TEXT_ALIGNMENT_CENTER);
                   this.addChild(this.answerText,6);
                   this.answerText.x= AppConstants.DEVICE_WIDTH/2-5;
                   this.answerText.y= AppConstants.DEVICE_HEIGHT/2+5;
                   this.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                       this.animateSequence(this,0);

                   }.bind(this),this)));
               }


           }

           return true;
       },

       sparkle:function(){

           var sparkle = flax.assetsManager.createDisplay(res.shared.effect_plist, "effect");
           sparkle.x=AppConstants.DEVICE_WIDTH/2+300;
           sparkle.y=AppConstants.DEVICE_HEIGHT/2;
           this.addChild(sparkle);
           sparkle.setScale(3);
           sparkle.autoStopWhenOver = true;
           sparkle.gotoAndPlay(0);

           var sparkle1 = flax.assetsManager.createDisplay(res.shared.effect_plist, "effect");
           sparkle1.x=AppConstants.DEVICE_WIDTH/2-300;
           sparkle1.y=AppConstants.DEVICE_HEIGHT/2;
           sparkle1.setScale(3);
           this.addChild(sparkle1);
           sparkle1.autoStopWhenOver = true;
           sparkle1.gotoAndPlay(0);
             return true;
       },

        lostLife:function(number){
            cc.audioEngine.playEffect(SimonGame.res.Lifelost, false);
            this.lifeInfo = helper.GameHelper.makeTTFFont("You lost a life!!!",helper.GameHelper.hexToRgb("#FFFFFF"),50,cc.TEXT_ALIGNMENT_CENTER);
            this.addChild(this.lifeInfo,6);
            this.lifeInfo.x= AppConstants.DEVICE_WIDTH/2;
            this.lifeInfo.y=AppConstants.DEVICE_HEIGHT/2+200;
            if(number ==1)
            {
                var move1 = cc.moveTo(0.25,AppConstants.DEVICE_WIDTH -340,AppConstants.DEVICE_HEIGHT-80);
                var seq1 = cc.sequence(move1);
                this.heart2.runAction(seq1);
                var fade1 = cc.FadeOut.create(0.25);
                this.heart2.runAction(fade1);

            }
            else
            {   var move2 = cc.moveTo(0.25,AppConstants.DEVICE_WIDTH -300,AppConstants.DEVICE_HEIGHT-80);
                var seq2 = cc.sequence(move2);
                this.heart1.runAction(seq2);
                var fade2 = cc.FadeOut.create(0.25);
                this.heart1.runAction(fade2);

            }
            return true;
        },

  _onPauseChange:function(touch, event,state)
    {
        if(cc.director.getRunningScene()&&cc.director.getRunningScene().paused)
        {
            return true;
        }
        //Pause the game if the pauseBtn is selected
        if(state==helper.EventHelper.ON_CLICK&&this.pauseBtn.selected) {
            //Pause the game
            helper.GameHelper.pauseScene();
            //Popup a cover of pause
            this.cover = flax.assetsManager.createDisplay(res.shared.scene_nav, "PauseCover");
            this.cover.setScaleX(cc.winSize.width / this.cover.getContentSize().width);
            this.cover.setScaleY(cc.winSize.height / this.cover.getContentSize().height);
            this.addChild(this.cover, 100);
           helper.EventHelper.addMouseTouchEvent(this._resume.bind(this),this.cover);
        }
        return true;
    },

   _resume:function(event,touch,state){
   if(state==helper.EventHelper.ON_CLICK) {
       //Destroy the cover
       helper.GameHelper.resumeScene();
       this.removeChild(this.cover);

       //Recover the state of the pauseBtn
       this.pauseBtn.selected = true;
   }
        return true;
   }
});
