export function GetLoginStatus(){
    return localStorage.getItem("login-status")
}

export function SetLoginStatus(key){
    localStorage.setItem(key, true)
}

export function RemoveLoginItem(key){
    localStorage.removeItem(key)
}

