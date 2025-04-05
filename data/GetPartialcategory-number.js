const fs=require('fs')
part=String(fs.readFileSync("partialcategory.txt"))
h=[...part.matchAll(/<li pk="([0-9]+)" nm="([\u4e00-\u9fff、，A-Za-z0-9—“” ]+?)" fpk="[0-9]+"><\/li>/g)]
h=h.map(e=>[e[1],e[2]])
fs.writeFileSync("IdWithParts.json",JSON.stringify(h))