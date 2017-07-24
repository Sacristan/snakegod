#pragma strict

function Start () {
	GetComponent.<GUITexture>().pixelInset = new Rect(0,-Screen.height,Screen.width,Screen.height);
}