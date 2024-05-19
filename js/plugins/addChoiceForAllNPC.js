//global variables


(function() {
    var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    var _Scene_Map_prototype_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.call(this);
        //this.addCustomDialogToAllNPC();
    };

    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_prototype_onMapLoaded.call(this);
        $gameMap.addCustomDialogToAllNPC();
    };
    
    Game_Map.prototype.addCustomDialogToAllNPC = function() {
        console.log(this.events())
        if (!this || !this.events) return;
        this.events().forEach(function(event) {
            //console.log("Event data exists:", !!event.event());
            if (event && event.event && event.event() && !!$gameMap.event(event.eventId())) {
                event.event().pages.forEach(function(page) {
                    // Check if the character file matches 'xxx'
                    page.list
                    if (page.image && page.image.characterName === "苍时"  && !pageContainsCode(page.list, 102) ) {
                        // Display option for every NPC
                        page.list.push({
                            "code": 102,
                            "indent": 0,
                            "parameters": [["对话","调戏"],1,0,2,0]
                        });
                        page.list.push({
                            "code": 402,
                            "indent": 0,
                            "parameters": [0,"对话"]
                        })
                        event.characterName
                        //添加对话选项
                        //需要先确定哪一个NPC
                        let avatar = {"code": 101,"indent": 1, "parameters":  ["苍时头像", 0, 0, 2]}
                        let character_name = event.event().name;
                        let msg = '';
                        let conversation = {"code":401, "indent":1, "parameters":['']}
                        let endEvent = {"code": 0, "indent": 0,"parameters":  []}

                        switch(character_name) {
                            case '谢彦休':
                                avatar.parameters[1] = 6;//position of avatar in image
                                page.list.push(avatar);

                                msg = "表妹，一起去骑马吗？"; // concatenate message
                                conversation.parameters[0] = `\\n<${character_name}>${msg}`;
                                page.list.push(conversation);

                                avatar.parameters[1] = 0;//position of avatar in image
                                page.list.push(avatar);

                                msg = "有比马更好玩的东西"; // concatenate message
                                conversation.parameters[0] = `\\n<${character_name}>${msg}`;
                                page.list.push(conversation);

                                
                        }
                        

                        //结束事件
                        page.list.push(endEvent)


                        //调戏选项

                        page.list.push({
                            "code": 402,
                            "indent": 0,
                            "parameters": [1,"调戏"]
                        })

                        //添加调戏选项

                        page.list.push(endEvent)}
                });
            }
        });
    };




    function pageContainsCode(list, code) {
        return list.some(function(command) {
            return command.code === code;
        });
    }

    Game_Map.prototype.isReady = function() {
        return this._mapId > 0 && this.events() != null;
    };
})();