#pragma strict

function Update () 
{
	if(Input.GetKeyDown("escape")&&!(Application.platform == RuntimePlatform.IPhonePlayer)) QuitGame();
}

function QuitGame()
{
	var upperText: GameObject=GameObject.Find("UpperText");
	upperText.SendMessage("StopAllTexts");
	upperText.guiText.text="THANK YOU FOR PLAYING!";
	yield WaitForSeconds(2);
	Destroy(upperText.guiText);
	Instances.Save();
	Application.LoadLevel(0);
}