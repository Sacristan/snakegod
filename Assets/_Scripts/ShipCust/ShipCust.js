#pragma strict

var rotateSpeeds: int [];
var shipMainColors: Color[];
var shipTextures: Texture[];

private var mat: Material;
private var buttonSize: Vector2= new Vector2(25,25);
private var labelSize: Vector2 = new Vector2(100,buttonSize.y);

private var guiSkin: GUISkin;

private var rotIdx: int=0;
private var colorIdx: int=0;
private var texIdx: int=0;
private var showGUI: boolean = true;
private var playerName: String;

function Start ()
{
	mat = GetComponent.<Renderer>().material;
	guiSkin = Resources.Load("GUI",GUISkin) as GUISkin;
	playerName = PlayerPrefs.GetString("PlayerName","Pilot");
}

function Update ()
{
	transform.Rotate(-Vector3.up*rotateSpeeds[rotIdx]*Time.deltaTime);
	mat.color = shipMainColors[colorIdx];
	mat.mainTexture = shipTextures[texIdx];
}

function OnGUI()
{
	GUI.skin = guiSkin;
	
	if(showGUI)
	{
		var tempW: int = buttonSize.x*2+labelSize.x;
		var tempH: int = buttonSize.y*7;
		
		GUI.Label(new Rect(Screen.width/2-labelSize.x,0,labelSize.x*2,labelSize.y),"Customise Your Ship!");
		
		GUILayout.BeginArea(new Rect(Screen.width-tempW,0,tempW,tempH));
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					GUILayout.Label("   Ship Customisation");
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("--"))
					{
						if(rotIdx!=0) rotIdx--;
					}
					GUILayout.Label("Rotate Speed");
					if(GUILayout.Button("++"))
					{
						if(rotIdx!=rotateSpeeds.Length-1) rotIdx++;
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("<<"))
					{
						if(--colorIdx<0) colorIdx = shipMainColors.Length-1;
					}
					GUILayout.Label("Ship Color");
					if(GUILayout.Button(">>"))
					{
						if(++colorIdx>shipMainColors.Length-1) colorIdx = 0;
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("<<"))
					{
						if(--texIdx<0) texIdx = shipTextures.Length-1;
					}
					GUILayout.Label("Ship Texture");
					if(GUILayout.Button(">>"))
					{
						if(++texIdx>shipTextures.Length-1) texIdx = 0;
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					GUILayout.Label("         Pilot's Name");
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					  playerName = GUILayout.TextField (playerName, 9);
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("Save"))
					{
						var m: int = 100000;
						var conf: String = Mathf.Round(mat.color.r*m)+" "+Mathf.Round(mat.color.g*m)+" "+Mathf.Round(mat.color.b*m)+" |"+mat.mainTexture.name;
						print (conf);
						PlayerPrefs.SetString("ShipCust",conf);
						PlayerPrefs.SetString("PlayerName",playerName);
						PlayerPrefs.Save();
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();	
			
			GUILayout.BeginVertical();
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("Play"))
					{
						StartCoroutine("LoadGame");
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
							
		GUILayout.EndArea();
	}	
}

function LoadGame()
{
	Camera.main.gameObject.SendMessage("fadeOut");
	yield WaitForSeconds(3);
	Application.LoadLevel("Helper");
}
