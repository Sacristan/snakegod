#pragma strict

var delay: float=0;
var moveTo: Vector3 = Vector3.zero;
var speed: float=1;
var repeatRate: float = .05;
var destroyOverTime: float=0.0;
private var init: boolean;
static var created: boolean=false;
var instOnNextAwake: boolean=false;

function Init()
{
	init = true;
	yield new WaitForSeconds(delay);
	InvokeRepeating("MoveTo",0,repeatRate);
	if(destroyOverTime!=0.0) Destroy(gameObject,destroyOverTime);	
}
function MoveTo()
{
	transform.position = Vector3.Lerp(transform.position,moveTo,speed*Time.deltaTime);
	speed+=repeatRate/5;
	if(transform.position == moveTo) CancelInvoke("MoveTo");
	
}

function Awake()
{
	DontDestroyOnLoad(gameObject);
	if(instOnNextAwake)
	{
		if(created)
		{
			if(!init) Init();
		}
	}
	else
	{
		if(!init) Init();
	}
	
	if(!created) created = true;
}

//function OnEnable()
//{
	//if(!init) Init();
//}