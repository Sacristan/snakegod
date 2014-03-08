#pragma strict
#pragma implicit
#pragma downcast

/*
	*Addicted 
	*KingOfSpace
	*MasterOfSnakeGod
	*DidntMadeToTheChoppa
	*BorntoDie
*/

static var isSG: boolean = false;
static var hadDied: boolean = false;

static var killedCount: int;
static var timesKilledByEnemy: int;
static var totalPlayedTime: int;

var minutesToAchieveAddicted: int = 30;
var deathsToAchieveBornToDie: int = 10;
var killCountToAchieveKingOfSpace: int = 500;
var saveRateInSec: int = 30; 

class DoubleBool
{
	@HideInInspector
	var instantiated: boolean=false;
	@HideInInspector
	var called: boolean=false;
	
	function DoubleBool(p1: boolean, p2: boolean)
	{
		instantiated = p1;
		called = p2;
	}
}
	
static var battleDroneSpawned: boolean=false;
static var temp:int=0;
var deletePrefsOnAwake: boolean = false;
var instantiate: boolean = false;
static var staticInstantiate: boolean;

private var addictedInstantiated: boolean = false;
private var kingOfSpaceInstantiated: boolean = false;
private var bornToDieInstantiated: boolean = false;

static var getToDaChoppa: DoubleBool;
static var masterOfSG: DoubleBool;

private var textureSize: Vector2 = new Vector2(32,32);
private var labelSize: Vector2 = new Vector2(100,20);

var noAchTexture: Texture;
var achTextures: Texture[];
private var guiSkin: GUISkin;
private var isAchBarVisible: boolean;
private var arcBarText: String;

function OnGUI()
{
	GUI.skin = guiSkin;
	
	var toogleYPos: int;
	
	if(isAchBarVisible)
	{	
		arcBarText ="Hide";
		toogleYPos = Screen.height-textureSize.y*5-labelSize.y*2;
		GUI.Label(new Rect(Screen.width-labelSize.x,Screen.height-textureSize.y*5-labelSize.y,labelSize.x,labelSize.y),"Achievements");
		
		var activeAddicted: Texture;
		var activeKingOfSpace: Texture;
		var activeMasterOfSnakeGod: Texture;
		var activeDidntMakeItToTheChoppa: Texture;
		var activeBornToDie: Texture;
				
		if(PlayerPrefsX.GetBool("Addicted",false)) activeAddicted = achTextures[0];
		else activeAddicted = noAchTexture;
		if(PlayerPrefsX.GetBool("KingOfSpace",false)) activeKingOfSpace = achTextures[1];
		else activeKingOfSpace = noAchTexture;
		if(PlayerPrefsX.GetBool("MasterOfSnakeGod",false)) activeMasterOfSnakeGod = achTextures[2];
		else activeMasterOfSnakeGod = noAchTexture;
		if(PlayerPrefsX.GetBool("DidntMakeItToTheChoppa",false)) activeDidntMakeItToTheChoppa = achTextures[3];
		else activeDidntMakeItToTheChoppa = noAchTexture;
		if(PlayerPrefsX.GetBool("BornToDie",false)) activeBornToDie = achTextures[4];
		else activeBornToDie = noAchTexture;
				
		GUI.Label(new Rect(Screen.width-textureSize.x,Screen.height-textureSize.y*5,textureSize.x,textureSize.y),activeAddicted);
		GUI.Label(new Rect(Screen.width-textureSize.x,Screen.height-textureSize.y*4,textureSize.x,textureSize.y),activeKingOfSpace);
		GUI.Label(new Rect(Screen.width-textureSize.x,Screen.height-textureSize.y*3,textureSize.x,textureSize.y),activeMasterOfSnakeGod);
		GUI.Label(new Rect(Screen.width-textureSize.x,Screen.height-textureSize.y*2,textureSize.x,textureSize.y),activeDidntMakeItToTheChoppa);
		GUI.Label(new Rect(Screen.width-textureSize.x,Screen.height-textureSize.y,textureSize.x,textureSize.y),activeBornToDie);
		
	}
	else
	{
		arcBarText = "Open";
		toogleYPos = Screen.height - labelSize.y;
	}
	isAchBarVisible = GUI.Toggle(new Rect(Screen.width-labelSize.y,toogleYPos,labelSize.x,labelSize.y),isAchBarVisible,arcBarText);
	PlayerPrefsX.SetBool("isAchBarVisible",isAchBarVisible);
}

function Awake()
{
	isAchBarVisible = PlayerPrefsX.GetBool("isAchBarVisible",false);
	battleDroneSpawned = false;
	guiSkin = Resources.Load("GUI 1",GUISkin) as GUISkin;
	getToDaChoppa = new DoubleBool(false,false);
	masterOfSG = new DoubleBool(false,false);
	
	hadDied = false;
	staticInstantiate = instantiate;
	if(deletePrefsOnAwake) DeletePrefs();
	isSG = false;
	temp = 0;
	killedCount = PlayerPrefs.GetInt("killedCount");
	timesKilledByEnemy = PlayerPrefs.GetInt("timesKilledByEnemy");
	totalPlayedTime = PlayerPrefs.GetInt("totalPlayedTime");
	
	if(PlayerPrefsX.GetBool("Addicted",false)==false) InvokeRepeating("Counter",1.0f,1.0f);	
}
function Start()
{
	Instantiate(Resources.Load("Belt",Transform));
}

function Counter()
{
	if(++temp>=saveRateInSec) this.Save();
	if(++totalPlayedTime>minutesToAchieveAddicted*60)
	{
		PlayerPrefsX.SetBool("Addicted",true);
		
		if(instantiate&&!addictedInstantiated)
		{
			addictedInstantiated = true;
			//MessageQueue.Queue(Resources.Load("Achievements/Addicted",Transform));
			Instantiate(Resources.Load("Achievements/Addicted",Transform) as Transform);
		}
		CancelInvoke("Counter");
	}
}

function FixedUpdate()
{
	if(this.battleDroneSpawned&&this.hadDied&&!getToDaChoppa.called) this.getToDaChoppa.called=true;
	
	if(GameObject.FindWithTag("SnakeGod")!=null) isSG=true;
	else isSG = false;
	
	if(PlayerPrefsX.GetBool("BornToDie",false)==false)
	{
		if(timesKilledByEnemy>=deathsToAchieveBornToDie)
		{
			PlayerPrefsX.SetBool("BornToDie",true);
			if(instantiate&&!bornToDieInstantiated)
			{
				bornToDieInstantiated = true;
				//MessageQueue.Queue(Resources.Load("Achievements/BornToDie",Transform));
				Instantiate(Resources.Load("Achievements/BornToDie",Transform) as Transform);
			}
		}
	}
	
	if(PlayerPrefsX.GetBool("KingOfSpace",false)==false)
	{
		if(killedCount>killCountToAchieveKingOfSpace)
		{
			PlayerPrefsX.SetBool("KingOfSpace",true);
			if(instantiate&&!kingOfSpaceInstantiated)
			{
				kingOfSpaceInstantiated = true;
				//MessageQueue.Queue(Resources.Load("Achievements/KingOfSpace",Transform));
				Instantiate(Resources.Load("Achievements/KingOfSpace",Transform) as Transform);
			}
		}
	}

	if(getToDaChoppa.called)
	{
		if(PlayerPrefsX.GetBool("DidntMakeItToTheChoppa",false)==false)
		{
			PlayerPrefsX.SetBool("DidntMakeItToTheChoppa",true);
			if(instantiate&&!getToDaChoppa.instantiated)
			{
				getToDaChoppa.instantiated=true;
				//MessageQueue.Queue(Resources.Load("Achievements/DidntMakeItToTheChoppa",Transform));
				Instantiate(Resources.Load("Achievements/DidntMakeItToTheChoppa",Transform) as Transform);
			}
		}
	}
	if(masterOfSG.called)
	{
		if(PlayerPrefsX.GetBool("MasterOfSnakeGod",false)==false)
		{
			PlayerPrefsX.SetBool("MasterOfSnakeGod",true);
			
			if(instantiate&&!masterOfSG.instantiated)
			{
				masterOfSG.instantiated=true;
				//MessageQueue.Queue(Resources.Load("Achievements/MasterOfSnakeGod",Transform));
				Instantiate(Resources.Load("Achievements/MasterOfSnakeGod",Transform) as Transform);
			}
		}
	}

	
	print(killedCount+" "+timesKilledByEnemy+" "+totalPlayedTime+"|add: "
	+PlayerPrefsX.GetBool("Addicted",false)+" kos: "
	+PlayerPrefsX.GetBool("KingOfSpace",false)+" mosg: "
	+PlayerPrefsX.GetBool("MasterOfSnakeGod",false)+" dmttc: "
	+PlayerPrefsX.GetBool("DidntMakeItToTheChoppa",false)+" b2d: "
	+PlayerPrefsX.GetBool("BornToDie",false));
	
}

static function Save()
{
	temp = 0;
	PlayerPrefs.SetInt("killedCount",killedCount);
	PlayerPrefs.SetInt("timesKilledByEnemy",timesKilledByEnemy);
	PlayerPrefs.SetInt("totalPlayedTime",totalPlayedTime);
	PlayerPrefs.Save();
}

static function DeletePrefs()
{
	PlayerPrefs.DeleteAll();

	killedCount = 0;
	timesKilledByEnemy = 0;
	totalPlayedTime = 0;
	battleDroneSpawned=false;
	

	masterOfSG = new DoubleBool(false,false);
	getToDaChoppa = new DoubleBool(false,false);

	PlayerPrefsX.SetBool("Addicted",false);
	PlayerPrefsX.SetBool("KingOfSpace",false);
	PlayerPrefsX.SetBool("MasterOfSnakeGod",false);
	PlayerPrefsX.SetBool("DidntMakeItToTheChoppa",false);
	PlayerPrefsX.SetBool("BornToDie",false);
}
