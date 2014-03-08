static function SetBool (name : String, value : boolean) {
    PlayerPrefs.SetInt(name, value?1:0);
}

static function GetBool (name : String) : boolean {
    return PlayerPrefs.GetInt(name)==1?true:false;
}

static function GetBool (name : String, defaultValue : boolean) : boolean {
    if (PlayerPrefs.HasKey(name)) {
        return GetBool(name);
    }
    return defaultValue;
}