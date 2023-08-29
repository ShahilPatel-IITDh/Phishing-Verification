

    const fetchRSSFeed = async (url) => {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        return xml;
    };

    const displayNewsItems = (xml) => {
        const newsItemsContainer = document.getElementById("news-items");

        const items = xml.querySelectorAll("item");

        items.forEach((item) => {
            const titleElement = item.querySelector("title");
            const guidElement = item.querySelector("guid");
            const descriptionElement = item.querySelector("description");
            const contentElement = item.querySelector("content\\:encoded");

            const title = titleElement ? titleElement.textContent : "Untitled";
            const guid = guidElement ? guidElement.textContent : "#";
            const description = descriptionElement ? descriptionElement.textContent : "No description available.";
            const content = contentElement ? contentElement.textContent : "No content available.";

            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            newsItem.innerHTML = `
            <h2><a href="${guid}" target="_blank">${title}</a></h2>
            <p>${description}</p>
            <div>${content}</div>
        `;

            newsItemsContainer.appendChild(newsItem);
        });
    };

    (async () => {
        const foxNewsWorldRSSFeed = "https://feeds.foxnews.com/foxnews/world";
        const xml = await fetchRSSFeed(foxNewsWorldRSSFeed);
        displayNewsItems(xml);

        document.getElementById("msg").textContent = new URLSearchParams(window.location.search).get("q");

    })();


