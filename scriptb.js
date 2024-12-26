// Fun Console Message
console.log("Welcome to Sukhman's Ice Cream Corner! 🍦✨");

// Optional Interaction Example
document.querySelectorAll('.flavor-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`You clicked on ${card.querySelector('h2').innerText}! 🍨`);
    });
});
