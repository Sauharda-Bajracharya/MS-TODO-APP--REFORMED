function loadContent(page) {
    const contentDiv = document.getElementById('content');
    switch (page) {
        case 'tasks-today':
            contentDiv.innerHTML = `<div class="xcontent" id="content">
            <div class="header">
                <form class="search-form">
                    <div class="search-container">
                        <i class="fa fa-search search-icon" aria-hidden="true"></i>
                        <input type="text" placeholder="Search.." class="search-input">
                    </div>
                </form>
                
                <div class="user-profile">
                    <div class="profile-name">
                        <btn class="btn-profile">Profile</btn>
                    </div>
                    <div class="profile-icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                </div> 
            </div>
        </div>`

            break;
        case 'important':
            contentDiv.innerHTML = '<h2>Important Tasks</h2><p>This is where important tasks will be displayed.</p>';
            break;
        case 'planned':
            contentDiv.innerHTML = '<h2>Planned Tasks</h2><p>This is where planned tasks will be displayed.</p>';
            break;
        case 'tasks-general':
            contentDiv.innerHTML = '<h2>General Tasks</h2><p>This is where general tasks will be displayed.</p>';
            break;
        case 'settings':
            contentDiv.innerHTML = '<h2>Settings</h2><p>This is where settings will be displayed.</p>';
            break;
        default:
            contentDiv.innerHTML = '<h2>Page Not Found</h2><p>The requested page does not exist.</p>';
    }
}
