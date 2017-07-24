#pragma strict

function Update () 
{
	if(Input.GetKeyDown("escape")&&!(Application.platform == RuntimePlatform.IPhonePlayer)) QuitGame();
}

function QuitGame()
{
	var upperText: GameObject=GameObject.Find("UpperText");
	upperText.SendMessage("StopAllTexts");
	upperText.GetComponent.<GUIText>().text="THANK YOU FOR PLAYING!";
	yield WaitForSeconds(2);
	Destroy(upperText.GetComponent.<GUIText>());
	Instances.Save();
	Application.LoadLevel(0);
}