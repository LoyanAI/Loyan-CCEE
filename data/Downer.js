const fs=require('fs')
const dir='choose'
const cookie=fs.readFileSync("Cookies.txt")
async function wait(second) {
    await new Promise(resolve => setTimeout(resolve, second*1000));
    return 0;
}
async function downone(q) {
    console.log("Downloading",q)
    return await fetch("https://www.jyeoo.com/bio2/ques/detail/"+q, {
        "credentials": "include",
        "headers": {
            "Cookie":cookie,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Priority": "u=0, i"
        },
        "method": "GET",
        "mode": "cors"
    }).then(e=>e.text()).then(i=>i.match(/<fieldset id\=\"[\s\S]+?<\/fieldset>/g)[0])
}
async function down(qcode){
    var all=[]
    var d=JSON.parse(String(fs.readFileSync(dir+'/'+qcode+"_List.json")));
    //d=d.slice(0,20)
    for(var i=0;i<d.length;i++){
        console.log(i)
        all.push((await downone(d[i])).replaceAll(/<(\/)?br(\/)?>/g,'\n')
        .replaceAll(/<tr[\x00-\x7F]+?>/g,'|').replaceAll(/<\/tr>/g,'\n').replaceAll(/<\/td>/g,'|')
        .replaceAll(/<[\x00-\x7F]+?>/g,'').replace(/<fieldset id=.+?>/g,'').replace(/\【\点\评\】.+/g,'')
        )
        await wait(0.5);
        
    }
    fs.writeFileSync(dir+'/'+qcode+"_Main.json",JSON.stringify(all))
}
down(361111)