const fs=require('fs')
var u=new Set()
var w=new Set();
var books=['e1g10t1','e2g10t2','e25g11t1','e26g11t2','e27g12t1']
async function FirstScan(){
    var y='';
    for(var j=0;j<books.length;j++){
        for(var i=1;i<=300;i++){
            y=await fetch(/*"https://www.jyeoo.com/shiti/zsd/gzsw/"*/"https://www.jyeoo.com/shiti/zj/gzsw/"+books[j]+"/"+i, {
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
            [...y.matchAll(/<a href="\/shiti\/([0-9a-z-]{36})"[\s\S]+?<\/a>/g)].forEach(e=>u.add(e[1]));
            console.log("BOOK",books[j],"USIZE",u.size);
        }
    }
}
async function MutiScan(r,ok){
    var y=await fetch("https://www.jyeoo.com/shiti/"+r, {
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
        "referrer": "https://www.jyeoo.com/shiti/zsd/gzsw/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    }).then(e=>e.text());
        [...y.matchAll(/<a href="\/shiti\/([0-9a-z-]{36})"[\s\S]+?<\/a>/g)].forEach(e=>w.add(e[1]));
        console.log("Pos",ok,"WSIZE",w.size)
}
//u=
async function scan(){
    await FirstScan();
    if(false){
        for(let r of u){
            await MutiScan(r)
        }
        w=w.difference(u);
        u=u.union(w);
        console.log("USIZE",u.size)
        console.log("WSIZE",w.size)
        for(var p=0;p<0;p++){
            var rp=[];
            for(let r of w){
                rp.push(r)
            }
            w=new Set();
            for(var l=0;l<rp.length;l++){
                await MutiScan(rp[l],l)
            }
            w=w.difference(u);
            u=u.union(w);
            console.log("USIZE",u.size)
            console.log("WSIZE",w.size)
        }
    }
    console.log("USIZE",u.size)
    console.log("WSIZE",w.size)
    var g={u:[...u],w:[...w]}
    fs.writeFileSync("BOOK-Multi-Scaned.json",JSON.stringify(g))

}
scan();