(function(ns) {
        
    // 画像のリスト
    var IMAGES = {
        // リザルトのバックグラウンド画像
        "resultBackground": {
            "image": "resultBackground",
            "rect": [240, 360, 640, 960],
        },
        
        // タイトルロゴ
        "resultText": {
            "image": "resultText",
            "rect": [240, 360, 640, 960],
        }
    };
    
    ns.EndScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
    
            // 画像
            for (var key in IMAGES) {
                var value   = IMAGES[key];
                var sprite  = tm.app.Sprite(value.rect[2], value.rect[3]);
                sprite.position.set(value.rect[0], value.rect[1]);
                sprite.scaleX = sprite.scaleY = CURRENT_SCALE;
                sprite.setImage( tm.graphics.TextureManager.get(value.image) );
                this[key] = sprite;
                this.addChild(sprite);
            }
            
            this.touchCountLabel = StatusLabel(380, 235, 48);
            this.addChild(this.touchCountLabel);
            
            this.timeLabel = StatusLabel(380, 305, 48);
            this.addChild(this.timeLabel);
            
            this.levelLabel = StatusLabel(380, 170, 48);
            this.addChild(this.levelLabel);
                    
            this.scoreLabel = StatusLabel(240, 480, 128);
            this.scoreLabel.align = "center";
            this.addChild(this.scoreLabel);
            
            console.log(userData.time);
    
            userData.time = Math.floor(userData.time / 30);
            
            var tweetButton = tm.twitter.TweetButton("Reverse Reverseったよ！スコア:{0} 生存時間{1}秒".format(userData.score, userData.time));
            tweetButton.x = app.width/2;
            tweetButton.y = 650;
            this.addChild(tweetButton);
        },
    
        update: function(){
            this.touchCountLabel.text = userData.touchTotalCount;
            this.timeLabel.text = userData.time;
            this.levelLabel.text = userData.level;
            this.scoreLabel.text = userData.score;
            
            if(app.pointing.getPointingEnd()){
                app.replaceScene(TitleScene());
            }
        },
        
        // ポーズ画面 : 別タブへ切り替わった時 / Ttbキーを押した時
        onblur: function() {
            app.pushScene(PauseScene());
        }
    });
})(window);
