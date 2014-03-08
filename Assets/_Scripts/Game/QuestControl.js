#pragma strict

private var guiSkin: GUISkin;
private var introString1: String;
private var introString2: String="You have been selected to Destroy the reptilian Mothership (a.k.a. Snake God)..";
private var introString3: String= "..with the bomb what are You carrying!";
private var introString4: String= "You have agreed to do this suicide mission..";
private var introString5: String= ".. because of mission´s importance to United Human Federation!";
private var introStringFinal: String = "Just press Start HighSpeed engine to start Your Mission!";

var textChangeTime: float=5;
@HideInInspector
var showEngineButton: boolean=false;
@HideInInspector
var startAsteroidField: boolean=false;
private var warning:boolean=false;
private var shipControlWarning:boolean=false;
private var incomingEnemyWarning:boolean=false;
private var asteroidFieldCountDown: boolean=false;
private var arrivedAtStar: boolean=false;
@HideInInspector
var crossShipSpawn: boolean=false;
@HideInInspector
var battleDroneSpawn: boolean=false;
private var changedToBattleDrones: boolean=false;
private var startedStar: boolean=false;
private var stopAllTexts: boolean=false;
private var fixedTime: float;
var shipCtrl:ShipControl;
var shipShot:ShipShot;

var sunLight: GameObject;
var shipParticle: GameObject;
var moveParticle: GameObject;

var introSkybox: Material;
var sunSkybox: Material;
var snakeSkybox: Material;
var SG: GameObject;
private var skyBox: Skybox;

private var destroyedCrosships: int=0;

private var showSkipButton: boolean=true;
private var skipped: boolean=false;
var showSideOptions: boolean;
private var sideYInc:int;
private var locTxt: String;
private var musicCtrl: MusicCtrl;
private var sideOpText: String;

function Start () 
{	
	musicCtrl = Camera.main.gameObject.GetComponent(MusicCtrl) as MusicCtrl;
	showSideOptions = PlayerPrefsX.GetBool("showSideOptions",false);
	introString1 = "Greetings, "+PlayerPrefs.GetString("PlayerName","Pilot")+"!";
	skyBox=Camera.main.GetComponent("Skybox") as Skybox;
	shipCtrl.enabled=false;
	shipShot.enabled=false;
	
	ChangeText("intro");
	//else ChangeText("introLaunched");
	fixedTime=0;
	sunLight.active=false;
	Camera.main.SendMessage("EnableCursor",true);
	guiSkin = Resources.Load("GUI",GUISkin) as GUISkin;
}

function ChangeText(mode:String)
{
	if(mode=="intro")
	{
		showSkipButton=true;
		guiText.text=introString1;
		yield WaitForSeconds(textChangeTime);
		guiText.text=introString2;
		yield WaitForSeconds(textChangeTime);
		guiText.text=introString3;
		yield WaitForSeconds(textChangeTime);
		guiText.text=introString4;
		yield WaitForSeconds(textChangeTime);
		guiText.text=introString5;
		yield WaitForSeconds(textChangeTime);
		showSkipButton=false;
		
		if(!skipped)
		{
			guiText.text=introStringFinal;
			showEngineButton=true;
		}	
	}
	if(mode=="introLaunched")
	{
		skipped=true;
		showSkipButton=false;
		guiText.text=introStringFinal;
		showEngineButton=true;
	}
	
	if(mode=="asteroidField")
	{
		warning=true;
		yield WaitForSeconds(textChangeTime);
		asteroidFieldCountDown=true;
		warning=false;
	}
	if(mode=="exitAsteroidField")
	{
		var Asteroids: GameObject[];
		Asteroids=GameObject.FindGameObjectsWithTag("Asteroid");
		for (var GameObject in Asteroids) Destroy(GameObject);

		startAsteroidField=false;
		fixedTime=0;
		asteroidFieldCountDown=false;
		guiText.text="Exiting Asteroid Field! Its now safe for a while...";
		yield WaitForSeconds(textChangeTime+1);
		Camera.main.SendMessage("fadeOut");	
		yield WaitForSeconds(textChangeTime-1);
		arrivedAtStar=true;
	}
	if(mode=="lostControl") 
	{
		asteroidFieldCountDown=false;
		shipControlWarning=true;
	}	
	if(mode=="startStar")
	{
		arrivedAtStar=false;
		moveParticle.active=false;
		shipParticle.active=false;
		sunLight.active=true;
		skyBox.material=sunSkybox;
		Camera.main.SendMessage("fadeIn");	
		guiText.text="You are near a huge Star - there is no need to use Highspeed Engine!";
		yield WaitForSeconds(textChangeTime);
		guiText.text="Wait... I see movement near the Star in my radar!";
		yield WaitForSeconds(textChangeTime);
		guiText.text="Bad News! It's a horde of reptilian CrossShips! Destroy Them!";
		yield WaitForSeconds(textChangeTime);
		incomingEnemyWarning=true;
		Destroy(GameObject.Find("Spawner2"));
		Destroy(GameObject.Find("Spawner3"));
	}
	if(mode=="crossShip")
	{
		yield WaitForSeconds(textChangeTime-1);
		incomingEnemyWarning=false;
		crossShipSpawn=true;
	}
	if(mode=="battleDrones")
	{
		var CrossShips: GameObject[];
		Asteroids=GameObject.FindGameObjectsWithTag("CrossShip");
		for (var GameObject in Asteroids) Destroy(GameObject);
      
		changedToBattleDrones=true;
		crossShipSpawn=false;
		destroyedCrosships=0;
		guiText.text="More Bad News! Snake God's Battledrones are heading to Your Position!";
		yield WaitForSeconds(textChangeTime);
		guiText.text="Snake God is supposed to protect itself with these battledrones!";		
		yield WaitForSeconds(textChangeTime);
		guiText.text="Kill them all and You will get directly to Snake God! Good Luck!";
		yield WaitForSeconds(textChangeTime);
		guiText.text="";
		battleDroneSpawn=true;
	}
	if(mode=="noBattleDronesLeft")
	{
		battleDroneSpawn=false;
		guiText.text="You did it! You crushed Snake God's guards!";
		locTxt = "Ambrosia Alpha IV [Preparing]";
		yield WaitForSeconds(textChangeTime);
		guiText.text="Now to Sacristania Quadrant!";
		shipParticle.active=true;
		yield WaitForSeconds(textChangeTime);
		Camera.main.SendMessage("fadeOut");
		yield WaitForSeconds(textChangeTime-2);	
		skyBox.material=snakeSkybox;
		shipParticle.active=false;
		sunLight.active=false;
		yield WaitForSeconds(textChangeTime);
		Camera.main.gameObject.SendMessage("fadeIn");
		Camera.main.gameObject.SendMessage("BossFight");
		locTxt = "Sacristania Quadrant [SnakeGod]";
		guiText.text="We are here! I see Snake God in my radar! He is on Your Way! ";
		yield WaitForSeconds(textChangeTime);
		guiText.text="United Human Federation wishes luck to You! Kill those reptiles!";	
		yield WaitForSeconds(textChangeTime);
		guiText.text="Hit Snake God´s shield down and bomb will trigger itself!";	
		yield WaitForSeconds(textChangeTime);
		guiText.text="All is in Your hands again, Pilot!";
		SG.SetActiveRecursively(true);
	}
	if(mode=="sacrifice")
	{
		Instances.masterOfSG.called=true;
		locTxt = "Location Service unavailable!";
		guiText.text="Your sacrifice will never be forgotten!";
		yield WaitForSeconds(5);
		guiText.text="Our fleet can now destroy disoriented reptilian fleet!";
		GameObject.Find("ScoreText").SendMessage("SubmitHighScore");
		yield WaitForSeconds(5);
		LoadLevel("Intro");
		
	}
}

function OnGUI()
{
	GUI.skin=guiSkin;
	
	if(showEngineButton)
	{
		if(GUI.Button(Rect(Screen.width/2-100,0,200,20),"Start HightSpeed engine!"))
		{
			startAsteroidField=true;
			ChangeText("asteroidField");
			showEngineButton=false;	
			shipCtrl.enabled=true;
			shipShot.enabled=true;
			fixedTime=Time.time;
			Camera.main.SendMessage("EnableCursor",false);
		}
	}
	
	if(showSkipButton)
	{
		if(GUI.Button(Rect(0,0,100,20),"Skip Intro!"))
		{
			ChangeText("introLaunched");
		}
	}
	
	showSideOptions =  GUI.Toggle(new Rect(0, Screen.height-sideYInc, 100, 20), showSideOptions, sideOpText);
	PlayerPrefsX.SetBool("showSideOptions",showSideOptions);
	
	if(showSideOptions)
	{
		sideYInc = 140;
		sideOpText = "Hide";
		musicCtrl.mute = GUI.Toggle(new Rect(0,Screen.height-120,100,20),musicCtrl.mute,"Mute Music");
		if(GUI.Button(new Rect(0,Screen.height-100,100,20),"Menu")) LoadLevel("Intro");
		if(GUI.Button(new Rect(0,Screen.height-80,100,20),"Credits")) LoadLevel("Credits");
		if(GUI.Button(new Rect(0,Screen.height-60,100,20),"ShipCust")) LoadLevel("ShipCust");
		if(GUI.Button(new Rect(0,Screen.height-40,100,20),"Clear Stats")) Instances.DeletePrefs();
		GUI.Label(new Rect(0,Screen.height-20,100,20),"Highscore: "+PlayerPrefs.GetInt("highScore"));
	}
	else
	{
		sideOpText = "Open";
		sideYInc = 20;
	}
	GUI.Label(new Rect(Screen.width/2-125,0,250,20),locTxt);
	
}
function Update()
{
	if(warning)
	{
		if(Time.time%1<0.5)guiText.text="Warning! Entering Asteroid Field...";
		if(Time.time%1>0.5) guiText.text="";
		locTxt = "Asteroid Field [Entering]";
	}
	if(shipControlWarning)
	{
		if(Time.time%1<0.5)
		{
			guiText.text="Warning! Ship has lost Control - Mission Failed!";
			locTxt = "Location Service unavailable!";
		}
		if(Time.time%1>0.5)
		{
			guiText.text="";
			locTxt = "";
		}
	}
	if(incomingEnemyWarning&&!crossShipSpawn)
	{
		if(Time.time%1<0.5) guiText.text="Warning! Incoming Enemy Ships!";
		if(Time.time%1>0.5) guiText.text="";
		ChangeText("crossShip");
		locTxt = "Ambrosia Alpha IV [Enemy CrossShips]";
	}
	if(!incomingEnemyWarning&&crossShipSpawn&&destroyedCrosships<50)
	{
		guiText.text="Destroyed CrossShips: "+destroyedCrosships+"/50";
	}
	if(asteroidFieldCountDown)
	{
		var timeLeft: float=(40+fixedTime)-Time.time;
		guiText.text="Asteroid Field ends in "+(Mathf.Round(timeLeft*1000))/1000+" seconds!";
		locTxt = "Asteroid Field [Combat]";
	}
	if(fixedTime!=0&&Time.time>40+fixedTime) 
	{
		ChangeText("exitAsteroidField");
		locTxt = "Ambrosia Quadrant [Preparing]";
	}	
	if(arrivedAtStar)
	{
		ChangeText("startStar");
		locTxt = "Ambrosia Alpha IV [None]";
	}
	if(destroyedCrosships>=50&&!changedToBattleDrones)
	{
		ChangeText("battleDrones");
		locTxt = "Ambrosia Alpha IV [Battledrones]";
	}
	if(stopAllTexts)
	{
		showEngineButton=false;
		startAsteroidField=false;
		warning=false;
		shipControlWarning=false;
		incomingEnemyWarning=false;
		asteroidFieldCountDown=false;
		arrivedAtStar=false;
		crossShipSpawn=false;
		battleDroneSpawn=false;
		changedToBattleDrones=false;
		startedStar=false;
		stopAllTexts=false;
	}
}
function AddDestroyedShip()
{
	destroyedCrosships++;
}
function StopAllTexts()
{
	stopAllTexts=true;	
}
function LoadLevel(p: String)
{
	Camera.main.SendMessage("fadeOut");
	yield new WaitForSeconds(3);
	Application.LoadLevel(p);
}