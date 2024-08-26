import {Notes} from './app.js';

var note=document.querySelector('.note');
var title=document.querySelector('.title');
var addSection=document.querySelector('.add-section');
var editSection=document.querySelector('.edit-section');
var mainContainerforEdit=document.querySelector('.mainContainerforEdit');
var notesDisplay=document.querySelector('.notesDisplay');
var showPinnedNotes=document.querySelector('.showPinnedNotes');
var showOtherNotes=document.querySelector('.showOtherNotes');
var error=document.querySelector('.error');
var helpers=document.querySelectorAll('.helpers');

{//contains less specific tasks
    document.getElementById('resettitle').style.visibility='hidden';
    document.getElementById('resetnote').style.visibility='hidden';
    document.getElementById('resetedittitle').style.visibility='hidden';
    document.getElementById('reseteditnote').style.visibility='hidden';
}

let arr=JSON.parse(localStorage.getItem('Notes'))||[{title:'NotesCraft',note:'can save your notes here temporarily',id:0,isPinned:true,isArchived:false},{title:'may get previous notes',note:'Notes can be retirieved if your browser have saved Notes',id:1,isPinned:true,isArchived:false}];

showNotes();
function showNotes(){
    // notesDisplay.innerHTML='';
    // notesDisplay.innerHTML+=Notes(arr);
    let otherNotes=arr.filter(item=>item.isArchived===false&&item.isPinned===false);
    let pinnedNotes=arr.filter(item=>item.isPinned===true&&item.isArchived===false);
    // console.log(otherNotes,pinnedNotes,arr);
    showPinnedNotes.innerHTML=Notes(pinnedNotes);
    showOtherNotes.innerHTML=Notes(otherNotes);
    // arr.map((item)=>{
        // notesDisplay.innerHTML+=`<div id='hello' data-key=${item.id}>
        //         <div class="d-flex a-center"><span>${item.title}</span><img src="delete.png" height="30px" width="30px" class="helpers" data-key="delete${item.id}"><img src="edit.png" height="30px" width="30px" class="helpers" data-key="edit${item.id}"></div>
        //         <p>${item.note}</p>
        //         <div>
        //             <img src="pin.png" height="30px" width="30px" class="helpers" data-key="pin${item.id}">
        //             <img src="archive.png" height="30px" width="30px" class="helpers" data-key="archive${item.id}">
        //         </div>
        //     </div>`;
        // notesDisplay.innerHTML+=Notes(item);
        //see both metohd are same in one i am adding innnerHTML inside same js document using array map function
        //in other one i am creating export const arrow function and passing item as araguement and it is returning 
        //innerHTML for the element
    // });
    localStorage.setItem("Notes",JSON.stringify(arr));
    helpers=document.getElementsByClassName('helpers');
}

addSection.addEventListener('click',(event)=>{
    // console.log(event.target.dataset.key);
    if(event.target.dataset.key==='resettitle'){
        title.value='';
        document.getElementById('resettitle').style.visibility='hidden';
    }
    else if(event.target.dataset.key==='resetnote'){
        note.value='';
        document.getElementById('resetnote').style.visibility='hidden';
    }else if(event.target.dataset.key==='add'){

        if(title.value.trim().length > 0 &&note.value.trim().length > 0 ){
            arr.push({title:title.value.trim(),note:note.value.trim(),id:Date.now(),isPinned:false,isArchived:false});
            showNotes();
        }
        else{error.style.visibility='visible';setTimeout(()=>{error.style.visibility='hidden';},3000);}
        title.value='';
        note.value='';

    }
});

addSection.addEventListener('keydown',(event)=>{
    if(event.target.dataset.key==='title'){
        // document.getElementById('resettitle').style.visibility='visible'; not a good way
        error.style.visibility='hidden';event.target.nextSibling.style.visibility='visible';
    }
    if(event.target.dataset.key==='note'){
        // document.getElementById('resetnote').style.visibility='visible';
        error.style.visibility='hidden';event.target.nextSibling.style.visibility='visible';
    }
});

notesDisplay.addEventListener('mouseover',(event)=>{
    let t=event.target;
    while(t.parentNode&&t?.id!=='hello'){//finding the parent container which contains the title and the note
        t=t.parentNode;
    }

    //setting visible the helpers
    for(let i=0;i<helpers.length;i++){
        let str=helpers[i].dataset.key;
        let j=str.length-1;
        while(str[j]>='0'&&str[j]<='9'){j--;}
        var uid=str.slice(j+1,str.length);

        if(uid===t.dataset?.key){helpers[i].style.visibility='visible';}
    }
});
notesDisplay.addEventListener('mouseout',(event)=>{
    let t=event.target;
    while(t.parentNode&&t?.id!=='hello'){//finding the parent container which contains the title and the note
        t=t.parentNode;
    }
    //setting visible the helpers{helpers array me jitne bhi icons he unsab ki data-key ka last yani id check karke element ko visible karadunga}
    for(let i=0;i<helpers.length;i++){
        let str=helpers[i].dataset.key;
        let j=str.length-1;
        while(str[j]>='0'&&str[j]<='9'){j--;}
        var uid=str.slice(j+1,str.length);

        if(uid===t.dataset?.key){helpers[i].style.visibility='hidden';}
    }
});

notesDisplay.addEventListener('click',(event)=>{
    // console.log(event.target.dataset.key);
    if(event.target.dataset.key){
        let prev=structuredClone(arr);

        var str=event.target.dataset.key;
        let i=str.length-1;
        while(str[i]>='0'&&str[i]<='9'){i--;}
        var uid=+str.slice(i+1,str.length);
        var action=str.slice(0,i+1);
        // console.log(action,uid);

        if(action==='delete'){
            arr=arr.filter((i)=>{
                // console.log(uid,i.id); filtering if the arr items' id matches then dont include it
                return uid!==i.id;
            })
        }else if(action==='edit'){
            // console.log('open modal to edit title and note');

            mainContainerforEdit.style.display='block';
            var edittitle=document.querySelector('.edittitle');
            var editnote=document.querySelector('.editnote');
            // console.log(event.target.parentNode.textContent,event.target.parentNode.nextElementSibling.innerText);
            edittitle.value=event.target.parentNode.textContent;
            editnote.value=event.target.parentNode.nextElementSibling.innerText;
            resetedittitle.style.visibility='visible';
            reseteditnote.style.visibility='visible';
            mainContainerforEdit.addEventListener('click',(event)=>{
                console.log(event.target);
                if(event.target?.dataset.key==='close'){
                    mainContainerforEdit.style.display='none';
                }else if(event.target?.dataset.key==='save'){
                    
                    // console.log(edittitle.value,editnote.value);
                    if(edittitle.value&&editnote.value){
                        arr.map((item)=>{
                            if(item.id===uid){item.title=edittitle.value,item.note=editnote.value}
                            return item;
                        });
                    }else{error.style.visibility='visible';console.log('askdjla');setTimeout(()=>{error.style.visibility='hidden';},3000);}
                    console.log(arr);
                    mainContainerforEdit.style.display='none';
                    showNotes(arr);
                }else if(event.target?.dataset.key==='resetedittitle'){
                    edittitle.value='';
                }
                else if(event.target.dataset.key==='reseteditnote'){
                    editnote.value='';
                }
            });

        }else if(action==='pin'){
            // console.log('pin and note');
            arr.map((item)=>{
                if(uid===item.id){item.isPinned=!item.isPinned;}
                return item;
            });
        }
        else if(action==='archive'){
            // console.log('archive the note');
            arr.map((item)=>{
                if(uid===item.id){item.isArchived=true;}
                return item;
            });
        }
        showNotes();
        var undoBtn=document.getElementById('undo-btn');
        undoBtn.style.visibility='visible';
        undoBtn.addEventListener('click',()=>{
            // console.log('undo is clicked'); restoring the notes 
            arr=prev;
            showNotes();
            undoBtn.style.visibility='hidden';
        });
        if(undoBtn.style.visibility==='visible'){
            setTimeout(()=>{
                undoBtn.style.visibility='hidden';
                // delete prev; //deleting the previous copy if user didnt clicked undo
            },5000);
        }
    }
});