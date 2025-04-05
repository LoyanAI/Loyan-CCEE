//https://www.jyeoo.com/bio2/ques/partialques?f=1&q=361112&lbs=&pd=1&mindg=0.1&maxdg=0.9&ct=1
const fs=require('fs')
const cookie=fs.readFileSync("./Cookies.txt")
const dir='tiankong_ShowAnswer'//ct=1
const ids=JSON.parse(String(fs.readFileSync("IDList.json")))//Len 278
const isshowanswer=true;
async function wait(second) {
    await new Promise(resolve => setTimeout(resolve, second*1000));
    return 0;
}
async function GetbyAPart(q){
    var u=[];
    for(var i=1;i<=30/*100*/;i++){
        console.log("Q=",q,"Page",i)
        var w=await fetch("https://www.jyeoo.com/bio2/ques/partialques?f=1&q="+q+(isshowanswer?"&showAns=1":'')+"&lbs=&pd=1&ct=2&mindg=0.1&maxdg=0.9&pi="+i+"&r=0.13571040309288462", {
            "credentials": "include",
            "headers": {
                "Cookie":cookie,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
                "Accept": "text/html, */*; q=0.01",
                "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.jyeoo.com",
            "method": "GET",
            "mode": "cors"
        }).then(e=>e.text());
        if(isshowanswer){
            u=u.concat([...w.matchAll(/<fieldset [\s\S]+?<\/fieldset>/g)].map(e=>e[0]))
            console.log("Length",u.length)
        }else{
            u=u.concat([...w.matchAll(/<fieldset id="([a-z0-9-]{36})" /g)].map(e=>e[1]))
        }
        await wait(2);
    }
    if(isshowanswer){
        u=down(u)
    }
    return u;
}
//(async ()=>console.log(await GetbyAPart(361111)))()
async function getList(){
    for(var w=6;w<7/*ids.length*/;w++){//2 per wait 3minutes
        fs.writeFileSync(dir+'/'+ids[w]+"_Main.json",JSON.stringify(await GetbyAPart(ids[w])))
        console.log("List",ids[w],"has been saved")
    }
}
getList()


function down(arr){
    var all=[]
    for(var i=0;i<arr.length;i++){
        all.push(arr[i].replaceAll(/<(\/)?br(\/)?>/g,'\n')
        .replaceAll(/<a href[\s\S]+?<\/a>/g,'')
        .replaceAll(/<div class="quizPutTag">[\s\S]+?<\/div>/g,'').replaceAll(/<div class="sanwser">([\s\S]+?)<\/div>/g,'[[Ques]]$1[[/Ques]]')
        .replaceAll(/<bdo class="mathjye-underline">([\s\S]+?)<\/bdo>/g,'[[Ques]]$1[[/Ques]]')
        .replaceAll(/<tr[\x00-\x7F]+?>/g,'|').replaceAll(/<\/tr>/g,'\n').replaceAll(/<\/td>/g,'|')
        .replaceAll(/<[\x00-\x7F]+?>/g,'').replace(/<fieldset id=.+?>/g,'').replace(/\【\点\评\】.+/g,'')
        )
    }
    return all
}