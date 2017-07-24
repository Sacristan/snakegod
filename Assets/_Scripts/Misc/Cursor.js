#pragma strict

var cursorImage : Texture;
private var isCursorEnabled: boolean=true;
private var alwaysCursor: boolean=true;

function Start() 
{
    if(Application.platform!=RuntimePlatform.FlashPlayer||alwaysCursor) UnityEngine.Cursor.visible = false;
}

function OnGUI()
{
	GUI.depth = -500;
	if(isCursorEnabled&&Application.platform!=RuntimePlatform.FlashPlayer)
	{
    	var mousePos : Vector3 = Input.mousePosition;
    	var pos : Rect = Rect(mousePos.x,Screen.height - mousePos.y,25,25);
    	GUI.Label(pos,cursorImage);
	}
}

function EnableCursor(p: boolean)
{
	if(Application.platform!=RuntimePlatform.FlashPlayer&&!alwaysCursor)
	{
		isCursorEnabled=p;
		UnityEngine.Cursor.visible = false;
	}
}