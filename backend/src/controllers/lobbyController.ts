interface User{
    id:number,
    rating:number
}

class lobbyController{
    private static inLobby:User[] = [];
    private static instance:lobbyController
    public static allowedDifference:number = 10;

    private constructor(){}

    public static getInstance(): lobbyController {
        if(!lobbyController.instance){
            lobbyController.instance = new lobbyController();
        }

        return lobbyController.instance
    }

    public findOpponent(id:number, rating:number): number {
        let low = 0;
        let high = lobbyController.inLobby.length - 1;
        
        while(low <= high){
            let mid = low + Math.floor((high - low) / 2);
            
            if(Math.abs(lobbyController.inLobby[mid].rating - rating) <= lobbyController.allowedDifference){
                let id = lobbyController.inLobby[mid].id;
                console.log("found valid opp")
                console.log(lobbyController.inLobby[mid])
                lobbyController.inLobby.splice(mid, 1);
                
                return id;
            }

            if(lobbyController.inLobby[mid].rating > rating){
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        lobbyController.inLobby.splice(low, 0, {id:id, rating:rating})
        console.log(lobbyController.inLobby)
        return -1;
    }
    
}

export default lobbyController