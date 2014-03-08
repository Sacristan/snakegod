#pragma strict

private var tempLives: int;
var battleDroneLives: int;
var speed: int;
private var target: Transform;

var sparkParticle1: Transform;
var sparkParticle2: Transform;

private var lastShot: float;
private var playerObj: GameObject;
private var updateText: GUIText;

var turret1: GameObject;
var turret2: GameObject;

var shot: Transform;
private var canShoot: boolean=true;
private var killed: boolean = false;
private var plDeaths: int;

function Awake()
{
	lastShot=Time.time;
	tempLives=battleDroneLives;
	transform.Rotate(0,180,0);
	updateText=GameObject.Find("UpperText").guiText;
	
	playerObj=GameObject.FindWithTag("Player");
	Instances.battleDroneSpawned = true;
}
function Update () 
{	
	transform.position=Vector3.MoveTowards(transform.position, playerObj.transform.position,
	Time.deltaTime*speed);
	
	transform.LookAt(playerObj.transform);
	
	if(tempLives<=0)
	{
		tempLives=0;
		
		canShoot=false;
		if(!killed)
		{
			killed = true;
			gameObject.SendMessage("GotHit");
		}
		if(gameObject.tag!="BattleDroneSnake") updateText.text="Congratulations "+gameObject.tag+" is down!";
	}
	updateText.text=gameObject.tag+": "+tempLives+"/"+battleDroneLives+" ";
	
	if(Time.time>Random.Range(3,5)+lastShot&&canShoot)
	{
		Shoot(turret1);
		if(turret2) Shoot(turret2);	
	}
}
function Shoot(obj: GameObject)
{	
	lastShot=Time.time;
	Instantiate(shot,obj.transform.position,Quaternion.identity);
}
function LifeLost()
{
	tempLives--;
	var rand:int=Random.Range(1,2);
	
	if(rand==1) Instantiate(sparkParticle1,transform.position,Quaternion.identity);
	else Instantiate(sparkParticle2,transform.position,Quaternion.identity);
}
