// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
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

    // Add active class to navigation items on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightActiveNavItem() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavItem);

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and tip cards
    document.querySelectorAll('.card, .tip-card, .action-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click handlers for community action buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple alert for now - can be replaced with actual functionality
            const action = this.textContent.trim();
            switch(action) {
                case '投稿文章':
                    alert('功能开发中：投稿功能即将上线！\n\n您可以通过GitHub Issues提交您的文章建议。');
                    break;
                case '推荐工具':
                    alert('功能开发中：工具推荐功能即将上线！\n\n您可以通过GitHub Issues推荐优秀的AI工具。');
                    break;
                case '进入论坛':
                    alert('功能开发中：论坛功能即将上线！\n\n目前可以通过GitHub Discussions参与讨论。');
                    break;
                default:
                    alert('功能正在开发中，敬请期待！');
            }
        });
    });

    // Add search functionality (placeholder)
    function addSearchBox() {
        const nav = document.querySelector('.nav');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" placeholder="搜索AI工具、知识..." class="search-input" id="searchInput">
            <button class="search-btn" onclick="performSearch()">🔍</button>
        `;
        
        // Add search styles
        const searchStyles = `
            .search-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .search-input {
                padding: 0.5rem;
                border: none;
                border-radius: 4px;
                font-size: 0.9rem;
                min-width: 200px;
            }
            .search-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                padding: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                color: white;
            }
            .search-btn:hover {
                background: rgba(255,255,255,0.3);
            }
            @media (max-width: 768px) {
                .search-container {
                    width: 100%;
                    justify-content: center;
                }
                .search-input {
                    min-width: 250px;
                }
            }
        `;
        
        if (!document.getElementById('search-styles')) {
            const style = document.createElement('style');
            style.id = 'search-styles';
            style.textContent = searchStyles;
            document.head.appendChild(style);
        }
        
        nav.appendChild(searchContainer);
    }

    // Add search box to navigation
    addSearchBox();
});

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('请输入搜索关键词');
        return;
    }
    
    // Simple search through cards
    const cards = document.querySelectorAll('.card, .tip-card');
    let results = [];
    
    cards.forEach(card => {
        const titleElement = card.querySelector('h3');
        const contentElement = card.querySelector('p');
        
        if (!titleElement || !contentElement) return;
        
        const title = titleElement.textContent.toLowerCase();
        const content = contentElement.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            results.push({
                title: titleElement.textContent,
                content: contentElement.textContent,
                element: card
            });
        }
    });
    
    if (results.length > 0) {
        // Highlight search results
        cards.forEach(card => card.style.opacity = '0.3');
        results.forEach(result => {
            result.element.style.opacity = '1';
            result.element.style.border = '2px solid #667eea';
        });
        
        alert(`找到 ${results.length} 个相关结果！页面已高亮显示。`);
        
        // Scroll to first result
        results[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset after 5 seconds
        setTimeout(() => {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.border = '1px solid #e1e5e9';
            });
        }, 5000);
    } else {
        alert('没有找到相关内容，请尝试其他关键词。');
    }
}

// Add keyboard support for search
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.id === 'searchInput') {
        performSearch();
    }
});

// Add statistics counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const increment = finalValue / 50;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + '+';
            }
        }, 30);
    });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});