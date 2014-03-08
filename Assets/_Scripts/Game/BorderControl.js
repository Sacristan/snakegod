#pragma strict

function OnCollisionEnter (other: Collision) 
{
	if(other.gameObject.tag=="Player")
	{
		other.gameObject.transform.Translate(Vector3.zero);
		var otherScript:ShipControl=other.gameObject.GetComponent("ShipControl") as ShipControl;
		if(gameObject.name=="KreisaRobeza"&&otherScript) otherScript.canMoveLeft=false;
		if(gameObject.name=="LabaRobeza"&&otherScript) otherScript.canMoveRight=false;
	}
	if(other.gameObject.tag=="Asteroid"||other.gameObject.tag=="CrossShip"||other.gameObject.tag=="Wreckage")
	{
		if(other.rigidbody) other.rigidbody.isKinematic=true;
	}
}

function OnCollisionExit(other: Collision)
{
	if(other.gameObject.tag=="Player")
	{
		var otherScript:ShipControl=other.gameObject.GetComponent("ShipControl") as ShipControl;	
		if(gameObject.name=="KreisaRobeza"&&otherScript) otherScript.canMoveLeft=true;
		if(gameObject.name=="LabaRobeza"&&otherScript) otherScript.canMoveRight=true;
	}
}