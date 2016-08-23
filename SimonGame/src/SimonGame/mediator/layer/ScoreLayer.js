/**
 * Created by Mallipeddi Akshay on 21/02/16.
 */

SimonGame.mediator.layer.ScoreLayer = cc.Layer.extend({
    scoreCardText:null,
    backBtn:null,
    localScore:0,
    scoreCard:null,
    highScoreBadge:null,
    finalScoreText:null,
    shareBtn:null,
    continueBtn:null,
    showHighScore:true,
    star:null,
    xPos:0,
    score:0,
    round1:0,
    round2:0,
    ctor: function () {

        this._super();
        this.levelProxy = SimonGame.ApplicationFacade.getInstance(SimonGame.ApplicationFacade.NAME).retrieveProxy(SimonGame.model.proxy.LevelProxy.NAME);
        this.levelVO = this.levelProxy.getData();
        this.init();
    },
    init: function () {

        this.sprite = new cc.Sprite("res/v3-Gameover.jpg");
        this.sprite.attr({
            x: AppConstants.DEVICE_WIDTH/2,
            y: AppConstants.DEVICE_HEIGHT/2
        });
        this.addChild(this.sprite);
        this.sprite.setScaleX(1.8);
        this.sprite.setOpacity(100);

        this.scoreBoard = helper.GameHelper.makeTTFFont("ScoreBoard", helper.GameHelper.hexToRgb("#FFFFFF"), 45, cc.TEXT_ALIGNMENT_CENTER);
        this.scoreBoard.anchorX = 0.5;
        this.scoreBoard.anchorY = 0.5;
        this.scoreBoard.lineWidth = 1.75;
        this.scoreBoard.x=AppConstants.DEVICE_WIDTH / 2;
        this.scoreBoard.y=AppConstants.DEVICE_HEIGHT-100;
        this.addChild(this.scoreBoard);

         var scoreText;

        var dotBackground = new cc.DrawNode();
        var dotBackgroundHeight = AppConstants.DEVICE_HEIGHT * 0.2;
        dotBackground.setContentSize(cc.size(AppConstants.DEVICE_WIDTH, dotBackgroundHeight));
        dotBackground.drawRect(cc.p(0, 0), cc.p(AppConstants.DEVICE_WIDTH, dotBackgroundHeight), helper.GameHelper.hexToRgb("#091824"), 1, helper.GameHelper.hexToRgb("#00000000"));
        this.addChild(dotBackground);

        this.scoreCardText = helper.GameHelper.makeTTFFont(scoreText, helper.GameHelper.hexToRgb("#FFFFFF"), 45, cc.TEXT_ALIGNMENT_CENTER);
        this.scoreCardText.anchorX = 0.5;
        this.scoreCardText.anchorY = 0.5;
        this.scoreCardText.lineWidth = 1.5;

        this.scoreCardText.attr({
            x: AppConstants.DEVICE_WIDTH / 2,
            y: AppConstants.DEVICE_HEIGHT / 2,
            scaleX: 0,
            scaleY: 0
        });
        this.addChild(this.scoreCardText);

        //Adding Scorecard
        this.scoreCard = flax.assetsManager.createDisplay(res.shared.score_plist, "scoreBoard");
        this.scoreCard.attr({
            x: AppConstants.DEVICE_WIDTH / 2,
            y: AppConstants.DEVICE_HEIGHT / 2 - 25
        });
        this.addChild(this.scoreCard);
        if (SimonGame.data.highscore !== undefined && SimonGame.data.highscore > this.levelVO.score || !this.levelVO.score) {
            this.showHighScore = false;
        }

        if (this.showHighScore) {
            //Adding Scorecard
            this.highScoreBadge = flax.assetsManager.createDisplay(res.shared.score_plist, "NewHighScore");
            this.highScoreBadge.cascadeOpacity = true;

            //adding the text inside high score badge
            var newHighScoreText = helper.GameHelper.makeTTFFont(SimonGame.locale.newHighScore, AppConstants.MAIN_FONT, helper.GameHelper.hexToRgb("#000000"), 23, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER, cc.size(this.highScoreBadge.width - 40, this.highScoreBadge.height / 2));
            this.highScoreBadge.addChild(newHighScoreText);
            newHighScoreText.x = this.highScoreBadge.width / 2;
            newHighScoreText.y = this.highScoreBadge.height / 2 + 30;
            newHighScoreText.rotation = -15;

            this.highScoreBadge.setScale(5);
            this.highScoreBadge.setOpacity(0);
            this.highScoreBadge.attr({
                x: AppConstants.DEVICE_WIDTH / 2 + this.scoreCard.width / 2,
                y: this.scoreCard.y + this.scoreCard.height / 2
            });
            this.addChild(this.highScoreBadge, 1);
        }


        this.finalScoreText = helper.GameHelper.makeTTFFont("Final Score" + ": ", helper.GameHelper.hexToRgb("#FFFFFF"), 40, cc.TEXT_ALIGNMENT_CENTER);
        this.finalScoreText.attr({
            x: AppConstants.DEVICE_WIDTH / 2,
            y: AppConstants.DEVICE_HEIGHT / 2 + this.scoreCard.height / 2 + this.finalScoreText.height
        });
        this.addChild(this.finalScoreText);
        this.finalScoreText.scaleX = 0;
        this.finalScoreText.scaleY = 0;
        this.finalScoreText.lineWidth = 1.5;

        this.finalScoreNumber = helper.GameHelper.makeTTFFont("0", helper.GameHelper.hexToRgb("#FFFFFF"), 40, cc.TEXT_ALIGNMENT_CENTER);
        this.finalScoreNumber.x = this.finalScoreText.x + this.finalScoreText.width / 2;
        this.finalScoreNumber.y = this.finalScoreText.y;
        this.finalScoreNumber.anchorX = 0;
        this.addChild(this.finalScoreNumber);
        this.finalScoreNumber.scaleX = 0;
        this.finalScoreNumber.scaleY = 0;
        this.finalScoreNumber.lineWidth = 1.5;

        this.levelVO.score && this.addScoreLine("Round 1",1,this.levelVO.round1.toString());
        this.levelVO.round1 && this.addScoreLine("Round 2",2,this.levelVO.round2.toString());
        this.scoreCard.scaleX = 0;
        this.scoreCard.scaleY = 0;

        //Adding Share Btn
        this.shareBtn = flax.assetsManager.createDisplay(res.shared.score_plist, "shareBtn");
        this.shareBtn.anchorX = 0.5;
        this.shareBtn.anchorY = 0.5;
        this.shareBtn.attr({
            x: AppConstants.DEVICE_WIDTH / 2 - this.shareBtn.width / 2 - 50,
            y: dotBackground.height / 2
        });
        this.continueBtn = flax.assetsManager.createDisplay(res.shared.score_plist, "continueBtn");
        this.continueBtn.anchorX = 0.5;
        this.continueBtn.anchorY = 0.5;
        this.continueBtn.attr({
            x: AppConstants.DEVICE_WIDTH / 2 + this.continueBtn.width / 2 -100,
            y: dotBackground.height / 2
        });

        //adding continue text inside continue button
        this.continueTxt = helper.GameHelper.makeTTFFont("Thank You!!!", helper.GameHelper.hexToRgb("#FFFFFF"), 35, cc.TEXT_ALIGNMENT_CENTER);
        this.continueTxt.x = this.continueBtn.width / 2;
        this.continueTxt.y = this.continueBtn.height / 2;
        this.continueBtn.addChild(this.continueTxt, 1);

        this.continueBtn.setScale(0);
        helper.EventHelper.addMouseTouchEvent(this.complete.bind(this), this.continueBtn);
        this.addChild(this.continueBtn);

        if (AppConstants.DEVICE_TYPE == AppConstants.TV_VERSION) {
            this.continueBtn.x = AppConstants.DEVICE_WIDTH / 2;
        }

        this.animateScoreBoard();
        this.schedule(this.scoreTextAnim, 0.04, 100000, 1.2);

    },

    complete: function (event, touch, state) {
        if (state == helper.EventHelper.ON_CLICK) {
            this.continueBtn.gotoAndStop(1);
            this.continueTxt.setColor(helper.GameHelper.hexToRgb("#000000"));
        }
        return true;
    },


    addScoreLine: function (desc, lineNumber, data) {
        var totalLines = 2;
        this["scoreLine"+lineNumber] = helper.GameHelper.makeTTFFont(desc + ":  ", helper.GameHelper.hexToRgb("#FFFFFF"), 40, cc.TEXT_ALIGNMENT_RIGHT);
        this["scoreLine"+lineNumber].anchorX = 1;
        this["scoreLine"+lineNumber].attr({
            x:this.xPos,
            y: this.scoreCard.height - (lineNumber * this.scoreCard.height / (totalLines + 1))
        });
        this["scoreLine"+lineNumber].lineWidth = 1.5;

        this["dataLine"+lineNumber] = helper.GameHelper.makeTTFFont(data, helper.GameHelper.hexToRgb("#FFFFFF"), 40, cc.TEXT_ALIGNMENT_LEFT);
        this["dataLine"+lineNumber].anchorX = 0;
        this["dataLine"+lineNumber].attr({
            x:this.xPos,
            y: this.scoreCard.height - (lineNumber * this.scoreCard.height / (totalLines + 1))
        });
        this["dataLine"+lineNumber].lineWidth=1.5;
        var currentXPos = this.scoreCard.width/2 - this["dataLine"+lineNumber].width/2 + this["scoreLine"+lineNumber].width/2;
        if(currentXPos > this.xPos){
            this.xPos = currentXPos;
            var currentLine = lineNumber;
            while(this["dataLine"+currentLine]){
                this["dataLine"+currentLine].x = this.xPos;
                this["scoreLine"+currentLine].x = this.xPos;
                currentLine--;
            }
        }

        this.scoreCard.addChild(this["dataLine"+lineNumber]);
        this.scoreCard.addChild(this["scoreLine"+lineNumber]);
    },
     scoreTextAnim: function () {
        this.finalScoreNumber.setString(" " + this.localScore++);
        if (this.localScore > this.levelVO.score) {
            cc.log('Removing');
            this.unschedule(this.scoreTextAnim);
        }
    },

    animateScoreBoard: function () {
        var time = 0.3;
        var scoreShow = cc.moveTo(time, cc.p(AppConstants.DEVICE_WIDTH / 2, AppConstants.DEVICE_HEIGHT - 3 * this.scoreCardText.height / 2)).easing(cc.easeBackOut(time));
        var btnScale = cc.scaleTo(time, 1).easing(cc.easeBackOut(2));
        var fadeOut = cc.fadeTo(time / 2, 255);

        var scoreScale = cc.targetedAction(this.scoreCardText, btnScale.clone());
        var scaleScoreCard = cc.targetedAction(this.scoreCardText, btnScale.clone());
        var scoreTextShow = cc.targetedAction(this.scoreCardText, scoreShow);
        var scoreCardAction = cc.sequence(scoreScale, scoreTextShow);
        var scoreCardScale = cc.targetedAction(this.scoreCard, btnScale.clone());
        var finalScoreText = cc.targetedAction(this.finalScoreText, btnScale.clone());
        var finalScoreNumber = cc.targetedAction(this.finalScoreNumber, btnScale.clone());
        var shareBtnAnim = cc.targetedAction(this.shareBtn, btnScale.clone());
        var continueAnim = cc.targetedAction(this.continueBtn, btnScale.clone());

        if (this.showHighScore) {
            var highScoreBadgeAnim = cc.targetedAction(this.highScoreBadge, btnScale.clone());
            var highScoreBadgeShow = cc.targetedAction(this.highScoreBadge, fadeOut.clone());
            this.scoreCardText.runAction(cc.sequence(scoreCardAction, scaleScoreCard, cc.spawn(scoreCardScale, finalScoreText, finalScoreNumber), cc.spawn(shareBtnAnim, continueAnim), cc.spawn(highScoreBadgeAnim, highScoreBadgeShow)));
        } else {
            this.scoreCardText.runAction(cc.sequence(scoreCardAction, scaleScoreCard, cc.spawn(scoreCardScale, finalScoreText, finalScoreNumber), cc.spawn(shareBtnAnim, continueAnim)));
        }
    },

});