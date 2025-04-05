const fs=require('fs')
const w=JSON.parse(String(fs.readFileSync("Papper-Scaned.json")))
var u=new Set();
var y;
function got(id,i){
    return new Promise((resolve, reject) =>{
        fetch("https://www.jyeoo.com/sj/"+id, {
            "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        }).then(e=>e.text()).then(y=>{
            [...y.matchAll(/<a href="\/shiti\/([0-9a-z-]{36})"[\s\S]+?<\/a>/g)].forEach(e=>u.add(e[1]));
            console.log("Pos",i,"SiZE",u.size);
            resolve(1)
        })
})}
op=[];
(async ()=>{
    for(var i=17520/10;i<17530/10/*w.length*/;i++){//17527
        for(var j=0;j<10;j++){op.push(got(w[10*i+j],10*i+j))}
        await Promise.all(op);
        op=[]
    }
    fs.writeFileSync("Papper-Getted3.json",JSON.stringify([...u]))
})()