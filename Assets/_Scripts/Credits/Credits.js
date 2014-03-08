#pragma strict

private var guiSkin: GUISkin;

function Start()
{
	guiSkin = Resources.Load("GUI",GUISkin) as GUISkin;
}
function OnGUI()
{
	GUI.skin = guiSkin;
	
	if(GUI.Button(Rect(Screen.width/2-90, Screen.height-20,180,20),
    "Visit Stellardrone page!"))
    	Application.OpenURL ("http://stellardrone.mymusicstream.com/");
    
}

function Update ()
{
	if(Input.GetKeyDown("escape")&&!(Application.platform == RuntimePlatform.IPhonePlayer)) StartCoroutine("LoadIntro");

}

function LoadIntro(): IEnumerator
{
	Camera.main.gameObject.SendMessage("fadeOut");
	yield WaitForSeconds(3);
	Application.LoadLevel("Intro");
}