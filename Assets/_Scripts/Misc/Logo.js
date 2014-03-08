#pragma strict

@script ExecuteInEditMode()

enum Location{bottomLeft=0,bottomRight,bottomCenter,topLeft,topRight,topCenter,centered}

var logo: Texture;
var loc: Location;
var mapSizePercent: int = 7;
private var mapWidth: int;
private var mapHeight: int;
private var screenPos: Vector2;

function Start()
{
	mapWidth = Screen.width*mapSizePercent/100.0;
    mapHeight = mapWidth;
    
    if(loc==Location.bottomLeft) screenPos = new Vector2(0,Screen.height-mapHeight);
    else if(loc==Location.bottomRight) screenPos = new Vector2(Screen.width-mapWidth,Screen.height-mapHeight);
    else if(loc==Location.bottomCenter) screenPos = new Vector2(Screen.width/2-mapWidth/2,Screen.height-mapHeight);
    else if(loc==Location.topLeft) screenPos = new Vector2(0,0);
    else if(loc==Location.topRight) screenPos = new Vector2(Screen.width-mapWidth,0);
    else if(loc==Location.topCenter) screenPos = new Vector2(Screen.width/2-mapWidth/2,0);
    else if(loc==Location.centered) screenPos = new Vector2(Screen.width/2-mapWidth/2,Screen.height/2-mapHeight/2);
    
}
function OnGUI()
{
	GUI.Label(Rect(screenPos.x,screenPos.y,mapWidth,mapHeight),logo);
}