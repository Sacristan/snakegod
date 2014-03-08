#pragma strict

private var gameOver: boolean = false;
private var guiSkin: GUISkin;

function Start()
{
	guiSkin = Resources.Load("GUI", GUISkin) as GUISkin;
}

function OnGUI()
{
	GUI.skin=guiSkin;
	
	if(gameOver)
	{
		Camera.main.SendMessage("EnableCursor",true);
		GUI.Label(Rect(Screen.width/2-75,Screen.height/2-50,400,25),"Here rests the Hope of Mankind!");
		if(GUI.Button(Rect(Screen.width/2,Screen.height/2,60,40),"Retry?"))
		{
			Time.timeScale=1;
			StartCoroutine("LoadLevel",Application.loadedLevel);
			gameOver = false;
		}	
		if(GUI.Button(Rect(Screen.width/2,Screen.height/2+40,60,40),"Menu"))
		{
			Time.timeScale=1;
			StartCoroutine("LoadLevel",0);
			gameOver = false;
		}
	}	
}
function TriggerGameOver()
{
	gameOver = true;
	Instances.timesKilledByEnemy++;
	Instances.Save();
}
function LoadLevel(p: int): IEnumerator
{
	Camera.main.SendMessage("fadeOut");
	yield new WaitForSeconds(3);
	Application.LoadLevel(p);
}