#pragma strict
@script RequireComponent(AudioSource)

var bossClip: AudioClip;
@HideInInspector
var mute: boolean; 

private var justMuted: boolean=false;
private var volume: float;
private var storedVolume: float;
private var bossFightTrigerred: boolean = false;

function Start()
{
	storedVolume = GetComponent.<AudioSource>().volume;
	mute = false;
}

function FixedUpdate()
{	
	if(!bossFightTrigerred)
		{
		volume = GetComponent.<AudioSource>().volume;
		
		if(mute)
		{
			if(!justMuted)
			{
				justMuted = true;
				storedVolume = volume;
			}
			GetComponent.<AudioSource>().volume = 0; 
			volume = GetComponent.<AudioSource>().volume;
		}
		else
		{
			justMuted = false;
			volume = storedVolume;
			GetComponent.<AudioSource>().volume = volume;
		}
	}
}

function FadeInAudio()
{
	var t: float = GetComponent.<AudioSource>().volume;
    while (t < 1.0) 
    {
    	t += Time.deltaTime;
    	GetComponent.<AudioSource>().volume = t;
    	yield WaitForSeconds(0.2);
    }
}

function FadeOutAudio()
{
	var t: float = GetComponent.<AudioSource>().volume;
    while (t > 0.0) 
    {
    	t -= Time.deltaTime;
    	GetComponent.<AudioSource>().volume = t;
    	yield WaitForSeconds(0.2);
    }
}

function BossFight()
{
	bossFightTrigerred=true;
	yield FadeOutAudio();
	GetComponent.<AudioSource>().Stop();
	GetComponent.<AudioSource>().clip=bossClip;
	GetComponent.<AudioSource>().Play();
	Instantiate(Resources.Load("Fermis",Transform));
	yield FadeInAudio();
	bossFightTrigerred=false;
}