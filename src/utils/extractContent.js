function extractContent(htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Get all paragraphs
    const paragraphs = Array.from(tempDiv.querySelectorAll('p'));

    // Find the paragraph with the most text
    const mostTextParagraph = paragraphs.reduce((prev, curr) => {
        return curr.innerText.length > prev.innerText.length ? curr : prev;
    }, paragraphs[0]);

    // Function to get the first image that starts with "https://"
    const getImage = (selector) => {
        const img = tempDiv.querySelector(selector);
        return img && img.src.startsWith('http://') ? img.src : null;
    };

    // Extract the first image from any <p> tag
    const firstImage = getImage('p img');

    // Extract the banner image (if any) from <p> tag
    const bannerImage = firstImage; // This will be the same as firstImage

    return {
        banner: bannerImage,
        firstImage,
        content: mostTextParagraph ? mostTextParagraph.innerText : '',
    };
}

export default extractContent;
