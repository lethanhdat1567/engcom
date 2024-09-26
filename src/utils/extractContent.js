function extractContent(htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Get all paragraphs
    const paragraphs = Array.from(tempDiv.querySelectorAll('p'));

    // Find the paragraph with the most text
    const mostTextParagraph = paragraphs.reduce((prev, curr) => {
        return curr.innerText.length > prev.innerText.length ? curr : prev;
    }, paragraphs[0]);

    // Extract the first image in any paragraph
    const firstImage = tempDiv.querySelector('p img') ? tempDiv.querySelector('p img').src : null;

    return {
        firstImage,
        content: mostTextParagraph ? mostTextParagraph.innerText : '',
    };
}

export default extractContent;
