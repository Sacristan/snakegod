#pragma strict

var backgroundGT: GUITexture;
var exitGO: GameObject;
private var guiSkin: GUISkin;
private var gText: String;
private var graphicCtrls: boolean=false;
private var isTouchingButton: boolean=false;
private var buttonTextGraf: String="Graphic Controls";
private var buttonTextOth: String="Accelometer and Touch";
private var gui: boolean=true;

function Start()
{
	guiSkin = Resources.Load("GUI",GUISkin) as GUISkin;
	backgroundGT.pixelInset=new Rect(0,-Screen.height,Screen.width,Screen.height);
	if((Application.platform == RuntimePlatform.FlashPlayer)||(Application.platform == RuntimePlatform.WindowsWebPlayer)
	||(Application.platform == RuntimePlatform.WindowsWebPlayer)) exitGO.SetActiveRecursively(false);
}

function OnGUI()
{
	GUI.skin=guiSkin;
	
    //GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), introTexture);
    GUI.Label(Rect(0,0,400,200),"SnakeGod 0.986f");
    GUI.Label(Rect(Screen.width-110,0,400,200),"Highscore: "+PlayerPrefs.GetInt("highScore")+"");
    GUI.Label(Rect(Screen.width/2-100, Screen.height/2,400,100), gText);
}