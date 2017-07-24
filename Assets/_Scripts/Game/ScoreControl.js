#pragma strict

var textColor: Color;
private var score: int=0;
private var adding: boolean=false;
private var pointAddTime: float=0.5;
private var tempScore: int=0;

function Start()
{
	GetComponent.<GUIText>().material.color=textColor;
	GameObject.FindWithTag("Quest").GetComponent.<GUIText>().material.color=textColor;
}

function Update () 
{
	if(tempScore<=0&&!adding) gameObject.GetComponent.<GUIText>().text=PlayerPrefs.GetString("PlayerName","Pilot")+"'s score: "+score;
}
function AddScore(object: String)
{
	if(object=="asteroid") tempScore+=2;
	if(object=="crossShip") tempScore+=4;
	if(object=="battleDrone") tempScore++;
	if(object=="SG") tempScore++;
	
	while(tempScore>0)
	{
		gameObject.GetComponent.<GUIText>().text=PlayerPrefs.GetString("PlayerName","Pilot")+"'s score: "+score+" +"+tempScore+"";	
		yield WaitForSeconds(pointAddTime);
		score++;
		tempScore--;
	}
}

function SubmitHighScore()
{
	if(score>PlayerPrefs.GetInt("highScore"))
	{
		adding=true;
		gameObject.GetComponent.<GUIText>().text=PlayerPrefs.GetString("PlayerName","Pilot")+" got NEW HIGHSCORE!!!";
		PlayerPrefs.SetInt("highScore",score+tempScore);
	}	
}