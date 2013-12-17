$( document ).ready(function(){
    var                      
    start = function(){
    	count = 0;
        finished = false;
        changePlayer();
    },			
    newGame = function(message){
        if (confirm(message)){
            start();
            forAllCells(function(i,j){
            	$("#c-"+i+"-"+j).removeClass()
            });
        }
    },        
                             
    forAllCells = function(action){
        for (var t = 1;t<7;t++){
            for (var counter2 = 1;counter2<8;counter2++){
                action(t,counter2);
            }
        }
    },                     
    sameColor = function(i,j){
        return $("#c-"+i+"-"+j).hasClass(players[current]);;
    },                        
    changePlayer = function(){
        $("#c").html(players[current = (current + 1) % 2]);
    },                           
    horizontalWon = function(i,j){
        for(var min=j-1;min>0;min--)if(!sameColor(i,min))break;					
        for(var max=j+1;max<8;max++)if(!sameColor(i,max))break;
        return max-min>4;
    },
                                
    verticalWon = function(i,j){
        for(var max=i+1;max<7;max++)if(!sameColor(max,j))break;
        return max-i>3;
    },                        
    diagonalLtrWon = function(i,j){
        for(var min=i-1,t=j-1;min>0;min--,t--)if(t<1||!sameColor(min,t))break;
        for(var max=i+1,t=j+1;max<7;max++,t++)if(t>7||!sameColor(max,t))break;
        return max-min>4;
    },                      
    diagonalRtlWon = function(i,j){
        for(var min=i-1,t=j+1;min>0;min--,t++)if(t>7||!sameColor(min,t))break;
        for(var max=i+1,t=j-1;max<7;max++,t--)if(t<1||!sameColor(max,t))break;
        return max-min>4;
    },         
 
    addCellBehavior = function(i,j){
        $("#c-"+i+"-"+j).click(function(){
                if(!finished){
                    for (var t = 6;t>0;t--){
                        if($("#c-"+t+"-"+j).hasClass('')){
                            $("#c-"+t+"-"+j).addClass(players[current]);
                            if(horizontalWon(t,j) || verticalWon(t,j) || diagonalLtrWon(t,j) || diagonalRtlWon(t,j)){
                                finished = true;
                                newGame(wonMessage.replace("%s",players[current]));
                            } else {
                                changePlayer();
                            }
                            count += 1;
                            if (count >= 42) {
                            	finished = true;
                            	newGame("tie! Play again???");
                            }
                            break;
                        }
                    }
                }
        });
    },
    
    initContent = function(){
    		table = $('<table></table>').attr({id:"gameboard"});
    		for (var i = 1; i < 7; i++) {
    			var row = $('<tr></tr>').appendTo(table);
    			for (var j = 1; j < 8; j++) {
    				$('<td></td>').attr({id : "c-"+i+"-"+j}).appendTo(row);
    			}
    		}
    		table.appendTo("#game");
    },
    count,
    players = [$("#a").html(),$("#b").html()],         
    current = 0,
    newGameMessage = $("#n").html(),
    wonMessage = $("#w").html(),
    finished;
    initContent();
    start();
    forAllCells(addCellBehavior);
    $("#r").click(function(){
        newGame(newGameMessage)
    });
    
    window.test={
    	players:players,
    	horizontalWon:horizontalWon,
    	verticalWon:verticalWon,
    	diagonalLtrWon:diagonalLtrWon,
    	diagonalRtlWon:diagonalRtlWon
    }
});