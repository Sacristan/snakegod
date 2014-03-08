#pragma strict

@script ExecuteInEditMode()

var blip : Texture;
var radarBG : Texture;

var centerObject : Transform;
var mapScale = 0.3;
var mapSizePercent = 15;

var checkAIscript : boolean = true;
var enemyTags: String [];
enum radarLocationValues {topLeft, topCenter, topRight, middleLeft, middleCenter, middleRight, bottomLeft, bottomCenter, bottomRight, custom}
var radarLocation : radarLocationValues = radarLocationValues.bottomLeft;

private var mapWidth : float;
private var mapHeight : float;
private var mapCenter : Vector2;
var mapCenterCustom : Vector2;
var enemyRotCorrection: int=0;
private var bX: float;
private var bY: float;

function Start () {
    setMapLocation();   
}

function OnGUI () {

    bX=centerObject.transform.position.x * mapScale;
    bY=centerObject.transform.position.z * mapScale;   
    GUI.DrawTexture(Rect(mapCenter.x - mapWidth/2,mapCenter.y-mapHeight/2,mapWidth,mapHeight),radarBG);
    
    // Draw blips for Enemies
    DrawBlipsForEnemies();
    
}
  
function drawBlip(go: GameObject,aTexture: Texture){
    
    var centerPos: Vector3=centerObject.position;
    var extPos: Vector3=go.transform.position;
    
    // first we need to get the distance of the enemy from the player
    var dist: float=Vector3.Distance(centerPos,extPos);
    
    var dx: float=centerPos.x-extPos.x; // how far to the side of the player is the enemy?
   	var dz: float=centerPos.z-extPos.z; // how far in front or behind the player is the enemy?
    
    // what's the angle to turn to face the enemy - compensating for the player's turning?
    var deltay: float=Mathf.Atan2(dx,dz)*Mathf.Rad2Deg - enemyRotCorrection - centerObject.eulerAngles.y;
 
    // just basic trigonometry to find the point x,y (enemy's location) given the angle deltay
    bX=dist*Mathf.Cos(deltay * Mathf.Deg2Rad);
    bY=dist*Mathf.Sin(deltay * Mathf.Deg2Rad);
    
    bX=bX*mapScale; // scales down the x-coordinate so that the plot stays within our radar
    bY=bY*mapScale; // scales down the y-coordinate so that the plot stays within our radar
    
    if(dist<=mapWidth*.5/mapScale){ 
        // this is the diameter of our largest radar circle
       GUI.DrawTexture(Rect(mapCenter.x+bX,mapCenter.y+bY,4,4),aTexture);
 
    }
 
}
 
function DrawBlipsForEnemies(){
    //You will need to replace isChasing with a variable from your AI script that is true when     the enemy is chasing the player, or doing watever you want it to be doing when it is red on    the radar.
    
    //You will need to replace "EnemyAINew with the name of your AI script
    
    // Find all game objects tagged Enemy 
    var distance = Mathf.Infinity; 
    var position = transform.position;
    
    for(var e: String in enemyTags)
    {
   		var gos : GameObject[];
   		gos = GameObject.FindGameObjectsWithTag(e);
   		
   		for (var go : GameObject in gos)
   		{ 
	    	var blipChoice : Texture = blip;
	    	drawBlip(go,blipChoice);
 		}
 	}
 	
}

function setMapLocation () {
    mapWidth = Screen.width*mapSizePercent/100.0;
    mapHeight = mapWidth;

    if(radarLocation == radarLocationValues.topLeft){
        mapCenter = Vector2(mapWidth/2, mapHeight/2);
    } else if(radarLocation == radarLocationValues.topCenter){
        mapCenter = Vector2(Screen.width/2, mapHeight/2);
    } else if(radarLocation == radarLocationValues.topRight){
        mapCenter = Vector2(Screen.width-mapWidth/2, mapHeight/2);
    } else if(radarLocation == radarLocationValues.middleLeft){
        mapCenter = Vector2(mapWidth/2, Screen.height/2);
    } else if(radarLocation == radarLocationValues.middleCenter){
        mapCenter = Vector2(Screen.width/2, Screen.height/2);
    } else if(radarLocation == radarLocationValues.middleRight){
        mapCenter = Vector2(Screen.width-mapWidth/2, Screen.height/2);
    } else if(radarLocation == radarLocationValues.bottomLeft){
        mapCenter = Vector2(mapWidth/2, Screen.height - mapHeight/2);
    } else if(radarLocation == radarLocationValues.bottomCenter){
        mapCenter = Vector2(Screen.width/2, Screen.height - mapHeight/2);
    } else if(radarLocation == radarLocationValues.bottomRight){
        mapCenter = Vector2(Screen.width-mapWidth/2, Screen.height - mapHeight/2);
    } else if(radarLocation == radarLocationValues.custom){
        mapCenter = mapCenterCustom;
    }
    
} 
 