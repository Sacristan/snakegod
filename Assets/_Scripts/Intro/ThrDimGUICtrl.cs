using UnityEngine;
using System.Collections;

public enum ButtonMode{None,LoadGame,Credits,ExitGame,Play,ShipCust}

public class ThrDimGUICtrl : MonoBehaviour {
	
	public string buttonText;
	public ButtonMode buttonMode;
	public Color backColor;
	public Color defColor;
	public Color overColor;
	GameObject back;

	Camera activeCamera;
	TextMesh textMesh;
	bool initiated = false;
		
	void Start ()
	{
		if(!initiated) Init();
	}
	
	void OnEnable()
	{
		if(!initiated) Init();	
	}
	void Init()
	{
		initiated= true;
		textMesh = GetComponent(typeof(TextMesh)) as TextMesh;
		if(textMesh.text==""&&buttonText!="") textMesh.text=buttonText;
		
		back = transform.GetChild(0).gameObject;
		back.renderer.material.color = backColor;
		if(activeCamera==null) activeCamera = Camera.main;
		
		ArrangeBack(textMesh.text);	
	}
	
	void ArrangeBack(string p)
	{
		int len = p.Length;
		
		if(len>4)
		{
			Vector3 scaleIncrement = Vector3.right*(1.7f*(len-4));
			Vector3 posIncrement = Vector3.right*(0.8f*(len-4));
				
			back.transform.localScale+=scaleIncrement;
			back.transform.localPosition+=posIncrement;
		}
	}
	
	void Update ()
	{
		Ray ray= activeCamera.ScreenPointToRay(Input.mousePosition);
		RaycastHit hit;
	
		if(back.collider.Raycast(ray, out hit, 100.0f))
		{
			renderer.material.color = overColor;
			
			if(Input.GetMouseButtonUp(0))
			{
				switch(buttonMode)
				{
				case(ButtonMode.LoadGame):
					SendMessage("Load");
					break;
				case(ButtonMode.ShipCust):
					StartCoroutine("LoadLevel","ShipCust");
					break;	
				case(ButtonMode.Play):
					StartCoroutine("LoadLevel","Helper");
					break;
				case(ButtonMode.Credits):
					StartCoroutine("LoadLevel","Credits");
					break;
				case(ButtonMode.ExitGame):
					Application.Quit();
					break;	
				}
			}
		}
		else renderer.material.color = defColor;
	}
	public void SetActiveCamera(Camera cam)
	{
		activeCamera = cam;
	}
	
	IEnumerator LoadLevel(string p)
	{
		Camera.main.gameObject.SendMessage("fadeOut");
		yield return new WaitForSeconds(3);		
		Application.LoadLevel(p);
	}	
}

