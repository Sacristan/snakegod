#pragma strict

var shot: Transform;
var spawnPoint: Transform;

function Update () 
{
	if(gameObject.tag=="Player")
	{
		if(Input.GetButtonDown("Shoot"))
		{
			Instantiate(shot,spawnPoint.position,Quaternion.identity);
		}	
		if (Application.platform == RuntimePlatform.IPhonePlayer&&Input.GetTouch(0).phase==TouchPhase.Began)
		{
			Instantiate(shot,spawnPoint.position,Quaternion.identity);
		}
	}
}
function GraphInstantiate()
{
	Instantiate(shot,spawnPoint.position,Quaternion.identity);
}