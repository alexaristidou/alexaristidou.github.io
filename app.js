document.addEventListener('DOMContentLoaded', () => {

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 3. Scroll Spy (Active Section Highlighting) ---
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle of viewport
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    // --- 4. Publication Filters ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            pubCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Trigger fade-in effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    // Delay display:none to allow transition
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });



    // --- 6. Expandable Abstracts ---
    const abstractTriggers = document.querySelectorAll('.pub-abstract-trigger');
    
    abstractTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const abstractDiv = trigger.nextElementSibling;
            trigger.classList.toggle('active');
            
            if (trigger.classList.contains('active')) {
                const contentHeight = abstractDiv.scrollHeight;
                abstractDiv.style.maxHeight = contentHeight + 'px';
                trigger.querySelector('span').textContent = 'Hide Abstract';
            } else {
                abstractDiv.style.maxHeight = '0px';
                trigger.querySelector('span').textContent = 'Show Abstract';
            }
        });
    });

    // --- 7. BibTeX Citation Toggler ---
    const citeTriggers = document.querySelectorAll('.cite-trigger');
    
    citeTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const pubCard = trigger.closest('.pub-card');
            const citationBlock = pubCard.querySelector('.citation-block');
            const citationText = pubCard.querySelector('.citation-text');
            const bibtex = trigger.getAttribute('data-bibtex');
            
            if (citationBlock.style.display === 'block') {
                citationBlock.style.display = 'none';
            } else {
                // Hide any other active citation blocks first
                document.querySelectorAll('.citation-block').forEach(block => block.style.display = 'none');
                
                citationText.textContent = bibtex.trim();
                citationBlock.style.display = 'block';
            }
        });
    });
    
    // Cite Clipboard Copy
    const copyBtns = document.querySelectorAll('.copy-cite-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const citationText = btn.nextElementSibling.textContent;
            navigator.clipboard.writeText(citationText).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });





    // --- 10. Dynamic Podcast Episodes ---
    const loadPodcastEpisodes = () => {
        const container = document.getElementById('recent-episodes-container');
        if (!container) return;

        const rssUrl = 'https://anchor.fm/s/e7afb47c/podcast/rss';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const fallbackEpisodes = [
            {
                title: "Inner Wonder Ep28: Is Winning Worth More Than Being Right? With Amrit Dhaliwal",
                pubDate: "2026-01-20 07:00:00",
                link: "https://podcasters.spotify.com/pod/show/alexaristidou/episodes/Inner-Wonder-Ep28-Is-Winning-Worth-More-Than-Being-Right--With-Amrit-Dhaliwal-e3dt24h"
            },
            {
                title: "Inner Wonder Ep27: Life Coach Matteo Grosso on Growth, Service, and Finding Fulfillment",
                pubDate: "2025-11-04 06:00:00",
                link: "https://podcasters.spotify.com/pod/show/alexaristidou/episodes/Inner-Wonder-Ep27-Life-Coach-Matteo-Grosso-on-Growth--Service--and-Finding-Fulfillment-e3acnfe"
            },
            {
                title: "Inner Wonder Ep26: We all have a story. A Conversation with Dominique, Founder of Moving Stories",
                pubDate: "2025-08-26 18:00:00",
                link: "https://podcasters.spotify.com/pod/show/alexaristidou/episodes/Inner-Wonder-Ep26-We-all-have-a-story--A-Conversation-with-Dominique--Founder-of-Moving-Stories-e378loe"
            },
            {
                title: "Inner Wonder Ep25: Sustainable Excellence ft. Terry Tucker: Resilience, Purpose & Finding Your Why",
                pubDate: "2025-07-22 06:00:00",
                link: "https://podcasters.spotify.com/pod/show/alexaristidou/episodes/Inner-Wonder-Ep25-Sustainable-Excellence-ft--Terry-Tucker-Resilience--Purpose--Finding-Your-Why-e35pbr1"
            },
            {
                title: "Inner Wonder Ep24: Unleashing Potential with Alan Lazarus: Growth, Adversity, and Excellence",
                pubDate: "2025-06-19 16:38:50",
                link: "https://podcasters.spotify.com/pod/show/alexaristidou/episodes/Inner-Wonder-Ep24-Unleashing-Potential-with-Alan-Lazarus-Growth--Adversity--and-Excellence-e34fkfg"
            }
        ];

        const renderEpisodes = (episodes) => {
            container.innerHTML = '';
            
            // Get past 5 episodes
            const pastFive = episodes.slice(0, 5);
            
            pastFive.forEach((item, index) => {
                const title = item.title;
                let epLabel = '';
                let cleanTitle = title;
                
                // Regex to match "Inner Wonder EpXX: " or "EpXX: " or "Episode XX:"
                const match = title.match(/^(?:Inner Wonder\s+)?Ep(?:isode\s+)?(\d+)\s*:\s*(.*)$/i);
                if (match) {
                    epLabel = `Episode ${match[1]}`;
                    cleanTitle = match[2];
                } else {
                    epLabel = `Episode ${28 - index}`;
                    cleanTitle = title;
                }

                // Format publication date
                let formattedDate = '';
                try {
                    const dateObj = new Date(item.pubDate.replace(/-/g, '/'));
                    formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                } catch(e) {
                    formattedDate = item.pubDate;
                }

                const card = document.createElement('a');
                card.href = item.link;
                card.target = '_blank';
                card.className = 'recent-ep-card glass-card';
                card.style.padding = '1.2rem';
                
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                        <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent-forest); font-weight: 700; letter-spacing: 0.05em;">${epLabel}</span>
                        <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">${formattedDate}</span>
                    </div>
                    <span style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.8em;">${cleanTitle}</span>
                `;
                container.appendChild(card);
            });
        };

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error('API response was not ok');
                return res.json();
            })
            .then(data => {
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    renderEpisodes(data.items);
                } else {
                    console.warn('RSS parse returned status not ok, using fallback episodes');
                    renderEpisodes(fallbackEpisodes);
                }
            })
            .catch(err => {
                console.error('Error fetching podcast episodes:', err);
                renderEpisodes(fallbackEpisodes);
            });
    };

    loadPodcastEpisodes();
});
