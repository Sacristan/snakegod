#pragma strict

private var tempLives: int;
var battleDroneLives: int;
var slerpSpeed: float;
var speed: float;
private var target: Transform;

private var lastShot: float;
private var playerObj: GameObject;
private var updateText: GUIText;

var turrets: GameObject[];

var shot: Transform;
private var startShooting: boolean=false;
private var killed: boolean = false;

function Awake()
{
	lastShot=999.9;
	tempLives=battleDroneLives;
	updateText=GameObject.Find("UpperText").guiText;
}
function Update () 
{	
	
	playerObj=GameObject.FindWithTag("Player");
	
	if(turrets[1].transform.position.y>-2)
	{
		transform.position=Vector3.Slerp(transform.position, playerObj.transform.position,
		Time.deltaTime*slerpSpeed);
	}
	else 
	{
		if(!startShooting)
		{
			startShooting=true;	
			lastShot=Time.time;
		}	
		updateText.text=gameObject.tag+": "+tempLives+"/"+battleDroneLives+" ";
		transform.position=Vector3.MoveTowards(transform.position, playerObj.transform.position,
		Time.deltaTime*speed);
	}	 
	transform.LookAt(playerObj.transform);
	
	if(tempLives<=0)
	{
		tempLives=0;
		startShooting=false;
		
		if(!killed)
		{
			killed = true;
			gameObject.SendMessage("GotHit");
		}							
	}
	
	if(Time.time>Random.Range(3.0,9.0)+lastShot&&startShooting)
	{
		for(var i=0;i<turrets.length;i++) Shoot(turrets[i]);
	}
}
function Shoot(obj: GameObject)
{	
	yield WaitForSeconds(Random.Range(0.0,4.0));
	lastShot=Time.time;
	Instantiate(shot,obj.transform.position,Quaternion.identity);
}
function LifeLost()
{
	tempLives--;
}
