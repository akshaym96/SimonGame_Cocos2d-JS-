SimonGame.res = {
    simon_plist:"res/SimonGame.plist",
    gamefruit_plist:"res/gameFruitsLink.plist",
    effect_plist:"res/effect.plist",
    Final: "res/Final.plist",
    Final_png: "res/Final.png",
    gameover_png:"res/v3-Gameover.jpg",
    scene_nav:"res/sceneNav.plist",
    scene_png:"res/sceneNav.png",
    ButtonClick : "res/buttonClickOn.mp3",
    Gameover:"res/GameOver.mp3",
    Lifelost:"res/LifeLost.mp3"

};

SimonGame.res_locale = {
    en: SimonGame.path + "res/locale/en.json",
    zh: SimonGame.path + "res/locale/zh.json"
};


SimonGame.g_resources = [];
for (var i in SimonGame.res) {
    SimonGame.res[i] = SimonGame.path + SimonGame.res[i];
    SimonGame.g_resources.push(SimonGame.res[i]);
}