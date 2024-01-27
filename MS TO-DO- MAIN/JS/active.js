
document.getElementById('home').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('home').classList.add('active');
    document.getElementById('important').classList.remove('active');
    document.getElementById('planned').classList.remove('active');
    document.getElementById('tasks').classList.remove('active');
    document.getElementById('settings').classList.remove('active');

    document.getElementById('taskContent').classList.remove('hidden');

});


document.getElementById('important').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('home').classList.remove('active');
    document.getElementById('important').classList.add('active');
    document.getElementById('planned').classList.remove('active');
    document.getElementById('tasks').classList.remove('active');
    document.getElementById('settings').classList.remove('active');

    document.getElementById('taskContent').classList.add('hidden');

});

document.getElementById('planned').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('home').classList.remove('active');
    document.getElementById('important').classList.remove('active');
    document.getElementById('planned').classList.add('active');
    document.getElementById('tasks').classList.remove('active');
    document.getElementById('settings').classList.remove('active');

    document.getElementById('taskContent').classList.add('hidden');

});

document.getElementById('tasks').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('home').classList.remove('active');
    document.getElementById('important').classList.remove('active');
    document.getElementById('planned').classList.remove('active');
    document.getElementById('tasks').classList.add('active');
    document.getElementById('settings').classList.remove('active');

    document.getElementById('taskContent').classList.add('hidden');

});

document.getElementById('settings').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('home').classList.remove('active');
    document.getElementById('important').classList.remove('active');
    document.getElementById('planned').classList.remove('active');
    document.getElementById('tasks').classList.remove('active');
    document.getElementById('settings').classList.add('active');

    document.getElementById('taskContent').classList.add('hidden');

});