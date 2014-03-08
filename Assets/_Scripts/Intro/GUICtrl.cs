using UnityEngine;
using System.Collections;

public class GUICtrl : MonoBehaviour {

	public GameObject Credits;
	public GameObject Exit;
	public GameObject Play;
	public GameObject ShipCust;
	
	public void Load()
	{
		Play.SetActiveRecursively(true);
		ShipCust.SetActiveRecursively(true);
		
		Destroy(Credits);
		Destroy(Exit);
		Destroy(gameObject);
	}
	
}
