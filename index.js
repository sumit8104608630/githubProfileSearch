  // Sample data - would be replaced with actual API calls


// Format date to relative time (e.g. "2 days ago")
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " years ago";
    if (interval === 1) return "1 year ago";
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    if (interval === 1) return "1 month ago";
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    if (interval === 1) return "1 day ago";
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    if (interval === 1) return "1 hour ago";
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";
    if (interval === 1) return "1 minute ago";
    
    return "just now";
}

// Create repository card
function createRepoCard(repo) {
    const languageColors = {
        "JavaScript": "bg-yellow-400",
        "TypeScript": "bg-blue-600",
        "Python": "bg-blue-500",
        "Java": "bg-orange-600",
        "Go": "bg-blue-400",
        "Ruby": "bg-red-600",
        "PHP": "bg-purple-500",
        "C#": "bg-green-600",
        "C++": "bg-pink-600",
        "CSS": "bg-pink-500",
        "HTML": "bg-orange-500",
        "Dart": "bg-cyan-500",
        "Markdown": "bg-gray-500"
    };
    
    const color = languageColors[repo.language] || "bg-gray-500";
    console.log(repo.bio)
    return `
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 class="font-bold text-lg mb-1">
                <a href="${repo.html_url}" class="text-blue-600 hover:text-blue-800" target="_blank">
                    ${repo.name}
                </a>
            </h4>
            <p class="text-gray-600 text-sm mb-4 h-12 overflow-hidden">
                ${repo.description || "No description provided"}
            </p>
            <div class="flex justify-between items-center mt-4">
                <div class="flex items-center">
                    ${repo.language ? `
                        <span class="flex items-center">
                            <span class="w-3 h-3 rounded-full ${color} mr-1"></span>
                            <span class="text-sm text-gray-600">${repo.language}</span>
                        </span>
                    ` : ''}
                </div>
                <div class="flex items-center space-x-4">
                    <span class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-star mr-1"></i>
                        ${repo.stargazers_count}
                    </span>
                    <span class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-code-branch mr-1"></i>
                        ${repo.forks_count}
                    </span>
                </div>
            </div>
            <div class="mt-3 text-xs text-gray-500">
                Updated ${timeAgo(repo.updated_at)}
            </div>
        </div>
    `;
}

// Display user data
function displayUser(user) {
    // Set user profile information
    document.getElementById('userAvatar').src = user.avatar_url;
    document.getElementById('userName').textContent = user.name || user.login;
    document.getElementById('userLogin').textContent = '@' + user.login;
    document.getElementById('userBio').textContent = user.bio || 'No bio available';
    document.getElementById('followersCount').textContent = user.followers;
    document.getElementById('followingCount').textContent = user.following;
    document.getElementById('userLocation').textContent = user.location || 'Not specified';
    document.getElementById('userCompany').textContent = user.company || 'Not specified';
    
    const websiteElement = document.getElementById('userWebsite');
    if (user.blog) {
        websiteElement.textContent = user.blog;
        websiteElement.href = user.blog.startsWith('http') ? user.blog : 'https://' + user.blog;
    } else {
        websiteElement.textContent = 'Not specified';
        websiteElement.removeAttribute('href');
    }
    
    document.getElementById('profileLink').href = user.html_url;

    // Display repositories
    fetch(`https://api.github.com/users/${user.login}/repos`).then(res=>res.json()).then(data=>{
        document.getElementById('loading').classList.add('hidden');
       
        const reposList = document.getElementById('reposList');
    reposList.innerHTML = '';
    
    if (data && data.length > 0) {
       console.log(data)
            reposList.innerHTML +=data.map(repo => createRepoCard(repo)
            ).join("")

            ; 
        
    } else {
        reposList.innerHTML = '<div class="col-span-full text-center py-8 text-gray-500">No repositories found</div>';
    }
    })

    // Show results section
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('noResults').classList.add('hidden');
}

// Search for a user
function searchUser(username) {

    // Hide previous results and show loading
    document.getElementById('results').classList.add('hidden');
    document.getElementById('noResults').classList.add('hidden');
    
    // Simulate API delay (would be replaced with actual API call)
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        
        // Check if user exists in our dummy data

        fetch(`https://api.github.com/users/${username}`).then(res=>res.json()).then(data=> {
            document.getElementById('loading').classList.remove('hidden');
            displayUser(data)
            console.log(data)
        }).catch(error=>            document.getElementById('noResults').classList.remove('hidden')    )
        
      
            // Show no results message
        
    }, 800);
}

// Event listeners
document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('search').value.trim();
    if (username) {
        searchUser(username);
    }
});

document.getElementById('search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const username = document.getElementById('search').value.trim();
        if (username) {
            searchUser(username);
        }
    }
});

// Load initial data (empty state)
document.getElementById('results').classList.add('hidden');
document.getElementById('noResults').classList.add('hidden');
document.getElementById('loading').classList.add('hidden');

console.log("sumit")