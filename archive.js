import {Notes} from './app.js';

var arr=JSON.parse(localStorage.getItem("Notes"));

//filter out only archived one
let arr2=[];

var notesDisplay=document.querySelector('.notesDisplay');
var showPinnedNotes=document.querySelector('.showPinnedNotes');
var showOtherNotes=document.querySelector('.showOtherNotes');
var helpers=document.getElementsByClassName('helpers');

showArchived();
function showArchived(){
    arr2=arr.filter(item=>item.isArchived===true);
    let pinnedNotes=arr2.filter(item=>item.isPinned===true);
    showPinnedNotes.innerHTML='';
    showPinnedNotes.innerHTML+=Notes(pinnedNotes);
    
    let otherNotes=arr2.filter(item=>item.isPinned===false);
    showOtherNotes.innerHTML='';
    showOtherNotes.innerHTML+=Notes(otherNotes);
    var helpers=document.getElementsByClassName('helpers');
}

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
        // console.log(uid);
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
            console.log('open modal to edit title and note');
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
                if(uid===item.id){item.isArchived=!item.isArchived;}
                return item;
            });
        }
        showArchived();
        var undoBtn=document.getElementById('undo-btn');
        undoBtn.style.visibility='visible';
        undoBtn.addEventListener('click',()=>{
            // console.log('undo is clicked'); restoring the notes 
            arr2=prev;
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