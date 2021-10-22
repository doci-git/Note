
// Storage
var np = {
    note: [],
    id: -1,
    limit: 5000
}

// Event -> Web-page loading
window.onload = function() {
    var a = g('eB')
    a.maxLength = np.limit
    a.oninput = upLimit
    reSize()
    showNote()
}

// Event -> Web-page click 
window.onclick = function(a) {
    if(a.target.hasAttribute('d')) {
        event(a.target)
    }
}

// Event -> Web-page resize
window.onresize = reSize

// Event handler on click event
function event(a) {
    switch(a.getAttribute('d')) {
        case 'n': 
            openNote(-1)
            return
        case 'r':
            removeNote()
            return
        case 's':
            saveNote()
            return
        case 'o':
            openNote(Number(a.getAttribute('i')))
            return
    }
}

// Show all note
function showNote() {
    g('pg1').className = ''
    g('pg2').className = 'sH'
    var a = g('list')
    var b = ''
    a.innerHTML = ''
    if(np.note.length !== 0) {
        for(var c = 0; c < np.note.length; c++) {
            b = a.innerHTML
            a.innerHTML = createNote(c)
            a.innerHTML += b
        }
        return
    }
    a.innerHTML = emptyList()
}

// Note -> Open
function openNote(a) {
    g('pg1').className = 'sH'
    g('pg2').className = ''
    np.id = a
    if(np.note[np.id] !== undefined) {
        g('eT').value = np.note[np.id][0]
        g('eB').value = np.note[np.id][1]
    }
    g('eB').focus()
    upLimit()
}

// Note -> Save
function saveNote() {
    var a = g('eT')
    var b = g('eB')
    if(a.value.length == 0 && b.value.length == 0) {
        alert('Cannot save a empty note!')
        b.focus()
        return
    }
    if(np.id == -1) {
        np.note.push([a.value, b.value])
    } else {
        np.note[np.id] = [a.value, b.value]
    }
    a.value = ''
    b.value = ''
    upLimit()
    showNote()
}

// Note -> Remove
function removeNote() {
    var a = g('eT')
    var b = g('eB')
    if(a.value.length !== 0 || b.value.length !== 0 || np.id != -1) {
        var c = confirm('Are you sure you want to delete ' + (a.value.length === 0 ? 'this' : '\'' + a.value + '\'') + ' note?')
        if(!c) {
            b.focus()
            return
        }
        np.note.splice(np.id, 1)
    }
    a.value = ''
    b.value = ''
    upLimit()
    showNote()
}

// Create note element
function createNote(a) {
    var b = '<div class="note" d="o" i="' + a + '">'
    if(np.note[a][0].length !== 0) {
        b += '<div class="title">' + htmlDecode(np.note[a][0]) + '</div>'
    }
    b += '<div class="body">' + htmlDecode(np.note[a][1]) + '</div>'
    return b + '</div>'
}

// Empty list info 
function emptyList() {
    var a = '<div class="empty">'
    a += 'Empty<br/><br/>'
    a += 'Create new note by clicking on the \'<b>+</b>\''
    return a + '</div>'
}

// Update written limit
function upLimit() {
    var a = g('eB') 
    g('eL').innerText = Number(a.maxLength) - a.value.length
}

// Resize element(s)
function reSize() {
    g('eB').style.height = window.innerHeight - 120 + 'px'
}

// Replace all '<', '>', '"', '&'
function htmlDecode(a) {
    return a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Get Element by id
function g(a) {
    return document.getElementById(a)
}