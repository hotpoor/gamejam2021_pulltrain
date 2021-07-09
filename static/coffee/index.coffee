root = exports ? this
# !!!! Hotpoor xialiwei root object
root.Hs or= {}
Hs = root.Hs
keyAction =
    "ArrowDown":"down",
    "ArrowUp":"up",
    "ArrowLeft":"left",
    "ArrowRight":"right",

$ ->
    current_train_id = 0
    console.log "this is pull train"
    root.game_init = ()->
        load_map()
        load_train()
    root.load_map = ()->
        console.log "load map"
    root.load_train = ()->
        console.log "load train"
        y = 0
        x = parseInt($(".game_area").width()/2.0)
        $(".game_area").append """
        <div class="game_train" data-train-id="#{current_train_id}" style="left:#{x}px;top:#{y}px;"></div>
        """
    
    current_key = null
    current_action = "down"
    setp_base = $(".game_step").val()
    step = 0
    ax = 0
    ay = 0
    $(window).on "keydown",(evt)->
        console.log "key:", evt.key
        console.log "keyAction",keyAction[evt.key]
        current_key = keyAction[evt.key]
        current_action = current_key

        ax = 0
        ay = 0
        step = parseInt($(".game_step").val())
        setp_base = parseInt($(".game_step").val())
    $(window).on "keyup",(evt)->
        step = 0

    game_init()

    root.render = ()->
        x = parseInt $(".game_train[data-train-id=#{current_train_id}]").css("left")
        y = parseInt $(".game_train[data-train-id=#{current_train_id}]").css("top")
        console.log x,y,step
        console.log current_action
        if current_action in ["down","up","left","right"]
            $(".game_train").css
                "background-image":"url(static/img/train_#{current_action}.png)"
        if current_action in ["down"]
            ax = 0
            ay = ay + step
            if ay == 0
                ay = 1 * setp_base
        else if current_action in ["right"]
            ax = ax + step
            ay = 0
            if ax == 0
                ax = 1 * setp_base
        else if current_action in ["up"]
            ax = 0
            ay = ay - step
            if ay == 0
                ay = -1 * setp_base
        else if current_action in ["left"]
            ax = ax - step
            ay = 0
            if ax == 0
                ax = -1 * setp_base
        x = x + ax
        y = y + ay
        console.log x,y,ax,ay
        $(".game_train[data-train-id=#{current_train_id}]").css
            left:"#{x}px"
            top:"#{y}px"
    setInterval ()->
            render()
        ,20