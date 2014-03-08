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
	storedVolume = audio.volume;
	mute = false;
}

function FixedUpdate()
{	
	if(!bossFightTrigerred)
		{
		volume = audio.volume;
		
		if(mute)
		{
			if(!justMuted)
			{
				justMuted = true;
				storedVolume = volume;
			}
			audio.volume = 0; 
			volume = audio.volume;
		}
		else
		{
			justMuted = false;
			volume = storedVolume;
			audio.volume = volume;
		}
	}
}

function FadeInAudio()
{
	var t: float = audio.volume;
    while (t < 1.0) 
    {
    	t += Time.deltaTime;
    	audio.volume = t;
    	yield WaitForSeconds(0.2);
    }
}

function FadeOutAudio()
{
	var t: float = audio.volume;
    while (t > 0.0) 
    {
    	t -= Time.deltaTime;
    	audio.volume = t;
    	yield WaitForSeconds(0.2);
    }
}

function BossFight()
{
	bossFightTrigerred=true;
	yield FadeOutAudio();
	audio.Stop();
	audio.clip=bossClip;
	audio.Play();
	Instantiate(Resources.Load("Fermis",Transform));
	yield FadeInAudio();
	bossFightTrigerred=false;
}