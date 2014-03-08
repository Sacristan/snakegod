#pragma strict

var backgroundTexture: Texture;

function OnGUI()
{
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backgroundTexture);
}

function Start()
{
	yield new WaitForSeconds(4);
	StartCoroutine(LoadIntro());
}

function LoadIntro()
{
	Camera.main.gameObject.SendMessage("fadeOut");
	yield new WaitForSeconds(3.0f);
	Application.LoadLevel("Intro");
}