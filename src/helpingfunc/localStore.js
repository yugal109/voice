function localStore(name,data){
    localStorage.setItem(name,JSON.stringify(data))
}

export default localStore;