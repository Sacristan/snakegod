#pragma strict

var shotTime: float;
var shotSpeed: int=20;
var playerPos: Transform;
private var called: boolean=false;

function Start()
{
	playerPos=GameObject.FindWithTag("Player").transform;	
	shotTime=Time.time;
}
function Update()
{
	if(Time.time>shotTime+(Random.Range(0.0,3.2))) //3.5 
	{
		transform.Translate(-Vector3.forward*shotSpeed*Time.deltaTime);
	}
	else
	{
		transform.position=Vector3.MoveTowards(transform.position, playerPos.position,shotSpeed*Time.deltaTime);	
	}
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.tag=="Player") other.gameObject.SendMessage("OnDamage");
	
	if(other.gameObject.tag!="BattleDroneDuel"&&other.gameObject.tag!="BattleDroneVenus"&&
	other.gameObject.tag!="BattleDroneSnake"&&other.gameObject.tag!="Shot")
	{		
		Destroy(gameObject);
	}
}
