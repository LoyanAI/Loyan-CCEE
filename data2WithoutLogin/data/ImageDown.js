const fs = require('fs');
const fetch = require('node-fetch');
allerr=[]
function downloadImage(w,n) {
    return new Promise((resolve, reject) => {
        fetch(w)
            .then(response => {
                if (!response.ok) {
                    allerr.push(w);
                    resolve();
                }
                const fileStream = fs.createWriteStream(n);
                response.body.pipe(fileStream);
                response.body.on('error', err => {
                    fs.unlink(filename, () => {
                        allerr.push(w);
                        resolve();
                    });
                });
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            })
            .catch(err => {
                console.log(err)
                allerr.push(w);
                resolve();
            });
    });
}


async function downloadImagesInGroups(imageUrls, groupSize) {
    const downloadDir = './image';
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
    }

    let index = 0;
    while (index < imageUrls.length) {
        const group = imageUrls.slice(index, index + groupSize);
        const promises = group.map((url, i) => {
            return downloadImage(url, `${downloadDir}/${U2Name(url)}`);
        });
        await Promise.all(promises);
        index += groupSize;
        console.log(`Group of ${groupSize} images downloaded.`);
    }
    console.log('All images downloaded successfully.');
    fs.writeFileSync("Image-Err.json",JSON.stringify(allerr))
}
const U2Name=(url)=>url.match(/[0-9][^.]+/g)[0].replaceAll("/",'')+'.png';
const t=JSON.parse(String(fs.readFileSync("./Photos.json")))
downloadImagesInGroups(t,20)