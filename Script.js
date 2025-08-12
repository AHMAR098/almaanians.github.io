class StoryVerse {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupCategoryNavigation();
        this.loadTrendingStories();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            this.updateThemeIcon(currentTheme);
        } else if (prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeIcon('dark');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');

        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                this.searchStories(query);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    searchStories(query) {
        console.log('Searching for:', query);
        // Here you would implement the actual search functionality
        // For now, we'll show a simple alert
        alert(`Searching for: "${query}". This would connect to your backend search API.`);
    }

    setupCategoryNavigation() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.navigateToCategory(category);
            });
        });
    }

    navigateToCategory(category) {
        console.log('Navigating to category:', category);
        // Here you would implement navigation to category pages
        // For now, we'll show an alert
        alert(`Navigating to ${category} category. This would load the category page.`);
    }

    loadTrendingStories() {
        // Simulate loading trending stories
        // In a real application, this would fetch data from your backend API
        const trendingData = [
            {
                title: "The Midnight Garden",
                author: "Sarah Chen",
                cover: "https://via.placeholder.com/200x280/6366f1/ffffff?text=Story+1",
                likes: 1200,
                views: 5400,
                tags: ["Romance", "Fantasy"]
            },
            {
                title: "City Lights",
                author: "Alex Rivera",
                cover: "https://via.placeholder.com/200x280/10b981/ffffff?text=Story+2",
                likes: 890,
                views: 3200,
                tags: ["Drama", "Contemporary"]
            },
            {
                title: "Ocean's Call",
                author: "Maria Santos",
                cover: "https://via.placeholder.com/200x280/f59e0b/ffffff?text=Story+3",
                likes: 2100,
                views: 7800,
                tags: ["Adventure", "Mystery"]
            },
            {
                title: "Digital Dreams",
                author: "Jordan Kim",
                cover: "https://via.placeholder.com/200x280/ef4444/ffffff?text=Story+4",
                likes: 1500,
                views: 4700,
                tags: ["Sci-Fi", "Thriller"]
            }
        ];

        this.renderTrendingStories(trendingData);
    }

    renderTrendingStories(stories) {
        const trendingGrid = document.querySelector('.trending-grid');
        
        trendingGrid.innerHTML = stories.map(story => `
            <div class="story-card" data-story-id="${story.title}">
                <div class="story-cover">
                    <img src="${story.cover}" alt="${story.title} Cover">
                </div>
                <div class="story-info">
                    <h3>${story.title}</h3>
                    <p class="author">by ${story.author}</p>
                    <div class="story-stats">
                        <span><i class="fas fa-heart"></i> ${this.formatNumber(story.likes)}</span>
                        <span><i class="fas fa-eye"></i> ${this.formatNumber(story.views)}</span>
                    </div>
                    <div class="story-tags">
                        ${story.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners to story cards
        document.querySelectorAll('.story-card').forEach(card => {
            card.addEventListener('click', () => {
                const storyId = card.getAttribute('data-story-id');
                this.openStory(storyId);
            });
        });
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    openStory(storyId) {
        console.log('Opening story:', storyId);
        // Here you would implement navigation to the story page
        alert(`Opening story: "${storyId}". This would load the story reading page.`);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StoryVerse();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
