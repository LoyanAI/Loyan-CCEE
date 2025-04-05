const fs=require('fs')
var allerr=[]
function downone(q) {
    return new Promise((resolve, reject) =>{
        fetch("https://www.jyeoo.com/shiti/"+q, {
            "credentials": "include",
            "headers": {
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
        }).then(e=>e.text()).then(i=>{
            try{
                all.push(i.match(/<section class="prelative quesborder[\s\S]+?<\/section>/g)[0]
                    .replaceAll(/<div class="quizPutTag">[\s\S]+?<\/div>/g,'')
                    .replaceAll(/<div class="sanwser">([\s\S]+?)<\/div>/g,'[[Ques]]$1[[/Ques]]')
                    .replaceAll(/<bdo class="mathjye-underline">([\s\S]+?)<\/bdo>/g,'[[Ques]]$1[[/Ques]]')
                    .replaceAll(/<(\/)?br(\/)?>/g,'\n').replaceAll(/<img alt src="([\s\S]+?)"[\s\S]+?>/g,'[[Image]]$1[[/Image]]')
                    .replaceAll(/<tr[\x00-\x7F]+?>/g,'|').replaceAll(/<\/tr>/g,'\n').replaceAll(/<\/td>/g,'|')
                    .replaceAll(/<[\x00-\x7F]+?>/g,'').replace(/\【\点\评\】.+/g,'')
                );
            }catch(err){allerr.push(q)}
            resolve(1)
        })
    })
}
var op=[]
var all=[]
async function down(){
    var d=JSON.parse(String(fs.readFileSync("2-Multi-Scaned.json"/*"Papper-Getted-Len148538.json"*/))).u;
    //d=d.slice(0,20)
    for(var i=0;i<d.length/30;i++){
        for(var opi=0;opi<30;opi++){
            op.push(downone(d[i*30+opi]))
        }
        console.log("Pos",i*30)
        await Promise.all(op)
        op=[]
    }
    fs.writeFileSync("data/Papper-Down5.json",JSON.stringify(all))
    fs.writeFileSync("data/Papper-Down5-Err.json",JSON.stringify(allerr))
}
down()