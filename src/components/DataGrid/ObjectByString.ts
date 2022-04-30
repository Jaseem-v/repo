function OBJ(o:{}, s:string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          //  ts-ignore
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export  default  function OBJFROMOBJ(o:{}, s:string|{}):string|{}|undefined {
    if(typeof s=="object"){
        let _={}
        for(let key in s){
            let val=s[key]
            _[key]=OBJ(o,val)

        }
        return _
    }
    if(typeof s=="string"){
        return OBJ(o, s)
    }
}

