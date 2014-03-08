#pragma strict

var speed:float = 40.0;
var waveMagnitude:float = 50;
var waveSpeed:float = 2.0;
var rotateSpeed:float = 50;
private var wave:float = 0.0;
private var originalX:float;
private var dir:int;
private var canTransform:boolean=true;

function Awake()
{
	dir=Mathf.Sign(Random.Range(-2,1));	
	originalX = transform.position.x;	
	wave = Random.Range(0, Mathf.PI*2*10)*0.1;
	transform.Rotate(270,0,0);
}

function Update()
{
	if(canTransform)
	{
		transform.position.z += -1 * speed * Time.deltaTime;
		transform.position.x = (originalX + Mathf.Sin(wave) * waveMagnitude*dir);
		wave += Time.deltaTime * waveSpeed;
		transform.Rotate(0,-rotateSpeed * Time.deltaTime,0,Space.World);
	}
	Destroy(gameObject,21);
}

function OnTriggerEnter(other: Collider)
{
	if(other.gameObject.CompareTag("Siets")) Destroy(gameObject);	
}
function StopTransform()
{
	canTransform=false;
}