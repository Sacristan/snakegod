using UnityEngine;
using System.Collections;

public enum RotateAroundMode{GOWithTag,AssignedGO,MousePos,ScreenPos}

public class TtrDimGUIRot : MonoBehaviour {
	public RotateAroundMode rotateAroundMode = RotateAroundMode.GOWithTag;

	public string tagName;
	public GameObject assignedGO;
	public Vector2 screenPos;
	
	public Camera rotCamera;
	public bool once = false;
	public Vector3 rotCorrection = new Vector3(180,0,180);
	
	Vector3 rotateAround;
	
	void Initialise()
	{
		Transform temp;
		
		switch(rotateAroundMode)
		{
		case RotateAroundMode.GOWithTag:
			temp = GameObject.FindWithTag(tagName).transform;
			rotateAround = new Vector3(temp.position.x,temp.position.y,temp.position.z);
		break;
			
		case RotateAroundMode.AssignedGO:
			temp = assignedGO.transform;
			rotateAround = new Vector3(temp.position.x,temp.position.y,temp.position.z);
		break;
			
		case RotateAroundMode.MousePos:
			//temp = assignedGO.transform;
			if(rotCamera) rotateAround = CameraToWorldPos(rotCamera,true);
			else rotateAround = CameraToWorldPos(Camera.main,true);
		break;
			
		case RotateAroundMode.ScreenPos:
			//temp = assignedGO.transform;
			if(rotCamera==null) rotateAround = CameraToWorldPos(rotCamera,false);
			else rotateAround = CameraToWorldPos(Camera.main,false);
		break;	
		}
	}
	
	Vector3 CameraToWorldPos(Camera cam, bool mousePos)
	{
		Vector3 tempPos;
		if(mousePos) tempPos = Input.mousePosition;
		else tempPos = screenPos;
		
		tempPos.z = -(transform.position.x - cam.transform.position.x);	
		tempPos = cam.ScreenToWorldPoint(tempPos);
		
		return tempPos;
	}
	
	void Update ()
	{
		if(!once) Initialise();
		transform.LookAt(rotateAround);
		transform.eulerAngles+=rotCorrection;
	}
	
	void Awake()
	{
		Initialise();
	
		if(rotCamera!=null) SendMessage("SetActiveCamera",rotCamera,SendMessageOptions.DontRequireReceiver);
	}
	
}
