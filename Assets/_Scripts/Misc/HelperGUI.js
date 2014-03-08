#pragma strict

var helperTextures: Texture[];
private var idx: int = 0;
private var loading: boolean = false;

function Start()
{
	InvokeRepeating("Tex",2,2);
}

function Tex()
{
	if(++idx>=helperTextures.Length-1) CancelInvoke("Tex");
	//else idx++;
}

function Update()
{
	if(Input.GetKeyUp("escape")&&!loading) StartCoroutine("LoadGame");
	
}

function OnGUI()
{
	GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),helperTextures[idx]);
}

function LoadGame(): IEnumerator
{
	loading = true;
	Camera.main.gameObject.SendMessage("fadeOut");
	yield WaitForSeconds(3);
	Application.LoadLevel("Game");
}