
export const Notes=(arr)=>{
    let newarr=arr.map( (item)=>{
        return `<div id='hello' data-key=${item.id}>
            <div class="d-flex a-center"><span>${item.title}</span><img src="./images/delete.png" height="30px" width="30px" class="helpers" data-key="delete${item.id}"><img src="./images/edit.png" height="30px" width="30px" class="helpers" data-key="edit${item.id}"></div>
            <p>${item.note}</p>
            <div>
                <img src="${item.isPinned===true?'./images/unpin':'./images/pin'}.png" height="30px" width="30px" class="helpers" data-key="pin${item.id}">
                <img src="./images/archive.png" height="30px" width="30px" class="helpers" data-key="archive${item.id}">
            </div>
        </div>`
    });
    // console.log(newarr);
    return newarr.join("");
}