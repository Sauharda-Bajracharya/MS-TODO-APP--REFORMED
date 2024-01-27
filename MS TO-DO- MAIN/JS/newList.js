let customListCount = 0;
let isContextMenuVisible = false;

document.addEventListener('DOMContentLoaded', function() {
    loadCustomLists();
});

function loadCustomLists() {
    const savedLists = JSON.parse(localStorage.getItem('customLists')) || [];
    savedLists.forEach(list => {
        createListElement(list.name);
    });
    customListCount = savedLists.length;
}

function createListElement(listName) {
    const newList = document.createElement('a');
    newList.href = "#";
    newList.innerHTML = `<i class="fa-solid fa-bars-staggered"></i> <span class="sidebar-label">${listName}</span>`;
    newList.addEventListener('click', function() {
        loadCustomList(listName);
    });
    newList.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        showContextMenu(event, listName);
    });

    const separator = document.createElement('hr');

    const newListItem = document.getElementById('new-list');
    newListItem.parentNode.insertBefore(newList, newListItem);
    newListItem.parentNode.insertBefore(separator, newListItem);
}

function saveCustomList(listName) {
    const savedLists = JSON.parse(localStorage.getItem('customLists')) || [];
    savedLists.push({ name: listName });
    localStorage.setItem('customLists', JSON.stringify(savedLists));
}

function deleteCustomList(listName) {
    const confirmation = confirm(`Are you sure you want to delete the list "${listName}"?`);
    if (confirmation) {
        let savedLists = JSON.parse(localStorage.getItem('customLists')) || [];
        savedLists = savedLists.filter(list => list.name !== listName);
        localStorage.setItem('customLists', JSON.stringify(savedLists));
        location.reload(); // Refresh the page to reflect changes
    }
}

function showContextMenu(event, listName) {
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    contextMenu.innerHTML = `
        <div class="context-menu-option" onclick="renameCustomList('${listName}')">
        <i class="fa-solid fa-square-pen"></i> Rename</div>
        <div class="context-menu-option" onclick="deleteCustomList('${listName}')">
        <i class="fa-solid fa-trash-can"></i> Delete</div>
    `;
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    document.body.appendChild(contextMenu);

    const sidebarRect = document.querySelector('.side-bar').getBoundingClientRect();
    const listRect = event.target.getBoundingClientRect();
    const contextMenuWidth = contextMenu.offsetWidth + 20; 
    const x = Math.min(listRect.right, sidebarRect.right - contextMenuWidth); 
    const y = event.clientY; 
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;
    document.body.appendChild(contextMenu);

    const removeContextMenu = function() {
        contextMenu.remove();
        isContextMenuVisible = false; 
        document.removeEventListener('click', removeContextMenu);
    };
    document.addEventListener('click', removeContextMenu);
}

function renameCustomList(oldName) {
    const newName = prompt("Enter the new name for your custom list:", oldName);
    if (newName && newName !== oldName) {
        let savedLists = JSON.parse(localStorage.getItem('customLists')) || [];
        savedLists.forEach(list => {
            if (list.name === oldName) {
                list.name = newName;
            }
        });
        localStorage.setItem('customLists', JSON.stringify(savedLists));
        location.reload();
    }
}

function createNewList() {
    if (customListCount < 5) {
        const listName = prompt("Enter the name for your custom list:");
        if (listName) { // Check if user entered a name
            createListElement(listName);
            saveCustomList(listName);
            customListCount++;
        } else {
            alert("Please enter a name for your custom list.");
        }
    } else {
        alert("You can only create up to 5 custom lists.");
    }
}

function loadCustomList(listName) {
    // Implement the functionality to load content for the custom list based on listName
    // You can use this function to load specific content for each custom list
}
