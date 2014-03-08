#pragma strict

var asteroids: Transform[];
var crossShip: Transform;
var battleDroneDuel: Transform;
var battleDroneSnake: Transform;
var battleDroneVenus: Transform;

var canSpawnAsteroids: boolean=false;
var canSpawnCrossShips: boolean=false;
var canSpawnBattleDrones: boolean=false; 

var asteroidSpawnTime: float=1;
var crossShipSpawnTime: float=2;
var spawnTimer: float;
var spawnTimeRandom: float=5;

var called: boolean=false;
private var lastSpawned: float= 0.0;
private var fixedTime: float=0.0;

var sunLight: GameObject;
var particle: GameObject;
var shipParticle: GameObject;

var questCtrl: QuestControl;

private var i: int;

private var hasSpawnedDuel: boolean=false;
private var hasSpawnedVenus: boolean=false;
private var hasSpawnedSnake: boolean=false;

function Start()
{
	particle.active=false;	
	sunLight.active=false;
	shipParticle.active=false;
}
function Update () 
{
	if(questCtrl.startAsteroidField) canSpawnAsteroids=true;	
	else 
	{
		canSpawnAsteroids=false;
		called=false;
	}
	
	if(questCtrl.crossShipSpawn) canSpawnCrossShips=true;	
	else canSpawnCrossShips=false;
	
	if(questCtrl.battleDroneSpawn) canSpawnBattleDrones=true;	
	else canSpawnBattleDrones=false;
	
	if(canSpawnAsteroids)
	{
		if(!called)
		{
			shipParticle.active=true;
			particle.active=true;
			called=true;
			lastSpawned=Time.time;
			fixedTime=Time.time;
			ResetSpawnTimer("asteroid");
		}
		
		if(Time.time>lastSpawned+spawnTimer)
		{
			var n: int=UnityEngine.Random.Range(0,asteroids.length);
			
			Instantiate(asteroids[n], transform.position, Quaternion.identity);
			lastSpawned=Time.time;
			ResetSpawnTimer("asteroid");
		}	
	}
	
	if(canSpawnCrossShips)
	{
		if(Time.time>lastSpawned+spawnTimer)
		{
			Instantiate(crossShip, transform.position, Quaternion.identity);
			lastSpawned=Time.time;
			ResetSpawnTimer("crossShip");
		}	
	}
	if(canSpawnBattleDrones)
	{
		if(GameObject.FindWithTag("BattleDroneDuel")==null&&!hasSpawnedDuel)
		{
			Instantiate(battleDroneDuel,transform.position,Quaternion.identity);
			hasSpawnedDuel=true;
		}	
		if(GameObject.FindWithTag("BattleDroneDuel")==null&&GameObject.FindWithTag("BattleDroneVenus")==null
		&&!hasSpawnedVenus&&hasSpawnedDuel)
		{ 
			Instantiate(battleDroneVenus,transform.position,Quaternion.identity);
			hasSpawnedVenus=true;
		}	
		if(GameObject.FindWithTag("BattleDroneVenus")==null&&GameObject.FindWithTag("BattleDroneSnake")==null
		&&!hasSpawnedSnake&&hasSpawnedVenus&&hasSpawnedDuel) 
		{
			Instantiate(battleDroneSnake,transform.position,Quaternion.identity);
			hasSpawnedSnake=true;
		}
		
		if(GameObject.FindWithTag("BattleDroneDuel")==null&&GameObject.FindWithTag("BattleDroneVenus")==null&&
		GameObject.FindWithTag("BattleDroneSnake")==null&&hasSpawnedDuel&&hasSpawnedVenus&&hasSpawnedSnake)
		{
			GameObject.Find("UpperText").SendMessage("ChangeText","noBattleDronesLeft");
		}	
	}
}

function ResetSpawnTimer(spawnObj:String)
{
	if(spawnObj=="asteroid")
	{
		spawnTimer = asteroidSpawnTime + Random.Range(0, spawnTimeRandom);
	}	
	if(spawnObj=="crossShip")
	{
		spawnTimer = crossShipSpawnTime + Random.Range(0, spawnTimeRandom);
	}
}