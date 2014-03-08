#pragma strict

var speed:float=60;
private var randBon: float;
var sfx: AudioClip;

function Start()
{
	randBon=Random.value;
}
function Update () 
{
	
	transform.position.z += -randBon* speed*(Time.deltaTime)*Mathf.Sqrt(Time.timeSinceLevelLoad/3);

	Destroy(gameObject,8);
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.CompareTag("Siets"))
	{
		audio.PlayOneShot(sfx);
	 	Destroy(gameObject,1);	
	}
}