#pragma strict

private var shotTime: float;
var shotSpeed: int=20;
private var playerPos: Transform;

function Awake()
{
	playerPos=GameObject.FindWithTag("Player").transform;	
	shotTime=Time.time;
	
	transform.position=Vector3(transform.position.x,-2,transform.position.z);
}

function Update()
{
	var dist: float = Vector3.Distance(playerPos.position,transform.position);
	
	if(dist>70+(UnityEngine.Random.Range(-10,10))) transform.position=Vector3.MoveTowards(transform.position, playerPos.position,shotSpeed*Time.deltaTime);
	
	else transform.Translate(-Vector3.forward*shotSpeed*Time.deltaTime);

}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.tag=="Player") other.gameObject.SendMessage("OnDamage");
	
	if(other.gameObject.tag=="Siets")
	{		
		Destroy(gameObject);
	}
}
