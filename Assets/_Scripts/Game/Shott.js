#pragma strict

var speed: float = 100;
private var score: GameObject;

function Awake()
{
	score=GameObject.Find("ScoreText");	
	if(Instances.isSG==false) Destroy(gameObject,4);
	else Destroy(gameObject,6);
}

function Update()
{
	var temp: Vector3 = Vector3.forward * speed * Time.deltaTime;
	transform.position += temp;
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.CompareTag("SGShot")) Destroy(other.gameObject);
	if(other.gameObject.CompareTag("CrossShip"))
	{
		GameObject.Find("UpperText").SendMessage("AddDestroyedShip");
		score.SendMessage("AddScore","crossShip");
		other.gameObject.SendMessage("StopTransform");
	}
	if(other.gameObject.CompareTag("Asteroid")) score.SendMessage("AddScore","asteroid");
	
	if(other.gameObject.CompareTag("CrossShip")||other.gameObject.CompareTag("Asteroid"))
	{
		var expScript: Explosion=other.gameObject.GetComponent("Explosion")as Explosion;
		expScript.GotHit();
		Destroy(gameObject);
	}
	
	if(other.gameObject.CompareTag("BattleDroneDuel")||other.gameObject.CompareTag("BattleDroneVenus")||
	other.gameObject.CompareTag("BattleDroneSnake"))
	{
		other.gameObject.SendMessage("LifeLost",SendMessageOptions.DontRequireReceiver);
		score.SendMessage("AddScore","battleDrone");	
	}
	if(other.gameObject.CompareTag("SnakeGod")) 
	{
		other.gameObject.SendMessage("LifeLost",SendMessageOptions.DontRequireReceiver);
		score.SendMessage("AddScore","SG");
	}	
}