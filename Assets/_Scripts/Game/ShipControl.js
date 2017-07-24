#pragma strict
import System.Globalization;

@HideInInspector
var canMoveRight: boolean=true;
@HideInInspector
var canMoveLeft: boolean=true; 

var speed : float = 12;
var moveThreshold : float = 0.1;

private var move : float; 
private var iPx : float; 

private var shoot: GUITexture;
private var tempRot: float;
private var addedRot: float;
private var reached: boolean=false;

function Update () 
{
	if (Application.platform == RuntimePlatform.IPhonePlayer)
	{
		move = 0;
    	iPx = Input.acceleration.y;
    	
    	if (Mathf.Abs(iPx) > moveThreshold)
    	{
        	move = (Mathf.Sign(iPx)) * speed*Time.deltaTime;
        	if(move>0&&canMoveLeft) transform.Translate(0,0,move);
        	if(move<0&&canMoveRight) transform.Translate(0,0,move);
   		}
	}
	else
	{	
		if(Input.GetAxis ("Horizontal")>0 &&canMoveRight)
		{
			transform.Translate(Vector3.right*3*Time.deltaTime,Space.World);
			//transform.Rotate(-Vector3.right*40*Time.deltaTime);
			//transform.eulerAngles = new Vector3(transform.localEulerAngles.x,0,0);
		}
		if(Input.GetAxis ("Horizontal")<0 &&canMoveLeft)
		{
			transform.Translate(-Vector3.right*3*Time.deltaTime,Space.World);
			//transform.Rotate(Vector3.right*40*Time.deltaTime);
		
		}
		//if(Input.GetAxis ("Horizontal")==0) transform.Translate(Vector3.zero);
		
	}
	
}

function OnCollisionEnter(other: Collision)
{
	if(other.gameObject.tag=="CrossShip"||other.gameObject.tag=="Asteroid"||
	other.gameObject.tag=="BattleDroneDuel"||
	other.gameObject.tag=="BattleDroneVenus"||other.gameObject.tag=="BattleDroneSnake")
	{
		GetComponent.<Rigidbody>().freezeRotation=false;
		var expScript:Explosion=gameObject.GetComponent("Explosion")as Explosion;
		expScript.GotHit();	
	}	
}
function OnDamage()
{
	GetComponent.<Rigidbody>().freezeRotation=false;
	var expScript:Explosion=gameObject.GetComponent("Explosion")as Explosion;
	expScript.GotHit();	
}

function Awake()
{
	var conf: String=PlayerPrefs.GetString("ShipCust");
	
	if(conf!="")
	{
		var l : String[] = conf.Split("|"[0]);
		var ll: String[] = l[0].Split(" "[0]);
		
		var r: float = StringToFloat(ll[0]);
		var g: float = StringToFloat(ll[1]);
		var b: float = StringToFloat(ll[2]);
	
		GetComponent.<Renderer>().material.color = new Color(r,g,b,1);
		GetComponent.<Renderer>().material.mainTexture = Resources.Load("shipTextures/"+l[1],Texture) as Texture;
	}
}
function StringToFloat(p: String): float
{	
	return System.Int32.Parse(p)/100000;
}