#pragma strict

private var guiSkin:GUISkin;

private var gameOver: boolean=false;
var shipParticle: GameObject;
private var score: GameObject;
var sfx: AudioClip;
private var audioPlayed: boolean = false;

function Start()
{
	if(gameObject.tag=="Player") score=GameObject.Find("ScoreText");
	gameOver=false;
	guiSkin=Resources.Load("GUI",GUISkin) as GUISkin;
}

function GotHit()
{
	if(sfx&&!audioPlayed)
	{
		//audio.priority=255;
		audioPlayed=true;
		audio.PlayOneShot(sfx);
	}
	if(gameObject.tag=="SnakeGod")
	{
		var questCtrl: QuestControl=GameObject.Find("UpperText").GetComponent("QuestControl") as QuestControl;
		questCtrl.ChangeText("sacrifice");
		GameObject.FindWithTag("Player").AddComponent("Detonator");
	}	
	if(gameObject.tag=="Player")
	{
		Instances.hadDied=true;
		score.SendMessage("SubmitHighScore");
		Destroy(gameObject.GetComponent("ShipControl"));
		Destroy(gameObject.GetComponent("ShipShot"));
		if(!gameOver) StartCoroutine("OnGameOver");
	}
	else
	{
		Destroy(collider,1.5f);
		var scr: BattleDroneControl = GetComponent(BattleDroneControl) as BattleDroneControl;
		if(scr!=null) Destroy(scr);
		Instances.killedCount++;
	}
	gameObject.AddComponent("Detonator");
	
	var detScript: Detonator=gameObject.GetComponent("Detonator")as Detonator;
	detScript.size=3;
	detScript.destroyTime=10;
}

function OnGameOver()
{
	gameOver = true;
	var questCtrl: QuestControl=GameObject.Find("UpperText").GetComponent("QuestControl") as QuestControl;
	questCtrl.ChangeText("lostControl");
	
	shipParticle.active=false;
	yield WaitForSeconds(2);
	SendMessage("TriggerGameOver");
	Time.timeScale=0.0;
}
