const fs=require('fs')
var u=new Set()
async function FirstScan(){
    var y='';
    for(var j=1;j<15;j++){
        for(var i=1;i<=300;i++){
            y=await fetch("https://www.jyeoo.com/shijuan/gzsw/"+j+"/"+i, {
                "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
                },
                "referrer": "https://www.jyeoo.com/shiti/zsd/gzsw/1/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            }).then(e=>e.text());
            [...y.matchAll(/<a href="\/sj\/([0-9a-z-]{36})"[\s\S]+?<\/a>/g)].forEach(e=>u.add(e[1]));
            console.log("J",j,"USIZE",u.size);
        }
    }
    fs.writeFileSync("Papper-Scaned.json",JSON.stringify([...u]))
}
FirstScan()